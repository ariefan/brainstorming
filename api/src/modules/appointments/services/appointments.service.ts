import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from "contracts";
import { NotFoundError } from "../../../lib/errors";
import { generateId } from "../../../lib/response";
import * as appointmentsRepo from "../repositories/appointments.repository";

export interface PaginatedAppointments {
  appointments: Appointment[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListAppointmentsOptions {
  page: number;
  pageSize: number;
  branchId?: string;
  practitionerId?: string;
  patientId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export async function listAppointments(
  orgId: string,
  options: ListAppointmentsOptions
): Promise<PaginatedAppointments> {
  const { page, pageSize } = options;
  const result = await appointmentsRepo.listAppointments(orgId, options);
  const totalPages = Math.ceil(result.totalCount / pageSize);

  return {
    appointments: result.appointments,
    page,
    pageSize,
    totalCount: result.totalCount,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export async function getAppointmentById(id: string, orgId: string): Promise<Appointment> {
  const appointment = await appointmentsRepo.findAppointmentByIdAndOrg(id, orgId);
  if (!appointment) throw new NotFoundError("Appointment", id);
  return appointment;
}

function generateAppointmentNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `APT-${dateStr}-${random}`;
}

export async function createAppointment(
  orgId: string,
  data: CreateAppointmentRequest
): Promise<Appointment> {
  const now = new Date();

  return appointmentsRepo.createAppointment({
    id: generateId("apt"),
    organizationId: orgId,
    branchId: data.branchId ?? null,
    appointmentNumber: generateAppointmentNumber(),
    patientId: data.patientId,
    practitionerId: data.practitionerId,
    polyclinicId: data.polyclinicId ?? null,
    appointmentType: data.appointmentType as any,
    appointmentDate: data.appointmentDate,
    startTime: data.startTime,
    endTime: data.endTime ?? null,
    status: "booked",
    reason: data.reasonForVisit ?? null,
    notes: data.notes ?? null,
    isWalkIn: data.isWalkIn ?? false,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateAppointment(
  id: string,
  orgId: string,
  data: UpdateAppointmentRequest
): Promise<Appointment> {
  const existing = await appointmentsRepo.findAppointmentByIdAndOrg(id, orgId);
  if (!existing) throw new NotFoundError("Appointment", id);

  const updated = await appointmentsRepo.updateAppointment(id, orgId, {
    practitionerId: data.practitionerId,
    polyclinicId: data.polyclinicId,
    appointmentDate: data.appointmentDate,
    startTime: data.startTime,
    endTime: data.endTime,
    reason: data.reasonForVisit,
    notes: data.notes,
  } as any);

  if (!updated) throw new NotFoundError("Appointment", id);
  return updated;
}

export async function cancelAppointment(id: string, orgId: string): Promise<Appointment> {
  const updated = await appointmentsRepo.updateAppointment(id, orgId, {
    status: "cancelled",
  } as any);
  if (!updated) throw new NotFoundError("Appointment", id);
  return updated;
}

export async function checkInAppointment(id: string, orgId: string): Promise<Appointment> {
  const updated = await appointmentsRepo.updateAppointment(id, orgId, {
    status: "checked_in",
    checkedInAt: new Date(),
  } as any);
  if (!updated) throw new NotFoundError("Appointment", id);
  return updated;
}
