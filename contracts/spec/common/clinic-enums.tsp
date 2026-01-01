import "@typespec/http";

using TypeSpec.Http;

// ============================================================================
// CLINIC DOMAIN ENUMS
// ============================================================================
// Common enumerations used across clinic business operations
// Based on Indonesian healthcare standards (BPJS, SatuSehat)
// ============================================================================

// --- Organization & User Enums ---

/** Organization type */
enum OrgType {
  clinic: "clinic",
  hospital: "hospital",
  polyclinic: "polyclinic",
  pharmacy: "pharmacy",
  laboratory: "laboratory",
}

/** User role within the system */
enum UserRole {
  owner: "owner",
  admin: "admin",
  doctor: "doctor",
  nurse: "nurse",
  midwife: "midwife",
  pharmacist: "pharmacist",
  labTech: "labTech",
  frontDesk: "frontDesk",
  cashier: "cashier",
}

/** User account status */
enum UserStatus {
  active: "active",
  inactive: "inactive",
  suspended: "suspended",
  pendingVerification: "pendingVerification",
}

// --- Patient Enums ---

/** Gender (FHIR-aligned) */
enum Gender {
  male: "male",
  female: "female",
  other: "other",
}

/** Patient marital status */
enum MaritalStatus {
  single: "single",
  married: "married",
  divorced: "divorced",
  widowed: "widowed",
}

/** Blood type */
enum BloodType {
  a: "a",
  b: "b",
  ab: "ab",
  o: "o",
}

/** Rhesus factor */
enum Rhesus {
  positive: "positive",
  negative: "negative",
}

/** Patient status */
enum PatientStatus {
  active: "active",
  inactive: "inactive",
  deceased: "deceased",
}

/** Allergy severity */
enum AllergySeverity {
  mild: "mild",
  moderate: "moderate",
  severe: "severe",
  lifeThreatening: "lifeThreatening",
}

/** Allergy type */
enum AllergyType {
  food: "food",
  medication: "medication",
  environmental: "environmental",
  other: "other",
}

// --- Practitioner & Polyclinic Enums ---

/** Practitioner type */
enum PractitionerType {
  doctor: "doctor",
  nurse: "nurse",
  midwife: "midwife",
  pharmacist: "pharmacist",
  labTech: "labTech",
  radiologist: "radiologist",
  specialist: "specialist",
}

/** Medical specialty */
enum Specialty {
  generalPractice: "generalPractice",
  internalMedicine: "internalMedicine",
  pediatrics: "pediatrics",
  obgyn: "obgyn",
  surgery: "surgery",
  dentistry: "dentistry",
  ophthalmology: "ophthalmology",
  dermatology: "dermatology",
  psychiatry: "psychiatry",
  radiology: "radiology",
  pathology: "pathology",
  other: "other",
}

/** Polyclinic type */
enum PolyclinicType {
  general: "general",
  dental: "dental",
  kia: "kia",
  specialist: "specialist",
  emergency: "emergency",
  lab: "lab",
  pharmacy: "pharmacy",
}

/** Day of week */
enum DayOfWeek {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
}

// --- Appointment & Queue Enums ---

/** Appointment status */
enum AppointmentStatus {
  booked: "booked",
  confirmed: "confirmed",
  checkedIn: "checkedIn",
  inQueue: "inQueue",
  completed: "completed",
  cancelled: "cancelled",
  noShow: "noShow",
}

/** Appointment type */
enum AppointmentType {
  consultation: "consultation",
  followUp: "followUp",
  procedure: "procedure",
  lab: "lab",
  imaging: "imaging",
  vaccination: "vaccination",
  checkup: "checkup",
}

/** Queue status */
enum QueueStatus {
  waiting: "waiting",
  called: "called",
  serving: "serving",
  completed: "completed",
  skipped: "skipped",
  cancelled: "cancelled",
}

/** Queue priority */
enum QueuePriority {
  routine: "routine",
  urgent: "urgent",
  emergency: "emergency",
}

// --- Encounter & Medical Record Enums ---

/** Encounter status (FHIR-aligned) */
enum EncounterStatus {
  planned: "planned",
  arrived: "arrived",
  inProgress: "inProgress",
  onLeave: "onLeave",
  finished: "finished",
  cancelled: "cancelled",
}

/** Encounter type */
enum EncounterType {
  outpatient: "outpatient",
  inpatient: "inpatient",
  emergency: "emergency",
  homeVisit: "homeVisit",
  virtual: "virtual",
}

/** Encounter class (FHIR-aligned) */
enum EncounterClass {
  ambulatory: "ambulatory",
  inpatient: "inpatient",
  emergency: "emergency",
  observation: "observation",
}

/** Diagnosis type */
enum DiagnosisType {
  primary: "primary",
  secondary: "secondary",
  admission: "admission",
  discharge: "discharge",
}

/** Diagnosis verification status */
enum DiagnosisVerification {
  confirmed: "confirmed",
  provisional: "provisional",
  differential: "differential",
  refuted: "refuted",
}

// --- Prescription & Pharmacy Enums ---

/** Prescription status */
enum PrescriptionStatus {
  draft: "draft",
  active: "active",
  completed: "completed",
  cancelled: "cancelled",
  onHold: "onHold",
}

/** Dosage form */
enum DosageForm {
  tablet: "tablet",
  capsule: "capsule",
  syrup: "syrup",
  injection: "injection",
  ointment: "ointment",
  drops: "drops",
  inhaler: "inhaler",
  suppository: "suppository",
  other: "other",
}

/** Medication frequency */
enum Frequency {
  onceDaily: "onceDaily",
  twiceDaily: "twiceDaily",
  threeTimesDaily: "threeTimesDaily",
  fourTimesDaily: "fourTimesDaily",
  every8Hours: "every8Hours",
  every12Hours: "every12Hours",
  every24Hours: "every24Hours",
  asNeeded: "asNeeded",
  other: "other",
}

/** Dispense status */
enum DispenseStatus {
  pending: "pending",
  dispensed: "dispensed",
  partiallyDispensed: "partiallyDispensed",
  cancelled: "cancelled",
}

// --- Laboratory Enums ---

/** Lab test category */
enum LabTestCategory {
  hematology: "hematology",
  chemistry: "chemistry",
  urinalysis: "urinalysis",
  serology: "serology",
  microbiology: "microbiology",
  histopathology: "histopathology",
  other: "other",
}

/** Lab queue status */
enum LabQueueStatus {
  pending: "pending",
  collecting: "collecting",
  received: "received",
  processing: "processing",
  resulted: "resulted",
  authorized: "authorized",
  completed: "completed",
  cancelled: "cancelled",
}

/** Lab result status */
enum LabResultStatus {
  preliminary: "preliminary",
  final: "final",
  amended: "amended",
  cancelled: "cancelled",
}

/** Lab result interpretation */
enum LabResultInterpretation {
  normal: "normal",
  low: "low",
  high: "high",
  criticalLow: "criticalLow",
  criticalHigh: "criticalHigh",
  abnormal: "abnormal",
}

// --- Billing & Payment Enums ---

/** Service tariff category */
enum ServiceTariffCategory {
  consultation: "consultation",
  procedure: "procedure",
  lab: "lab",
  radiology: "radiology",
  pharmacy: "pharmacy",
  room: "room",
  nursing: "nursing",
  other: "other",
}

/** Invoice type */
enum InvoiceType {
  outpatient: "outpatient",
  inpatient: "inpatient",
  pharmacyOnly: "pharmacyOnly",
  labOnly: "labOnly",
}

/** Payer type */
enum PayerType {
  selfPay: "selfPay",
  bpjs: "bpjs",
  insurance: "insurance",
  corporate: "corporate",
}

/** Invoice status */
enum InvoiceStatus {
  draft: "draft",
  pending: "pending",
  partial: "partial",
  paid: "paid",
  cancelled: "cancelled",
  voided: "voided",
}

/** Payment method */
enum PaymentMethod {
  cash: "cash",
  debit: "debit",
  credit: "credit",
  qris: "qris",
  transfer: "transfer",
  deposit: "deposit",
  insurance: "insurance",
  bpjs: "bpjs",
}

/** Payment status */
enum PaymentStatus {
  completed: "completed",
  partial: "partial",
  cancelled: "cancelled",
  refunded: "refunded",
}

// --- Indonesian Healthcare Integration Enums ---

/** BPJS facility type */
enum BpjsFacilityType {
  fktp: "fktp",
  fkrtl: "fkrtl",
}

/** BPJS service type */
enum BpjsPelayanan {
  rawatInap: "rawatInap",
  rawatJalan: "rawatJalan",
}

/** SatuSehat resource type */
enum SatusehatResourceType {
  patient: "Patient",
  practitioner: "Practitioner",
  practitionerRole: "PractitionerRole",
  location: "Location",
  encounter: "Encounter",
  condition: "Condition",
  observation: "Observation",
  procedure: "Procedure",
  medicationRequest: "MedicationRequest",
  medicationDispense: "MedicationDispense",
  serviceRequest: "ServiceRequest",
  diagnosticReport: "DiagnosticReport",
  composition: "Composition",
}

/** SatuSehat sync status */
enum SatusehatSyncStatus {
  pending: "pending",
  processing: "processing",
  completed: "completed",
  failed: "failed",
  skipped: "skipped",
}

// --- Accreditation Enums ---

/** Accreditation body */
enum AccreditationBody {
  snars: "snars",
  kars: "kars",
  kemenkesKlinik: "kemenkesKlinik",
  kemenkesPuskesmas: "kemenkesPuskesmas",
}

/** Accreditation level */
enum AccreditationLevel {
  notAccredited: "notAccredited",
  basic: "basic",
  intermediate: "intermediate",
  advanced: "advanced",
  excellent: "excellent",
}

/** Quality indicator category */
enum QualityIndicatorCategory {
  patientSafety: "patientSafety",
  clinicalOutcome: "clinicalOutcome",
  operational: "operational",
  patientExperience: "patientExperience",
  infectionControl: "infectionControl",
  medicationSafety: "medicationSafety",
  surgicalSafety: "surgicalSafety",
  maternalChild: "maternalChild",
  emergency: "emergency",
  laboratory: "laboratory",
  radiology: "radiology",
}

/** Patient safety incident severity */
enum IncidentSeverity {
  nearMiss: "nearMiss",
  noHarm: "noHarm",
  mild: "mild",
  moderate: "moderate",
  severe: "severe",
  sentinel: "sentinel",
}

/** Credential type */
enum CredentialType {
  str: "str",
  sip: "sip",
  sik: "sik",
  sipb: "sipb",
  sipa: "sipa",
  serkom: "serkom",
  certificate: "certificate",
  bls: "bls",
  acls: "acls",
  atls: "atls",
}

/** Credential status */
enum CredentialStatus {
  pending: "pending",
  verified: "verified",
  active: "active",
  expiringSoon: "expiringSoon",
  expired: "expired",
  revoked: "revoked",
  suspended: "suspended",
}

// --- Triage & Assessment Enums ---

/** Triage level */
enum TriageLevel {
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
}

/** Pain scale type */
enum PainScaleType {
  vas: "vas",
  flacc: "flacc",
  wongBaker: "wongBaker",
  numeric: "numeric",
}

// --- Additional Laboratory Enums ---

/** Lab test type */
enum LabTestType {
  quantitative: "quantitative",
  qualitative: "qualitative",
  semiQuantitative: "semiQuantitative",
  culture: "culture",
}

/** Lab result type */
enum LabResultType {
  numeric: "numeric",
  text: "text",
  positiveNegative: "positiveNegative",
  image: "image",
}

/** Lab queue priority */
enum LabQueuePriority {
  routine: "routine",
  urgent: "urgent",
  stat: "stat",
  cito: "cito",
}

/** Specimen status */
enum SpecimenStatus {
  collected: "collected",
  received: "received",
  processing: "processing",
  analyzed: "analyzed",
  rejected: "rejected",
}

/** Specimen condition */
enum SpecimenCondition {
  adequate: "adequate",
  hemolyzed: "hemolyzed",
  lipemic: "lipemic",
  icteric: "icteric",
  clotted: "clotted",
  insufficient: "insufficient",
  contaminated: "contaminated",
}

/** Diagnostic report status */
enum DiagnosticReportStatus {
  preliminary: "preliminary",
  final: "final",
  amended: "amended",
  cancelled: "cancelled",
}

/** Critical notification method */
enum CriticalNotificationMethod {
  phone: "phone",
  sms: "sms",
  whatsapp: "whatsapp",
  email: "email",
  inPerson: "inPerson",
}

// --- Additional Billing Enums ---

/** Payment type */
enum PaymentType {
  selfPay: "selfPay",
  jkn: "jkn",
  insurance: "insurance",
  corporate: "corporate",
  mixed: "mixed",
}

/** Billable item type */
enum BillableItemType {
  consultation: "consultation",
  procedure: "procedure",
  medication: "medication",
  labTest: "labTest",
  radiology: "radiology",
  room: "room",
  supply: "supply",
  other: "other",
}

/** Refund status */
enum RefundStatus {
  requested: "requested",
  approved: "approved",
  processed: "processed",
  rejected: "rejected",
}

// --- Additional Accreditation Enums ---

/** Accreditation status */
enum AccreditationStatus {
  notStarted: "notStarted",
  preparing: "preparing",
  selfAssessment: "selfAssessment",
  submitted: "submitted",
  surveyed: "surveyed",
  accredited: "accredited",
  lapsed: "lapsed",
}

/** Incident status */
enum IncidentStatus {
  reported: "reported",
  investigating: "investigating",
  actionRequired: "actionRequired",
  resolved: "resolved",
  closed: "closed",
}

/** Clinical audit type */
enum ClinicalAuditType {
  processAudit: "processAudit",
  outcomeAudit: "outcomeAudit",
  structureAudit: "structureAudit",
  topicAudit: "topicAudit",
  medicalRecordAudit: "medicalRecordAudit",
}

/** Clinical audit status */
enum ClinicalAuditStatus {
  planned: "planned",
  inProgress: "inProgress",
  dataCollection: "dataCollection",
  analysis: "analysis",
  reportDraft: "reportDraft",
  completed: "completed",
  followUp: "followUp",
}

/** Document control type */
enum DocumentControlType {
  spo: "spo",
  policy: "policy",
  clinicalGuideline: "clinicalGuideline",
  form: "form",
  instruction: "instruction",
  standard: "standard",
}

/** Document control status */
enum DocumentControlStatus {
  draft: "draft",
  review: "review",
  approved: "approved",
  published: "published",
  underRevision: "underRevision",
  retired: "retired",
}

/** Infection control category */
enum InfectionControlCategory {
  iad: "iad",
  vap: "vap",
  cauti: "cauti",
  ssi: "ssi",
  clabsi: "clabsi",
  haiOther: "haiOther",
}

/** Infection surveillance status */
enum InfectionSurveillanceStatus {
  suspected: "suspected",
  confirmed: "confirmed",
  resolved: "resolved",
  notInfection: "notInfection",
}

// --- JKN/BPJS API Enums ---

/** JKN API type */
enum JknApiType {
  vclaim: "vclaim",
  antrean: "antrean",
  antreanFktp: "antrean_fktp",
  apotek: "apotek",
  aplicares: "aplicares",
  icare: "icare",
  pcare: "pcare",
  rekamMedis: "rekam_medis",
}

/** JKN PRB (Program Rujuk Balik) program types */
enum JknPrbProgram {
  diabetesMellitus: "01",
  hipertensi: "02",
  asma: "03",
  penyakitJantung: "04",
  ppok: "05",
  skizofrenia: "06",
  stroke: "07",
  epilepsi: "08",
  sle: "09",
}

/** JKN PRB status */
enum JknPrbStatus {
  active: "active",
  completed: "completed",
  cancelled: "cancelled",
}

/** JKN jenis kontrol */
enum JknJenisKontrol {
  spri: "1",
  suratKontrol: "2",
}

/** JKN surat kontrol status */
enum JknSuratKontrolStatus {
  created: "created",
  used: "used",
  cancelled: "cancelled",
  expired: "expired",
}

/** JKN LPK tindak lanjut */
enum JknLpkTindakLanjut {
  diperbolehkanPulang: "1",
  pemeriksaanPenunjang: "2",
  dirujukKe: "3",
  kontrolKembali: "4",
}

/** JKN jenis obat */
enum JknJenisObat {
  obatPrb: "1",
  obatKronisBelumStabil: "2",
  obatKemoterapi: "3",
}

/** JKN resep status */
enum JknResepStatus {
  created: "created",
  dispensed: "dispensed",
  partiallyDispensed: "partially_dispensed",
  cancelled: "cancelled",
}

/** JKN tipe obat */
enum JknTipeObat {
  nonRacikan: "non_racikan",
  racikan: "racikan",
}

/** JKN iterasi */
enum JknIterasi {
  nonIterasi: "0",
  iterasi: "1",
}

/** JKN kelas kamar */
enum JknKelasKamar {
  kelas1: "1",
  kelas2: "2",
  kelas3: "3",
  vip: "vip",
  vvip: "vvip",
  icu: "icu",
  iccu: "iccu",
  hcu: "hcu",
  nicu: "nicu",
  picu: "picu",
}

/** JKN antrean FKTP status */
enum JknAntreanFktpStatus {
  created: "created",
  hadir: "hadir",
  tidakHadir: "tidak_hadir",
  batal: "batal",
}

/** JKN ICare type */
enum JknIcareType {
  fkrtl: "fkrtl",
  fktp: "fktp",
}

/** JKN ICare status */
enum JknIcareStatus {
  success: "success",
  failed: "failed",
  timeout: "timeout",
}

/** JKN rekam medis status */
enum JknRekamMedisStatus {
  pending: "pending",
  processing: "processing",
  submitted: "submitted",
  rejected: "rejected",
  accepted: "accepted",
}

/** JKN sync status */
enum JknSyncStatus {
  pending: "pending",
  processing: "processing",
  completed: "completed",
  failed: "failed",
  skipped: "skipped",
}

/** JKN sync resource type */
enum JknSyncResourceType {
  sep: "sep",
  rujukan: "rujukan",
  peserta: "peserta",
  inacbg: "inacbg",
  monitoringKlaim: "monitoring_klaim",
  prb: "prb",
  prbObat: "prb_obat",
  suratKontrol: "surat_kontrol",
  lpk: "lpk",
  antreanFkrtl: "antrean_fkrtl",
  antreanFktp: "antrean_fktp",
  resepApotek: "resep_apotek",
  aplicaresKamar: "aplicares_kamar",
  icareFkrtl: "icare_fkrtl",
  icareFktp: "icare_fktp",
  rekamMedis: "rekam_medis",
}

/** JKN sync operation */
enum JknSyncOperation {
  create: "create",
  update: "update",
  delete: "delete",
  search: "search",
  validate: "validate",
}

/** JKN error category */
enum JknErrorCategory {
  transient: "transient",
  client: "client",
  auth: "auth",
  notFound: "not_found",
  server: "server",
  validation: "validation",
  unknownError: "unknown",
}

/** JKN error resolution */
enum JknErrorResolution {
  pending: "pending",
  resolved: "resolved",
  autoResolved: "auto_resolved",
  ignored: "ignored",
}

/** BPJS jenis rawat */
enum BpjsJenisRawat {
  rawatInap: "rawat_inap",
  rawatJalan: "rawat_jalan",
}

/** BPJS environment */
enum BpjsEnvironment {
  development: "development",
  production: "production",
}

/** BPJS health status */
enum BpjsHealthStatus {
  healthy: "healthy",
  degraded: "degraded",
  unhealthy: "unhealthy",
}

/** BPJS verification status */
enum BpjsVerificationStatus {
  pending: "pending",
  approved: "approved",
  partial: "partial",
  rejected: "rejected",
}

/** BPJS SEP status */
enum BpjsSepStatus {
  created: "created",
  used: "used",
  updated: "updated",
  deleted: "deleted",
}

/** BPJS severity level */
enum BpjsSeverityLevel {
  i: "I",
  ii: "II",
  iii: "III",
}

/** BPJS jenis kunjungan */
enum BpjsJenisKunjungan {
  konsultasiKunjunganBaru: "1",
  konsultasiKunjunganLama: "2",
  konsulDokterSpesialis: "3",
  tindakan: "4",
}

/** BPJS INACBG status */
enum BpjsInacbgStatus {
  pending: "pending",
  grouped: "grouped",
  submitted: "submitted",
  purified: "purified",
  verified: "verified",
  paid: "paid",
  rejected: "rejected",
}

/** BPJS INACBG kelas rawat */
enum BpjsInacbgKelasRawat {
  kelas1: "1",
  kelas2: "2",
  kelas3: "3",
}

/** BPJS antrean status */
enum BpjsAntreanStatus {
  booked: "booked",
  checkin: "checkin",
  called: "called",
  serving: "serving",
  done: "done",
  cancelled: "cancelled",
}

// --- Inpatient Enums ---

/** Room class */
enum RoomClass {
  vvip: "vvip",
  vip: "vip",
  class1: "class_1",
  class2: "class_2",
  class3: "class_3",
  icu: "icu",
  nicu: "nicu",
  isolation: "isolation",
}

/** Bed status */
enum BedStatus {
  available: "available",
  occupied: "occupied",
  maintenance: "maintenance",
  reserved: "reserved",
}

/** Admission status */
enum AdmissionStatus {
  admitted: "admitted",
  transferred: "transferred",
  discharged: "discharged",
  deceased: "deceased",
}

/** Admission type */
enum AdmissionType {
  emergency: "emergency",
  elective: "elective",
  transfer: "transfer",
  maternity: "maternity",
}

/** Discharge disposition */
enum DischargeDisposition {
  home: "home",
  transfer: "transfer",
  rehab: "rehab",
  longTermCare: "long_term_care",
  deceased: "deceased",
  ama: "ama",
}

/** MAR (Medication Administration Record) status */
enum MarStatus {
  scheduled: "scheduled",
  given: "given",
  refused: "refused",
  missed: "missed",
  held: "held",
}

// --- Pharmacy Enums ---

/** Medication type */
enum MedicationType {
  prescription: "prescription",
  otc: "otc",
  controlled: "controlled",
  supplement: "supplement",
}

/** Controlled substance schedule */
enum ControlledSubstanceSchedule {
  schedule1: "schedule_1",
  schedule2: "schedule_2",
  schedule3: "schedule_3",
  schedule4: "schedule_4",
  schedule5: "schedule_5",
  nonControlled: "non_controlled",
}

/** Stock movement type */
enum StockMovementType {
  purchase: "purchase",
  sale: "sale",
  returned: "return",
  adjustment: "adjustment",
  transfer: "transfer",
  expiration: "expiration",
  damage: "damage",
  dispense: "dispense",
}

// --- Assessment Enums ---

/** Assessment type */
enum AssessmentType {
  initial: "initial",
  periodic: "periodic",
  preOperative: "pre_operative",
  discharge: "discharge",
}

/** Psychology status */
enum PsychologyStatus {
  normal: "normal",
  depression: "depression",
  fear: "fear",
  aggressive: "aggressive",
  selfHarmRisk: "self_harm_risk",
  other: "other",
}

/** Birth method */
enum BirthMethod {
  spontaneous: "spontaneous",
  cesarean: "cesarean",
  vacuum: "vacuum",
  forceps: "forceps",
}

/** Gestational status */
enum GestationalStatus {
  fullTerm: "full_term",
  preterm: "preterm",
  postTerm: "post_term",
}

// --- HR/Payroll Enums ---

/** Employment type */
enum EmploymentType {
  fullTime: "full_time",
  partTime: "part_time",
  contract: "contract",
  internship: "internship",
}

/** Employment status */
enum EmploymentStatus {
  active: "active",
  onLeave: "on_leave",
  suspended: "suspended",
  terminated: "terminated",
  resigned: "resigned",
}

/** Leave type */
enum LeaveType {
  annual: "annual",
  sick: "sick",
  maternity: "maternity",
  paternity: "paternity",
  unpaid: "unpaid",
  emergency: "emergency",
  other: "other",
}

/** Leave status */
enum LeaveStatus {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  cancelled: "cancelled",
}

/** Payroll status */
enum PayrollStatus {
  draft: "draft",
  pendingApproval: "pending_approval",
  approved: "approved",
  processing: "processing",
  paid: "paid",
  cancelled: "cancelled",
}

/** Attendance status */
enum AttendanceStatus {
  present: "present",
  absent: "absent",
  late: "late",
  earlyLeave: "early_leave",
  halfDay: "half_day",
  onLeave: "on_leave",
}

/** Salary component type */
enum SalaryComponentType {
  earning: "earning",
  deduction: "deduction",
  benefit: "benefit",
}

// --- SaaS Infrastructure Enums ---

/** Subscription plan */
enum SubscriptionPlan {
  basic: "basic",
  standard: "standard",
  premium: "premium",
  enterprise: "enterprise",
}

/** Billing cycle */
enum BillingCycle {
  monthly: "monthly",
  quarterly: "quarterly",
  yearly: "yearly",
}

/** Subscription status */
enum SubscriptionStatus {
  trial: "trial",
  active: "active",
  pastDue: "past_due",
  cancelled: "cancelled",
  suspended: "suspended",
  expired: "expired",
}

/** Feature flag status */
enum FeatureFlagStatus {
  enabled: "enabled",
  disabled: "disabled",
  beta: "beta",
}

// Note: NotificationChannel, NotificationStatus, and NotificationPriority are defined in notification.tsp

/** Document type */
enum DocumentType {
  medicalRecord: "medical_record",
  labResult: "lab_result",
  prescription: "prescription",
  consentForm: "consent_form",
  idCard: "id_card",
  insuranceCard: "insurance_card",
  referralLetter: "referral_letter",
  medicalCertificate: "medical_certificate",
  invoice: "invoice",
  receipt: "receipt",
  other: "other",
}

/** Document status */
enum DocumentStatus {
  uploading: "uploading",
  processing: "processing",
  ready: "ready",
  archived: "archived",
  deleted: "deleted",
}

// Note: VirusScanStatus and FileAccess are defined in file.tsp

// --- Procedure Enums ---

/** Procedure status */
enum ProcedureStatus {
  preparation: "preparation",
  inProgress: "in_progress",
  notDone: "not_done",
  onHold: "on_hold",
  stopped: "stopped",
  completed: "completed",
  enteredInError: "entered_in_error",
  unknownStatus: "unknown",
}

/** Procedure category */
enum ProcedureCategory {
  surgical: "surgical",
  diagnostic: "diagnostic",
  therapeutic: "therapeutic",
  preventive: "preventive",
  palliative: "palliative",
  other: "other",
}

// --- Webhook Enums ---

/** Webhook status */
enum WebhookStatus {
  received: "received",
  processing: "processing",
  processed: "processed",
  failed: "failed",
  ignored: "ignored",
}

/** Webhook source */
enum WebhookSource {
  satusehat: "satusehat",
  jknVclaim: "jkn_vclaim",
  jknAntrean: "jkn_antrean",
  jknApotek: "jkn_apotek",
  jknAplicares: "jkn_aplicares",
  jknIcare: "jkn_icare",
  jknRekamMedis: "jkn_rekam_medis",
}

// --- KIA (Maternal Child Health) Enums ---

/** Pregnancy status */
enum PregnancyStatus {
  ongoing: "ongoing",
  delivered: "delivered",
  miscarried: "miscarried",
  terminated: "terminated",
  ectopic: "ectopic",
}

/** Pregnancy risk level */
enum PregnancyRisk {
  low: "low",
  medium: "medium",
  high: "high",
}

/** Delivery method */
enum DeliveryMethod {
  spontaneous: "spontaneous",
  vacuum: "vacuum",
  forceps: "forceps",
  cesarean: "cesarean",
}

/** Delivery outcome */
enum DeliveryOutcome {
  liveBirth: "live_birth",
  stillbirth: "stillbirth",
  neonatalDeath: "neonatal_death",
}

/** Immunization type */
enum ImmunizationType {
  bcg: "bcg",
  hepatitisB: "hepatitis_b",
  polio: "polio",
  dpt: "dpt",
  hib: "hib",
  pcv: "pcv",
  rotavirus: "rotavirus",
  mmr: "mmr",
  je: "je",
  influenza: "influenza",
  other: "other",
}

// --- Dental Enums ---

/** Tooth condition */
enum ToothCondition {
  healthy: "healthy",
  decayed: "decayed",
  missing: "missing",
  filled: "filled",
  crown: "crown",
  bridge: "bridge",
  implant: "implant",
  rootCanal: "root_canal",
  extraction: "extraction",
  other: "other",
}

/** Dental procedure type */
enum DentalProcedureType {
  extraction: "extraction",
  filling: "filling",
  rootCanal: "root_canal",
  crown: "crown",
  bridge: "bridge",
  implant: "implant",
  scaling: "scaling",
  cleaning: "cleaning",
  whitening: "whitening",
  other: "other",
}

// --- Billing Additional Enums ---

/** Charge status */
enum ChargeStatus {
  pending: "pending",
  invoiced: "invoiced",
  paid: "paid",
  cancelled: "cancelled",
  adjusted: "adjusted",
}

/** Charge source type */
enum ChargeSourceType {
  encounter: "encounter",
  procedure: "procedure",
  medication: "medication",
  lab: "lab",
  room: "room",
  nursing: "nursing",
  other: "other",
}

/** Charge adjustment type */
enum ChargeAdjustmentType {
  discount: "discount",
  correction: "correction",
  writeOff: "write_off",
  reversal: "reversal",
}

/** Deposit status */
enum DepositStatus {
  active: "active",
  applied: "applied",
  refunded: "refunded",
  expired: "expired",
}

/** Cash closing shift */
enum CashClosingShift {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
}

/** Cash closing status */
enum CashClosingStatus {
  pending: "pending",
  closed: "closed",
  verified: "verified",
}

/** Variance status */
enum VarianceStatus {
  balanced: "balanced",
  short: "short",
  over: "over",
}

// --- Reporting Enums ---

/** Report category */
enum ReportCategory {
  operational: "operational",
  clinical: "clinical",
  financial: "financial",
  regulatory: "regulatory",
  kia: "kia",
}

/** Report frequency */
enum ReportFrequency {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  onDemand: "on_demand",
}

/** Report format */
enum ReportFormat {
  pdf: "pdf",
  excel: "excel",
  csv: "csv",
}

/** Report generation status */
enum ReportGenerationStatus {
  pending: "pending",
  processing: "processing",
  completed: "completed",
  failed: "failed",
}

// --- SatuSehat Additional Enums ---

/** SatuSehat environment */
enum SatusehatEnvironment {
  sandbox: "sandbox",
  production: "production",
}

/** SatuSehat operation */
enum SatusehatOperation {
  create: "create",
  update: "update",
  search: "search",
}

/** SatuSehat error category */
enum SatusehatErrorCategory {
  transient: "transient",
  client: "client",
  auth: "auth",
  notFound: "not_found",
  server: "server",
  unknownError: "unknown",
}

/** SatuSehat error resolution */
enum SatusehatErrorResolution {
  pending: "pending",
  autoResolved: "auto_resolved",
  manualResolved: "manual_resolved",
  ignored: "ignored",
}

/** SatuSehat consent scope */
enum SatusehatConsentScope {
  all: "all",
  encounterOnly: "encounter_only",
  none: "none",
}

/** SatuSehat consent method */
enum SatusehatConsentMethod {
  written: "written",
  verbal: "verbal",
  electronic: "electronic",
}

/** SatuSehat lookup status */
enum SatusehatLookupStatus {
  found: "found",
  notFound: "not_found",
  error: "error",
}

/** SatuSehat verification method */
enum SatusehatVerificationMethod {
  nikLookup: "nik_lookup",
  manual: "manual",
}
