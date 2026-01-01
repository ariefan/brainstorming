import type { Practitioner } from "contracts";
import {
  db,
  and,
  desc,
  eq,
  ilike,
  or,
  sql,
  type SQL,
} from "db";
import { practitioners, type NewPractitionerRow } from "db/schema";

/**
 * Transform database row to Practitioner API response.
 */
function toPractitioner(row: typeof practitioners.$inferSelect): Practitioner {
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
    practitionerNumber: row.practitionerNumber,
    firstName: row.firstName,
    lastName: row.lastName,
    firstNameId: row.firstNameId ?? undefined,
    lastNameId: row.lastNameId ?? undefined,
    fullName: row.fullName,
    gender: genderMap[row.gender ?? "other"] ?? "other",
    dateOfBirth: row.dateOfBirth ?? undefined,
    phone: row.phone ?? undefined,
    mobile: row.mobile ?? undefined,
    email: row.email ?? undefined,
    practitionerType: row.practitionerType as any,
    specialty: row.specialty ?? undefined,
    licenseNumber: row.licenseNumber ?? undefined,
    licenseExpiry: row.licenseExpiry ?? undefined,
    satusehatIhsId: row.satusehatIhsId ?? undefined,
    nip: row.nip ?? undefined,
    str: row.str ?? undefined,
    sip: row.sip ?? undefined,
    isSatusehatSynced: row.isSatusehatSynced ?? false,
    satusehatSyncedAt: row.satusehatSyncedAt?.toISOString(),
    isJknSynced: row.isJknSynced ?? false,
    jknSyncedAt: row.jknSyncedAt?.toISOString(),
    isActive: row.isActive ?? true,
    photoUrl: row.photoUrl ?? undefined,
    bio: row.bio ?? undefined,
    education: row.education ?? undefined,
    certifications: row.certifications ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } as Practitioner;
}

export interface ListPractitionersOptions {
  page: number;
  pageSize: number;
  branchId?: string;
  practitionerType?: string;
  specialty?: string;
  isActive?: boolean;
  search?: string;
}

export interface ListPractitionersResult {
  practitioners: Practitioner[];
  totalCount: number;
}

function buildWhereConditions(
  orgId: string,
  options: ListPractitionersOptions
): SQL[] {
  const conditions: SQL[] = [eq(practitioners.organizationId, orgId)];

  if (options.branchId) {
    conditions.push(eq(practitioners.branchId, options.branchId));
  }

  if (options.practitionerType) {
    conditions.push(eq(practitioners.practitionerType, options.practitionerType as any));
  }

  if (options.specialty) {
    conditions.push(eq(practitioners.specialty, options.specialty as any));
  }

  if (options.isActive !== undefined) {
    conditions.push(eq(practitioners.isActive, options.isActive));
  }

  if (options.search) {
    const searchCondition = or(
      ilike(practitioners.fullName, `%${options.search}%`),
      ilike(practitioners.practitionerNumber, `%${options.search}%`),
      ilike(practitioners.licenseNumber, `%${options.search}%`)
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  return conditions;
}

export async function listPractitioners(
  orgId: string,
  options: ListPractitionersOptions
): Promise<ListPractitionersResult> {
  const { page, pageSize } = options;
  const offset = (page - 1) * pageSize;

  const conditions = buildWhereConditions(orgId, options);
  const whereClause = and(...conditions);

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(practitioners)
      .where(whereClause)
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(practitioners.createdAt)),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(practitioners)
      .where(whereClause),
  ]);

  return {
    practitioners: rows.map(toPractitioner),
    totalCount: countResult[0]?.count ?? 0,
  };
}

export async function findPractitionerById(id: string): Promise<Practitioner | null> {
  const rows = await db
    .select()
    .from(practitioners)
    .where(eq(practitioners.id, id))
    .limit(1);

  const row = rows[0];
  return row ? toPractitioner(row) : null;
}

export async function findPractitionerByIdAndOrg(
  id: string,
  orgId: string
): Promise<Practitioner | null> {
  const rows = await db
    .select()
    .from(practitioners)
    .where(and(eq(practitioners.id, id), eq(practitioners.organizationId, orgId)))
    .limit(1);

  const row = rows[0];
  return row ? toPractitioner(row) : null;
}

export async function createPractitioner(data: NewPractitionerRow): Promise<Practitioner> {
  const rows = await db.insert(practitioners).values(data).returning();

  const row = rows[0];
  if (!row) {
    throw new Error("Failed to create practitioner");
  }

  return toPractitioner(row);
}

export async function updatePractitioner(
  id: string,
  orgId: string,
  data: Partial<NewPractitionerRow>
): Promise<Practitioner | null> {
  const rows = await db
    .update(practitioners)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(practitioners.id, id), eq(practitioners.organizationId, orgId)))
    .returning();

  const row = rows[0];
  return row ? toPractitioner(row) : null;
}

export async function deletePractitioner(id: string, orgId: string): Promise<boolean> {
  const result = await db
    .delete(practitioners)
    .where(and(eq(practitioners.id, id), eq(practitioners.organizationId, orgId)))
    .returning();
  return result.length > 0;
}
