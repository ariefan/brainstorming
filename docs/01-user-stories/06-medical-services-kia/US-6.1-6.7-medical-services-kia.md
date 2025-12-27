# Medical Services - Poli KIA/Kebidanan (Midwifery)

> **Module**: 06 - Medical Services KIA
> **Stories**: US-6.1 to US-6.7
> **Priority**: P0 (Critical)
> **FHIR Resources**: Encounter, Observation, Condition, Procedure, Immunization
> **Forms**: K1-K4 ANC, Partograph, KIA Book (Buku KIA)

---

## US-6.1: Antenatal Care (ANC) Visits

### User Story
**As a** midwife (bidan)
**I want to** conduct and document antenatal care visits
**So that** pregnancy is monitored according to K1-K4 standards

### Acceptance Criteria

- [ ] **GIVEN** pregnant patient visits for ANC
      **WHEN** midwife records examination
      **THEN** system captures standard ANC assessment form

- [ ] **GIVEN** ANC visit is completed
      **WHEN** visit count reaches milestone (K1, K4)
      **THEN** system tracks coverage indicators

### ANC Visit Standards (WHO/Kemenkes)
- **K1**: First visit (ideally trimester 1)
- **K2**: Second visit (trimester 2)
- **K3**: Third visit (trimester 3, before week 36)
- **K4**: Fourth visit (trimester 3, after week 36)

### Data Model

```yaml
pregnancy:
  id: uuid
  patient_id: uuid (FK)

  # Pregnancy identification
  pregnancy_number: integer # gravida number
  is_current: boolean (default: true)

  # Obstetric history (G_P_A_)
  gravida: integer # total pregnancies
  para: integer # births > 20 weeks
  abortus: integer # losses < 20 weeks
  living_children: integer

  # Dates
  lmp_date: date # HPHT (Hari Pertama Haid Terakhir)
  edd_date: date # HPL (Hari Perkiraan Lahir), calculated or adjusted
  edd_method: enum (lmp/ultrasound/clinical)
  ultrasound_edd: date (nullable)
  ultrasound_date: date (nullable)

  # Risk assessment
  risk_level: enum (low/moderate/high)
  risk_factors: array[string]

  # Outcome
  outcome: enum (ongoing/live_birth/stillbirth/miscarriage/abortion/ectopic, nullable)
  outcome_date: date (nullable)
  delivery_type: enum (spontaneous/assisted/cesarean, nullable)
  delivery_location: string (nullable)

  # Status
  status: enum (active/delivered/ended)

  created_at: datetime
  updated_at: datetime

anc_visit:
  id: uuid
  encounter_id: uuid (FK)
  pregnancy_id: uuid (FK)
  patient_id: uuid (FK)

  # Visit classification
  visit_number: integer # K1, K2, K3, K4
  visit_type: enum (k1/k2/k3/k4/additional)
  gestational_age_weeks: integer
  gestational_age_days: integer
  trimester: enum (1/2/3)

  # Subjective
  chief_complaint: text
  fetal_movement: enum (present/absent/reduced, nullable)
  contractions: boolean (default: false)
  vaginal_bleeding: boolean (default: false)
  vaginal_discharge: text (nullable)
  urinary_symptoms: text (nullable)
  other_symptoms: text

  # Vital signs (linked from vital_sign table)
  vital_sign_id: uuid (FK)

  # Weight & Nutrition
  pre_pregnancy_weight: decimal (kg, nullable)
  current_weight: decimal (kg)
  weight_gain: decimal (calculated)
  height: decimal (cm)
  bmi: decimal (calculated)
  lila: decimal (cm) # Lingkar Lengan Atas (Mid-Upper Arm Circumference)
  nutrition_status: enum (normal/kek/overweight) # KEK = Kurang Energi Kronis

  # Abdominal examination
  fundal_height: decimal (cm)
  fetal_lie: enum (longitudinal/oblique/transverse, nullable)
  fetal_presentation: enum (cephalic/breech/shoulder, nullable)
  fetal_engagement: string (nullable) # fifths above brim
  fetal_heart_rate: integer (bpm)
  fetal_heart_rhythm: enum (regular/irregular)

  # Lab results (if available)
  hemoglobin: decimal (g/dL, nullable)
  blood_type: enum (A/B/AB/O, nullable)
  rhesus: enum (positive/negative, nullable)
  hbsag: enum (reactive/non_reactive, nullable)
  hiv: enum (reactive/non_reactive, nullable)
  syphilis: enum (reactive/non_reactive, nullable)
  urine_protein: enum (negative/trace/1+/2+/3+/4+, nullable)
  urine_glucose: enum (negative/trace/1+/2+/3+/4+, nullable)

  # Immunization
  tt_status: enum (tt1/tt2/tt3/tt4/tt5/complete)
  tt_given_this_visit: boolean (default: false)

  # Supplements
  iron_tablets_given: integer # jumlah tablet Fe
  calcium_tablets_given: integer (nullable)

  # Risk screening
  danger_signs: array[string]
  # bleeding, severe_headache, blurred_vision, high_fever, reduced_fetal_movement, etc.

  complications_identified: array[string]
  referral_needed: boolean (default: false)
  referral_id: uuid (FK, nullable)

  # Plan
  treatment_plan: text
  education_given: array[string]
  next_visit_date: date

  # Midwife
  examined_by: uuid (FK to practitioner)
  examined_at: datetime

  notes: text

# FHIR Observation for ANC measurements
anc_observations_bundle:
  - code: fundal-height
    loinc: 11881-0
    value: fundal_height
    unit: cm

  - code: fetal-heart-rate
    loinc: 55283-6
    value: fetal_heart_rate
    unit: /min

  - code: gestational-age
    loinc: 49051-6
    value: gestational_age_weeks
    unit: weeks
```

---

## US-6.2: Pregnancy History & Risk Assessment

### User Story
**As a** midwife
**I want to** assess pregnancy risk factors
**So that** high-risk pregnancies receive appropriate care

### Acceptance Criteria

- [ ] **GIVEN** pregnant patient is registered
      **WHEN** midwife reviews obstetric history
      **THEN** system displays G_P_A_ and previous pregnancy outcomes

- [ ] **GIVEN** risk factors are identified
      **WHEN** midwife completes assessment
      **THEN** system calculates risk level and recommends care pathway

### Risk Factors (Poedji Rochjati Score)

| Category | Risk Factors |
|----------|--------------|
| **Age** | < 16 or > 35 years |
| **Parity** | Primigravida or Grand multipara (≥5) |
| **Spacing** | < 2 years from last delivery |
| **Height** | < 145 cm |
| **History** | Previous cesarean, APH, PPH, preeclampsia |
| **Medical** | Hypertension, diabetes, heart disease, anemia |
| **Current** | Multiple pregnancy, malpresentation, IUGR |

### Data Model

```yaml
pregnancy_history:
  id: uuid
  patient_id: uuid (FK)
  pregnancy_id: uuid (FK, nullable - for current pregnancy)

  # Sequence
  pregnancy_sequence: integer # 1st, 2nd, etc.

  # Dates
  year: integer
  gestational_age_at_outcome: integer (weeks)

  # Outcome
  outcome: enum (live_birth/stillbirth/miscarriage/abortion/ectopic/molar)
  delivery_type: enum (spontaneous/vacuum/forceps/cesarean)
  delivery_place: enum (hospital/clinic/home/other)

  # Baby (if applicable)
  baby_gender: enum (male/female, nullable)
  baby_weight: decimal (grams, nullable)
  baby_status: enum (alive/deceased, nullable)
  apgar_1min: integer (nullable)
  apgar_5min: integer (nullable)

  # Complications
  antenatal_complications: array[string]
  delivery_complications: array[string]
  postpartum_complications: array[string]

  # Breastfeeding
  breastfeeding_duration_months: integer (nullable)

  notes: text

pregnancy_risk_assessment:
  id: uuid
  pregnancy_id: uuid (FK)
  assessed_by: uuid (FK)
  assessed_at: datetime

  # Poedji Rochjati factors
  risk_factors: jsonb
  # Array of {factor, score, details}

  total_score: integer
  risk_level: enum (low/moderate/high/very_high)

  # Recommendations
  recommended_care_level: enum (puskesmas/clinic/hospital)
  recommended_delivery_place: enum (home/clinic/hospital)
  specialist_referral_needed: boolean
  additional_monitoring: array[string]

  notes: text

  # Version control for reassessment
  assessment_number: integer
```

---

## US-6.3: Partograph (Labor Monitoring)

### User Story
**As a** midwife
**I want to** monitor labor progress using partograph
**So that** complications are detected early

### Acceptance Criteria

- [ ] **GIVEN** patient is in active labor
      **WHEN** midwife records observations
      **THEN** system plots on partograph with alert/action lines

- [ ] **GIVEN** progress crosses action line
      **WHEN** viewing partograph
      **THEN** system alerts for intervention

### Data Model

```yaml
labor_record:
  id: uuid
  pregnancy_id: uuid (FK)
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Labor onset
  labor_onset_date: datetime
  membrane_rupture_time: datetime (nullable)
  membrane_rupture_type: enum (spontaneous/artificial)
  amniotic_fluid: enum (clear/meconium_stained/bloody)

  # Admission
  admission_time: datetime
  cervical_dilation_on_admission: decimal (cm)
  effacement_on_admission: integer (%)

  # Outcome
  delivery_time: datetime (nullable)
  delivery_type: enum (spontaneous/vacuum/forceps/cesarean)
  total_labor_duration_hours: decimal (nullable)

  # Status
  status: enum (active/delivered/transferred/emergency)

partograph_entry:
  id: uuid
  labor_record_id: uuid (FK)
  recorded_at: datetime
  recorded_by: uuid (FK)

  # Time from labor start
  hours_since_onset: decimal

  # Fetal monitoring
  fetal_heart_rate: integer
  fetal_heart_pattern: enum (normal/early_decel/late_decel/variable_decel)
  amniotic_fluid: enum (clear/meconium_light/meconium_thick/bloody)
  moulding: enum (0/1/2/3) # degree of overlap

  # Progress
  cervical_dilation: decimal (cm) # 0-10
  cervical_effacement: integer (%) # 0-100
  station: enum (-5/-4/-3/-2/-1/0/+1/+2/+3/+4/+5)
  position: string # LOA, ROA, etc.

  # Contractions (per 10 minutes)
  contractions_frequency: integer
  contractions_duration: enum (less_20/20_40/more_40) # seconds

  # Maternal
  blood_pressure_systolic: integer
  blood_pressure_diastolic: integer
  pulse: integer
  temperature: decimal
  urine_output: integer (ml)
  urine_protein: enum (negative/trace/1+/2+/3+/4+)
  urine_ketones: enum (negative/trace/1+/2+/3+/4+)

  # Medications/IV
  oxytocin_units_per_hour: decimal (nullable)
  iv_fluids: string (nullable)
  medications: text (nullable)

  notes: text

# Alert/Action line calculation
partograph_assessment:
  labor_record_id: uuid (FK)
  current_status: enum (normal/alert/action)
  hours_from_alert_line: decimal (nullable)
  hours_from_action_line: decimal (nullable)
  recommended_action: text
```

---

## US-6.4: Postnatal Care (PNC)

### User Story
**As a** midwife
**I want to** provide postnatal care visits
**So that** mother and baby are monitored after delivery

### Acceptance Criteria

- [ ] **GIVEN** mother delivered
      **WHEN** midwife conducts PNC visit
      **THEN** system captures mother and newborn assessment

### PNC Visit Schedule (Kemenkes)
- **KN1**: 6-48 hours after delivery
- **KN2**: Day 3-7
- **KN3**: Week 2
- **KN4**: Week 6

### Data Model

```yaml
pnc_visit:
  id: uuid
  encounter_id: uuid (FK)
  pregnancy_id: uuid (FK)
  patient_id: uuid (FK)
  baby_patient_id: uuid (FK, nullable)

  # Visit classification
  visit_number: integer # KN1, KN2, KN3, KN4
  visit_type: enum (kn1/kn2/kn3/kn4/additional)
  days_postpartum: integer

  # Maternal assessment
  general_condition: enum (good/fair/poor)
  blood_pressure_systolic: integer
  blood_pressure_diastolic: integer
  temperature: decimal
  pulse: integer

  # Uterus
  fundal_height: string # e.g., "2 fingers below umbilicus"
  uterus_contracted: boolean
  lochia: enum (rubra/serosa/alba)
  lochia_amount: enum (normal/excessive)
  lochia_odor: enum (normal/foul)

  # Perineum
  perineum_status: enum (intact/episiotomy/laceration)
  wound_healing: enum (good/infected/dehiscence)

  # Breasts
  breast_condition: enum (normal/engorged/mastitis/abscess)
  breastfeeding_established: boolean
  breastfeeding_issues: array[string]

  # Mood
  mood_status: enum (normal/baby_blues/depression_suspected)
  edinburgh_score: integer (nullable) # EPDS score

  # Contraception
  contraception_counseling: boolean
  contraception_chosen: enum (iud/implant/injection/pill/condom/natural/none, nullable)

  # Danger signs
  danger_signs_present: array[string]
  # excessive_bleeding, fever, foul_lochia, severe_headache, etc.

  # Baby assessment (if applicable)
  baby_weight: decimal (grams)
  baby_temperature: decimal
  breastfeeding_frequency: integer (per 24h)
  umbilical_cord_status: enum (clean/infected/separated)
  jaundice: enum (none/mild/moderate/severe)
  baby_danger_signs: array[string]

  # Immunization
  hep_b_birth_dose_given: boolean (nullable)

  # Plan
  treatment_given: text
  education_given: array[string]
  referral_needed: boolean
  next_visit_date: date

  examined_by: uuid (FK)
  examined_at: datetime
  notes: text
```

---

## US-6.5: Family Planning (KB) Services

### User Story
**As a** midwife
**I want to** provide family planning services
**So that** patients can access contraception

### Acceptance Criteria

- [ ] **GIVEN** patient requests KB services
      **WHEN** midwife provides counseling
      **THEN** system records method selection and eligibility screening

### Data Model

```yaml
family_planning_visit:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Visit type
  visit_type: enum (new_acceptor/repeat_visit/method_switch/removal/consultation)

  # Current status
  current_method: enum (none/iud/implant/injection/pill/condom/natural/sterilization/other)
  current_method_start_date: date (nullable)

  # Counseling
  methods_discussed: array[enum]
  eligibility_screening_done: boolean
  informed_consent: boolean

  # New/Changed method
  method_provided: enum (iud/implant/injection_1m/injection_3m/pill/condom/none)
  method_start_date: date (nullable)
  next_resupply_date: date (nullable)

  # For IUD/Implant
  device_type: string (nullable)
  device_lot_number: string (nullable)
  insertion_date: date (nullable)
  expected_removal_date: date (nullable)

  # For Injection
  injection_type: enum (1_month/3_month, nullable)
  next_injection_date: date (nullable)

  # Side effects
  reported_side_effects: array[string]
  management_advice: text

  # Switching/Removal
  reason_for_switch: text (nullable)
  reason_for_removal: text (nullable)

  examined_by: uuid (FK)
  notes: text

contraceptive_stock_usage:
  id: uuid
  visit_id: uuid (FK)
  item: string
  quantity: integer
  lot_number: string
  expiry_date: date
```

---

## US-6.6: Child Immunization

### User Story
**As a** midwife
**I want to** manage childhood immunizations
**So that** children receive timely vaccinations

### Acceptance Criteria

- [ ] **GIVEN** child is due for immunization
      **WHEN** midwife administers vaccine
      **THEN** system records and syncs Immunization to Satusehat

### Indonesian Immunization Schedule

| Age | Vaccines |
|-----|----------|
| 0-24 hours | HB-0 |
| 1 month | BCG, Polio 1 |
| 2 months | DPT-HB-Hib 1, Polio 2 |
| 3 months | DPT-HB-Hib 2, Polio 3 |
| 4 months | DPT-HB-Hib 3, Polio 4, IPV |
| 9 months | MR 1 |
| 18 months | DPT-HB-Hib booster, MR 2 |

### Data Model

```yaml
immunization:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Vaccine
  vaccine_code: string
  vaccine_name: string
  dose_number: integer # 1, 2, 3, booster
  dose_sequence: string # e.g., "DPT-HB-Hib 2"

  # Administration
  administered_date: datetime
  administered_by: uuid (FK)
  administration_site: enum (left_arm/right_arm/left_thigh/right_thigh/oral)
  route: enum (intramuscular/subcutaneous/intradermal/oral)

  # Product
  lot_number: string
  expiry_date: date
  manufacturer: string

  # Patient info at time
  patient_age_months: integer
  patient_weight: decimal (nullable)

  # Status
  status: enum (completed/not_done/entered_in_error)
  not_done_reason: text (nullable)

  # Reactions
  adverse_reaction: boolean (default: false)
  reaction_details: text (nullable)
  reaction_severity: enum (mild/moderate/severe, nullable)

  # Next dose
  next_dose_due_date: date (nullable)

  # Satusehat
  satusehat_immunization_id: string (nullable)

  notes: text

# FHIR Immunization mapping
fhir_immunization:
  resourceType: Immunization
  status: completed
  vaccineCode:
    coding:
      - system: "http://sys-ids.kemkes.go.id/kfa"
        code: vaccine_code
        display: vaccine_name
  patient:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  occurrenceDateTime: administered_date
  lotNumber: lot_number
  expirationDate: expiry_date
  site:
    coding:
      - code: site_code
  route:
    coding:
      - code: route_code
  performer:
    - actor:
        reference: "Practitioner/{ihs_practitioner_id}"
  protocolApplied:
    - doseNumberPositiveInt: dose_number
```

---

## US-6.7: Child Growth Monitoring (WHO Charts)

### User Story
**As a** midwife
**I want to** monitor child growth using WHO standards
**So that** growth problems are detected early

### Acceptance Criteria

- [ ] **GIVEN** child visits for growth monitoring
      **WHEN** midwife records measurements
      **THEN** system plots on WHO growth charts with z-scores

### Data Model

```yaml
growth_measurement:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Age at measurement
  measurement_date: date
  age_months: integer
  age_days: integer

  # Measurements
  weight: decimal (kg)
  length_height: decimal (cm) # length for <2y, height for ≥2y
  head_circumference: decimal (cm, nullable)
  muac: decimal (cm, nullable) # Mid-Upper Arm Circumference

  # Calculated z-scores
  weight_for_age_z: decimal
  length_height_for_age_z: decimal
  weight_for_length_height_z: decimal
  bmi_for_age_z: decimal
  head_circumference_for_age_z: decimal (nullable)

  # Status interpretation
  weight_for_age_status: enum (severely_underweight/underweight/normal/overweight)
  stunting_status: enum (severely_stunted/stunted/normal/tall)
  wasting_status: enum (severely_wasted/wasted/normal/overweight/obese)

  # Feeding
  breastfeeding_status: enum (exclusive/predominant/complementary/none)
  complementary_feeding_started: boolean
  feeding_issues: text (nullable)

  # Development milestones
  gross_motor: enum (normal/delayed/not_assessed)
  fine_motor: enum (normal/delayed/not_assessed)
  language: enum (normal/delayed/not_assessed)
  social: enum (normal/delayed/not_assessed)

  # Assessment
  nutrition_problem_identified: boolean
  intervention_needed: boolean
  intervention_plan: text (nullable)

  measured_by: uuid (FK)
  notes: text

# WHO Growth Standards (preloaded lookup tables)
who_growth_standard:
  indicator: enum (wfa/lhfa/wflh/bmi/hcfa) # weight-for-age, length/height-for-age, etc.
  sex: enum (male/female)
  age_days: integer
  l: decimal # Box-Cox power
  m: decimal # median
  s: decimal # coefficient of variation
```

---

## Buku KIA (Mother-Child Health Book) Integration

### Digital Buku KIA Components
1. **Mother Section**
   - Pregnancy records (all ANC visits)
   - Delivery record
   - Postnatal care records

2. **Child Section**
   - Birth record
   - Growth charts
   - Immunization record
   - Development milestones

### Data Model

```yaml
kia_book:
  id: uuid
  mother_patient_id: uuid (FK)
  baby_patient_id: uuid (FK, nullable - linked after birth)
  pregnancy_id: uuid (FK)

  book_number: string (unique)
  issued_date: date
  issued_by: uuid (FK to user)
  issuing_facility: string

  status: enum (active/transferred/closed)

kia_book_entry:
  id: uuid
  kia_book_id: uuid (FK)
  entry_type: enum (anc/delivery/pnc/immunization/growth/other)
  source_record_id: uuid # points to anc_visit, pnc_visit, immunization, etc.
  entry_date: date
  recorded_by: uuid (FK)
```

---

## Dependencies
- Patient Management (mother and child records)
- Medical Services General (base encounter)
- Practitioners & Polyclinics (midwife assignment)

## Blocks
- Immunization reporting
- KIA coverage indicators

