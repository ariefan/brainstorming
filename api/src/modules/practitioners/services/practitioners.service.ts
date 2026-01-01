import type { CreatePractitionerRequest, Practitioner, UpdatePractitionerRequest } from "contracts";
import { NotFoundError } from "../../../lib/errors";
import { generateId } from "../../../lib/response";
import * as practitionersRepo from "../repositories/practitioners.repository";

export interface PaginatedPractitioners {
  practitioners: Practitioner[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
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

export async function listPractitioners(
  orgId: string,
  options: ListPractitionersOptions
): Promise<PaginatedPractitioners> {
  const { page, pageSize } = options;

  const result = await practitionersRepo.listPractitioners(orgId, {
    page,
    pageSize,
    branchId: options.branchId,
    practitionerType: options.practitionerType,
    specialty: options.specialty,
    isActive: options.isActive,
    search: options.search,
  });

  const totalPages = Math.ceil(result.totalCount / pageSize);

  return {
    practitioners: result.practitioners,
    page,
    pageSize,
    totalCount: result.totalCount,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export async function getPractitionerById(
  id: string,
  orgId: string
): Promise<Practitioner> {
  const practitioner = await practitionersRepo.findPractitionerByIdAndOrg(id, orgId);
  if (!practitioner) {
    throw new NotFoundError("Practitioner", id);
  }
  return practitioner;
}

/**
 * Generate unique Practitioner Number
 */
function generatePractitionerNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PRC-${timestamp}${random}`;
}

export async function createPractitioner(
  orgId: string,
  data: CreatePractitionerRequest
): Promise<Practitioner> {
  const now = new Date();

  const practitioner = await practitionersRepo.createPractitioner({
    id: generateId("prc"),
    organizationId: orgId,
    branchId: data.branchId ?? null,
    practitionerNumber: generatePractitionerNumber(),
    firstName: data.firstName,
    lastName: data.lastName,
    firstNameId: data.firstNameId ?? null,
    lastNameId: data.lastNameId ?? null,
    fullName: `${data.firstName} ${data.lastName}`,
    gender: data.gender ?? null,
    dateOfBirth: data.dateOfBirth ?? null,
    phone: data.phone ?? null,
    mobile: data.mobile ?? null,
    email: data.email ?? null,
    practitionerType: data.practitionerType as any,
    specialty: data.specialty as any ?? null,
    licenseNumber: data.licenseNumber ?? null,
    licenseExpiry: data.licenseExpiry ?? null,
    nip: data.nip ?? null,
    str: data.str ?? null,
    sip: data.sip ?? null,
    isActive: true,
    bio: data.bio ?? null,
    createdAt: now,
    updatedAt: now,
  } as any);

  return practitioner;
}

export async function updatePractitioner(
  id: string,
  orgId: string,
  data: UpdatePractitionerRequest
): Promise<Practitioner> {
  const existing = await practitionersRepo.findPractitionerByIdAndOrg(id, orgId);
  if (!existing) {
    throw new NotFoundError("Practitioner", id);
  }

  // Only use fields that exist in UpdatePractitionerRequest
  const updateData: Record<string, unknown> = {};

  if (data.firstName !== undefined) updateData.firstName = data.firstName;
  if (data.lastName !== undefined) updateData.lastName = data.lastName;
  if (data.firstName !== undefined || data.lastName !== undefined) {
    updateData.fullName = `${data.firstName ?? existing.firstName} ${data.lastName ?? existing.lastName}`;
  }
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.mobile !== undefined) updateData.mobile = data.mobile;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.specialty !== undefined) updateData.specialty = data.specialty;
  if (data.licenseNumber !== undefined) updateData.licenseNumber = data.licenseNumber;
  if (data.licenseExpiry !== undefined) updateData.licenseExpiry = data.licenseExpiry;
  if (data.nip !== undefined) updateData.nip = data.nip;
  if (data.str !== undefined) updateData.str = data.str;
  if (data.sip !== undefined) updateData.sip = data.sip;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.bio !== undefined) updateData.bio = data.bio;

  const updated = await practitionersRepo.updatePractitioner(id, orgId, updateData as any);
  if (!updated) {
    throw new NotFoundError("Practitioner", id);
  }

  return updated;
}

export async function deletePractitioner(id: string, orgId: string): Promise<void> {
  const deleted = await practitionersRepo.deletePractitioner(id, orgId);
  if (!deleted) {
    throw new NotFoundError("Practitioner", id);
  }
}
