import type { CreateEncounterRequest, Encounter, UpdateEncounterRequest } from "contracts";
import { NotFoundError } from "../../../lib/errors";
import { generateId } from "../../../lib/response";
import * as encountersRepo from "../repositories/encounters.repository";

export interface PaginatedEncounters {
  encounters: Encounter[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListEncountersOptions {
  page: number;
  pageSize: number;
  branchId?: string;
  practitionerId?: string;
  patientId?: string;
  status?: string;
  encounterClass?: string;
  dateFrom?: string;
  dateTo?: string;
}

export async function listEncounters(orgId: string, options: ListEncountersOptions): Promise<PaginatedEncounters> {
  const { page, pageSize } = options;
  const result = await encountersRepo.listEncounters(orgId, options);
  const totalPages = Math.ceil(result.totalCount / pageSize);

  return {
    encounters: result.encounters,
    page,
    pageSize,
    totalCount: result.totalCount,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export async function getEncounterById(id: string, orgId: string): Promise<Encounter> {
  const encounter = await encountersRepo.findEncounterByIdAndOrg(id, orgId);
  if (!encounter) throw new NotFoundError("Encounter", id);
  return encounter;
}

function generateEncounterNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ENC-${dateStr}-${random}`;
}

export async function createEncounter(orgId: string, data: CreateEncounterRequest): Promise<Encounter> {
  const now = new Date();

  return encountersRepo.createEncounter({
    id: generateId("enc"),
    organizationId: orgId,
    branchId: data.branchId ?? null,
    encounterNumber: generateEncounterNumber(),
    patientId: data.patientId,
    practitionerId: data.practitionerId,
    appointmentId: data.appointmentId ?? null,
    polyclinicId: data.polyclinicId ?? null,
    encounterClass: data.encounterClass as any,
    encounterType: data.encounterType as any,
    encounterDate: now.toISOString().split('T')[0],
    status: "in_progress",
    startTime: now,
    reason: data.reasonForVisit ?? null,
    chiefComplaint: data.chiefComplaint ?? null,
    bpjsSepNumber: data.bpjsSepNumber ?? null,
    createdAt: now,
    updatedAt: now,
  } as any);
}

export async function updateEncounter(id: string, orgId: string, data: UpdateEncounterRequest): Promise<Encounter> {
  const existing = await encountersRepo.findEncounterByIdAndOrg(id, orgId);
  if (!existing) throw new NotFoundError("Encounter", id);

  const updated = await encountersRepo.updateEncounter(id, orgId, {
    status: data.status,
    chiefComplaint: data.chiefComplaint,
  } as any);

  if (!updated) throw new NotFoundError("Encounter", id);
  return updated;
}

export async function completeEncounter(id: string, orgId: string): Promise<Encounter> {
  const updated = await encountersRepo.updateEncounter(id, orgId, {
    status: "finished",
    endTime: new Date(),
  } as any);
  if (!updated) throw new NotFoundError("Encounter", id);
  return updated;
}

export async function cancelEncounter(id: string, orgId: string): Promise<Encounter> {
  const updated = await encountersRepo.updateEncounter(id, orgId, {
    status: "cancelled",
    endTime: new Date(),
  } as any);
  if (!updated) throw new NotFoundError("Encounter", id);
  return updated;
}
