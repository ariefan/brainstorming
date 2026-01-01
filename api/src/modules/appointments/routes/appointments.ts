import type {
  AppointmentListResponse,
  AppointmentResponse,
  CreateAppointmentRequest,
  ErrorResponse,
  UpdateAppointmentRequest,
} from "contracts";
import type { FastifyInstance } from "fastify";
import { handleError } from "../../../lib/errors";
import { createMeta } from "../../../lib/response";
import { requirePermission } from "../../auth/authorization-middleware";
import * as appointmentsService from "../services/appointments.service";

export function appointmentsRoutes(app: FastifyInstance) {
  // List appointments
  app.get<{
    Params: { orgId: string };
    Querystring: {
      page?: number;
      pageSize?: number;
      branchId?: string;
      practitionerId?: string;
      patientId?: string;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    };
  }>(
    "/:orgId/appointments",
    { preHandler: [requirePermission("appointments", "read")] },
    async (request): Promise<AppointmentListResponse> => {
      const result = await appointmentsService.listAppointments(request.params.orgId, {
        page: request.query.page ?? 1,
        pageSize: Math.min(request.query.pageSize ?? 50, 100),
        ...request.query,
      });

      return {
        data: result.appointments,
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

  // Create appointment
  app.post<{
    Params: { orgId: string };
    Body: CreateAppointmentRequest;
  }>(
    "/:orgId/appointments",
    { preHandler: [requirePermission("appointments", "create")] },
    async (request, reply): Promise<AppointmentResponse | ErrorResponse> => {
      try {
        const appointment = await appointmentsService.createAppointment(
          request.params.orgId,
          request.body
        );
        reply.status(201);
        return { data: appointment, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Get appointment
  app.get<{ Params: { orgId: string; appointmentId: string } }>(
    "/:orgId/appointments/:appointmentId",
    { preHandler: [requirePermission("appointments", "read")] },
    async (request, reply): Promise<AppointmentResponse | ErrorResponse> => {
      try {
        const appointment = await appointmentsService.getAppointmentById(
          request.params.appointmentId,
          request.params.orgId
        );
        return { data: appointment, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Update appointment
  app.patch<{
    Params: { orgId: string; appointmentId: string };
    Body: UpdateAppointmentRequest;
  }>(
    "/:orgId/appointments/:appointmentId",
    { preHandler: [requirePermission("appointments", "update")] },
    async (request, reply): Promise<AppointmentResponse | ErrorResponse> => {
      try {
        const appointment = await appointmentsService.updateAppointment(
          request.params.appointmentId,
          request.params.orgId,
          request.body
        );
        return { data: appointment, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Cancel appointment
  app.post<{ Params: { orgId: string; appointmentId: string } }>(
    "/:orgId/appointments/:appointmentId/cancel",
    { preHandler: [requirePermission("appointments", "update")] },
    async (request, reply): Promise<AppointmentResponse | ErrorResponse> => {
      try {
        const appointment = await appointmentsService.cancelAppointment(
          request.params.appointmentId,
          request.params.orgId
        );
        return { data: appointment, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );

  // Check-in appointment
  app.post<{ Params: { orgId: string; appointmentId: string } }>(
    "/:orgId/appointments/:appointmentId/check-in",
    { preHandler: [requirePermission("appointments", "update")] },
    async (request, reply): Promise<AppointmentResponse | ErrorResponse> => {
      try {
        const appointment = await appointmentsService.checkInAppointment(
          request.params.appointmentId,
          request.params.orgId
        );
        return { data: appointment, meta: createMeta(request.id) };
      } catch (error) {
        const { statusCode, response } = handleError(error, request.id);
        reply.status(statusCode);
        return response;
      }
    }
  );
}
