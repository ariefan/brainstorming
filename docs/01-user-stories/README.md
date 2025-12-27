# Clinical Application - User Stories

> **FHIR R4 Compliant** | **Satusehat Integration** | **BPJS Kesehatan Integration**
>
> Production-ready clinical application specification for multi-specialty polyclinics (General, Dental, Midwifery/KIA) with complete outpatient and inpatient support.

---

## Module Overview

| # | Module | Stories | Priority | FHIR Resources |
|---|--------|---------|----------|----------------|
| 00 | [User & Access Management](00-user-access-management/) | US-0.1 to US-0.14 | P0 | Organization |
| 01 | [Patient Management](01-patient-management/) | US-1.1 to US-1.5 | P0 | Patient, RelatedPerson, AllergyIntolerance |
| 02 | [Practitioners & Polyclinics](02-practitioners-polyclinics/) | US-2.1 to US-2.5 | P0 | Practitioner, PractitionerRole, Location |
| 03 | [Appointment & Queue](03-appointment-queue/) | US-3.1 to US-3.6 | P0 | - |
| 04 | [Medical Services - General](04-medical-services-general/) | US-4.1 to US-4.7 | P0 | Encounter, Condition, Observation, MedicationRequest |
| 05 | [Medical Services - Dental](05-medical-services-dental/) | US-5.1 to US-5.5 | P0 | Encounter, Condition, Procedure |
| 06 | [Medical Services - KIA](06-medical-services-kia/) | US-6.1 to US-6.7 | P0 | Encounter, Observation, Immunization |
| 07 | [Inpatient](07-inpatient/) | US-7.1 to US-7.6 | P1 | Encounter, MedicationAdministration |
| 08 | [Pharmacy](08-pharmacy/) | US-8.1 to US-8.6 | P0 | Medication, MedicationDispense |
| 09 | [Laboratory](09-laboratory/) | US-9.1 to US-9.5 | P0 | ServiceRequest, Specimen, DiagnosticReport |
| 10 | [Billing & Payment](10-billing-payment/) | US-10.1 to US-10.6 | P0 | - |
| 11 | [Satusehat Integration](11-satusehat-integration/) | US-11.1 to US-11.5 | P0 | All FHIR Resources |
| 12 | [BPJS Integration](12-bpjs-integration/) | US-12.1 to US-12.8 | P0 | - |
| 13 | [Reporting](13-reporting/) | US-13.1 to US-13.5 | P1 | - |

**Total Stories: 87 | Total Modules: 14**

---

## Key Features

### Multi-Specialty Polyclinic Support
- **Poli Umum** (General Practice) - Doctors
- **Poli Gigi** (Dental) - Dentists with odontogram
- **Poli KIA/Kebidanan** (Maternal & Child Health) - Midwives with ANC/PNC

### Queue Management System
- Real-time queue display (TV/monitor) via WebSocket
- Audio announcement with Text-to-Speech
- Priority queue (elderly, disabled, emergency)
- Estimated wait time calculation

### National Integration
- **Satusehat** (FHIR R4) - IHS ID, Encounter, Diagnosis, Medications, Lab
- **BPJS Kesehatan** - VClaim (SEP), INA-CBG, Pharmacy claims

---

## Dependency Graph

```
          User & Access Management (Foundation)
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
Patient Management  Practitioners   Satusehat Integration
         │          & Polyclinics            │
         │             │                     │
         └──────┬──────┘                     │
                ▼                            │
        Appointment & Queue                  │
                │                            │
         ┌──────┼──────┬─────────────┐      │
         ▼      ▼      ▼             ▼      │
   Medical   Medical   Medical    Inpatient │
   Services  Services  Services      │      │
   (General) (Dental)  (KIA)         │      │
         │      │      │             │      │
         └──────┼──────┴─────────────┤      │
                │                    │      │
         ┌──────┴──────┐            │      │
         ▼             ▼            ▼      ▼
    Pharmacy      Laboratory ──► BPJS Integration
         │             │
         └──────┬──────┘
                ▼
       Billing & Payment
                │
                ▼
           Reporting
```

---

## FHIR R4 Resource Mapping

### Satusehat Sync Sequence

```
1. Prerequisites (one-time)
   ├── Organization (clinic profile)
   ├── Location (each polyclinic)
   ├── Practitioner (lookup by NIK)
   └── PractitionerRole (practitioner-location link)

2. Per Patient (first visit)
   └── Patient (lookup by NIK → IHS Patient ID)

3. Per Encounter (each visit)
   ├── Encounter (arrived → in-progress → finished)
   ├── Observation (vital signs)
   ├── Condition (diagnoses with ICD-10)
   ├── Procedure (with ICD-9-CM)
   ├── MedicationRequest (prescriptions)
   ├── MedicationDispense (pharmacy)
   ├── ServiceRequest (lab orders)
   ├── Specimen (lab specimens)
   ├── DiagnosticReport (lab results)
   └── Composition (resume medis bundle)
```

---

## BPJS Kesehatan APIs

| API | Purpose | Usage |
|-----|---------|-------|
| **VClaim** | SEP creation, visits, referrals | Outpatient & Inpatient |
| **PCare** | Primary care visits | FKTP (Puskesmas) |
| **E-Klaim** | INA-CBG claim grouping | Inpatient claims |
| **Apotek** | Pharmacy claims | Medication reimbursement |

---

## Standards & Coding Systems

| System | Usage |
|--------|-------|
| **ICD-10** | Diagnosis coding |
| **ICD-9-CM** | Procedure coding |
| **LOINC** | Laboratory tests |
| **KFA** | Katalog Farmasi Alkes (medications) |
| **SNOMED CT** | Clinical terms |
| **NIK** | National ID (16 digits) |
| **IHS ID** | Satusehat patient/practitioner ID |

---

## Files

| Module | File |
|--------|------|
| 00 | [US-0.1-0.14-user-access-management.md](00-user-access-management/US-0.1-0.14-user-access-management.md) |
| 01 | [US-1.1-1.5-patient-management.md](01-patient-management/US-1.1-1.5-patient-management.md) |
| 02 | [US-2.1-2.5-practitioners-polyclinics.md](02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md) |
| 03 | [US-3.1-3.6-appointment-queue.md](03-appointment-queue/US-3.1-3.6-appointment-queue.md) |
| 04 | [US-4.1-4.7-medical-services-general.md](04-medical-services-general/US-4.1-4.7-medical-services-general.md) |
| 05 | [US-5.1-5.5-medical-services-dental.md](05-medical-services-dental/US-5.1-5.5-medical-services-dental.md) |
| 06 | [US-6.1-6.7-medical-services-kia.md](06-medical-services-kia/US-6.1-6.7-medical-services-kia.md) |
| 07 | [US-7.1-7.6-inpatient.md](07-inpatient/US-7.1-7.6-inpatient.md) |
| 08 | [US-8.1-8.6-pharmacy.md](08-pharmacy/US-8.1-8.6-pharmacy.md) |
| 09 | [US-9.1-9.5-laboratory.md](09-laboratory/US-9.1-9.5-laboratory.md) |
| 10 | [US-10.1-10.6-billing-payment.md](10-billing-payment/US-10.1-10.6-billing-payment.md) |
| 11 | [US-11.1-11.5-satusehat-integration.md](11-satusehat-integration/US-11.1-11.5-satusehat-integration.md) |
| 12 | [US-12.1-12.8-bpjs-integration.md](12-bpjs-integration/US-12.1-12.8-bpjs-integration.md) |
| 13 | [US-13.1-13.5-reporting.md](13-reporting/US-13.1-13.5-reporting.md) |

---

## Getting Started

1. Set up **User & Access Management** (US-0.x) - organization, users, authentication, roles
2. Configure **Practitioners & Polyclinics** (US-2.x) - clinical staff and locations
3. Set up **Patient Management** (US-1.x) - patient registration
4. Configure **Satusehat Integration** (US-11.x) - national data exchange
5. Implement **Queue System** (US-3.x) - patient flow management
6. Build **Medical Services** (US-4.x to US-6.x) - core clinical workflows
7. Add **Pharmacy & Laboratory** (US-8.x, US-9.x) - ancillary services
8. Integrate **BPJS** (US-12.x) - insurance claims
9. Complete **Billing & Reporting** (US-10.x, US-13.x) - financial management

---

## Priority Legend

- **P0 (Critical)**: Core functionality, must have for MVP
- **P1 (High)**: Important features, needed soon after MVP
- **P2 (Medium)**: Nice to have, can be phased

---

## Source Documents

- [Raw Requirements](../00-raw-ideas/clinic-app.txt)
- [Satusehat Platform Documentation](https://satusehat.kemkes.go.id/platform/docs/)
- [BPJS VClaim API Documentation](https://dvlp.bpjs-kesehatan.go.id/)
- [HL7 FHIR R4](https://hl7.org/fhir/R4/)

