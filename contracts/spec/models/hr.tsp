import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// HR/PAYROLL MODELS
// ============================================================================
// Employee management, attendance, leave, and payroll
// ============================================================================

// --- Department ---

/**
 * Department - Organizational unit
 */
model Department {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Department code */
  departmentCode: string;

  /** Department name */
  departmentName: string;

  /** Department name (Indonesian) */
  departmentNameId?: string;

  /** Parent department ID */
  parentDepartmentId?: string;

  /** Department head employee ID */
  headId?: string;

  /** Is active */
  isActive: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Employee ---

/**
 * Employee - Staff member record
 */
model Employee {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** User ID (linked account) */
  userId: string;

  /** Employee number */
  employeeNumber: string;

  /** Full name */
  fullName: string;

  /** Email */
  email: string;

  /** Phone */
  phone?: string;

  /** Date of birth */
  dateOfBirth?: plainDate;

  /** Gender */
  gender?: Gender;

  /** Department ID */
  departmentId?: string;

  /** Job title */
  jobTitle?: string;

  /** Employment type */
  employmentType: EmploymentType;

  /** Employment status */
  employmentStatus: EmploymentStatus;

  /** Hire date */
  hireDate: plainDate;

  /** Termination date */
  terminationDate?: plainDate;

  /** Supervisor employee ID */
  supervisorId?: string;

  /** Base salary */
  baseSalary?: float64;

  /** Bank name */
  bankName?: string;

  /** Bank account number */
  bankAccountNumber?: string;

  /** Tax ID (NPWP) */
  taxId?: string;

  /** BPJS Kesehatan number */
  bpjsKesehatanNumber?: string;

  /** BPJS Ketenagakerjaan number */
  bpjsKetenagakerjaanNumber?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Leave ---

/**
 * Leave - Employee leave request
 */
model Leave {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Employee ID */
  employeeId: string;

  /** Leave type */
  leaveType: LeaveType;

  /** Start date */
  startDate: plainDate;

  /** End date */
  endDate: plainDate;

  /** Total days */
  totalDays: int32;

  /** Reason */
  reason?: string;

  /** Status */
  status: LeaveStatus;

  /** Approved by employee ID */
  approvedBy?: string;

  /** Approved at */
  approvedAt?: utcDateTime;

  /** Rejection reason */
  rejectionReason?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Attendance ---

/**
 * Attendance - Daily attendance record
 */
model Attendance {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Employee ID */
  employeeId: string;

  /** Attendance date */
  attendanceDate: plainDate;

  /** Check-in time */
  checkInTime?: utcDateTime;

  /** Check-out time */
  checkOutTime?: utcDateTime;

  /** Work hours */
  workHours?: float64;

  /** Overtime hours */
  overtimeHours?: float64;

  /** Status */
  status: AttendanceStatus;

  /** Notes */
  notes?: string;

  /** Location (for mobile check-in) */
  checkInLocation?: string;

  /** Check-out location */
  checkOutLocation?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Payroll Run ---

/**
 * Payroll Run - Monthly payroll batch
 */
model PayrollRun {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Payroll number */
  payrollNumber: string;

  /** Payroll period (YYYY-MM) */
  payrollPeriod: string;

  /** Period start date */
  periodStartDate: plainDate;

  /** Period end date */
  periodEndDate: plainDate;

  /** Status */
  status: PayrollStatus;

  /** Total employees */
  totalEmployees: int32;

  /** Total gross */
  totalGross: float64;

  /** Total deductions */
  totalDeductions: float64;

  /** Total net */
  totalNet: float64;

  /** Approved by employee ID */
  approvedBy?: string;

  /** Approved at */
  approvedAt?: utcDateTime;

  /** Processed at */
  processedAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Payroll Item ---

/**
 * Payroll Item - Individual employee payroll
 */
model PayrollItem {
  /** Unique identifier */
  id: string;

  /** Payroll run ID */
  payrollRunId: string;

  /** Employee ID */
  employeeId: string;

  /** Employee name */
  employeeName: string;

  /** Base salary */
  baseSalary: float64;

  /** Allowances */
  allowances: float64;

  /** Overtime pay */
  overtimePay: float64;

  /** Gross salary */
  grossSalary: float64;

  /** Tax deduction */
  taxDeduction: float64;

  /** BPJS Kesehatan deduction */
  bpjsKesehatanDeduction: float64;

  /** BPJS Ketenagakerjaan deduction */
  bpjsKetenagakerjaanDeduction: float64;

  /** Other deductions */
  otherDeductions: float64;

  /** Net salary */
  netSalary: float64;

  /** When created */
  createdAt: utcDateTime;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create department request */
model CreateDepartmentRequest {
  /** Branch ID */
  branchId?: string;

  /** Department code */
  @minLength(1)
  departmentCode: string;

  /** Department name */
  @minLength(1)
  departmentName: string;

  /** Department name (Indonesian) */
  departmentNameId?: string;

  /** Parent department ID */
  parentDepartmentId?: string;

  /** Head employee ID */
  headId?: string;
}

/** Update department request */
model UpdateDepartmentRequest {
  /** Department name */
  departmentName?: string;

  /** Department name (Indonesian) */
  departmentNameId?: string;

  /** Parent department ID */
  parentDepartmentId?: string;

  /** Head employee ID */
  headId?: string;

  /** Is active */
  isActive?: boolean;
}

/** Create employee request */
model CreateEmployeeRequest {
  /** Branch ID */
  branchId?: string;

  /** User ID */
  userId: string;

  /** Employee number */
  @minLength(1)
  employeeNumber: string;

  /** Full name */
  @minLength(1)
  fullName: string;

  /** Email */
  email: string;

  /** Phone */
  phone?: string;

  /** Date of birth */
  dateOfBirth?: plainDate;

  /** Gender */
  gender?: Gender;

  /** Department ID */
  departmentId?: string;

  /** Job title */
  jobTitle?: string;

  /** Employment type */
  employmentType: EmploymentType;

  /** Hire date */
  hireDate: plainDate;

  /** Supervisor ID */
  supervisorId?: string;

  /** Base salary */
  baseSalary?: float64;
}

/** Update employee request */
model UpdateEmployeeRequest {
  /** Full name */
  fullName?: string;

  /** Phone */
  phone?: string;

  /** Department ID */
  departmentId?: string;

  /** Job title */
  jobTitle?: string;

  /** Employment type */
  employmentType?: EmploymentType;

  /** Employment status */
  employmentStatus?: EmploymentStatus;

  /** Supervisor ID */
  supervisorId?: string;

  /** Base salary */
  baseSalary?: float64;

  /** Bank name */
  bankName?: string;

  /** Bank account number */
  bankAccountNumber?: string;

  /** Tax ID */
  taxId?: string;

  /** BPJS Kesehatan number */
  bpjsKesehatanNumber?: string;

  /** BPJS Ketenagakerjaan number */
  bpjsKetenagakerjaanNumber?: string;
}

/** Create leave request */
model CreateLeaveRequest {
  /** Employee ID */
  employeeId: string;

  /** Leave type */
  leaveType: LeaveType;

  /** Start date */
  startDate: plainDate;

  /** End date */
  endDate: plainDate;

  /** Reason */
  reason?: string;
}

/** Approve/reject leave request */
model LeaveApprovalRequest {
  /** Action */
  action: "approve" | "reject";

  /** Rejection reason (required if rejecting) */
  rejectionReason?: string;
}

/** Record attendance request */
model RecordAttendanceRequest {
  /** Employee ID */
  employeeId: string;

  /** Action */
  action: "checkIn" | "checkOut";

  /** Location */
  location?: string;

  /** Notes */
  notes?: string;
}

/** Create payroll run request */
model CreatePayrollRunRequest {
  /** Branch ID */
  branchId?: string;

  /** Payroll period (YYYY-MM) */
  @minLength(7)
  @maxLength(7)
  payrollPeriod: string;

  /** Period start date */
  periodStartDate: plainDate;

  /** Period end date */
  periodEndDate: plainDate;
}

/** Approve payroll request */
model ApprovePayrollRequest {
  /** Notes */
  notes?: string;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** Department response */
model DepartmentResponse is SingleResourceResponse<Department>;

/** Department list response */
model DepartmentListResponse is CollectionResponse<Department>;

/** Employee response */
model EmployeeResponse is SingleResourceResponse<Employee>;

/** Employee list response */
model EmployeeListResponse is CollectionResponse<Employee>;

/** Leave response */
model LeaveResponse is SingleResourceResponse<Leave>;

/** Leave list response */
model LeaveListResponse is CollectionResponse<Leave>;

/** Attendance response */
model AttendanceResponse is SingleResourceResponse<Attendance>;

/** Attendance list response */
model AttendanceListResponse is CollectionResponse<Attendance>;

/** Payroll run response */
model PayrollRunResponse is SingleResourceResponse<PayrollRun>;

/** Payroll run list response */
model PayrollRunListResponse is CollectionResponse<PayrollRun>;

/** Payroll item response */
model PayrollItemResponse is SingleResourceResponse<PayrollItem>;

/** Payroll item list response */
model PayrollItemListResponse is CollectionResponse<PayrollItem>;
