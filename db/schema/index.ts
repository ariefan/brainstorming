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

// Inpatient tables
export * from "./inpatient";

// Pharmacy tables
export * from "./pharmacy";

// Laboratory tables
export * from "./laboratory";

// Billing and payment tables
export * from "./billing";

// SatuSehat FHIR R4 integration tables
export * from "./satusehat";

// BPJS Kesehatan integration tables
export * from "./bpjs";

// Reporting and analytics tables
export * from "./reports";
