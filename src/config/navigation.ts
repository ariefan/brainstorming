// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================
// Centralized navigation structure for the clinic management system
// All menu items, permissions, quick actions, and badges defined here
// ============================================================================

// ----------------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------------

export type UserRole =
  | "owner"
  | "admin"
  | "doctor"
  | "nurse"
  | "midwife"
  | "pharmacist"
  | "lab_tech"
  | "front_desk"
  | "cashier"
  | "hr";

export type IconName =
  | "LayoutDashboard"
  | "Users"
  | "Calendar"
  | "Stethoscope"
  | "FlaskConical"
  | "Pill"
  | "Bed"
  | "CreditCard"
  | "BarChart3"
  | "UserCog"
  | "Settings"
  | "Plus"
  | "UserPlus"
  | "ClipboardCheck"
  | "Activity"
  | "FileText"
  | "Scan"
  | "Package"
  | "TestTube"
  | "Receipt"
  | "Wallet";

export interface NavItem {
  id: string;
  label: string;
  labelId?: string; // Indonesian label
  icon: IconName;
  path: string;
  roles: UserRole[] | "all";
  featureFlag?: string;
  badge?: string;
  children?: NavChild[];
}

export interface NavChild {
  id: string;
  label: string;
  labelId?: string;
  path: string;
  roles: UserRole[] | "all";
  isSection?: boolean; // For grouping headers
}

export interface QuickAction {
  id: string;
  label: string;
  labelId?: string;
  icon: IconName;
  path: string;
  color?: string;
}

export interface BadgeConfig {
  query: string;
  color: "blue" | "green" | "orange" | "red" | "gray";
  threshold?: number; // Show badge only if count > threshold
}

// ----------------------------------------------------------------------------
// MAIN NAVIGATION
// ----------------------------------------------------------------------------

export const mainNavigation: NavItem[] = [
  // 1. Dashboard
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
    roles: "all",
  },

  // 2. Patients
  {
    id: "patients",
    label: "Patients",
    labelId: "Pasien",
    icon: "Users",
    path: "/patients",
    roles: ["owner", "admin", "doctor", "nurse", "midwife", "front_desk"],
    children: [
      { id: "patient-list", label: "All Patients", labelId: "Semua Pasien", path: "/patients", roles: "all" },
      { id: "patient-new", label: "New Patient", labelId: "Pasien Baru", path: "/patients/new", roles: ["front_desk", "nurse", "admin"] },
    ],
  },

  // 3. Appointments
  {
    id: "appointments",
    label: "Appointments",
    labelId: "Jadwal",
    icon: "Calendar",
    path: "/appointments",
    roles: ["owner", "admin", "doctor", "nurse", "midwife", "front_desk"],
    badge: "todayAppointments",
    children: [
      { id: "appointments-calendar", label: "Calendar View", labelId: "Kalender", path: "/appointments/calendar", roles: "all" },
      { id: "appointments-today", label: "Today's List", labelId: "Hari Ini", path: "/appointments/today", roles: "all" },
      { id: "appointments-new", label: "New Appointment", labelId: "Buat Jadwal", path: "/appointments/new", roles: ["front_desk", "admin"] },
      { id: "appointments-queue", label: "Queue Board", labelId: "Antrian", path: "/appointments/queue", roles: "all" },
      { id: "appointments-checkin", label: "Check-in", path: "/appointments/checkin", roles: ["front_desk"] },
      { id: "appointments-schedules", label: "Practitioner Schedule", labelId: "Jadwal Dokter", path: "/appointments/schedules", roles: ["admin"] },
    ],
  },

  // 4. Clinical
  {
    id: "clinical",
    label: "Clinical",
    labelId: "Klinis",
    icon: "Stethoscope",
    path: "/clinical",
    roles: ["doctor", "nurse", "midwife"],
    children: [
      // Encounters section
      { id: "encounters-header", label: "Encounters", labelId: "Kunjungan", path: "", roles: "all", isSection: true },
      { id: "encounters-active", label: "Active Encounters", labelId: "Kunjungan Aktif", path: "/clinical/encounters", roles: ["doctor", "nurse"] },
      { id: "encounters-new", label: "Start Encounter", labelId: "Mulai Kunjungan", path: "/clinical/encounters/new", roles: ["doctor"] },

      // Assessments section
      { id: "assessments-header", label: "Assessments", labelId: "Kajian", path: "", roles: "all", isSection: true },
      { id: "assessments-initial", label: "Initial Assessment", labelId: "Kajian Awal", path: "/clinical/assessments", roles: ["nurse"] },
      { id: "assessments-nursing", label: "Nursing Assessment", labelId: "Kajian Keperawatan", path: "/clinical/assessments/nursing", roles: ["nurse"] },
      { id: "assessments-pediatric", label: "Pediatric", labelId: "Anak", path: "/clinical/assessments/pediatric", roles: ["nurse", "doctor"] },
      { id: "assessments-obstetric", label: "Obstetric", labelId: "Kebidanan", path: "/clinical/assessments/obstetric", roles: ["midwife"] },
      { id: "assessments-geriatric", label: "Geriatric", labelId: "Geriatri", path: "/clinical/assessments/geriatric", roles: ["nurse"] },

      // Clinical Records section
      { id: "records-header", label: "Clinical Records", labelId: "Rekam Medis", path: "", roles: "all", isSection: true },
      { id: "vitals", label: "Vital Signs", labelId: "Tanda Vital", path: "/clinical/vitals", roles: ["nurse"] },
      { id: "diagnoses", label: "Diagnoses", labelId: "Diagnosa", path: "/clinical/diagnoses", roles: ["doctor"] },
      { id: "prescriptions", label: "Prescriptions", labelId: "Resep", path: "/clinical/prescriptions", roles: ["doctor"] },
      { id: "procedures", label: "Procedures", labelId: "Tindakan", path: "/clinical/procedures", roles: ["doctor"] },
      { id: "referrals", label: "Referrals", labelId: "Rujukan", path: "/clinical/referrals", roles: ["doctor"] },
      { id: "certificates", label: "Medical Certificates", labelId: "Surat Keterangan", path: "/clinical/certificates", roles: ["doctor"] },

      // Specialty section
      { id: "specialty-header", label: "Specialty", labelId: "Spesialisasi", path: "", roles: "all", isSection: true },
      { id: "dental", label: "Dental Chart", labelId: "Odontogram", path: "/clinical/dental", roles: ["doctor"] },
      { id: "kia", label: "KIA / ANC", path: "/clinical/kia", roles: ["midwife"] },
      { id: "immunizations", label: "Immunizations", labelId: "Imunisasi", path: "/clinical/immunizations", roles: ["nurse", "midwife"] },
      { id: "growth", label: "Growth Charts", labelId: "Kurva Pertumbuhan", path: "/clinical/growth", roles: ["nurse", "midwife"] },
    ],
  },

  // 5. Laboratory
  {
    id: "laboratory",
    label: "Laboratory",
    labelId: "Laboratorium",
    icon: "FlaskConical",
    path: "/laboratory",
    roles: ["admin", "doctor", "lab_tech"],
    badge: "pendingLabOrders",
    children: [
      { id: "lab-queue", label: "Lab Queue", labelId: "Antrian Lab", path: "/laboratory/queue", roles: ["lab_tech"] },
      { id: "lab-orders", label: "Pending Orders", labelId: "Order Pending", path: "/laboratory/orders", roles: ["lab_tech"] },
      { id: "lab-specimens", label: "Specimen Collection", labelId: "Pengambilan Sampel", path: "/laboratory/specimens", roles: ["lab_tech"] },
      { id: "lab-results-entry", label: "Enter Results", labelId: "Input Hasil", path: "/laboratory/results/entry", roles: ["lab_tech"] },
      { id: "lab-results", label: "Result History", labelId: "Riwayat Hasil", path: "/laboratory/results", roles: ["doctor", "lab_tech"] },
      { id: "lab-critical", label: "Critical Values", labelId: "Nilai Kritis", path: "/laboratory/critical", roles: ["lab_tech", "doctor"] },
      { id: "lab-tests", label: "Test Catalog", labelId: "Katalog Tes", path: "/laboratory/tests", roles: ["admin"] },
    ],
  },

  // 6. Pharmacy
  {
    id: "pharmacy",
    label: "Pharmacy",
    labelId: "Apotek",
    icon: "Pill",
    path: "/pharmacy",
    roles: ["admin", "pharmacist"],
    badge: "pendingDispenses",
    children: [
      // Dispensing section
      { id: "dispensing-header", label: "Dispensing", path: "", roles: "all", isSection: true },
      { id: "pharmacy-prescriptions", label: "Pending Prescriptions", labelId: "Resep Pending", path: "/pharmacy/prescriptions", roles: ["pharmacist"] },
      { id: "pharmacy-dispense", label: "Dispense", labelId: "Dispensing", path: "/pharmacy/dispense", roles: ["pharmacist"] },
      { id: "pharmacy-history", label: "Dispensing History", labelId: "Riwayat Dispensing", path: "/pharmacy/history", roles: ["pharmacist"] },

      // Inventory section
      { id: "inventory-header", label: "Inventory", labelId: "Inventaris", path: "", roles: "all", isSection: true },
      { id: "pharmacy-stock", label: "Stock Levels", labelId: "Stok", path: "/pharmacy/stock", roles: ["pharmacist"] },
      { id: "pharmacy-movements", label: "Stock Movements", labelId: "Mutasi Stok", path: "/pharmacy/movements", roles: ["pharmacist"] },
      { id: "pharmacy-low-stock", label: "Low Stock", labelId: "Stok Rendah", path: "/pharmacy/low-stock", roles: ["pharmacist"] },
      { id: "pharmacy-expiring", label: "Expiring Soon", labelId: "Kadaluarsa", path: "/pharmacy/expiring", roles: ["pharmacist"] },

      // Master Data section
      { id: "master-header", label: "Master Data", path: "", roles: "all", isSection: true },
      { id: "pharmacy-medications", label: "Medication Catalog", labelId: "Katalog Obat", path: "/pharmacy/medications", roles: ["admin"] },
      { id: "pharmacy-batches", label: "Batches", labelId: "Batch", path: "/pharmacy/batches", roles: ["pharmacist"] },
      { id: "pharmacy-controlled", label: "Controlled Substances", labelId: "Obat Terkendali", path: "/pharmacy/controlled", roles: ["pharmacist"] },
    ],
  },

  // 7. Inpatient (Optional)
  {
    id: "inpatient",
    label: "Inpatient",
    labelId: "Rawat Inap",
    icon: "Bed",
    path: "/inpatient",
    roles: ["admin", "doctor", "nurse"],
    featureFlag: "inpatient_enabled",
    children: [
      { id: "inpatient-census", label: "Ward Census", labelId: "Sensus Bangsal", path: "/inpatient/census", roles: ["nurse", "admin"] },
      { id: "inpatient-beds", label: "Bed Management", labelId: "Kelola Tempat Tidur", path: "/inpatient/beds", roles: ["nurse"] },
      { id: "inpatient-admissions", label: "Admissions", labelId: "Penerimaan", path: "/inpatient/admissions", roles: ["doctor", "nurse"] },
      { id: "inpatient-notes", label: "Progress Notes", labelId: "Catatan Harian", path: "/inpatient/notes", roles: ["doctor", "nurse"] },
      { id: "inpatient-mar", label: "Medication Admin", labelId: "Pemberian Obat", path: "/inpatient/mar", roles: ["nurse"] },
      { id: "inpatient-discharge", label: "Discharge", labelId: "Pulang", path: "/inpatient/discharge", roles: ["doctor"] },
    ],
  },

  // 8. Billing
  {
    id: "billing",
    label: "Billing",
    labelId: "Kasir",
    icon: "CreditCard",
    path: "/billing",
    roles: ["owner", "admin", "cashier", "front_desk"],
    badge: "unpaidInvoices",
    children: [
      // Transactions section
      { id: "transactions-header", label: "Transactions", labelId: "Transaksi", path: "", roles: "all", isSection: true },
      { id: "billing-invoices-pending", label: "Pending Invoices", labelId: "Invoice Pending", path: "/billing/invoices/pending", roles: ["cashier"] },
      { id: "billing-invoices-new", label: "Create Invoice", labelId: "Buat Invoice", path: "/billing/invoices/new", roles: ["cashier"] },
      { id: "billing-payments-new", label: "Receive Payment", labelId: "Terima Pembayaran", path: "/billing/payments/new", roles: ["cashier"] },
      { id: "billing-payments", label: "Payment History", labelId: "Riwayat Pembayaran", path: "/billing/payments", roles: ["cashier", "admin"] },

      // Patient Accounts section
      { id: "accounts-header", label: "Patient Accounts", labelId: "Akun Pasien", path: "", roles: "all", isSection: true },
      { id: "billing-deposits", label: "Deposits", labelId: "Deposit", path: "/billing/deposits", roles: ["cashier"] },
      { id: "billing-refunds", label: "Refunds", path: "/billing/refunds", roles: ["cashier", "admin"] },
      { id: "billing-outstanding", label: "Outstanding", labelId: "Piutang", path: "/billing/outstanding", roles: ["admin", "owner"] },

      // Operations section
      { id: "operations-header", label: "Operations", labelId: "Operasional", path: "", roles: "all", isSection: true },
      { id: "billing-cash-closing", label: "Cash Closing", labelId: "Tutup Kas", path: "/billing/cash-closing", roles: ["cashier"] },
      { id: "billing-tariffs", label: "Tariff Management", labelId: "Kelola Tarif", path: "/billing/tariffs", roles: ["admin"] },

      // BPJS Claims section
      { id: "bpjs-header", label: "BPJS Claims", labelId: "Klaim BPJS", path: "", roles: "all", isSection: true },
      { id: "billing-bpjs-sep", label: "SEP Management", labelId: "Kelola SEP", path: "/billing/bpjs/sep", roles: ["front_desk", "admin"] },
      { id: "billing-bpjs-claims", label: "Claim Status", labelId: "Status Klaim", path: "/billing/bpjs/claims", roles: ["admin"] },
    ],
  },

  // 9. Reports
  {
    id: "reports",
    label: "Reports",
    labelId: "Laporan",
    icon: "BarChart3",
    path: "/reports",
    roles: ["owner", "admin", "doctor"],
    children: [
      // Operational section
      { id: "operational-header", label: "Operational", labelId: "Operasional", path: "", roles: "all", isSection: true },
      { id: "reports-daily", label: "Daily Summary", labelId: "Ringkasan Harian", path: "/reports/daily", roles: ["admin", "owner"] },
      { id: "reports-visits", label: "Patient Visits", labelId: "Kunjungan Pasien", path: "/reports/visits", roles: ["admin", "owner"] },
      { id: "reports-queue", label: "Queue Analytics", labelId: "Analisis Antrian", path: "/reports/queue", roles: ["admin"] },

      // Financial section
      { id: "financial-header", label: "Financial", labelId: "Keuangan", path: "", roles: "all", isSection: true },
      { id: "reports-revenue", label: "Revenue Report", labelId: "Laporan Pendapatan", path: "/reports/revenue", roles: ["owner", "admin"] },
      { id: "reports-collections", label: "Collection Report", labelId: "Laporan Penagihan", path: "/reports/collections", roles: ["owner", "admin"] },
      { id: "reports-bpjs", label: "BPJS Claims Report", labelId: "Laporan Klaim BPJS", path: "/reports/bpjs", roles: ["owner", "admin"] },

      // Clinical section
      { id: "clinical-header", label: "Clinical", labelId: "Klinis", path: "", roles: "all", isSection: true },
      { id: "reports-diseases", label: "Disease Statistics", labelId: "Statistik Penyakit", path: "/reports/diseases", roles: ["doctor", "admin"] },
      { id: "reports-lab", label: "Lab Utilization", labelId: "Utilisasi Lab", path: "/reports/lab", roles: ["admin"] },
      { id: "reports-pharmacy", label: "Pharmacy Usage", labelId: "Penggunaan Obat", path: "/reports/pharmacy", roles: ["admin"] },

      // KIA section
      { id: "kia-header", label: "KIA (Maternal-Child)", path: "", roles: "all", isSection: true },
      { id: "reports-kia-anc", label: "ANC Report", labelId: "Laporan ANC", path: "/reports/kia/anc", roles: ["midwife", "admin"] },
      { id: "reports-kia-immunization", label: "Immunization Report", labelId: "Laporan Imunisasi", path: "/reports/kia/immunization", roles: ["nurse", "admin"] },

      // Regulatory section
      { id: "regulatory-header", label: "Regulatory", labelId: "Regulasi", path: "", roles: "all", isSection: true },
      { id: "reports-satusehat", label: "SatuSehat Sync", path: "/reports/satusehat", roles: ["admin"] },
      { id: "reports-jkn", label: "JKN Sync", path: "/reports/jkn", roles: ["admin"] },
    ],
  },

  // 10. HR & Payroll
  {
    id: "hr",
    label: "HR & Payroll",
    labelId: "SDM & Payroll",
    icon: "UserCog",
    path: "/hr",
    roles: ["owner", "admin", "hr"],
    badge: "pendingLeaves",
    children: [
      // Employees section
      { id: "employees-header", label: "Employees", labelId: "Karyawan", path: "", roles: "all", isSection: true },
      { id: "hr-employees", label: "Employee List", labelId: "Daftar Karyawan", path: "/hr/employees", roles: ["hr", "admin"] },
      { id: "hr-employees-new", label: "Add Employee", labelId: "Tambah Karyawan", path: "/hr/employees/new", roles: ["hr", "admin"] },

      // Organization section
      { id: "organization-header", label: "Organization", labelId: "Organisasi", path: "", roles: "all", isSection: true },
      { id: "hr-departments", label: "Departments", labelId: "Departemen", path: "/hr/departments", roles: ["admin"] },
      { id: "hr-positions", label: "Positions", labelId: "Jabatan", path: "/hr/positions", roles: ["admin"] },

      // Time & Attendance section
      { id: "attendance-header", label: "Time & Attendance", labelId: "Kehadiran", path: "", roles: "all", isSection: true },
      { id: "hr-attendance", label: "Attendance", labelId: "Absensi", path: "/hr/attendance", roles: ["hr"] },
      { id: "hr-leaves", label: "Leave Requests", labelId: "Pengajuan Cuti", path: "/hr/leaves", roles: ["hr", "admin"] },
      { id: "hr-leaves-balance", label: "Leave Balance", labelId: "Saldo Cuti", path: "/hr/leaves/balance", roles: ["hr"] },

      // Payroll section
      { id: "payroll-header", label: "Payroll", path: "", roles: "all", isSection: true },
      { id: "hr-payroll", label: "Payroll Runs", labelId: "Proses Gaji", path: "/hr/payroll", roles: ["hr", "owner"] },
      { id: "hr-salary-components", label: "Salary Components", labelId: "Komponen Gaji", path: "/hr/salary-components", roles: ["admin"] },
      { id: "hr-payslips", label: "Pay Slips", labelId: "Slip Gaji", path: "/hr/payslips", roles: ["hr"] },

      // Dashboard section
      { id: "dashboard-header", label: "Dashboard", path: "", roles: "all", isSection: true },
      { id: "hr-dashboard", label: "HR Dashboard", labelId: "Dashboard SDM", path: "/hr/dashboard", roles: ["owner"] },
      { id: "hr-payroll-summary", label: "Payroll Summary", labelId: "Ringkasan Gaji", path: "/hr/payroll/summary", roles: ["owner"] },
    ],
  },

  // 11. Settings
  {
    id: "settings",
    label: "Settings",
    labelId: "Pengaturan",
    icon: "Settings",
    path: "/settings",
    roles: ["owner", "admin"],
    badge: "failedSyncItems",
    children: [
      // Organization section
      { id: "org-header", label: "Organization", labelId: "Organisasi", path: "", roles: "all", isSection: true },
      { id: "settings-organization", label: "Clinic Profile", labelId: "Profil Klinik", path: "/settings/organization", roles: ["owner", "admin"] },
      { id: "settings-branches", label: "Branches", labelId: "Cabang", path: "/settings/branches", roles: ["owner", "admin"] },

      // Users & Access section
      { id: "access-header", label: "Users & Access", labelId: "Pengguna & Akses", path: "", roles: "all", isSection: true },
      { id: "settings-users", label: "User Management", labelId: "Kelola Pengguna", path: "/settings/users", roles: ["admin"] },
      { id: "settings-roles", label: "Roles & Permissions", labelId: "Peran & Izin", path: "/settings/roles", roles: ["admin"] },
      { id: "settings-invitations", label: "Invitations", labelId: "Undangan", path: "/settings/invitations", roles: ["admin"] },

      // Practitioners section
      { id: "practitioners-header", label: "Practitioners", labelId: "Tenaga Medis", path: "", roles: "all", isSection: true },
      { id: "settings-practitioners", label: "Practitioner Profiles", labelId: "Profil Dokter", path: "/settings/practitioners", roles: ["admin"] },
      { id: "settings-polyclinics", label: "Polyclinics", labelId: "Poliklinik", path: "/settings/polyclinics", roles: ["admin"] },
      { id: "settings-schedules", label: "Schedules", labelId: "Jadwal Praktek", path: "/settings/schedules", roles: ["admin"] },

      // Integrations section
      { id: "integrations-header", label: "Integrations", labelId: "Integrasi", path: "", roles: "all", isSection: true },
      { id: "settings-satusehat", label: "SatuSehat Config", labelId: "Konfigurasi SatuSehat", path: "/settings/satusehat", roles: ["admin"] },
      { id: "settings-jkn", label: "BPJS/JKN Config", labelId: "Konfigurasi BPJS", path: "/settings/jkn", roles: ["admin"] },
      { id: "settings-sync", label: "Sync Status", labelId: "Status Sinkronisasi", path: "/settings/sync", roles: ["admin"] },

      // System section
      { id: "system-header", label: "System", labelId: "Sistem", path: "", roles: "all", isSection: true },
      { id: "settings-audit", label: "Audit Logs", labelId: "Log Audit", path: "/settings/audit", roles: ["admin"] },
      { id: "settings-notifications", label: "Notifications", labelId: "Notifikasi", path: "/settings/notifications", roles: ["admin"] },
      { id: "settings-documents", label: "Documents", labelId: "Dokumen", path: "/settings/documents", roles: ["admin"] },

      // Subscription section (SaaS)
      { id: "subscription-header", label: "Subscription", labelId: "Langganan", path: "", roles: "all", isSection: true },
      { id: "settings-subscription", label: "Plan & Billing", labelId: "Paket & Tagihan", path: "/settings/subscription", roles: ["owner"] },
      { id: "settings-usage", label: "Usage & Limits", labelId: "Penggunaan & Batas", path: "/settings/usage", roles: ["owner"] },
      { id: "settings-api-keys", label: "API Keys", path: "/settings/api-keys", roles: ["admin"] },
    ],
  },
];

// ----------------------------------------------------------------------------
// QUICK ACTIONS (Floating Action Button)
// ----------------------------------------------------------------------------

export const quickActions: Record<UserRole, QuickAction[]> = {
  owner: [],
  admin: [],
  doctor: [
    { id: "start-encounter", label: "Start Encounter", labelId: "Mulai Kunjungan", icon: "Stethoscope", path: "/clinical/encounters/new", color: "blue" },
    { id: "new-prescription", label: "Prescription", labelId: "Resep", icon: "FileText", path: "/clinical/prescriptions/new", color: "green" },
  ],
  nurse: [
    { id: "vital-signs", label: "Vital Signs", labelId: "Tanda Vital", icon: "Activity", path: "/clinical/vitals/new", color: "red" },
    { id: "assessment", label: "Assessment", labelId: "Kajian", icon: "ClipboardCheck", path: "/clinical/assessments/new", color: "blue" },
  ],
  midwife: [
    { id: "anc-visit", label: "ANC Visit", labelId: "Kunjungan ANC", icon: "ClipboardCheck", path: "/clinical/kia/anc/new", color: "pink" },
    { id: "immunization", label: "Immunization", labelId: "Imunisasi", icon: "Activity", path: "/clinical/immunizations/new", color: "green" },
  ],
  pharmacist: [
    { id: "scan-rx", label: "Scan Rx", labelId: "Scan Resep", icon: "Scan", path: "/pharmacy/dispense", color: "blue" },
    { id: "stock-entry", label: "Stock Entry", labelId: "Input Stok", icon: "Package", path: "/pharmacy/stock/new", color: "green" },
  ],
  lab_tech: [
    { id: "new-specimen", label: "Specimen", labelId: "Sampel", icon: "TestTube", path: "/laboratory/specimens/new", color: "purple" },
    { id: "new-result", label: "Result", labelId: "Hasil", icon: "FileText", path: "/laboratory/results/entry", color: "blue" },
  ],
  front_desk: [
    { id: "new-patient", label: "New Patient", labelId: "Pasien Baru", icon: "UserPlus", path: "/patients/new", color: "blue" },
    { id: "new-appointment", label: "Appointment", labelId: "Jadwal", icon: "Calendar", path: "/appointments/new", color: "green" },
    { id: "checkin", label: "Check-in", icon: "ClipboardCheck", path: "/appointments/checkin", color: "orange" },
  ],
  cashier: [
    { id: "new-payment", label: "Payment", labelId: "Pembayaran", icon: "Wallet", path: "/billing/payments/new", color: "green" },
    { id: "cash-closing", label: "Cash Closing", labelId: "Tutup Kas", icon: "Receipt", path: "/billing/cash-closing", color: "blue" },
  ],
  hr: [
    { id: "new-employee", label: "New Employee", labelId: "Karyawan Baru", icon: "UserPlus", path: "/hr/employees/new", color: "blue" },
  ],
};

// ----------------------------------------------------------------------------
// NAVIGATION BADGES (Real-time Counts)
// ----------------------------------------------------------------------------

export const badgeConfigs: Record<string, BadgeConfig> = {
  todayAppointments: { query: "appointments.today.count", color: "blue" },
  pendingLabOrders: { query: "laboratory.orders.pending.count", color: "orange", threshold: 0 },
  pendingDispenses: { query: "pharmacy.prescriptions.pending.count", color: "orange", threshold: 0 },
  unpaidInvoices: { query: "billing.invoices.pending.count", color: "red", threshold: 0 },
  pendingLeaves: { query: "hr.leaves.pending.count", color: "orange", threshold: 0 },
  failedSyncItems: { query: "settings.sync.failed.count", color: "red", threshold: 0 },
};

// ----------------------------------------------------------------------------
// FEATURE FLAGS
// ----------------------------------------------------------------------------

export const featureFlags = {
  inpatient_enabled: "Enable inpatient/ward management module",
  dental_enabled: "Enable dental chart and odontogram",
  kia_enabled: "Enable maternal-child health (KIA) module",
  laboratory_enabled: "Enable laboratory module",
  pharmacy_enabled: "Enable pharmacy/dispensing module",
};

// ----------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Filter navigation items based on user role
 */
export function getNavigationForRole(role: UserRole, enabledFeatures: string[] = []): NavItem[] {
  return mainNavigation
    .filter((item) => {
      // Check feature flag
      if (item.featureFlag && !enabledFeatures.includes(item.featureFlag)) {
        return false;
      }
      // Check role permission
      if (item.roles === "all") return true;
      return item.roles.includes(role);
    })
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => {
        if (child.isSection) return true;
        if (child.roles === "all") return true;
        return child.roles.includes(role);
      }),
    }));
}

/**
 * Get quick actions for a specific role
 */
export function getQuickActionsForRole(role: UserRole): QuickAction[] {
  return quickActions[role] || [];
}

/**
 * Check if user has access to a specific path
 */
export function hasAccessToPath(role: UserRole, path: string): boolean {
  for (const item of mainNavigation) {
    if (item.path === path) {
      if (item.roles === "all") return true;
      return item.roles.includes(role);
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) {
          if (child.roles === "all") return true;
          return child.roles.includes(role);
        }
      }
    }
  }
  return false;
}

/**
 * Get breadcrumb trail for a path
 */
export function getBreadcrumbs(path: string): Array<{ label: string; path: string }> {
  const breadcrumbs: Array<{ label: string; path: string }> = [];

  for (const item of mainNavigation) {
    if (path.startsWith(item.path)) {
      breadcrumbs.push({ label: item.label, path: item.path });

      if (item.children) {
        for (const child of item.children) {
          if (child.path === path && !child.isSection) {
            breadcrumbs.push({ label: child.label, path: child.path });
            break;
          }
        }
      }
      break;
    }
  }

  return breadcrumbs;
}

// ----------------------------------------------------------------------------
// DASHBOARD WIDGETS
// ----------------------------------------------------------------------------

export interface DashboardWidget {
  id: string;
  label: string;
  labelId?: string;
  roles: UserRole[];
  size: "small" | "medium" | "large";
  query: string;
}

export const dashboardWidgets: DashboardWidget[] = [
  { id: "today-appointments", label: "Today's Appointments", labelId: "Jadwal Hari Ini", roles: ["owner", "admin", "doctor", "nurse", "front_desk"], size: "medium", query: "appointments.today" },
  { id: "queue-status", label: "Queue Status", labelId: "Status Antrian", roles: ["owner", "admin", "doctor", "nurse", "lab_tech", "front_desk"], size: "medium", query: "queue.status" },
  { id: "revenue-today", label: "Revenue Today", labelId: "Pendapatan Hari Ini", roles: ["owner", "admin", "cashier"], size: "small", query: "billing.revenue.today" },
  { id: "pending-payments", label: "Pending Payments", labelId: "Pembayaran Tertunda", roles: ["owner", "admin", "cashier"], size: "small", query: "billing.invoices.pending" },
  { id: "low-stock-alerts", label: "Low Stock Alerts", labelId: "Stok Rendah", roles: ["owner", "admin", "pharmacist", "lab_tech"], size: "small", query: "pharmacy.stock.low" },
  { id: "expiring-meds", label: "Expiring Medications", labelId: "Obat Kadaluarsa", roles: ["owner", "admin", "pharmacist"], size: "small", query: "pharmacy.stock.expiring" },
  { id: "pending-lab-orders", label: "Pending Lab Orders", labelId: "Order Lab Pending", roles: ["doctor", "lab_tech"], size: "small", query: "laboratory.orders.pending" },
  { id: "bpjs-sync-status", label: "BPJS Sync Status", labelId: "Status Sync BPJS", roles: ["owner", "admin"], size: "small", query: "sync.jkn.status" },
  { id: "staff-attendance", label: "Staff Attendance", labelId: "Kehadiran Staf", roles: ["owner", "admin"], size: "medium", query: "hr.attendance.today" },
];

/**
 * Get dashboard widgets for a specific role
 */
export function getDashboardWidgetsForRole(role: UserRole): DashboardWidget[] {
  return dashboardWidgets.filter((widget) => widget.roles.includes(role));
}
