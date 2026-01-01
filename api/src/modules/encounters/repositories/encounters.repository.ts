import type { Encounter } from "contracts";
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
import { encounters, type NewEncounterRow } from "db/schema";

function toEncounter(row: typeof encounters.$inferSelect): Encounter {
  return {
    id: row.id,
    organizationId: row.organizationId,
    branchId: row.branchId ?? undefined,
    encounterNumber: row.encounterNumber,
    patientId: row.patientId,
    practitionerId: row.practitionerId,
    appointmentId: row.appointmentId ?? undefined,
    polyclinicId: row.polyclinicId,
    encounterClass: row.encounterClass as any,
    encounterType: row.encounterType as any,
    status: row.status as any,
    startTime: row.startTime?.toISOString() ?? new Date().toISOString(),
    endTime: row.endTime?.toISOString(),
    reasonForVisit: row.reason ?? undefined,
    chiefComplaint: row.chiefComplaint ?? undefined,
    bpjsSepNumber: row.bpjsSepNumber ?? undefined,
    notes: row.notes ?? undefined,
    isSatusehatSynced: row.isSatusehatSynced ?? false,
    isJknSynced: row.isJknSynced ?? false,
    isDeleted: false,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } as unknown as Encounter;
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

export interface ListEncountersResult {
  encounters: Encounter[];
  totalCount: number;
}

function buildWhereConditions(
  orgId: string,
  options: ListEncountersOptions
): SQL[] {
  const conditions: SQL[] = [eq(encounters.organizationId, orgId)];

  if (options.branchId) conditions.push(eq(encounters.branchId, options.branchId));
  if (options.practitionerId) conditions.push(eq(encounters.practitionerId, options.practitionerId));
  if (options.patientId) conditions.push(eq(encounters.patientId, options.patientId));
  if (options.status) conditions.push(eq(encounters.status, options.status as any));
  if (options.encounterClass) conditions.push(eq(encounters.encounterClass, options.encounterClass as any));
  if (options.dateFrom) conditions.push(gte(encounters.startTime, new Date(options.dateFrom)));
  if (options.dateTo) conditions.push(lte(encounters.startTime, new Date(options.dateTo)));

  return conditions;
}

export async function listEncounters(
  orgId: string,
  options: ListEncountersOptions
): Promise<ListEncountersResult> {
  const { page, pageSize } = options;
  const offset = (page - 1) * pageSize;
  const conditions = buildWhereConditions(orgId, options);
  const whereClause = and(...conditions);

  const [rows, countResult] = await Promise.all([
    db.select().from(encounters).where(whereClause).limit(pageSize).offset(offset).orderBy(desc(encounters.startTime)),
    db.select({ count: sql<number>`count(*)::int` }).from(encounters).where(whereClause),
  ]);

  return {
    encounters: rows.map(toEncounter),
    totalCount: countResult[0]?.count ?? 0,
  };
}

export async function findEncounterByIdAndOrg(id: string, orgId: string): Promise<Encounter | null> {
  const rows = await db.select().from(encounters)
    .where(and(eq(encounters.id, id), eq(encounters.organizationId, orgId)))
    .limit(1);
  return rows[0] ? toEncounter(rows[0]) : null;
}

export async function createEncounter(data: NewEncounterRow): Promise<Encounter> {
  const rows = await db.insert(encounters).values(data).returning();
  if (!rows[0]) throw new Error("Failed to create encounter");
  return toEncounter(rows[0]);
}

export async function updateEncounter(
  id: string,
  orgId: string,
  data: Partial<NewEncounterRow>
): Promise<Encounter | null> {
  const rows = await db.update(encounters)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(encounters.id, id), eq(encounters.organizationId, orgId)))
    .returning();
  return rows[0] ? toEncounter(rows[0]) : null;
}
