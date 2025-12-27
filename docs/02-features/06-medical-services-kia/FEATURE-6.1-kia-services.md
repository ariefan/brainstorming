# FEATURE-6.1: KIA & Maternal Health Services

> **Module**: Medical Services KIA
> **Related User Stories**: US-6.1, US-6.2, US-6.3, US-6.4, US-6.5, US-6.6, US-6.7
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive maternal and child health (KIA) services including antenatal care (K1-K4), pregnancy risk assessment, partograph for labor monitoring, postnatal care, family planning, child immunization, and WHO growth monitoring.

### Business Value
Ensures standardized KIA care per Kemenkes guidelines, enables tracking of K1-K4 coverage indicators, supports immunization schedule compliance, and provides growth monitoring with WHO z-scores.

### User Impact
Midwives can conduct structured ANC visits, monitor labor with partograph, track immunization schedules, and plot child growth on WHO charts with automatic nutritional status assessment.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-6.1 | Antenatal Care (ANC) Visits | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-61-antenatal-care-anc-visits) |
| US-6.2 | Pregnancy History & Risk Assessment | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-62-pregnancy-history--risk-assessment) |
| US-6.3 | Partograph (Labor Monitoring) | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-63-partograph-labor-monitoring) |
| US-6.4 | Postnatal Care (PNC) | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-64-postnatal-care-pnc) |
| US-6.5 | Family Planning (KB) Services | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-65-family-planning-kb-services) |
| US-6.6 | Child Immunization | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-66-child-immunization) |
| US-6.7 | Child Growth Monitoring (WHO Charts) | [View](../../01-user-stories/06-medical-services-kia/US-6.1-6.7-medical-services-kia.md#us-67-child-growth-monitoring-who-charts) |

---

## API Endpoints Overview

### Pregnancy & ANC
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/patients/{id}/pregnancies` | Register pregnancy | Yes | Midwife |
| GET | `/api/v1/patients/{id}/pregnancies` | List pregnancies | Yes | Midwife |
| POST | `/api/v1/pregnancies/{id}/anc-visits` | Record ANC visit | Yes | Midwife |
| GET | `/api/v1/pregnancies/{id}/anc-visits` | List ANC visits | Yes | Midwife |
| POST | `/api/v1/pregnancies/{id}/risk-assessment` | Assess risk | Yes | Midwife |

### Labor & Delivery
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/pregnancies/{id}/labor` | Start labor record | Yes | Midwife |
| POST | `/api/v1/labor/{id}/partograph` | Add partograph entry | Yes | Midwife |
| GET | `/api/v1/labor/{id}/partograph` | Get partograph | Yes | Midwife |
| POST | `/api/v1/labor/{id}/delivery` | Record delivery | Yes | Midwife |

### Postnatal Care
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/pregnancies/{id}/pnc-visits` | Record PNC visit | Yes | Midwife |
| GET | `/api/v1/pregnancies/{id}/pnc-visits` | List PNC visits | Yes | Midwife |

### Family Planning
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/family-planning` | Record KB visit | Yes | Midwife |
| GET | `/api/v1/patients/{id}/family-planning` | Get KB history | Yes | Midwife |

### Child Health
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/immunizations` | Record immunization | Yes | Midwife |
| GET | `/api/v1/patients/{id}/immunizations` | Get immunization history | Yes | Midwife |
| GET | `/api/v1/patients/{id}/immunization-schedule` | Get due vaccines | Yes | Midwife |
| POST | `/api/v1/encounters/{id}/growth` | Record growth measurement | Yes | Midwife |
| GET | `/api/v1/patients/{id}/growth` | Get growth history | Yes | Midwife |

---

## Detailed Endpoint Specifications

### POST /api/v1/patients/{id}/pregnancies

```yaml
method: POST
path: /api/v1/patients/{id}/pregnancies
description: Register new pregnancy

authentication:
  required: true
  roles: [midwife, doctor]

request:
  body:
    type: object
    required: [lmp_date]
    properties:
      pregnancy_number:
        type: integer
        description: Gravida number
      gravida:
        type: integer
      para:
        type: integer
      abortus:
        type: integer
      living_children:
        type: integer
      lmp_date:
        type: date
        description: HPHT (Hari Pertama Haid Terakhir)
      edd_method:
        type: enum
        values: [lmp, ultrasound, clinical]
        default: lmp
      ultrasound_edd:
        type: date
        description: EDD from ultrasound
      ultrasound_date:
        type: date

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      pregnancy_number: integer
      lmp_date: date
      edd_date: date
      gestational_age:
        weeks: integer
        days: integer
      trimester: integer
      obstetric_history: string (G_P_A_)
      status: "active"
```

### POST /api/v1/pregnancies/{id}/anc-visits

```yaml
method: POST
path: /api/v1/pregnancies/{id}/anc-visits
description: Record antenatal care visit

authentication:
  required: true
  roles: [midwife]

request:
  body:
    type: object
    required: [encounter_id]
    properties:
      encounter_id:
        type: uuid
      visit_type:
        type: enum
        values: [k1, k2, k3, k4, additional]

      # Subjective
      chief_complaint:
        type: string
      fetal_movement:
        type: enum
        values: [present, absent, reduced]
      contractions:
        type: boolean
      vaginal_bleeding:
        type: boolean
      other_symptoms:
        type: string

      # Vital signs linked from encounter
      vital_sign_id:
        type: uuid

      # Weight & Nutrition
      pre_pregnancy_weight:
        type: decimal
      current_weight:
        type: decimal
      height:
        type: decimal
      lila:
        type: decimal
        description: Mid-Upper Arm Circumference (cm)

      # Abdominal examination
      fundal_height:
        type: decimal
      fetal_lie:
        type: enum
        values: [longitudinal, oblique, transverse]
      fetal_presentation:
        type: enum
        values: [cephalic, breech, shoulder]
      fetal_heart_rate:
        type: integer
      fetal_heart_rhythm:
        type: enum
        values: [regular, irregular]

      # Lab results
      hemoglobin:
        type: decimal
      blood_type:
        type: enum
        values: [A, B, AB, O]
      hbsag:
        type: enum
        values: [reactive, non_reactive]
      hiv:
        type: enum
        values: [reactive, non_reactive]
      urine_protein:
        type: enum
        values: [negative, trace, 1+, 2+, 3+, 4+]

      # Immunization & Supplements
      tt_given_this_visit:
        type: boolean
      iron_tablets_given:
        type: integer

      # Risk & Plan
      danger_signs:
        type: array[string]
      referral_needed:
        type: boolean
      next_visit_date:
        type: date
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      pregnancy_id: uuid
      visit_number: integer
      visit_type: enum
      gestational_age_weeks: integer
      trimester: integer
      nutrition_status: enum
      risk_factors_identified: array
      next_visit_date: date
      k_coverage:
        k1: boolean
        k2: boolean
        k3: boolean
        k4: boolean
```

### POST /api/v1/labor/{id}/partograph

```yaml
method: POST
path: /api/v1/labor/{id}/partograph
description: Add partograph entry during labor

authentication:
  required: true
  roles: [midwife]

request:
  body:
    type: object
    properties:
      # Fetal monitoring
      fetal_heart_rate:
        type: integer
      fetal_heart_pattern:
        type: enum
        values: [normal, early_decel, late_decel, variable_decel]
      amniotic_fluid:
        type: enum
        values: [clear, meconium_light, meconium_thick, bloody]
      moulding:
        type: enum
        values: [0, 1, 2, 3]

      # Progress
      cervical_dilation:
        type: decimal
        min: 0
        max: 10
      cervical_effacement:
        type: integer
        min: 0
        max: 100
      station:
        type: enum
        values: [-5, -4, -3, -2, -1, 0, +1, +2, +3, +4, +5]

      # Contractions
      contractions_frequency:
        type: integer
        description: Per 10 minutes
      contractions_duration:
        type: enum
        values: [less_20, 20_40, more_40]

      # Maternal
      blood_pressure_systolic:
        type: integer
      blood_pressure_diastolic:
        type: integer
      pulse:
        type: integer
      temperature:
        type: decimal
      urine_output:
        type: integer
      urine_protein:
        type: enum
        values: [negative, trace, 1+, 2+, 3+, 4+]

      # Medications
      oxytocin_units_per_hour:
        type: decimal
      iv_fluids:
        type: string
      medications:
        type: string

      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      labor_record_id: uuid
      recorded_at: datetime
      hours_since_onset: decimal
      cervical_dilation: decimal
      alert_line_status: "normal" | "crossed" | "approaching"
      action_line_status: "normal" | "crossed" | "approaching"
      recommended_action: string
```

### POST /api/v1/encounters/{id}/immunizations

```yaml
method: POST
path: /api/v1/encounters/{id}/immunizations
description: Record immunization administration

authentication:
  required: true
  roles: [midwife, nurse]

request:
  body:
    type: object
    required: [vaccine_code, dose_number]
    properties:
      vaccine_code:
        type: string
      vaccine_name:
        type: string
      dose_number:
        type: integer
      dose_sequence:
        type: string
        description: e.g., "DPT-HB-Hib 2"
      administration_site:
        type: enum
        values: [left_arm, right_arm, left_thigh, right_thigh, oral]
      route:
        type: enum
        values: [intramuscular, subcutaneous, intradermal, oral]
      lot_number:
        type: string
      expiry_date:
        type: date
      manufacturer:
        type: string
      adverse_reaction:
        type: boolean
        default: false
      reaction_details:
        type: string
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_id: uuid
      patient_id: uuid
      vaccine_name: string
      dose_sequence: string
      administered_date: datetime
      administered_by: object
      next_dose_due_date: date
      satusehat_immunization_id: string
```

### POST /api/v1/encounters/{id}/growth

```yaml
method: POST
path: /api/v1/encounters/{id}/growth
description: Record child growth measurement

authentication:
  required: true
  roles: [midwife, nurse]

request:
  body:
    type: object
    required: [weight]
    properties:
      weight:
        type: decimal
        description: kg
      length_height:
        type: decimal
        description: cm (length <2y, height >=2y)
      head_circumference:
        type: decimal
        description: cm
      muac:
        type: decimal
        description: Mid-Upper Arm Circumference (cm)
      breastfeeding_status:
        type: enum
        values: [exclusive, predominant, complementary, none]
      feeding_issues:
        type: string
      gross_motor:
        type: enum
        values: [normal, delayed, not_assessed]
      fine_motor:
        type: enum
        values: [normal, delayed, not_assessed]
      language:
        type: enum
        values: [normal, delayed, not_assessed]
      social:
        type: enum
        values: [normal, delayed, not_assessed]
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      age_months: integer
      weight: decimal
      length_height: decimal
      bmi: decimal
      z_scores:
        weight_for_age: decimal
        length_height_for_age: decimal
        weight_for_length_height: decimal
        bmi_for_age: decimal
      status:
        weight_for_age: enum
        stunting: enum
        wasting: enum
      alerts:
        - type: string
          message: string
          severity: string
      intervention_needed: boolean
```

---

## Data Models

### Pregnancy

```yaml
table_name: pregnancies

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  pregnancy_number:
    type: integer
  is_current:
    type: boolean
    default: true
  gravida:
    type: integer
  para:
    type: integer
  abortus:
    type: integer
  living_children:
    type: integer
  lmp_date:
    type: date
  edd_date:
    type: date
  edd_method:
    type: enum
    values: [lmp, ultrasound, clinical]
  ultrasound_edd:
    type: date
    nullable: true
  risk_level:
    type: enum
    values: [low, moderate, high, very_high]
    default: low
  risk_factors:
    type: array[string]
    nullable: true
  outcome:
    type: enum
    values: [ongoing, live_birth, stillbirth, miscarriage, abortion, ectopic]
    nullable: true
  outcome_date:
    type: date
    nullable: true
  delivery_type:
    type: enum
    values: [spontaneous, assisted, cesarean]
    nullable: true
  status:
    type: enum
    values: [active, delivered, ended]
    default: active
  created_at:
    type: datetime
  updated_at:
    type: datetime
```

### ANC Visit

```yaml
table_name: anc_visits

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  pregnancy_id:
    type: uuid
    foreign_key: pregnancies.id
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  visit_number:
    type: integer
  visit_type:
    type: enum
    values: [k1, k2, k3, k4, additional]
  gestational_age_weeks:
    type: integer
  gestational_age_days:
    type: integer
  trimester:
    type: enum
    values: [1, 2, 3]
  chief_complaint:
    type: text
    nullable: true
  fetal_movement:
    type: enum
    values: [present, absent, reduced]
    nullable: true
  vital_sign_id:
    type: uuid
    nullable: true
  pre_pregnancy_weight:
    type: decimal
    nullable: true
  current_weight:
    type: decimal
  weight_gain:
    type: decimal
  height:
    type: decimal
  lila:
    type: decimal
    nullable: true
  nutrition_status:
    type: enum
    values: [normal, kek, overweight]
    nullable: true
  fundal_height:
    type: decimal
    nullable: true
  fetal_heart_rate:
    type: integer
    nullable: true
  hemoglobin:
    type: decimal
    nullable: true
  tt_status:
    type: enum
    values: [tt1, tt2, tt3, tt4, tt5, complete]
    nullable: true
  iron_tablets_given:
    type: integer
    default: 0
  danger_signs:
    type: array[string]
    nullable: true
  referral_needed:
    type: boolean
    default: false
  next_visit_date:
    type: date
    nullable: true
  examined_by:
    type: uuid
    foreign_key: practitioners.id
  examined_at:
    type: datetime
  notes:
    type: text
    nullable: true
```

### Immunization

```yaml
table_name: immunizations

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  vaccine_code:
    type: string
    index: true
  vaccine_name:
    type: string
  dose_number:
    type: integer
  dose_sequence:
    type: string
  administered_date:
    type: datetime
  administered_by:
    type: uuid
    foreign_key: practitioners.id
  administration_site:
    type: enum
    values: [left_arm, right_arm, left_thigh, right_thigh, oral]
  route:
    type: enum
    values: [intramuscular, subcutaneous, intradermal, oral]
  lot_number:
    type: string
  expiry_date:
    type: date
  manufacturer:
    type: string
    nullable: true
  patient_age_months:
    type: integer
  patient_weight:
    type: decimal
    nullable: true
  status:
    type: enum
    values: [completed, not_done, entered_in_error]
    default: completed
  not_done_reason:
    type: text
    nullable: true
  adverse_reaction:
    type: boolean
    default: false
  reaction_details:
    type: text
    nullable: true
  reaction_severity:
    type: enum
    values: [mild, moderate, severe]
    nullable: true
  next_dose_due_date:
    type: date
    nullable: true
  satusehat_immunization_id:
    type: string
    nullable: true
  notes:
    type: text
    nullable: true
```

### Growth Measurement

```yaml
table_name: growth_measurements

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  measurement_date:
    type: date
    index: true
  age_months:
    type: integer
  age_days:
    type: integer
  weight:
    type: decimal
  length_height:
    type: decimal
    nullable: true
  head_circumference:
    type: decimal
    nullable: true
  muac:
    type: decimal
    nullable: true
  weight_for_age_z:
    type: decimal
    nullable: true
  length_height_for_age_z:
    type: decimal
    nullable: true
  weight_for_length_height_z:
    type: decimal
    nullable: true
  bmi_for_age_z:
    type: decimal
    nullable: true
  weight_for_age_status:
    type: enum
    values: [severely_underweight, underweight, normal, overweight]
    nullable: true
  stunting_status:
    type: enum
    values: [severely_stunted, stunted, normal, tall]
    nullable: true
  wasting_status:
    type: enum
    values: [severely_wasted, wasted, normal, overweight, obese]
    nullable: true
  breastfeeding_status:
    type: enum
    values: [exclusive, predominant, complementary, none]
    nullable: true
  intervention_needed:
    type: boolean
    default: false
  intervention_plan:
    type: text
    nullable: true
  measured_by:
    type: uuid
    foreign_key: practitioners.id
  notes:
    type: text
    nullable: true
```

---

## Indonesian Immunization Schedule

| Age | Vaccines |
|-----|----------|
| 0-24 hours | HB-0 |
| 1 month | BCG, Polio 1 |
| 2 months | DPT-HB-Hib 1, Polio 2 |
| 3 months | DPT-HB-Hib 2, Polio 3 |
| 4 months | DPT-HB-Hib 3, Polio 4, IPV |
| 9 months | MR 1 |
| 18 months | DPT-HB-Hib booster, MR 2 |

---

## WHO Growth Standards

### Z-Score Interpretation
| Z-Score | Weight-for-Age | Length/Height-for-Age | Weight-for-Length/Height |
|---------|----------------|----------------------|--------------------------|
| < -3 | Severely underweight | Severely stunted | Severely wasted |
| -3 to -2 | Underweight | Stunted | Wasted |
| -2 to +2 | Normal | Normal | Normal |
| > +2 | Overweight | Tall | Overweight |
| > +3 | - | - | Obese |

---

## Business Rules

### ANC Coverage (K1-K4)
- K1: First visit (ideally trimester 1)
- K4: At least 4 visits with required components
- Coverage tracked for reporting

### Risk Assessment (Poedji Rochjati)
- Age < 16 or > 35: Risk factor
- Primigravida or Grand multipara (>=5): Risk factor
- Previous complications: Risk factor
- Score determines care level

### Immunization Rules
- Age-appropriate vaccines only
- Catch-up schedule for missed vaccines
- AEFI reporting mandatory

---

## Dependencies

- FEATURE-4.1: Clinical Encounter
- FEATURE-1.1: Patient Registration
- WHO growth standards data
- Vaccine master data

## Enables

- KIA coverage reporting
- Immunization coverage reporting
- Nutritional surveillance
