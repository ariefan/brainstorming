import type {
  CreatePatientRequest,
  ErrorResponse,
  Patient,
  PatientListResponse,
  PatientResponse,
  UpdatePatientRequest,
} from "contracts";
import type { FastifyInstance } from "fastify";
import { handleError } from "../../../lib/errors";
import { createMeta } from "../../../lib/response";
import { requirePermission } from "../../auth/authorization-middleware";
import * as patientsService from "../services/patients.service";

export function patientsRoutes(app: FastifyInstance) {
  // List patients
  app.get<{
    Params: { orgId: string };
    Querystring: {
      page?: number;
      pageSize?: number;
      branchId?: string;
      isActive?: boolean;
      search?: string;
      hasBpjs?: boolean;
    };
  }>(
    "/:orgId/patients",
    { preHandler: [requirePermission("patients", "read")] },
    async (request): Promise<PatientListResponse> => {
      const { orgId } = request.params;
      const page = request.query.page ?? 1;
      const pageSize = Math.min(request.query.pageSize ?? 50, 100);

      const result = await patientsService.listPatients(orgId, {
        page,
        pageSize,
        branchId: request.query.branchId,
        isActive: request.query.isActive,
        search: request.query.search,
        hasBpjs: request.query.hasBpjs,
      });

      return {
        data: result.patients as Patient[],
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

  // Create patient
  app.post<{
    Params: { orgId: string };
    Body: CreatePatientRequest;
  }>(
    "/:orgId/patients",
    { preHandler: [requirePermission("patients", "create")] },
    async (request, reply): Promise<PatientResponse | ErrorResponse> => {
      try {
        const patient = await patientsService.createPatient(
          request.params.orgId,
          request.body
        );
        reply.status(201);
        reply.header(
          "Location",
          `/v1/orgs/${request.params.orgId}/patients/${patient.id}`
        );
        return { data: patient, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Search by NIK
  app.get<{
    Params: { orgId: string };
    Querystring: { nik: string };
  }>(
    "/:orgId/patients/search-by-nik",
    { preHandler: [requirePermission("patients", "read")] },
    async (request, reply): Promise<PatientResponse | ErrorResponse> => {
      try {
        const patient = await patientsService.searchPatientByNik(
          request.query.nik,
          request.params.orgId
        );
        return { data: patient, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Search by BPJS number
  app.get<{
    Params: { orgId: string };
    Querystring: { bpjsNumber: string };
  }>(
    "/:orgId/patients/search-by-bpjs",
    { preHandler: [requirePermission("patients", "read")] },
    async (request, reply): Promise<PatientResponse | ErrorResponse> => {
      try {
        const patient = await patientsService.searchPatientByBpjs(
          request.query.bpjsNumber,
          request.params.orgId
        );
        return { data: patient, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Get patient by ID
  app.get<{
    Params: { orgId: string; patientId: string };
  }>(
    "/:orgId/patients/:patientId",
    { preHandler: [requirePermission("patients", "read")] },
    async (request, reply): Promise<PatientResponse | ErrorResponse> => {
      try {
        const patient = await patientsService.getPatientById(
          request.params.patientId,
          request.params.orgId
        );
        return { data: patient, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Update patient
  app.patch<{
    Params: { orgId: string; patientId: string };
    Body: UpdatePatientRequest;
  }>(
    "/:orgId/patients/:patientId",
    { preHandler: [requirePermission("patients", "update")] },
    async (request, reply): Promise<PatientResponse | ErrorResponse> => {
      try {
        const patient = await patientsService.updatePatient(
          request.params.patientId,
          request.params.orgId,
          request.body
        );
        return { data: patient, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Delete patient
  app.delete<{
    Params: { orgId: string; patientId: string };
  }>(
    "/:orgId/patients/:patientId",
    { preHandler: [requirePermission("patients", "delete")] },
    async (request, reply) => {
      try {
        await patientsService.deletePatient(
          request.params.patientId,
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
