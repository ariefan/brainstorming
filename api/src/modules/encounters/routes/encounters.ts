import type {
  CreateEncounterRequest,
  EncounterListResponse,
  EncounterResponse,
  ErrorResponse,
  UpdateEncounterRequest,
} from "contracts";
import type { FastifyInstance } from "fastify";
import { handleError } from "../../../lib/errors";
import { createMeta } from "../../../lib/response";
import { requirePermission } from "../../auth/authorization-middleware";
import * as encountersService from "../services/encounters.service";

export function encountersRoutes(app: FastifyInstance) {
  // List encounters
  app.get<{
    Params: { orgId: string };
    Querystring: {
      page?: number;
      pageSize?: number;
      branchId?: string;
      practitionerId?: string;
      patientId?: string;
      status?: string;
      encounterClass?: string;
      dateFrom?: string;
      dateTo?: string;
    };
  }>(
    "/:orgId/encounters",
    { preHandler: [requirePermission("encounters", "read")] },
    async (request): Promise<EncounterListResponse> => {
      const result = await encountersService.listEncounters(request.params.orgId, {
        page: request.query.page ?? 1,
        pageSize: Math.min(request.query.pageSize ?? 50, 100),
        ...request.query,
      });

      return {
        data: result.encounters,
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

  // Create encounter
  app.post<{ Params: { orgId: string }; Body: CreateEncounterRequest }>(
    "/:orgId/encounters",
    { preHandler: [requirePermission("encounters", "create")] },
    async (request, reply): Promise<EncounterResponse | ErrorResponse> => {
      try {
        const encounter = await encountersService.createEncounter(request.params.orgId, request.body);
        reply.status(201);
        return { data: encounter, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Get encounter
  app.get<{ Params: { orgId: string; encounterId: string } }>(
    "/:orgId/encounters/:encounterId",
    { preHandler: [requirePermission("encounters", "read")] },
    async (request, reply): Promise<EncounterResponse | ErrorResponse> => {
      try {
        const encounter = await encountersService.getEncounterById(request.params.encounterId, request.params.orgId);
        return { data: encounter, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Update encounter
  app.patch<{ Params: { orgId: string; encounterId: string }; Body: UpdateEncounterRequest }>(
    "/:orgId/encounters/:encounterId",
    { preHandler: [requirePermission("encounters", "update")] },
    async (request, reply): Promise<EncounterResponse | ErrorResponse> => {
      try {
        const encounter = await encountersService.updateEncounter(
          request.params.encounterId,
          request.params.orgId,
          request.body
        );
        return { data: encounter, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Complete encounter
  app.post<{ Params: { orgId: string; encounterId: string } }>(
    "/:orgId/encounters/:encounterId/complete",
    { preHandler: [requirePermission("encounters", "update")] },
    async (request, reply): Promise<EncounterResponse | ErrorResponse> => {
      try {
        const encounter = await encountersService.completeEncounter(request.params.encounterId, request.params.orgId);
        return { data: encounter, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Cancel encounter
  app.post<{ Params: { orgId: string; encounterId: string } }>(
    "/:orgId/encounters/:encounterId/cancel",
    { preHandler: [requirePermission("encounters", "update")] },
    async (request, reply): Promise<EncounterResponse | ErrorResponse> => {
      try {
        const encounter = await encountersService.cancelEncounter(request.params.encounterId, request.params.orgId);
        return { data: encounter, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );
}
