/**
 * ============================================================================
 * ORGANIZATIONS API - Organization and Branch Management
 * ============================================================================
 *
 * Multi-tenant organization management with:
 * - Organizations (clinics/hospitals)
 * - Branches
 * - Settings per organization
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/organization.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ORGANIZATIONS
// ============================================================================

/**
 * Organizations API
 *
 * Manage healthcare organizations (clinics, hospitals)
 */
@route("/v1/organizations")
@tag("Organizations")
interface Organizations {
  /**
   * List all organizations
   */
  @get
  @summary("List organizations")
  list(
    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by type */
    @query type?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name */
    @query search?: string
  ): OrganizationListResponse | ErrorResponse;

  /**
   * Create a new organization
   */
  @post
  @summary("Create organization")
  create(
    @body body: CreateOrganizationRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: OrganizationResponse;
      }
    | ErrorResponse;

  /**
   * Get organization by ID
   */
  @route("/{orgId}")
  @get
  @summary("Get organization")
  get(
    @path orgId: string
  ): OrganizationResponse | ErrorResponse;

  /**
   * Update organization
   */
  @route("/{orgId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update organization")
  update(
    @path orgId: string,
    @body body: UpdateOrganizationRequest
  ): OrganizationResponse | ErrorResponse;

  /**
   * Delete organization
   */
  @route("/{orgId}")
  @delete
  @summary("Delete organization")
  delete(
    @path orgId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// BRANCHES
// ============================================================================

/**
 * Branches API
 *
 * Manage branches within an organization
 */
@route("/v1/orgs/{orgId}/branches")
@tag("Organizations")
interface Branches {
  /**
   * List branches in an organization
   */
  @get
  @summary("List branches")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name */
    @query search?: string
  ): BranchListResponse | ErrorResponse;

  /**
   * Create a new branch
   */
  @post
  @summary("Create branch")
  create(
    @path orgId: string,
    @body body: CreateBranchRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: BranchResponse;
      }
    | ErrorResponse;

  /**
   * Get branch by ID
   */
  @route("/{branchId}")
  @get
  @summary("Get branch")
  get(
    @path orgId: string,
    @path branchId: string
  ): BranchResponse | ErrorResponse;

  /**
   * Update branch
   */
  @route("/{branchId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update branch")
  update(
    @path orgId: string,
    @path branchId: string,
    @body body: UpdateBranchRequest
  ): BranchResponse | ErrorResponse;

  /**
   * Delete branch
   */
  @route("/{branchId}")
  @delete
  @summary("Delete branch")
  delete(
    @path orgId: string,
    @path branchId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}
