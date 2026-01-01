import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ORGANIZATION MODEL
// ============================================================================

/**
 * Organization (Tenant) resource
 *
 * Represents a healthcare facility such as clinic, hospital, or pharmacy.
 * All resources are scoped to an organization (multi-tenant).
 */
model Organization {
  /** Unique organization identifier */
  @example("org_abc123")
  id: string;

  /** Organization code (unique per system) */
  @example("CLINIC001")
  orgCode: string;

  /** Organization name */
  @example("Klinik Sehat Sentosa")
  orgName: string;

  /** Organization name in Indonesian (if different) */
  orgNameId?: string;

  /** Organization type */
  orgType: OrgType;

  /** Health facility license number */
  @example("1234/SIUP/2024")
  licenseNumber?: string;

  /** NPWP (Tax ID) */
  @example("01.234.567.8-901.234")
  npwp?: string;

  /** BPJS PPK code */
  @example("0012A456")
  bpjsPpkCode?: string;

  /** SatuSehat organization ID */
  satusehatOrgId?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Country (default: Indonesia) */
  country: string;

  /** Phone number */
  phone?: string;

  /** Email address */
  @format("email")
  email?: string;

  /** Website URL */
  @format("uri")
  website?: string;

  /** Logo URL */
  logoUrl?: string;

  /** Operating hours (JSON) */
  operatingHours?: Record<unknown>;

  /** Whether organization is active */
  isActive: boolean;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** Soft delete status */
  isDeleted: boolean;

  /** When soft deleted */
  deletedAt?: utcDateTime;

  /** Who deleted */
  deletedBy?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When last updated */
  updatedAt: utcDateTime;
}

/**
 * Branch (sub-location) resource
 *
 * Represents a branch/location within an organization
 */
model Branch {
  /** Unique branch identifier */
  id: string;

  /** Parent organization ID */
  organizationId: string;

  /** Branch code */
  branchCode: string;

  /** Branch name */
  branchName: string;

  /** Branch name in Indonesian */
  branchNameId?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Whether branch is active */
  isActive: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When last updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating an organization */
model CreateOrganizationRequest {
  /** Organization code (unique) */
  @minLength(1)
  @maxLength(20)
  orgCode: string;

  /** Organization name */
  @minLength(1)
  @maxLength(255)
  orgName: string;

  /** Indonesian name */
  orgNameId?: string;

  /** Organization type */
  orgType: OrgType;

  /** License number */
  licenseNumber?: string;

  /** NPWP */
  npwp?: string;

  /** BPJS PPK code */
  bpjsPpkCode?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Country */
  country?: string;

  /** Phone */
  phone?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Website */
  @format("uri")
  website?: string;
}

/** Request body for updating an organization */
model UpdateOrganizationRequest {
  /** Organization name */
  @minLength(1)
  @maxLength(255)
  orgName?: string;

  /** Indonesian name */
  orgNameId?: string;

  /** License number */
  licenseNumber?: string;

  /** NPWP */
  npwp?: string;

  /** BPJS PPK code */
  bpjsPpkCode?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Website */
  @format("uri")
  website?: string;

  /** Operating hours */
  operatingHours?: Record<unknown>;

  /** Active status */
  isActive?: boolean;
}

/** Request body for creating a branch */
model CreateBranchRequest {
  /** Branch code */
  @minLength(1)
  @maxLength(20)
  branchCode: string;

  /** Branch name */
  @minLength(1)
  @maxLength(255)
  branchName: string;

  /** Indonesian name */
  branchNameId?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Email */
  @format("email")
  email?: string;
}

/** Request body for updating a branch */
model UpdateBranchRequest {
  /** Branch name */
  branchName?: string;

  /** Indonesian name */
  branchNameId?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Active status */
  isActive?: boolean;
}

// --- Response Models ---

/** Single organization response */
model OrganizationResponse is SingleResourceResponse<Organization>;

/** Organization list response with pagination */
model OrganizationListResponse is CollectionResponse<Organization>;

/** Single branch response */
model BranchResponse is SingleResourceResponse<Branch>;

/** Branch list response with pagination */
model BranchListResponse is CollectionResponse<Branch>;
