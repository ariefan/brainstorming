import type { Patient } from "contracts";
import {
  db,
  and,
  asc,
  desc,
  eq,
  ilike,
  isNotNull,
  or,
  sql,
  type SQL,
} from "db";
import { patients, type NewPatientRow } from "db/schema";

/**
 * Transform database row to Patient API response.
 */
function toPatient(row: typeof patients.$inferSelect): Patient {
  // Map unknown gender to other for API compatibility
  const genderMap: Record<string, "male" | "female" | "other"> = {
    male: "male",
    female: "female",
    other: "other",
    unknown: "other",
  };

  return {
    id: row.id,
    organizationId: row.organizationId,
    branchId: row.branchId ?? undefined,
    medicalRecordNumber: row.mrn,
    nik: row.nik ?? undefined,
    bpjsNumber: row.bpjsNumber ?? undefined,
    satusehatIhsId: row.satusehatIhsId ?? undefined,
    firstName: row.firstName,
    lastName: row.lastName,
    firstNameId: row.firstNameId ?? undefined,
    lastNameId: row.lastNameId ?? undefined,
    fullName: row.fullName,
    fullNameId: row.fullName,
    gender: genderMap[row.gender] ?? "other",
    dateOfBirth: row.dateOfBirth,
    placeOfBirth: row.placeOfBirth ?? undefined,
    maritalStatus: row.maritalStatus ?? undefined,
    bloodType: row.bloodType ?? undefined,
    rhesus: row.rhesus ?? undefined,
    phone: row.phone ?? undefined,
    mobile: row.mobile ?? undefined,
    email: row.email ?? undefined,
    address: row.address ?? undefined,
    city: row.city ?? undefined,
    province: row.province ?? undefined,
    postalCode: row.postalCode ?? undefined,
    country: row.country ?? "Indonesia",
    nationality: row.nationality ?? "Indonesia",
    occupation: row.occupation ?? undefined,
    education: row.education ?? undefined,
    religion: row.religion ?? undefined,
    status: (row.status ?? "active") as "active" | "inactive" | "deceased",
    photoUrl: row.photoUrl ?? undefined,
    emergencyContactName: row.emergencyContactName ?? undefined,
    emergencyContactPhone: row.emergencyContactPhone ?? undefined,
    emergencyContactRelationship: row.emergencyContactRelation ?? undefined,
    isSatusehatSynced: row.isSatusehatSynced ?? false,
    satusehatSyncedAt: row.satusehatSyncedAt?.toISOString(),
    isJknVerified: row.isJknVerified ?? false,
    jknVerifiedAt: row.jknVerifiedAt?.toISOString(),
    notes: row.notes ?? undefined,
    isDeleted: false,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } as unknown as Patient;
}

export interface ListPatientsOptions {
  page: number;
  pageSize: number;
  branchId?: string;
  isActive?: boolean;
  search?: string;
  hasBpjs?: boolean;
}

export interface ListPatientsResult {
  patients: Patient[];
  totalCount: number;
}

/**
 * Build WHERE conditions for list patients query.
 */
function buildWhereConditions(
  orgId: string,
  options: ListPatientsOptions
): SQL[] {
  const conditions: SQL[] = [eq(patients.organizationId, orgId)];

  if (options.branchId) {
    conditions.push(eq(patients.branchId, options.branchId));
  }

  if (options.isActive !== undefined) {
    if (options.isActive) {
      conditions.push(eq(patients.status, "active"));
    } else {
      conditions.push(sql`${patients.status} != 'active'`);
    }
  }

  if (options.search) {
    const searchCondition = or(
      ilike(patients.fullName, `%${options.search}%`),
      ilike(patients.mrn, `%${options.search}%`),
      ilike(patients.nik, `%${options.search}%`)
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  if (options.hasBpjs !== undefined) {
    if (options.hasBpjs) {
      conditions.push(isNotNull(patients.bpjsNumber));
    } else {
      conditions.push(sql`${patients.bpjsNumber} IS NULL`);
    }
  }

  return conditions;
}

export async function listPatients(
  orgId: string,
  options: ListPatientsOptions
): Promise<ListPatientsResult> {
  const { page, pageSize } = options;
  const offset = (page - 1) * pageSize;

  const conditions = buildWhereConditions(orgId, options);
  const whereClause = and(...conditions);

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(patients)
      .where(whereClause)
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(patients.createdAt)),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(patients)
      .where(whereClause),
  ]);

  return {
    patients: rows.map(toPatient),
    totalCount: countResult[0]?.count ?? 0,
  };
}

export async function findPatientById(id: string): Promise<Patient | null> {
  const rows = await db
    .select()
    .from(patients)
    .where(eq(patients.id, id))
    .limit(1);

  const row = rows[0];
  return row ? toPatient(row) : null;
}

export async function findPatientByIdAndOrg(
  id: string,
  orgId: string
): Promise<Patient | null> {
  const rows = await db
    .select()
    .from(patients)
    .where(and(eq(patients.id, id), eq(patients.organizationId, orgId)))
    .limit(1);

  const row = rows[0];
  return row ? toPatient(row) : null;
}

export async function findPatientByNik(
  nik: string,
  orgId: string
): Promise<Patient | null> {
  const rows = await db
    .select()
    .from(patients)
    .where(and(eq(patients.nik, nik), eq(patients.organizationId, orgId)))
    .limit(1);

  const row = rows[0];
  return row ? toPatient(row) : null;
}

export async function findPatientByBpjs(
  bpjsNumber: string,
  orgId: string
): Promise<Patient | null> {
  const rows = await db
    .select()
    .from(patients)
    .where(
      and(eq(patients.bpjsNumber, bpjsNumber), eq(patients.organizationId, orgId))
    )
    .limit(1);

  const row = rows[0];
  return row ? toPatient(row) : null;
}

export async function createPatient(data: NewPatientRow): Promise<Patient> {
  const rows = await db.insert(patients).values(data).returning();

  const row = rows[0];
  if (!row) {
    throw new Error("Failed to create patient");
  }

  return toPatient(row);
}

export async function updatePatient(
  id: string,
  orgId: string,
  data: Partial<NewPatientRow>
): Promise<Patient | null> {
  const rows = await db
    .update(patients)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(patients.id, id), eq(patients.organizationId, orgId)))
    .returning();

  const row = rows[0];
  return row ? toPatient(row) : null;
}

export async function deletePatient(id: string, orgId: string): Promise<boolean> {
  const result = await db
    .delete(patients)
    .where(and(eq(patients.id, id), eq(patients.organizationId, orgId)))
    .returning();
  return result.length > 0;
}
