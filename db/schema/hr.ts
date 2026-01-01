import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  numeric,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  employmentTypeEnum,
  employmentStatusEnum,
  leaveTypeEnum,
  leaveStatusEnum,
  payrollStatusEnum,
  attendanceStatusEnum,
  salaryComponentTypeEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";

// ============================================================================
// HR & PAYROLL TABLES
// ============================================================================
// Note: Tables are ordered to avoid forward references
// ============================================================================

/**
 * Departments table
 * Represents organizational departments
 */
export const departments = pgTable(
  "departments",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Department fields
    departmentCode: varchar("department_code", { length: 20 }).notNull(),
    departmentName: varchar("department_name", { length: 255 }).notNull(),
    departmentNameId: varchar("department_name_id", { length: 255 }),
    parentDepartmentId: uuid("parent_department_id"), // Self-reference - FK added via migration
    headId: uuid("head_id"), // References employees - FK constraint added via migration to avoid circular reference
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_department_org_id").on(table.organizationId),
    index("idx_department_branch_id").on(table.branchId),
    uniqueIndex("idx_department_code").on(
      table.organizationId,
      table.departmentCode
    ),
    index("idx_department_parent_id").on(table.parentDepartmentId),
    index("idx_department_active").on(table.isActive),
  ]
);

/**
 * Positions table
 * Represents job positions
 */
export const positions = pgTable(
  "positions",
  {
    ...fullFields,

    // Organization (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // Position fields
    positionCode: varchar("position_code", { length: 20 }).notNull(),
    positionName: varchar("position_name", { length: 255 }).notNull(),
    positionNameId: varchar("position_name_id", { length: 255 }),
    departmentId: uuid("department_id").references(() => departments.id, {
      onDelete: "set null",
    }),
    level: integer("level").default(1), // 1 = staff, 2 = senior, 3 = lead, etc.
    minSalary: numeric("min_salary", { precision: 15, scale: 2 }),
    maxSalary: numeric("max_salary", { precision: 15, scale: 2 }),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_position_org_id").on(table.organizationId),
    uniqueIndex("idx_position_code").on(table.organizationId, table.positionCode),
    index("idx_position_department_id").on(table.departmentId),
    index("idx_position_active").on(table.isActive),
  ]
);

/**
 * Employees table
 * Represents employee records (extends users for HR-specific data)
 */
export const employees = pgTable(
  "employees",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Link to user account
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Employee Information
    employeeNumber: varchar("employee_number", { length: 30 }).notNull(),
    departmentId: uuid("department_id").references(() => departments.id, {
      onDelete: "set null",
    }),
    positionId: uuid("position_id").references(() => positions.id, {
      onDelete: "set null",
    }),
    managerId: uuid("manager_id"), // Self-reference - FK constraint added via migration to avoid circular reference

    // Employment Details
    employmentType: employmentTypeEnum("employment_type").notNull(),
    employmentStatus: employmentStatusEnum("employment_status").default(
      "active"
    ),
    hireDate: date("hire_date").notNull(),
    probationEndDate: date("probation_end_date"),
    contractEndDate: date("contract_end_date"),
    terminationDate: date("termination_date"),
    terminationReason: text("termination_reason"),

    // Compensation
    baseSalary: numeric("base_salary", { precision: 15, scale: 2 }),
    salaryCurrency: varchar("salary_currency", { length: 3 }).default("IDR"),
    bankName: varchar("bank_name", { length: 100 }),
    bankAccountNumber: varchar("bank_account_number", { length: 50 }),
    bankAccountName: varchar("bank_account_name", { length: 255 }),

    // Tax & Social Security
    npwp: varchar("npwp", { length: 20 }), // Tax ID
    bpjsKesehatanNumber: varchar("bpjs_kesehatan_number", { length: 20 }),
    bpjsKetenagakerjaanNumber: varchar("bpjs_ketenagakerjaan_number", {
      length: 20,
    }),

    // Leave Balances
    annualLeaveBalance: integer("annual_leave_balance").default(12),
    sickLeaveBalance: integer("sick_leave_balance").default(12),

    notes: text("notes"),
  },
  (table) => [
    index("idx_employee_org_id").on(table.organizationId),
    index("idx_employee_branch_id").on(table.branchId),
    index("idx_employee_user_id").on(table.userId),
    uniqueIndex("idx_employee_number").on(
      table.organizationId,
      table.employeeNumber
    ),
    index("idx_employee_department_id").on(table.departmentId),
    index("idx_employee_position_id").on(table.positionId),
    index("idx_employee_manager_id").on(table.managerId),
    index("idx_employee_status").on(table.employmentStatus),
  ]
);

/**
 * Salary Components table
 * Represents salary components (allowances, deductions, etc.)
 */
export const salaryComponents = pgTable(
  "salary_components",
  {
    ...fullFields,

    // Organization (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // Component fields
    componentCode: varchar("component_code", { length: 20 }).notNull(),
    componentName: varchar("component_name", { length: 255 }).notNull(),
    componentNameId: varchar("component_name_id", { length: 255 }),
    componentType: salaryComponentTypeEnum("component_type").notNull(),
    isFixed: boolean("is_fixed").default(true), // Fixed or variable
    isTaxable: boolean("is_taxable").default(true),
    defaultAmount: numeric("default_amount", { precision: 15, scale: 2 }),
    defaultPercentage: numeric("default_percentage", { precision: 5, scale: 2 }),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_salary_component_org_id").on(table.organizationId),
    uniqueIndex("idx_salary_component_code").on(
      table.organizationId,
      table.componentCode
    ),
    index("idx_salary_component_type").on(table.componentType),
    index("idx_salary_component_active").on(table.isActive),
  ]
);

/**
 * Employee Salary Components table
 * Represents salary components assigned to employees
 */
export const employeeSalaryComponents = pgTable(
  "employee_salary_components",
  {
    ...fullFields,

    // Employee reference
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id, { onDelete: "cascade" }),
    componentId: uuid("component_id")
      .notNull()
      .references(() => salaryComponents.id, { onDelete: "cascade" }),

    // Amount
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_emp_salary_component_employee_id").on(table.employeeId),
    index("idx_emp_salary_component_component_id").on(table.componentId),
    index("idx_emp_salary_component_effective").on(table.effectiveFrom),
  ]
);

/**
 * Leaves table
 * Represents leave requests
 */
export const leaves = pgTable(
  "leaves",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Employee reference
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id, { onDelete: "cascade" }),

    // Leave fields
    leaveType: leaveTypeEnum("leave_type").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    totalDays: integer("total_days").notNull(),
    reason: text("reason"),
    status: leaveStatusEnum("status").default("pending"),
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    approvedAt: timestamp("approved_at"),
    rejectionReason: text("rejection_reason"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_leave_org_id").on(table.organizationId),
    index("idx_leave_branch_id").on(table.branchId),
    index("idx_leave_employee_id").on(table.employeeId),
    index("idx_leave_type").on(table.leaveType),
    index("idx_leave_status").on(table.status),
    index("idx_leave_dates").on(table.startDate, table.endDate),
  ]
);

/**
 * Attendance table
 * Represents daily attendance records
 */
export const attendance = pgTable(
  "attendance",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Employee reference
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id, { onDelete: "cascade" }),

    // Attendance fields
    attendanceDate: date("attendance_date").notNull(),
    checkInTime: timestamp("check_in_time"),
    checkOutTime: timestamp("check_out_time"),
    workHours: numeric("work_hours", { precision: 5, scale: 2 }),
    overtimeHours: numeric("overtime_hours", { precision: 5, scale: 2 }),
    status: attendanceStatusEnum("status").default("present"),
    leaveId: uuid("leave_id").references(() => leaves.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_attendance_org_id").on(table.organizationId),
    index("idx_attendance_branch_id").on(table.branchId),
    index("idx_attendance_employee_id").on(table.employeeId),
    uniqueIndex("idx_attendance_employee_date").on(
      table.employeeId,
      table.attendanceDate
    ),
    index("idx_attendance_date").on(table.attendanceDate),
    index("idx_attendance_status").on(table.status),
  ]
);

/**
 * Payroll Runs table
 * Represents payroll processing runs
 */
export const payrollRuns = pgTable(
  "payroll_runs",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Payroll run fields
    payrollNumber: varchar("payroll_number", { length: 30 }).notNull(),
    payrollPeriod: varchar("payroll_period", { length: 7 }).notNull(), // YYYY-MM
    periodStartDate: date("period_start_date").notNull(),
    periodEndDate: date("period_end_date").notNull(),
    status: payrollStatusEnum("status").default("draft"),
    totalEmployees: integer("total_employees").default(0),
    totalGrossSalary: numeric("total_gross_salary", {
      precision: 18,
      scale: 2,
    }).default("0"),
    totalDeductions: numeric("total_deductions", {
      precision: 18,
      scale: 2,
    }).default("0"),
    totalNetSalary: numeric("total_net_salary", {
      precision: 18,
      scale: 2,
    }).default("0"),
    processedAt: timestamp("processed_at"),
    processedBy: uuid("processed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    approvedAt: timestamp("approved_at"),
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    paidAt: timestamp("paid_at"),
    paidBy: uuid("paid_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_payroll_run_org_id").on(table.organizationId),
    index("idx_payroll_run_branch_id").on(table.branchId),
    uniqueIndex("idx_payroll_run_number").on(
      table.organizationId,
      table.payrollNumber
    ),
    index("idx_payroll_run_period").on(table.payrollPeriod),
    index("idx_payroll_run_status").on(table.status),
  ]
);

/**
 * Payroll Items table
 * Represents individual employee payroll records
 */
export const payrollItems = pgTable(
  "payroll_items",
  {
    ...fullFields,

    // Payroll run reference
    payrollRunId: uuid("payroll_run_id")
      .notNull()
      .references(() => payrollRuns.id, { onDelete: "cascade" }),

    // Employee reference
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id, { onDelete: "cascade" }),

    // Salary breakdown
    baseSalary: numeric("base_salary", { precision: 15, scale: 2 }).notNull(),
    totalEarnings: numeric("total_earnings", {
      precision: 15,
      scale: 2,
    }).notNull(),
    totalDeductions: numeric("total_deductions", {
      precision: 15,
      scale: 2,
    }).notNull(),
    grossSalary: numeric("gross_salary", { precision: 15, scale: 2 }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 15, scale: 2 }).default("0"),
    netSalary: numeric("net_salary", { precision: 15, scale: 2 }).notNull(),

    // Work days
    workDays: integer("work_days").default(0),
    presentDays: integer("present_days").default(0),
    absentDays: integer("absent_days").default(0),
    leaveDays: integer("leave_days").default(0),
    overtimeHours: numeric("overtime_hours", { precision: 5, scale: 2 }).default(
      "0"
    ),

    // Payment
    isPaid: boolean("is_paid").default(false),
    paidAt: timestamp("paid_at"),
    paymentReference: varchar("payment_reference", { length: 100 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_payroll_item_payroll_run_id").on(table.payrollRunId),
    index("idx_payroll_item_employee_id").on(table.employeeId),
    uniqueIndex("idx_payroll_item_unique").on(
      table.payrollRunId,
      table.employeeId
    ),
    index("idx_payroll_item_paid").on(table.isPaid),
  ]
);

/**
 * Payroll Item Details table
 * Represents individual salary component breakdown per employee
 */
export const payrollItemDetails = pgTable(
  "payroll_item_details",
  {
    ...fullFields,

    // Payroll item reference
    payrollItemId: uuid("payroll_item_id")
      .notNull()
      .references(() => payrollItems.id, { onDelete: "cascade" }),

    // Component reference
    componentId: uuid("component_id")
      .notNull()
      .references(() => salaryComponents.id, { onDelete: "restrict" }),

    // Component details
    componentType: salaryComponentTypeEnum("component_type").notNull(),
    componentName: varchar("component_name", { length: 255 }).notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_payroll_item_detail_payroll_item_id").on(table.payrollItemId),
    index("idx_payroll_item_detail_component_id").on(table.componentId),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [departments.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [departments.branchId],
    references: [organizations.id],
    relationName: "departmentBranch",
  }),
  parentDepartment: one(departments, {
    fields: [departments.parentDepartmentId],
    references: [departments.id],
    relationName: "departmentParent",
  }),
  childDepartments: many(departments, {
    relationName: "departmentParent",
  }),
  head: one(employees, {
    fields: [departments.headId],
    references: [employees.id],
    relationName: "departmentHead",
  }),
  employees: many(employees),
  positions: many(positions),
}));

export const positionsRelations = relations(positions, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [positions.organizationId],
    references: [organizations.id],
  }),
  department: one(departments, {
    fields: [positions.departmentId],
    references: [departments.id],
  }),
  employees: many(employees),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [employees.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [employees.branchId],
    references: [organizations.id],
    relationName: "employeeBranch",
  }),
  user: one(users, {
    fields: [employees.userId],
    references: [users.id],
  }),
  department: one(departments, {
    fields: [employees.departmentId],
    references: [departments.id],
  }),
  position: one(positions, {
    fields: [employees.positionId],
    references: [positions.id],
  }),
  manager: one(employees, {
    fields: [employees.managerId],
    references: [employees.id],
    relationName: "employeeManager",
  }),
  directReports: many(employees, {
    relationName: "employeeManager",
  }),
  headOfDepartments: many(departments, {
    relationName: "departmentHead",
  }),
  salaryComponents: many(employeeSalaryComponents),
  attendance: many(attendance),
  leaves: many(leaves),
  payrollItems: many(payrollItems),
}));

export const salaryComponentsRelations = relations(
  salaryComponents,
  ({ many }) => ({
    employeeSalaryComponents: many(employeeSalaryComponents),
    payrollItemDetails: many(payrollItemDetails),
  })
);

export const employeeSalaryComponentsRelations = relations(
  employeeSalaryComponents,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeSalaryComponents.employeeId],
      references: [employees.id],
    }),
    component: one(salaryComponents, {
      fields: [employeeSalaryComponents.componentId],
      references: [salaryComponents.id],
    }),
  })
);

export const leavesRelations = relations(leaves, ({ one }) => ({
  organization: one(organizations, {
    fields: [leaves.organizationId],
    references: [organizations.id],
  }),
  employee: one(employees, {
    fields: [leaves.employeeId],
    references: [employees.id],
  }),
  approvedByUser: one(users, {
    fields: [leaves.approvedBy],
    references: [users.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  organization: one(organizations, {
    fields: [attendance.organizationId],
    references: [organizations.id],
  }),
  employee: one(employees, {
    fields: [attendance.employeeId],
    references: [employees.id],
  }),
  leave: one(leaves, {
    fields: [attendance.leaveId],
    references: [leaves.id],
  }),
}));

export const payrollRunsRelations = relations(payrollRuns, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [payrollRuns.organizationId],
    references: [organizations.id],
  }),
  items: many(payrollItems),
}));

export const payrollItemsRelations = relations(
  payrollItems,
  ({ one, many }) => ({
    payrollRun: one(payrollRuns, {
      fields: [payrollItems.payrollRunId],
      references: [payrollRuns.id],
    }),
    employee: one(employees, {
      fields: [payrollItems.employeeId],
      references: [employees.id],
    }),
    details: many(payrollItemDetails),
  })
);

export const payrollItemDetailsRelations = relations(
  payrollItemDetails,
  ({ one }) => ({
    payrollItem: one(payrollItems, {
      fields: [payrollItemDetails.payrollItemId],
      references: [payrollItems.id],
    }),
    component: one(salaryComponents, {
      fields: [payrollItemDetails.componentId],
      references: [salaryComponents.id],
    }),
  })
);
