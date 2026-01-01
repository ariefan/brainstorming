import type { CreatePatientRequest, Patient, UpdatePatientRequest } from "contracts";
import { BadRequestError, NotFoundError } from "../../../lib/errors";
import { generateId } from "../../../lib/response";
import * as patientsRepo from "../repositories/patients.repository";

export interface PaginatedPatients {
  patients: Patient[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListPatientsOptions {
  page: number;
  pageSize: number;
  branchId?: string;
  isActive?: boolean;
  search?: string;
  hasBpjs?: boolean;
}

export async function listPatients(
  orgId: string,
  options: ListPatientsOptions
): Promise<PaginatedPatients> {
  const { page, pageSize } = options;

  const result = await patientsRepo.listPatients(orgId, {
    page,
    pageSize,
    branchId: options.branchId,
    isActive: options.isActive,
    search: options.search,
    hasBpjs: options.hasBpjs,
  });

  const totalPages = Math.ceil(result.totalCount / pageSize);

  return {
    patients: result.patients,
    page,
    pageSize,
    totalCount: result.totalCount,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export async function getPatientById(
  id: string,
  orgId: string
): Promise<Patient> {
  const patient = await patientsRepo.findPatientByIdAndOrg(id, orgId);
  if (!patient) {
    throw new NotFoundError("Patient", id);
  }
  return patient;
}

export async function searchPatientByNik(
  nik: string,
  orgId: string
): Promise<Patient> {
  const patient = await patientsRepo.findPatientByNik(nik, orgId);
  if (!patient) {
    throw new NotFoundError("Patient", `NIK: ${nik}`);
  }
  return patient;
}

export async function searchPatientByBpjs(
  bpjsNumber: string,
  orgId: string
): Promise<Patient> {
  const patient = await patientsRepo.findPatientByBpjs(bpjsNumber, orgId);
  if (!patient) {
    throw new NotFoundError("Patient", `BPJS: ${bpjsNumber}`);
  }
  return patient;
}

/**
 * Generate unique Medical Record Number
 */
function generateMRN(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MRN-${timestamp}${random}`;
}

export async function createPatient(
  orgId: string,
  data: CreatePatientRequest
): Promise<Patient> {
  const now = new Date();

  // Check for duplicate NIK if provided
  if (data.nik) {
    const existingNik = await patientsRepo.findPatientByNik(data.nik, orgId);
    if (existingNik) {
      throw new BadRequestError(`Patient with NIK ${data.nik} already exists`);
    }
  }

  // Check for duplicate BPJS number if provided
  if (data.bpjsNumber) {
    const existingBpjs = await patientsRepo.findPatientByBpjs(data.bpjsNumber, orgId);
    if (existingBpjs) {
      throw new BadRequestError(`Patient with BPJS number ${data.bpjsNumber} already exists`);
    }
  }

  const patient = await patientsRepo.createPatient({
    id: generateId("pat"),
    organizationId: orgId,
    branchId: data.branchId ?? null,
    mrn: generateMRN(),
    nik: data.nik ?? null,
    bpjsNumber: data.bpjsNumber ?? null,
    firstName: data.firstName,
    lastName: data.lastName,
    firstNameId: data.firstNameId ?? null,
    lastNameId: data.lastNameId ?? null,
    fullName: `${data.firstName} ${data.lastName}`,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    placeOfBirth: data.placeOfBirth ?? null,
    maritalStatus: data.maritalStatus ?? null,
    bloodType: data.bloodType ?? null,
    rhesus: data.rhesus ?? null,
    phone: data.phone ?? null,
    mobile: data.mobile ?? null,
    email: data.email ?? null,
    address: data.address ?? null,
    city: data.city ?? null,
    province: data.province ?? null,
    postalCode: data.postalCode ?? null,
    country: data.country ?? "Indonesia",
    nationality: data.nationality ?? "Indonesia",
    occupation: data.occupation ?? null,
    education: data.education ?? null,
    religion: data.religion ?? null,
    status: "active",
    emergencyContactName: data.emergencyContactName ?? null,
    emergencyContactPhone: data.emergencyContactPhone ?? null,
    emergencyContactRelation: data.emergencyContactRelationship ?? null,
    createdAt: now,
    updatedAt: now,
  } as any);

  return patient;
}

export async function updatePatient(
  id: string,
  orgId: string,
  data: UpdatePatientRequest
): Promise<Patient> {
  const existing = await patientsRepo.findPatientByIdAndOrg(id, orgId);
  if (!existing) {
    throw new NotFoundError("Patient", id);
  }

  // Check for duplicate BPJS if changing
  if (data.bpjsNumber && data.bpjsNumber !== existing.bpjsNumber) {
    const existingBpjs = await patientsRepo.findPatientByBpjs(data.bpjsNumber, orgId);
    if (existingBpjs && existingBpjs.id !== id) {
      throw new BadRequestError(`Patient with BPJS number ${data.bpjsNumber} already exists`);
    }
  }

  // Build update object with only fields that exist in UpdatePatientRequest
  const updateData: Record<string, unknown> = {};

  if (data.firstName !== undefined) updateData.firstName = data.firstName;
  if (data.lastName !== undefined) updateData.lastName = data.lastName;
  if (data.firstName !== undefined || data.lastName !== undefined) {
    updateData.fullName = `${data.firstName ?? existing.firstName} ${data.lastName ?? existing.lastName}`;
  }
  if (data.firstNameId !== undefined) updateData.firstNameId = data.firstNameId;
  if (data.lastNameId !== undefined) updateData.lastNameId = data.lastNameId;
  if (data.bpjsNumber !== undefined) updateData.bpjsNumber = data.bpjsNumber;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.mobile !== undefined) updateData.mobile = data.mobile;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.city !== undefined) updateData.city = data.city;
  if (data.province !== undefined) updateData.province = data.province;
  if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;
  if (data.occupation !== undefined) updateData.occupation = data.occupation;
  if (data.education !== undefined) updateData.education = data.education;
  if (data.emergencyContactName !== undefined) updateData.emergencyContactName = data.emergencyContactName;
  if (data.emergencyContactPhone !== undefined) updateData.emergencyContactPhone = data.emergencyContactPhone;
  if (data.emergencyContactRelationship !== undefined) updateData.emergencyContactRelation = data.emergencyContactRelationship;

  const updated = await patientsRepo.updatePatient(id, orgId, updateData as any);
  if (!updated) {
    throw new NotFoundError("Patient", id);
  }

  return updated;
}

export async function deletePatient(id: string, orgId: string): Promise<void> {
  const deleted = await patientsRepo.deletePatient(id, orgId);
  if (!deleted) {
    throw new NotFoundError("Patient", id);
  }
}
