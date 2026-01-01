/**
 * ============================================================================
 * HR/PAYROLL API ROUTES
 * ============================================================================
 *
 * Human resources management:
 * - Departments
 * - Employees
 * - Leave management
 * - Attendance
 * - Payroll
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/hr.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// DEPARTMENTS
// ============================================================================

/**
 * Department API
 */
@route("/v1/orgs/{orgId}/hr/departments")
@tag("HR")
interface Departments {
  /**
   * List departments
   */
  @get
  @summary("List departments")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by parent department */
    @query parentDepartmentId?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): DepartmentListResponse | ErrorResponse;

  /**
   * Create department
   */
  @post
  @summary("Create department")
  create(
    @path orgId: string,
    @body body: CreateDepartmentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: DepartmentResponse;
      }
    | ErrorResponse;

  /**
   * Get department
   */
  @route("/{departmentId}")
  @get
  @summary("Get department")
  get(
    @path orgId: string,
    @path departmentId: string
  ): DepartmentResponse | ErrorResponse;

  /**
   * Update department
   */
  @route("/{departmentId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update department")
  update(
    @path orgId: string,
    @path departmentId: string,
    @body body: UpdateDepartmentRequest
  ): DepartmentResponse | ErrorResponse;

  /**
   * Delete department
   */
  @route("/{departmentId}")
  @delete
  @summary("Delete department")
  delete(
    @path orgId: string,
    @path departmentId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// EMPLOYEES
// ============================================================================

/**
 * Employee API
 */
@route("/v1/orgs/{orgId}/hr/employees")
@tag("HR")
interface Employees {
  /**
   * List employees
   */
  @get
  @summary("List employees")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by department */
    @query departmentId?: string,

    /** Filter by employment type */
    @query employmentType?: string,

    /** Filter by employment status */
    @query employmentStatus?: string,

    /** Search by name or employee number */
    @query search?: string
  ): EmployeeListResponse | ErrorResponse;

  /**
   * Create employee
   */
  @post
  @summary("Create employee")
  create(
    @path orgId: string,
    @body body: CreateEmployeeRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: EmployeeResponse;
      }
    | ErrorResponse;

  /**
   * Get employee
   */
  @route("/{employeeId}")
  @get
  @summary("Get employee")
  get(
    @path orgId: string,
    @path employeeId: string
  ): EmployeeResponse | ErrorResponse;

  /**
   * Update employee
   */
  @route("/{employeeId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update employee")
  update(
    @path orgId: string,
    @path employeeId: string,
    @body body: UpdateEmployeeRequest
  ): EmployeeResponse | ErrorResponse;

  /**
   * Terminate employee
   */
  @route("/{employeeId}/terminate")
  @post
  @summary("Terminate employee")
  terminate(
    @path orgId: string,
    @path employeeId: string
  ): EmployeeResponse | ErrorResponse;
}

// ============================================================================
// LEAVE
// ============================================================================

/**
 * Leave API
 */
@route("/v1/orgs/{orgId}/hr/leaves")
@tag("HR")
interface Leaves {
  /**
   * List leaves
   */
  @get
  @summary("List leave requests")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by employee */
    @query employeeId?: string,

    /** Filter by leave type */
    @query leaveType?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): LeaveListResponse | ErrorResponse;

  /**
   * Create leave request
   */
  @post
  @summary("Create leave request")
  create(
    @path orgId: string,
    @body body: CreateLeaveRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: LeaveResponse;
      }
    | ErrorResponse;

  /**
   * Get leave request
   */
  @route("/{leaveId}")
  @get
  @summary("Get leave request")
  get(
    @path orgId: string,
    @path leaveId: string
  ): LeaveResponse | ErrorResponse;

  /**
   * Approve/reject leave request
   */
  @route("/{leaveId}/approval")
  @post
  @summary("Approve or reject leave request")
  approval(
    @path orgId: string,
    @path leaveId: string,
    @body body: LeaveApprovalRequest
  ): LeaveResponse | ErrorResponse;

  /**
   * Cancel leave request
   */
  @route("/{leaveId}/cancel")
  @post
  @summary("Cancel leave request")
  cancel(
    @path orgId: string,
    @path leaveId: string
  ): LeaveResponse | ErrorResponse;
}

// ============================================================================
// ATTENDANCE
// ============================================================================

/**
 * Attendance API
 */
@route("/v1/orgs/{orgId}/hr/attendance")
@tag("HR")
interface AttendanceRecords {
  /**
   * List attendance records
   */
  @get
  @summary("List attendance records")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by employee */
    @query employeeId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): AttendanceListResponse | ErrorResponse;

  /**
   * Record attendance (check-in/check-out)
   */
  @post
  @summary("Record attendance")
  create(
    @path orgId: string,
    @body body: RecordAttendanceRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: AttendanceResponse;
      }
    | ErrorResponse;

  /**
   * Get attendance record
   */
  @route("/{attendanceId}")
  @get
  @summary("Get attendance record")
  get(
    @path orgId: string,
    @path attendanceId: string
  ): AttendanceResponse | ErrorResponse;
}

// ============================================================================
// PAYROLL
// ============================================================================

/**
 * Payroll API
 */
@route("/v1/orgs/{orgId}/hr/payroll")
@tag("HR")
interface PayrollRuns {
  /**
   * List payroll runs
   */
  @get
  @summary("List payroll runs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by period */
    @query payrollPeriod?: string,

    /** Filter by status */
    @query status?: string
  ): PayrollRunListResponse | ErrorResponse;

  /**
   * Create payroll run
   */
  @post
  @summary("Create payroll run")
  create(
    @path orgId: string,
    @body body: CreatePayrollRunRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PayrollRunResponse;
      }
    | ErrorResponse;

  /**
   * Get payroll run
   */
  @route("/{payrollId}")
  @get
  @summary("Get payroll run")
  get(
    @path orgId: string,
    @path payrollId: string
  ): PayrollRunResponse | ErrorResponse;

  /**
   * Calculate payroll
   */
  @route("/{payrollId}/calculate")
  @post
  @summary("Calculate payroll for all employees")
  calculate(
    @path orgId: string,
    @path payrollId: string
  ): PayrollRunResponse | ErrorResponse;

  /**
   * Approve payroll
   */
  @route("/{payrollId}/approve")
  @post
  @summary("Approve payroll run")
  approve(
    @path orgId: string,
    @path payrollId: string,
    @body body: ApprovePayrollRequest
  ): PayrollRunResponse | ErrorResponse;

  /**
   * Process payroll (mark as paid)
   */
  @route("/{payrollId}/process")
  @post
  @summary("Process payroll payment")
  process(
    @path orgId: string,
    @path payrollId: string
  ): PayrollRunResponse | ErrorResponse;

  /**
   * Get payroll items
   */
  @route("/{payrollId}/items")
  @get
  @summary("Get payroll items for a run")
  getItems(
    @path orgId: string,
    @path payrollId: string
  ): PayrollItemListResponse | ErrorResponse;
}
