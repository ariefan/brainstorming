import type {
  CreatePractitionerRequest,
  ErrorResponse,
  Practitioner,
  PractitionerListResponse,
  PractitionerResponse,
  UpdatePractitionerRequest,
} from "contracts";
import type { FastifyInstance } from "fastify";
import { handleError } from "../../../lib/errors";
import { createMeta } from "../../../lib/response";
import { requirePermission } from "../../auth/authorization-middleware";
import * as practitionersService from "../services/practitioners.service";

export function practitionersRoutes(app: FastifyInstance) {
  // List practitioners
  app.get<{
    Params: { orgId: string };
    Querystring: {
      page?: number;
      pageSize?: number;
      branchId?: string;
      practitionerType?: string;
      specialty?: string;
      isActive?: boolean;
      search?: string;
    };
  }>(
    "/:orgId/practitioners",
    { preHandler: [requirePermission("practitioners", "read")] },
    async (request): Promise<PractitionerListResponse> => {
      const { orgId } = request.params;
      const page = request.query.page ?? 1;
      const pageSize = Math.min(request.query.pageSize ?? 50, 100);

      const result = await practitionersService.listPractitioners(orgId, {
        page,
        pageSize,
        branchId: request.query.branchId,
        practitionerType: request.query.practitionerType,
        specialty: request.query.specialty,
        isActive: request.query.isActive,
        search: request.query.search,
      });

      return {
        data: result.practitioners as Practitioner[],
        pagination: {
          page: result.page,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          hasNext: result.hasNext,
          hasPrevious: result.hasPrevious,
        },
        meta: createMeta(request.id),
      };
    }
  );

  // Create practitioner
  app.post<{
    Params: { orgId: string };
    Body: CreatePractitionerRequest;
  }>(
    "/:orgId/practitioners",
    { preHandler: [requirePermission("practitioners", "create")] },
    async (request, reply): Promise<PractitionerResponse | ErrorResponse> => {
      try {
        const practitioner = await practitionersService.createPractitioner(
          request.params.orgId,
          request.body
        );
        reply.status(201);
        reply.header(
          "Location",
          `/v1/orgs/${request.params.orgId}/practitioners/${practitioner.id}`
        );
        return { data: practitioner, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Get practitioner by ID
  app.get<{
    Params: { orgId: string; practitionerId: string };
  }>(
    "/:orgId/practitioners/:practitionerId",
    { preHandler: [requirePermission("practitioners", "read")] },
    async (request, reply): Promise<PractitionerResponse | ErrorResponse> => {
      try {
        const practitioner = await practitionersService.getPractitionerById(
          request.params.practitionerId,
          request.params.orgId
        );
        return { data: practitioner, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Update practitioner
  app.patch<{
    Params: { orgId: string; practitionerId: string };
    Body: UpdatePractitionerRequest;
  }>(
    "/:orgId/practitioners/:practitionerId",
    { preHandler: [requirePermission("practitioners", "update")] },
    async (request, reply): Promise<PractitionerResponse | ErrorResponse> => {
      try {
        const practitioner = await practitionersService.updatePractitioner(
          request.params.practitionerId,
          request.params.orgId,
          request.body
        );
        return { data: practitioner, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Delete practitioner
  app.delete<{
    Params: { orgId: string; practitionerId: string };
  }>(
    "/:orgId/practitioners/:practitionerId",
    { preHandler: [requirePermission("practitioners", "delete")] },
    async (request, reply) => {
      try {
        await practitionersService.deletePractitioner(
          request.params.practitionerId,
          request.params.orgId
        );
        reply.status(204);
        return;
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );
}
