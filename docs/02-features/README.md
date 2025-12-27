# Feature Specifications

> **Status**: 📝 Design Phase
> **Total Features**: 21 feature specification files
> **Modules**: 14 functional modules
> **Standard**: FHIR R4 (Satusehat), BPJS APIs

---

## Overview

This folder contains detailed feature specifications derived from the user stories in `01-user-stories/`. Each feature specification includes:

- **API Endpoints** with request/response schemas
- **Data Models** with field definitions and indexes
- **FHIR Resource Mappings** for Satusehat integration
- **Business Rules** and validation logic
- **Dependencies** and module relationships

---

## Module Index

### Module 00: User & Access Management

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-0.1](00-user-access-management/FEATURE-0.1-organization-setup.md) | Organization & Branch Setup | P0 | US-0.1 |
| [FEATURE-0.2](00-user-access-management/FEATURE-0.2-user-management.md) | User Invitation & Registration | P0 | US-0.2, US-0.5 |
| [FEATURE-0.3](00-user-access-management/FEATURE-0.3-authentication.md) | Authentication & 2FA | P0 | US-0.3, US-0.4 |
| [FEATURE-0.4](00-user-access-management/FEATURE-0.4-user-operations.md) | Role Assignment & Audit | P0 | US-0.6, US-0.7, US-0.8 |

### Module 01: Patient Management

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-1.1](01-patient-management/FEATURE-1.1-patient-registration.md) | Patient Registration & Search | P0 | US-1.1, US-1.2 |
| [FEATURE-1.2](01-patient-management/FEATURE-1.2-medical-records.md) | Medical Records & Allergies | P0 | US-1.3, US-1.4, US-1.5 |

### Module 02: Practitioners & Polyclinics

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-2.1](02-practitioners-polyclinics/FEATURE-2.1-polyclinic-setup.md) | Polyclinic Configuration | P0 | US-2.1 |
| [FEATURE-2.2](02-practitioners-polyclinics/FEATURE-2.2-practitioner-management.md) | Practitioner Management | P0 | US-2.2, US-2.3, US-2.4, US-2.5 |

### Module 03: Appointment & Queue

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-3.1](03-appointment-queue/FEATURE-3.1-appointment-booking.md) | Appointment Booking | P0 | US-3.1, US-3.6 |
| [FEATURE-3.2](03-appointment-queue/FEATURE-3.2-queue-management.md) | Queue Management | P0 | US-3.2, US-3.3, US-3.4, US-3.5 |

### Module 04: Medical Services (General)

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-4.1](04-medical-services-general/FEATURE-4.1-clinical-encounter.md) | Clinical Encounter & SOAP | P0 | US-4.1, US-4.2, US-4.3, US-4.4 |
| [FEATURE-4.2](04-medical-services-general/FEATURE-4.2-prescription-orders.md) | Prescriptions & Orders | P0 | US-4.5, US-4.6, US-4.7 |

### Module 05: Medical Services (Dental)

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-5.1](05-medical-services-dental/FEATURE-5.1-dental-services.md) | Dental Services | P1 | US-5.1 to US-5.5 |

### Module 06: Medical Services (KIA)

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-6.1](06-medical-services-kia/FEATURE-6.1-kia-services.md) | KIA/Maternal Child Health | P0 | US-6.1 to US-6.7 |

### Module 07: Inpatient

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-7.1](07-inpatient/FEATURE-7.1-inpatient.md) | Inpatient Management | P1 | US-7.1 to US-7.6 |

### Module 08: Pharmacy

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-8.1](08-pharmacy/FEATURE-8.1-pharmacy.md) | Pharmacy Management | P0 | US-8.1 to US-8.6 |

### Module 09: Laboratory

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-9.1](09-laboratory/FEATURE-9.1-laboratory.md) | Laboratory Management | P0 | US-9.1 to US-9.5 |

### Module 10: Billing & Payment

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-10.1](10-billing-payment/FEATURE-10.1-billing.md) | Billing & Payment | P0 | US-10.1 to US-10.6 |

### Module 11: Satusehat Integration

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-11.1](11-satusehat-integration/FEATURE-11.1-satusehat-integration.md) | Satusehat FHIR Integration | P0 | US-11.1 to US-11.5 |

### Module 12: BPJS Integration

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-12.1](12-bpjs-integration/FEATURE-12.1-bpjs-integration.md) | BPJS Kesehatan Integration | P0 | US-12.1 to US-12.8 |

### Module 13: Reporting & Analytics

| Feature | Description | Priority | Stories |
|---------|-------------|----------|---------|
| [FEATURE-13.1](13-reporting/FEATURE-13.1-reporting.md) | Reporting & Analytics | P1 | US-13.1 to US-13.5 |

---

## Feature Counts by Module

| Module | Features | User Stories | Priority |
|--------|----------|--------------|----------|
| 00 - User & Access Management | 4 | 14 | P0 |
| 01 - Patient Management | 2 | 5 | P0 |
| 02 - Practitioners & Polyclinics | 2 | 5 | P0 |
| 03 - Appointment & Queue | 2 | 6 | P0 |
| 04 - Medical Services General | 2 | 7 | P0 |
| 05 - Medical Services Dental | 1 | 5 | P1 |
| 06 - Medical Services KIA | 1 | 7 | P0 |
| 07 - Inpatient | 1 | 6 | P1 |
| 08 - Pharmacy | 1 | 6 | P0 |
| 09 - Laboratory | 1 | 5 | P0 |
| 10 - Billing & Payment | 1 | 6 | P0 |
| 11 - Satusehat Integration | 1 | 5 | P0 |
| 12 - BPJS Integration | 1 | 8 | P0 |
| 13 - Reporting & Analytics | 1 | 5 | P1 |
| **Total** | **21** | **90** | - |

---

## Module Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│                    Module 00: User & Access                      │
│                    (Foundation - All modules depend on this)     │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Module 01: Patient      Module 02: Practitioners & Polyclinics │
│  (Core patient data)     (Core provider data)                   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Module 03: Appointment & Queue                │
│                    (Visit scheduling)                            │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Module 04-06: Clinical Services (General, Dental, KIA)         │
│  Module 07: Inpatient                                           │
│  (Clinical encounters and documentation)                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│ Module 08:        │  │ Module 09:        │  │ Module 10:        │
│ Pharmacy          │  │ Laboratory        │  │ Billing           │
└───────────────────┘  └───────────────────┘  └───────────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Module 11: Satusehat Integration (FHIR R4)                     │
│  Module 12: BPJS Integration (National Insurance)               │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Module 13: Reporting & Analytics             │
│                    (Aggregates data from all modules)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integration Standards

### FHIR R4 Resources (Satusehat)

| Resource | Feature | Description |
|----------|---------|-------------|
| Organization | FEATURE-0.1 | Clinic organization |
| Location | FEATURE-2.1 | Polyclinics |
| Practitioner | FEATURE-2.2 | Healthcare providers |
| PractitionerRole | FEATURE-2.2 | Provider assignments |
| Patient | FEATURE-1.1 | Patient demographics |
| Encounter | FEATURE-4.1 | Clinical visits |
| Condition | FEATURE-4.1 | Diagnoses (ICD-10) |
| Observation | FEATURE-4.1, 9.1 | Vital signs, Lab results |
| Procedure | FEATURE-4.1, 5.1 | Clinical procedures |
| MedicationRequest | FEATURE-4.2 | Prescriptions |
| MedicationDispense | FEATURE-8.1 | Pharmacy dispense |
| ServiceRequest | FEATURE-4.2 | Lab/referral orders |
| DiagnosticReport | FEATURE-9.1 | Lab reports |
| Immunization | FEATURE-6.1 | Vaccinations |
| Specimen | FEATURE-9.1 | Lab specimens |
| AllergyIntolerance | FEATURE-1.2 | Patient allergies |

### BPJS APIs

| API | Feature | Purpose |
|-----|---------|---------|
| VClaim | FEATURE-12.1 | SEP, eligibility, referrals |
| PCare | FEATURE-12.1 | Primary care visits |
| Antrean | FEATURE-12.1 | Mobile JKN queue |
| E-Klaim | FEATURE-12.1 | INA-CBG claims |

### Coding Systems

| System | Usage | Reference |
|--------|-------|-----------|
| ICD-10 | Diagnoses | WHO |
| ICD-9-CM | Procedures | WHO |
| LOINC | Lab tests | loinc.org |
| KFA | Medications | Kemkes |
| SNOMED CT | Clinical terms | IHTSDO |

---

## Feature Specification Template

Each feature specification follows this structure:

```markdown
# FEATURE-X.X: Feature Name

> **Module**: Module Name
> **Related User Stories**: US-X.X, US-X.X
> **Implementation Priority**: P0/P1/P2
> **Status**: 📝 Design

## Feature Overview
- Description
- Business Value
- User Impact

## Related User Stories

## API Endpoints Overview

## Detailed Endpoint Specifications

## Data Models

## FHIR Resource Mapping (if applicable)

## Business Rules

## Dependencies

## Enables
```

---

## Next Steps

1. **Technical Design** - Create database schema migrations
2. **API Design** - Generate OpenAPI/Swagger specifications
3. **Implementation** - Develop features by priority order
4. **Testing** - Unit, integration, and E2E test specifications
5. **Deployment** - Infrastructure and deployment configuration
