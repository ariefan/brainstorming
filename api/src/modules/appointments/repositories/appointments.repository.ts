import type { Appointment } from "contracts";
import {
  db,
  and,
  desc,
  eq,
  gte,
  lte,
  sql,
  type SQL,
} from "db";
import { appointments, type NewAppointmentRow } from "db/schema";

function toAppointment(row: typeof appointments.$inferSelect): Appointment {
  return {
    id: row.id,
    organizationId: row.organizationId,
    branchId: row.branchId ?? undefined,
    appointmentNumber: row.appointmentNumber,
    patientId: row.patientId,
    practitionerId: row.practitionerId,
    polyclinicId: row.polyclinicId,
    appointmentType: row.appointmentType as any,
    appointmentDate: row.appointmentDate,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    duration: row.duration ?? undefined,
    status: row.status as any,
    priority: (row.priority ?? "routine") as any,
    reasonForVisit: row.reason ?? undefined,
    symptoms: row.symptoms ?? undefined,
    notes: row.notes ?? undefined,
    isWalkIn: row.isWalkIn ?? false,
    isOnline: row.isOnline ?? false,
    isVideoCall: row.isVideoCall ?? false,
    isFollowUp: row.isFollowUp ?? false,
    isJknSynced: row.isJknSynced ?? false,
    isDeleted: false,
    checkedInAt: row.checkedInAt?.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
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

export interface ListAppointmentsResult {
  appointments: Appointment[];
  totalCount: number;
}

function buildWhereConditions(
  orgId: string,
  options: ListAppointmentsOptions
): SQL[] {
  const conditions: SQL[] = [eq(appointments.organizationId, orgId)];

  if (options.branchId) {
    conditions.push(eq(appointments.branchId, options.branchId));
  }
  if (options.practitionerId) {
    conditions.push(eq(appointments.practitionerId, options.practitionerId));
  }
  if (options.patientId) {
    conditions.push(eq(appointments.patientId, options.patientId));
  }
  if (options.status) {
    conditions.push(eq(appointments.status, options.status as any));
  }
  if (options.dateFrom) {
    conditions.push(gte(appointments.appointmentDate, options.dateFrom));
  }
  if (options.dateTo) {
    conditions.push(lte(appointments.appointmentDate, options.dateTo));
  }

  return conditions;
}

export async function listAppointments(
  orgId: string,
  options: ListAppointmentsOptions
): Promise<ListAppointmentsResult> {
  const { page, pageSize } = options;
  const offset = (page - 1) * pageSize;

  const conditions = buildWhereConditions(orgId, options);
  const whereClause = and(...conditions);

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(appointments)
      .where(whereClause)
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(appointments.appointmentDate)),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(appointments)
      .where(whereClause),
  ]);

  return {
    appointments: rows.map(toAppointment),
    totalCount: countResult[0]?.count ?? 0,
  };
}

export async function findAppointmentByIdAndOrg(
  id: string,
  orgId: string
): Promise<Appointment | null> {
  const rows = await db
    .select()
    .from(appointments)
    .where(and(eq(appointments.id, id), eq(appointments.organizationId, orgId)))
    .limit(1);

  const row = rows[0];
  return row ? toAppointment(row) : null;
}

export async function createAppointment(data: NewAppointmentRow): Promise<Appointment> {
  const rows = await db.insert(appointments).values(data).returning();
  const row = rows[0];
  if (!row) throw new Error("Failed to create appointment");
  return toAppointment(row);
}

export async function updateAppointment(
  id: string,
  orgId: string,
  data: Partial<NewAppointmentRow>
): Promise<Appointment | null> {
  const rows = await db
    .update(appointments)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(appointments.id, id), eq(appointments.organizationId, orgId)))
    .returning();

  const row = rows[0];
  return row ? toAppointment(row) : null;
}

export async function deleteAppointment(id: string, orgId: string): Promise<boolean> {
  const result = await db
    .delete(appointments)
    .where(and(eq(appointments.id, id), eq(appointments.organizationId, orgId)))
    .returning();
  return result.length > 0;
}
