// ============================================================================
// DRIZZLE POSTGRESQL SCHEMA EXPORTS
// ============================================================================
// This file exports all schema tables and relations for the clinic management system
// All resources are stored in BSON format using JSONB fields
// Supports SatuSehat FHIR R4 format and BPJS Kesehatan integration
// ============================================================================

// Core enums and helper functions
export * from "./core";

// Organization tables
export * from "./organization";

// User access management tables
export * from "./users";

// Patient management tables
export * from "./patients";

// Practitioner and polyclinic tables
export * from "./practitioners";

// Appointment and queue tables
export * from "./appointments";

// Medical services tables (general, dental, KIA)
export * from "./medical";

// Initial assessment tables (Kajian Awal)
export * from "./assessments";

// Inpatient tables
export * from "./inpatient";

// Pharmacy tables
export * from "./pharmacy";

// Laboratory tables
export * from "./laboratory";

// Billing and payment tables
export * from "./billing";

// HR and Payroll tables
export * from "./hr";

// Audit and compliance tables
export * from "./audit";

// SaaS infrastructure tables
export * from "./saas";

// Notification tables
export * from "./notifications";

// Document and file management tables
export * from "./documents";

// SatuSehat FHIR R4 integration tables
export * from "./satusehat";

// BPJS Kesehatan integration tables
export * from "./jkn-config";
export * from "./jkn-vclaim";
export * from "./jkn-prb";
export * from "./jkn-rencana-kontrol";
export * from "./jkn-lpk";
export * from "./jkn-antrean";
export * from "./jkn-antrean-fktp";
export * from "./jkn-apotek";
export * from "./jkn-aplicares";
export * from "./jkn-icare";
export * from "./jkn-rekam-medis";
export * from "./jkn-referensi";
export * from "./jkn-sync";

// Reporting and analytics tables
export * from "./reports";
