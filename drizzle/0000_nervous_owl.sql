CREATE TYPE "public"."admission_status" AS ENUM('admitted', 'transferred', 'discharged', 'deceased');--> statement-breakpoint
CREATE TYPE "public"."admission_type" AS ENUM('emergency', 'elective', 'transfer', 'maternity');--> statement-breakpoint
CREATE TYPE "public"."allergy_severity" AS ENUM('mild', 'moderate', 'severe', 'life_threatening');--> statement-breakpoint
CREATE TYPE "public"."allergy_type" AS ENUM('food', 'medication', 'environmental', 'other');--> statement-breakpoint
CREATE TYPE "public"."appointment_status" AS ENUM('booked', 'confirmed', 'checked_in', 'in_queue', 'completed', 'cancelled', 'no_show');--> statement-breakpoint
CREATE TYPE "public"."appointment_type" AS ENUM('consultation', 'follow_up', 'procedure', 'lab', 'imaging', 'vaccination', 'checkup');--> statement-breakpoint
CREATE TYPE "public"."assessment_type" AS ENUM('initial', 'periodic', 'pre_operative', 'discharge');--> statement-breakpoint
CREATE TYPE "public"."attendance_status" AS ENUM('present', 'absent', 'late', 'early_leave', 'half_day', 'on_leave');--> statement-breakpoint
CREATE TYPE "public"."audit_resource_type" AS ENUM('patient', 'encounter', 'diagnosis', 'prescription', 'lab_result', 'vital_sign', 'procedure', 'immunization', 'allergy', 'appointment', 'invoice', 'payment', 'user', 'employee', 'payroll', 'report', 'sep', 'rujukan', 'satusehat_resource', 'system_config', 'other');--> statement-breakpoint
CREATE TYPE "public"."bed_status" AS ENUM('available', 'occupied', 'maintenance', 'reserved');--> statement-breakpoint
CREATE TYPE "public"."billing_cycle" AS ENUM('monthly', 'quarterly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."birth_method" AS ENUM('spontaneous', 'cesarean', 'vacuum', 'forceps');--> statement-breakpoint
CREATE TYPE "public"."blood_type" AS ENUM('a', 'b', 'ab', 'o');--> statement-breakpoint
CREATE TYPE "public"."bpjs_antrean_status" AS ENUM('booked', 'checkin', 'called', 'serving', 'done', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."bpjs_asal_rujukan" AS ENUM('fktp', 'fkrtl');--> statement-breakpoint
CREATE TYPE "public"."bpjs_environment" AS ENUM('development', 'production');--> statement-breakpoint
CREATE TYPE "public"."bpjs_facility_type" AS ENUM('fktp', 'fkrtl');--> statement-breakpoint
CREATE TYPE "public"."bpjs_health_status" AS ENUM('healthy', 'degraded', 'unhealthy');--> statement-breakpoint
CREATE TYPE "public"."bpjs_inacbg_cara_masuk" AS ENUM('1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."bpjs_inacbg_kel_type" AS ENUM('1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."bpjs_inacbg_kelas_rawat" AS ENUM('1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."bpjs_inacbg_status" AS ENUM('pending', 'grouped', 'submitted', 'purified', 'verified', 'paid', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."bpjs_inacbg_tipe_rawat" AS ENUM('1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_jenis_kunjungan" AS ENUM('1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."bpjs_jenis_rawat" AS ENUM('rawat_inap', 'rawat_jalan');--> statement-breakpoint
CREATE TYPE "public"."bpjs_laka_lantas" AS ENUM('bukan', 'kll', 'kk', 'kll_kk');--> statement-breakpoint
CREATE TYPE "public"."bpjs_monitoring_jenis_klaim" AS ENUM('1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_monitoring_status" AS ENUM('pending', 'process', 'completed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."bpjs_pelayanan" AS ENUM('rawat_inap', 'rawat_jalan');--> statement-breakpoint
CREATE TYPE "public"."bpjs_pembiayaan" AS ENUM('1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."bpjs_peserta_status" AS ENUM('active', 'inactive', 'expired');--> statement-breakpoint
CREATE TYPE "public"."bpjs_rujukan_asal_rujukan" AS ENUM('1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_rujukan_faskes_type" AS ENUM('1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_rujukan_poli_rujukan" AS ENUM('INT', 'MAT', 'ANA', 'BEDAH', 'ANAK', 'THT', 'MATA', 'PARU', 'JANTUNG', 'SARAF', 'GIGI', 'KULIT_KELAMIN', 'PSIKIATRI', 'REHAB_MEDIS', 'LAINNYA');--> statement-breakpoint
CREATE TYPE "public"."bpjs_rujukan_status" AS ENUM('active', 'used', 'expired', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."bpjs_rujukan_tipe_rujukan" AS ENUM('0', '1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_sep_status" AS ENUM('created', 'used', 'updated', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."bpjs_severity_level" AS ENUM('I', 'II', 'III');--> statement-breakpoint
CREATE TYPE "public"."bpjs_tipe_rujukan" AS ENUM('0', '1', '2');--> statement-breakpoint
CREATE TYPE "public"."bpjs_tujuan_kunj" AS ENUM('normal', 'prosedur', 'konsul_dokter');--> statement-breakpoint
CREATE TYPE "public"."bpjs_verification_status" AS ENUM('pending', 'approved', 'partial', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."cash_closing_shift" AS ENUM('morning', 'afternoon', 'evening', 'night');--> statement-breakpoint
CREATE TYPE "public"."cash_closing_status" AS ENUM('pending', 'closed', 'verified');--> statement-breakpoint
CREATE TYPE "public"."charge_adjustment_type" AS ENUM('discount', 'correction', 'write_off', 'reversal');--> statement-breakpoint
CREATE TYPE "public"."charge_source_type" AS ENUM('encounter', 'procedure', 'medication', 'lab', 'room', 'nursing', 'other');--> statement-breakpoint
CREATE TYPE "public"."charge_status" AS ENUM('pending', 'invoiced', 'paid', 'cancelled', 'adjusted');--> statement-breakpoint
CREATE TYPE "public"."controlled_substance_schedule" AS ENUM('schedule_1', 'schedule_2', 'schedule_3', 'schedule_4', 'schedule_5', 'non_controlled');--> statement-breakpoint
CREATE TYPE "public"."critical_notification_method" AS ENUM('phone', 'in_person', 'sms');--> statement-breakpoint
CREATE TYPE "public"."day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "public"."delivery_method" AS ENUM('spontaneous', 'vacuum', 'forceps', 'cesarean');--> statement-breakpoint
CREATE TYPE "public"."delivery_outcome" AS ENUM('live_birth', 'stillbirth', 'neonatal_death');--> statement-breakpoint
CREATE TYPE "public"."dental_procedure_type" AS ENUM('extraction', 'filling', 'root_canal', 'crown', 'bridge', 'implant', 'scaling', 'cleaning', 'whitening', 'other');--> statement-breakpoint
CREATE TYPE "public"."deposit_status" AS ENUM('active', 'applied', 'refunded', 'expired');--> statement-breakpoint
CREATE TYPE "public"."diagnosis_type" AS ENUM('primary', 'secondary', 'admission', 'discharge');--> statement-breakpoint
CREATE TYPE "public"."diagnosis_verification" AS ENUM('confirmed', 'provisional', 'differential', 'refuted');--> statement-breakpoint
CREATE TYPE "public"."diagnostic_report_status" AS ENUM('registered', 'partial', 'preliminary', 'final', 'amended', 'corrected', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."discharge_disposition" AS ENUM('home', 'transfer', 'rehab', 'long_term_care', 'deceased', 'ama');--> statement-breakpoint
CREATE TYPE "public"."dispense_status" AS ENUM('pending', 'dispensed', 'partially_dispensed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('uploading', 'processing', 'ready', 'archived', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('medical_record', 'lab_result', 'prescription', 'consent_form', 'id_card', 'insurance_card', 'referral_letter', 'medical_certificate', 'invoice', 'receipt', 'other');--> statement-breakpoint
CREATE TYPE "public"."dosage_form" AS ENUM('tablet', 'capsule', 'syrup', 'injection', 'ointment', 'drops', 'inhaler', 'suppository', 'other');--> statement-breakpoint
CREATE TYPE "public"."employment_status" AS ENUM('active', 'on_leave', 'suspended', 'terminated', 'resigned');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('full_time', 'part_time', 'contract', 'internship');--> statement-breakpoint
CREATE TYPE "public"."encounter_class" AS ENUM('ambulatory', 'inpatient', 'emergency', 'observation');--> statement-breakpoint
CREATE TYPE "public"."encounter_status" AS ENUM('planned', 'arrived', 'in_progress', 'on_leave', 'finished', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."encounter_type" AS ENUM('outpatient', 'inpatient', 'emergency', 'home_visit', 'virtual');--> statement-breakpoint
CREATE TYPE "public"."feature_flag_status" AS ENUM('enabled', 'disabled', 'beta');--> statement-breakpoint
CREATE TYPE "public"."file_access" AS ENUM('private', 'public');--> statement-breakpoint
CREATE TYPE "public"."frequency" AS ENUM('once_daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'every_8_hours', 'every_12_hours', 'every_24_hours', 'as_needed', 'other');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."gestational_status" AS ENUM('full_term', 'preterm', 'post_term');--> statement-breakpoint
CREATE TYPE "public"."immunization_type" AS ENUM('bcg', 'hepatitis_b', 'polio', 'dpt', 'hib', 'pcv', 'rotavirus', 'mmr', 'je', 'influenza', 'other');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'pending', 'partial', 'paid', 'cancelled', 'void');--> statement-breakpoint
CREATE TYPE "public"."invoice_type" AS ENUM('outpatient', 'inpatient', 'pharmacy_only', 'lab_only');--> statement-breakpoint
CREATE TYPE "public"."jkn_antrean_fktp_status" AS ENUM('created', 'hadir', 'tidak_hadir', 'batal');--> statement-breakpoint
CREATE TYPE "public"."jkn_api_type" AS ENUM('vclaim', 'antrean', 'antrean_fktp', 'apotek', 'aplicares', 'icare', 'pcare', 'rekam_medis');--> statement-breakpoint
CREATE TYPE "public"."jkn_error_category" AS ENUM('transient', 'client', 'auth', 'not_found', 'server', 'validation', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."jkn_error_resolution" AS ENUM('pending', 'resolved', 'auto_resolved', 'ignored');--> statement-breakpoint
CREATE TYPE "public"."jkn_icare_status" AS ENUM('success', 'failed', 'timeout');--> statement-breakpoint
CREATE TYPE "public"."jkn_icare_type" AS ENUM('fkrtl', 'fktp');--> statement-breakpoint
CREATE TYPE "public"."jkn_iterasi" AS ENUM('0', '1');--> statement-breakpoint
CREATE TYPE "public"."jkn_jenis_kontrol" AS ENUM('1', '2');--> statement-breakpoint
CREATE TYPE "public"."jkn_jenis_obat" AS ENUM('1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."jkn_kelas_kamar" AS ENUM('1', '2', '3', 'vip', 'vvip', 'icu', 'iccu', 'hcu', 'nicu', 'picu');--> statement-breakpoint
CREATE TYPE "public"."jkn_lpk_tindak_lanjut" AS ENUM('1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."jkn_prb_program" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09');--> statement-breakpoint
CREATE TYPE "public"."jkn_prb_status" AS ENUM('active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."jkn_rekam_medis_status" AS ENUM('pending', 'processing', 'submitted', 'rejected', 'accepted');--> statement-breakpoint
CREATE TYPE "public"."jkn_resep_status" AS ENUM('created', 'dispensed', 'partially_dispensed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."jkn_surat_kontrol_status" AS ENUM('created', 'used', 'cancelled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."jkn_sync_operation" AS ENUM('create', 'update', 'delete', 'search', 'validate');--> statement-breakpoint
CREATE TYPE "public"."jkn_sync_resource_type" AS ENUM('sep', 'rujukan', 'peserta', 'inacbg', 'monitoring_klaim', 'prb', 'prb_obat', 'surat_kontrol', 'lpk', 'antrean_fkrtl', 'antrean_fktp', 'resep_apotek', 'aplicares_kamar', 'icare_fkrtl', 'icare_fktp', 'rekam_medis');--> statement-breakpoint
CREATE TYPE "public"."jkn_sync_status" AS ENUM('pending', 'processing', 'completed', 'failed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."jkn_tipe_obat" AS ENUM('non_racikan', 'racikan');--> statement-breakpoint
CREATE TYPE "public"."lab_queue_priority" AS ENUM('routine', 'urgent', 'stat');--> statement-breakpoint
CREATE TYPE "public"."lab_queue_status" AS ENUM('pending', 'collecting', 'received', 'processing', 'resulted', 'authorized', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."lab_result_interpretation" AS ENUM('normal', 'low', 'high', 'critical_low', 'critical_high', 'abnormal');--> statement-breakpoint
CREATE TYPE "public"."lab_result_status" AS ENUM('preliminary', 'final', 'amended', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."lab_result_type" AS ENUM('numeric', 'text', 'coded');--> statement-breakpoint
CREATE TYPE "public"."lab_test_category" AS ENUM('hematology', 'chemistry', 'urinalysis', 'serology', 'microbiology', 'histopathology', 'other');--> statement-breakpoint
CREATE TYPE "public"."lab_test_type" AS ENUM('blood', 'serum', 'plasma', 'urine', 'stool', 'sputum', 'swab', 'csf', 'other');--> statement-breakpoint
CREATE TYPE "public"."leave_status" AS ENUM('pending', 'approved', 'rejected', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."leave_type" AS ENUM('annual', 'sick', 'maternity', 'paternity', 'unpaid', 'emergency', 'other');--> statement-breakpoint
CREATE TYPE "public"."mar_status" AS ENUM('scheduled', 'given', 'refused', 'missed', 'held');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('single', 'married', 'divorced', 'widowed');--> statement-breakpoint
CREATE TYPE "public"."medication_type" AS ENUM('prescription', 'otc', 'controlled', 'supplement');--> statement-breakpoint
CREATE TYPE "public"."notification_channel" AS ENUM('in_app', 'email', 'sms', 'whatsapp', 'push');--> statement-breakpoint
CREATE TYPE "public"."notification_priority" AS ENUM('low', 'normal', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('pending', 'sent', 'delivered', 'read', 'failed');--> statement-breakpoint
CREATE TYPE "public"."org_type" AS ENUM('clinic', 'hospital', 'polyclinic', 'pharmacy', 'laboratory');--> statement-breakpoint
CREATE TYPE "public"."pain_scale_type" AS ENUM('vas', 'flacc', 'wong_baker', 'numeric');--> statement-breakpoint
CREATE TYPE "public"."patient_status" AS ENUM('active', 'inactive', 'deceased');--> statement-breakpoint
CREATE TYPE "public"."payer_type" AS ENUM('self_pay', 'bpjs', 'insurance', 'corporate');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'debit', 'credit', 'qris', 'transfer', 'deposit', 'insurance', 'bpjs');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('completed', 'partial', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."payroll_status" AS ENUM('draft', 'pending_approval', 'approved', 'processing', 'paid', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."polyclinic_type" AS ENUM('general', 'dental', 'kia', 'specialist', 'emergency', 'lab', 'pharmacy');--> statement-breakpoint
CREATE TYPE "public"."practitioner_type" AS ENUM('doctor', 'nurse', 'midwife', 'pharmacist', 'lab_tech', 'radiologist', 'specialist');--> statement-breakpoint
CREATE TYPE "public"."pregnancy_risk" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."pregnancy_status" AS ENUM('ongoing', 'delivered', 'miscarried', 'terminated', 'ectopic');--> statement-breakpoint
CREATE TYPE "public"."prescription_status" AS ENUM('draft', 'active', 'completed', 'cancelled', 'on_hold');--> statement-breakpoint
CREATE TYPE "public"."procedure_category" AS ENUM('surgical', 'diagnostic', 'therapeutic', 'preventive', 'palliative', 'other');--> statement-breakpoint
CREATE TYPE "public"."procedure_status" AS ENUM('preparation', 'in_progress', 'not_done', 'on_hold', 'stopped', 'completed', 'entered_in_error', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."psychology_status" AS ENUM('normal', 'depression', 'fear', 'aggressive', 'self_harm_risk', 'other');--> statement-breakpoint
CREATE TYPE "public"."queue_priority" AS ENUM('routine', 'urgent', 'emergency');--> statement-breakpoint
CREATE TYPE "public"."queue_status" AS ENUM('waiting', 'called', 'serving', 'completed', 'skipped', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."refund_status" AS ENUM('pending', 'approved', 'processed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."report_category" AS ENUM('operational', 'clinical', 'financial', 'regulatory', 'kia');--> statement-breakpoint
CREATE TYPE "public"."report_format" AS ENUM('pdf', 'excel', 'csv');--> statement-breakpoint
CREATE TYPE "public"."report_frequency" AS ENUM('daily', 'weekly', 'monthly', 'on_demand');--> statement-breakpoint
CREATE TYPE "public"."report_generation_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."rhesus" AS ENUM('positive', 'negative');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('owner', 'admin', 'doctor', 'nurse', 'midwife', 'pharmacist', 'lab_tech', 'front_desk', 'cashier');--> statement-breakpoint
CREATE TYPE "public"."room_class" AS ENUM('vvip', 'vip', 'class_1', 'class_2', 'class_3', 'icu', 'nicu', 'isolation');--> statement-breakpoint
CREATE TYPE "public"."salary_component_type" AS ENUM('earning', 'deduction', 'benefit');--> statement-breakpoint
CREATE TYPE "public"."satusehat_consent_method" AS ENUM('written', 'verbal', 'electronic');--> statement-breakpoint
CREATE TYPE "public"."satusehat_consent_scope" AS ENUM('all', 'encounter_only', 'none');--> statement-breakpoint
CREATE TYPE "public"."satusehat_environment" AS ENUM('sandbox', 'production');--> statement-breakpoint
CREATE TYPE "public"."satusehat_error_category" AS ENUM('transient', 'client', 'auth', 'not_found', 'server', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."satusehat_error_resolution" AS ENUM('pending', 'auto_resolved', 'manual_resolved', 'ignored');--> statement-breakpoint
CREATE TYPE "public"."satusehat_lookup_status" AS ENUM('found', 'not_found', 'error');--> statement-breakpoint
CREATE TYPE "public"."satusehat_operation" AS ENUM('create', 'update', 'search');--> statement-breakpoint
CREATE TYPE "public"."satusehat_resource_type" AS ENUM('Patient', 'Practitioner', 'PractitionerRole', 'Location', 'Encounter', 'Condition', 'Observation', 'Procedure', 'MedicationRequest', 'MedicationDispense', 'ServiceRequest', 'DiagnosticReport', 'Composition');--> statement-breakpoint
CREATE TYPE "public"."satusehat_sync_status" AS ENUM('pending', 'processing', 'completed', 'failed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."satusehat_verification_method" AS ENUM('nik_lookup', 'manual');--> statement-breakpoint
CREATE TYPE "public"."service_tariff_category" AS ENUM('consultation', 'procedure', 'lab', 'radiology', 'pharmacy', 'room', 'nursing', 'other');--> statement-breakpoint
CREATE TYPE "public"."specialty" AS ENUM('general_practice', 'internal_medicine', 'pediatrics', 'obgyn', 'surgery', 'dentistry', 'ophthalmology', 'dermatology', 'psychiatry', 'radiology', 'pathology', 'other');--> statement-breakpoint
CREATE TYPE "public"."specimen_condition" AS ENUM('satisfactory', 'hemolyzed', 'lipemic', 'clotted', 'insufficient', 'other');--> statement-breakpoint
CREATE TYPE "public"."specimen_status" AS ENUM('collected', 'in_transit', 'received', 'processing', 'stored', 'disposed');--> statement-breakpoint
CREATE TYPE "public"."stock_movement_type" AS ENUM('purchase', 'sale', 'return', 'adjustment', 'transfer', 'expiration', 'damage', 'dispense');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('basic', 'standard', 'premium', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('trial', 'active', 'past_due', 'cancelled', 'suspended', 'expired');--> statement-breakpoint
CREATE TYPE "public"."tooth_condition" AS ENUM('healthy', 'decayed', 'missing', 'filled', 'crown', 'bridge', 'implant', 'root_canal', 'extraction', 'other');--> statement-breakpoint
CREATE TYPE "public"."triage_level" AS ENUM('red', 'orange', 'yellow', 'green');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'inactive', 'suspended', 'pending_verification');--> statement-breakpoint
CREATE TYPE "public"."variance_status" AS ENUM('balanced', 'short', 'over');--> statement-breakpoint
CREATE TYPE "public"."virus_scan_status" AS ENUM('pending', 'scanning', 'clean', 'infected', 'failed');--> statement-breakpoint
CREATE TYPE "public"."webhook_source" AS ENUM('satusehat', 'jkn_vclaim', 'jkn_antrean', 'jkn_apotek', 'jkn_aplicares', 'jkn_icare', 'jkn_rekam_medis');--> statement-breakpoint
CREATE TYPE "public"."webhook_status" AS ENUM('received', 'processing', 'processed', 'failed', 'ignored');--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_code" varchar(20) NOT NULL,
	"branch_name" varchar(255) NOT NULL,
	"branch_name_id" varchar(255),
	"branch_type" varchar(50) DEFAULT 'main',
	"address" text NOT NULL,
	"city" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(10),
	"country" varchar(100) DEFAULT 'Indonesia',
	"phone" varchar(20),
	"email" varchar(255),
	"fax" varchar(20),
	"latitude" varchar(20),
	"longitude" varchar(20),
	"satusehat_location_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"operating_hours" jsonb,
	"is_headquarters" boolean DEFAULT false,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"org_code" varchar(20) NOT NULL,
	"org_name" varchar(255) NOT NULL,
	"org_name_id" varchar(255),
	"org_type" "org_type" NOT NULL,
	"description" text,
	"address" text,
	"city" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(10),
	"country" varchar(100) DEFAULT 'Indonesia',
	"phone" varchar(20),
	"email" varchar(255),
	"website" varchar(255),
	"npwp" varchar(20),
	"siup" varchar(50),
	"license_number" varchar(100),
	"license_expiry" timestamp,
	"satusehat_org_id" varchar(100),
	"bpjs_ppk_code" varchar(20),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	"subscription_plan" "subscription_plan" DEFAULT 'basic',
	"subscription_start" timestamp,
	"subscription_end" timestamp,
	"is_active" boolean DEFAULT true,
	"logo_url" varchar(500),
	"settings" jsonb,
	CONSTRAINT "organizations_org_code_unique" UNIQUE("org_code")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"organization_id" uuid,
	"branch_id" uuid,
	"user_id" uuid,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(100) NOT NULL,
	"entity_id" uuid,
	"changes" jsonb,
	"ip_address" varchar(50),
	"user_agent" text,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "user_branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"user_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"is_primary" boolean DEFAULT false,
	"permissions" jsonb
);
--> statement-breakpoint
CREATE TABLE "user_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"first_name_id" varchar(100),
	"last_name_id" varchar(100),
	"role" "role" NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"status" varchar(20) DEFAULT 'pending',
	"message" text,
	CONSTRAINT "user_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"user_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"token" varchar(500) NOT NULL,
	"refresh_token" varchar(500),
	"device_type" varchar(50),
	"device_name" varchar(255),
	"browser" varchar(100),
	"os" varchar(100),
	"ip_address" varchar(50),
	"user_agent" text,
	"location" jsonb,
	"expires_at" timestamp NOT NULL,
	"last_activity_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	CONSTRAINT "user_sessions_token_unique" UNIQUE("token"),
	CONSTRAINT "user_sessions_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"password_salt" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"first_name_id" varchar(100),
	"last_name_id" varchar(100),
	"full_name" varchar(255) NOT NULL,
	"gender" "gender",
	"date_of_birth" timestamp,
	"phone" varchar(20),
	"mobile" varchar(20),
	"avatar_url" varchar(500),
	"role" "role" NOT NULL,
	"status" "user_status" DEFAULT 'active',
	"is_email_verified" boolean DEFAULT false,
	"is_phone_verified" boolean DEFAULT false,
	"last_login_at" timestamp,
	"last_login_ip" varchar(50),
	"failed_login_attempts" varchar(3) DEFAULT '0',
	"locked_until" timestamp,
	"mfa_enabled" boolean DEFAULT false,
	"mfa_secret" varchar(255),
	"mfa_backup_codes" jsonb,
	"preferences" jsonb,
	"practitioner_id" uuid,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "allergies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"allergen" varchar(255) NOT NULL,
	"allergen_id" varchar(255),
	"allergy_type" "allergy_type" NOT NULL,
	"severity" "allergy_severity" NOT NULL,
	"reaction" text,
	"onset_date" date,
	"is_verified" boolean DEFAULT false,
	"verified_by" uuid,
	"verified_at" timestamp,
	"notes" text,
	"satusehat_allergy_intolerance_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text
);
--> statement-breakpoint
CREATE TABLE "chronic_conditions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"condition_name" varchar(255) NOT NULL,
	"condition_name_id" varchar(255),
	"icd10_code" varchar(10),
	"icd10_description" varchar(255),
	"diagnosis_date" date,
	"is_controlled" boolean DEFAULT false,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "family_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"family_member_id" uuid,
	"relationship_type" varchar(50) NOT NULL,
	"relationship_type_id" varchar(50),
	"is_emergency_contact" boolean DEFAULT false,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"mrn" varchar(30) NOT NULL,
	"nik" varchar(16),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"first_name_id" varchar(100),
	"last_name_id" varchar(100),
	"full_name" varchar(255) NOT NULL,
	"gender" varchar(10) NOT NULL,
	"date_of_birth" date NOT NULL,
	"place_of_birth" varchar(100),
	"marital_status" "marital_status",
	"blood_type" "blood_type",
	"rhesus" "rhesus",
	"phone" varchar(20),
	"mobile" varchar(20),
	"email" varchar(255),
	"address" text,
	"city" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(10),
	"country" varchar(100) DEFAULT 'Indonesia',
	"nationality" varchar(100) DEFAULT 'Indonesia',
	"occupation" varchar(100),
	"education" varchar(100),
	"religion" varchar(50),
	"status" "patient_status" DEFAULT 'active',
	"photo_url" varchar(500),
	"emergency_contact_name" varchar(255),
	"emergency_contact_phone" varchar(20),
	"emergency_contact_relation" varchar(50),
	"bpjs_number" varchar(20),
	"satusehat_ihs_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_verified" boolean DEFAULT false,
	"jkn_verified_at" timestamp,
	"jkn_verification_error" text,
	"notes" text,
	CONSTRAINT "patients_mrn_unique" UNIQUE("mrn"),
	CONSTRAINT "patients_nik_unique" UNIQUE("nik")
);
--> statement-breakpoint
CREATE TABLE "appointment_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"slot_date" date NOT NULL,
	"start_time" varchar(10) NOT NULL,
	"end_time" varchar(10) NOT NULL,
	"duration" varchar(20) NOT NULL,
	"is_available" boolean DEFAULT true,
	"is_booked" boolean DEFAULT false,
	"booked_by" uuid,
	"booked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "polyclinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"polyclinic_code" varchar(20) NOT NULL,
	"polyclinic_name" varchar(255) NOT NULL,
	"polyclinic_name_id" varchar(255),
	"polyclinic_type" "polyclinic_type" NOT NULL,
	"description" text,
	"location" varchar(100),
	"floor" varchar(20),
	"queue_prefix" varchar(5),
	"satusehat_location_id" varchar(100),
	"bpjs_poli_code" varchar(20),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	"operating_hours" jsonb,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "practitioner_polyclinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"is_primary" boolean DEFAULT false,
	"effective_from" date NOT NULL,
	"effective_to" date
);
--> statement-breakpoint
CREATE TABLE "practitioner_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"day_of_week" "day_of_week" NOT NULL,
	"start_time" varchar(10) NOT NULL,
	"end_time" varchar(10) NOT NULL,
	"is_available" boolean DEFAULT true,
	"effective_from" date NOT NULL,
	"effective_to" date,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "practitioners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"practitioner_number" varchar(30) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"first_name_id" varchar(100),
	"last_name_id" varchar(100),
	"full_name" varchar(255) NOT NULL,
	"gender" "gender",
	"date_of_birth" date,
	"phone" varchar(20),
	"mobile" varchar(20),
	"email" varchar(255),
	"practitioner_type" "practitioner_type" NOT NULL,
	"specialty" "specialty",
	"license_number" varchar(100),
	"license_expiry" date,
	"satusehat_ihs_id" varchar(100),
	"nip" varchar(30),
	"str" varchar(50),
	"sip" varchar(50),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	"is_active" boolean DEFAULT true,
	"photo_url" varchar(500),
	"bio" text,
	"education" jsonb,
	"certifications" jsonb,
	CONSTRAINT "practitioners_practitioner_number_unique" UNIQUE("practitioner_number")
);
--> statement-breakpoint
CREATE TABLE "schedule_exceptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"exception_date" date NOT NULL,
	"is_available" boolean DEFAULT false,
	"reason" text
);
--> statement-breakpoint
CREATE TABLE "appointment_reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"appointment_id" uuid NOT NULL,
	"reminder_type" varchar(20) NOT NULL,
	"reminder_time" timestamp NOT NULL,
	"sent_at" timestamp,
	"status" varchar(20) DEFAULT 'pending',
	"recipient" varchar(255),
	"message" text,
	"retry_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"appointment_number" varchar(30) NOT NULL,
	"appointment_type" "appointment_type" NOT NULL,
	"appointment_date" date NOT NULL,
	"start_time" varchar(10) NOT NULL,
	"end_time" varchar(10),
	"duration" varchar(20),
	"status" "appointment_status" DEFAULT 'booked',
	"priority" "queue_priority" DEFAULT 'routine',
	"reason" text,
	"symptoms" text,
	"is_online" boolean DEFAULT false,
	"is_video_call" boolean DEFAULT false,
	"is_walk_in" boolean DEFAULT false,
	"is_follow_up" boolean DEFAULT false,
	"previous_appointment_id" uuid,
	"checked_in_at" timestamp,
	"checked_in_by" uuid,
	"started_at" timestamp,
	"completed_at" timestamp,
	"cancelled_at" timestamp,
	"cancelled_by" uuid,
	"cancellation_reason" text,
	"no_show_at" timestamp,
	"bpjs_antrean_kode_booking" varchar(30),
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	"notes" text,
	CONSTRAINT "appointments_appointment_number_unique" UNIQUE("appointment_number")
);
--> statement-breakpoint
CREATE TABLE "queue_call_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"queue_id" uuid NOT NULL,
	"called_at" timestamp NOT NULL,
	"called_by" uuid NOT NULL,
	"call_method" varchar(20),
	"response_time" integer,
	"no_show" boolean DEFAULT false,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "queue_display_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"display_type" varchar(20) DEFAULT 'tv',
	"ip_address" varchar(50),
	"port" integer,
	"refresh_interval" integer DEFAULT 30,
	"show_patient_name" boolean DEFAULT false,
	"show_queue_number" boolean DEFAULT true,
	"show_waiting_count" boolean DEFAULT true,
	"show_estimated_time" boolean DEFAULT true,
	"voice_enabled" boolean DEFAULT true,
	"voice_language" varchar(10) DEFAULT 'id',
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "queues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"polyclinic_id" uuid NOT NULL,
	"queue_date" date NOT NULL,
	"queue_number" varchar(10) NOT NULL,
	"patient_id" uuid NOT NULL,
	"appointment_id" uuid,
	"practitioner_id" uuid,
	"status" "queue_status" DEFAULT 'waiting',
	"priority" "queue_priority" DEFAULT 'routine',
	"is_online" boolean DEFAULT false,
	"is_walk_in" boolean DEFAULT true,
	"called_at" timestamp,
	"called_by" uuid,
	"serving_started_at" timestamp,
	"completed_at" timestamp,
	"completed_by" uuid,
	"skipped_at" timestamp,
	"skipped_by" uuid,
	"skip_reason" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "anc_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"pregnancy_id" uuid NOT NULL,
	"visit_number" integer NOT NULL,
	"visit_date" date NOT NULL,
	"visit_type" varchar(50),
	"gestational_age" varchar(20),
	"weight" varchar(10),
	"height" varchar(10),
	"blood_pressure" varchar(20),
	"fetal_heart_rate" integer,
	"fundal_height" varchar(10),
	"presentation" varchar(50),
	"tetanus_toxoid" integer,
	"iron_tablets" integer,
	"notes" text,
	"next_visit_date" date
);
--> statement-breakpoint
CREATE TABLE "consultations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"consultation_type" varchar(50),
	"chief_complaint" text,
	"history_of_present_illness" text,
	"review_of_systems" jsonb,
	"physical_examination" text,
	"assessment" text,
	"plan" text,
	"follow_up_date" date,
	"is_signed_off" boolean DEFAULT false,
	"signed_off_at" timestamp,
	"signed_off_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dental_chart_teeth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"dental_chart_id" uuid NOT NULL,
	"tooth_number" varchar(5) NOT NULL,
	"tooth_condition" varchar(50) NOT NULL,
	"condition_details" text,
	"restorations" jsonb,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dental_charts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"dental_encounter_id" uuid NOT NULL,
	"chart_date" date NOT NULL,
	"charted_by" uuid NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dental_encounters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"chief_complaint" text,
	"dental_history" text,
	"oral_hygiene" varchar(50),
	"periodontal_status" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dental_procedures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"dental_encounter_id" uuid NOT NULL,
	"procedure_type" varchar(50) NOT NULL,
	"tooth_number" varchar(5),
	"icd9cm_code" varchar(10),
	"procedure_name" varchar(255) NOT NULL,
	"procedure_name_id" varchar(255),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dental_treatment_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"dental_encounter_id" uuid NOT NULL,
	"plan_name" varchar(255) NOT NULL,
	"estimated_cost" varchar(20),
	"estimated_sessions" integer,
	"is_approved" boolean DEFAULT false,
	"approved_by" uuid,
	"approved_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "diagnoses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"diagnosis_type" "diagnosis_type" NOT NULL,
	"icd10_code" varchar(10) NOT NULL,
	"icd10_description" varchar(255),
	"diagnosis_name" varchar(255) NOT NULL,
	"diagnosis_name_id" varchar(255),
	"verification" "diagnosis_verification" DEFAULT 'provisional',
	"onset_date" date,
	"is_chronic" boolean DEFAULT false,
	"is_primary" boolean DEFAULT false,
	"notes" text,
	"satusehat_condition_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text
);
--> statement-breakpoint
CREATE TABLE "encounters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"practitioner_id" uuid NOT NULL,
	"polyclinic_id" uuid NOT NULL,
	"appointment_id" uuid,
	"encounter_number" varchar(30) NOT NULL,
	"encounter_type" "encounter_type" NOT NULL,
	"encounter_class" "encounter_class" NOT NULL,
	"status" "encounter_status" DEFAULT 'planned',
	"priority" varchar(20) DEFAULT 'routine',
	"encounter_date" date NOT NULL,
	"start_time" timestamp,
	"end_time" timestamp,
	"reason" text,
	"chief_complaint" text,
	"physical_examination" jsonb,
	"satusehat_encounter_id" varchar(100),
	"bpjs_sep_number" varchar(30),
	"notes" text,
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	CONSTRAINT "encounters_encounter_number_unique" UNIQUE("encounter_number")
);
--> statement-breakpoint
CREATE TABLE "growth_measurements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"measurement_date" date NOT NULL,
	"age_in_months" integer,
	"weight" varchar(10),
	"height" varchar(10),
	"head_circumference" varchar(10),
	"muac" varchar(10),
	"weight_z_score" varchar(10),
	"height_z_score" varchar(10),
	"weight_for_height_z_score" varchar(10),
	"nutritional_status" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "immunizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"immunization_type" varchar(50) NOT NULL,
	"vaccine_name" varchar(255) NOT NULL,
	"vaccine_name_id" varchar(255),
	"manufacturer" varchar(100),
	"batch_number" varchar(50),
	"lot_number" varchar(50),
	"dose" varchar(50),
	"route" varchar(50),
	"site" varchar(50),
	"administered_at" timestamp NOT NULL,
	"administered_by" uuid NOT NULL,
	"adverse_event" text,
	"next_dose_date" date,
	"notes" text,
	"satusehat_immunization_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text
);
--> statement-breakpoint
CREATE TABLE "medical_certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"certificate_number" varchar(30) NOT NULL,
	"certificate_type" varchar(50) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"days" integer NOT NULL,
	"diagnosis" text,
	"restrictions" text,
	"is_return_to_work" boolean DEFAULT true,
	"notes" text,
	"printed_at" timestamp,
	"printed_by" uuid,
	CONSTRAINT "medical_certificates_certificate_number_unique" UNIQUE("certificate_number")
);
--> statement-breakpoint
CREATE TABLE "medical_lab_order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"lab_order_id" uuid NOT NULL,
	"lab_test_id" uuid NOT NULL,
	"test_code" varchar(20) NOT NULL,
	"test_name" varchar(255) NOT NULL,
	"test_name_id" varchar(255),
	"loinc_code" varchar(20),
	"specimen_type" varchar(50),
	"priority" varchar(20),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "medical_lab_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"order_number" varchar(30) NOT NULL,
	"ordered_at" timestamp NOT NULL,
	"ordered_by" uuid NOT NULL,
	"priority" varchar(20) DEFAULT 'routine',
	"is_fasting_required" boolean DEFAULT false,
	"fasting_verified" boolean DEFAULT false,
	"fasting_verified_at" timestamp,
	"fasting_verified_by" uuid,
	"clinical_info" text,
	"notes" text,
	CONSTRAINT "medical_lab_orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
CREATE TABLE "pregnancies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"pregnancy_number" integer NOT NULL,
	"gravida" integer,
	"para" integer,
	"abortion" integer,
	"lmp" date,
	"edd" date,
	"status" varchar(20) DEFAULT 'ongoing',
	"risk" varchar(20) DEFAULT 'low',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "prescription_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"prescription_id" uuid NOT NULL,
	"line_number" integer NOT NULL,
	"medication_name" varchar(255) NOT NULL,
	"medication_name_id" varchar(255),
	"generic_name" varchar(255),
	"dosage_form" "dosage_form",
	"strength" varchar(50),
	"strength_unit" varchar(20),
	"quantity" varchar(20),
	"frequency" "frequency",
	"route" varchar(50),
	"duration" varchar(50),
	"instructions" text,
	"rx_norm_code" varchar(20),
	"is_controlled" boolean DEFAULT false,
	"controlled_schedule" varchar(20),
	"repeat_count" integer DEFAULT 0,
	"dispense_as_written" boolean DEFAULT true,
	"notes" text,
	"drug_interactions" jsonb,
	"allergy_conflict" boolean DEFAULT false,
	"allergy_conflict_details" text
);
--> statement-breakpoint
CREATE TABLE "prescriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"prescription_number" varchar(30) NOT NULL,
	"status" "prescription_status" DEFAULT 'draft',
	"prescribed_at" timestamp NOT NULL,
	"prescribed_by" uuid NOT NULL,
	"notes" text,
	"dispense_status" varchar(20) DEFAULT 'pending',
	"dispensed_at" timestamp,
	"satusehat_medication_request_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	CONSTRAINT "prescriptions_prescription_number_unique" UNIQUE("prescription_number")
);
--> statement-breakpoint
CREATE TABLE "procedures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"procedure_number" varchar(30) NOT NULL,
	"status" "procedure_status" DEFAULT 'completed',
	"category" "procedure_category" NOT NULL,
	"icd9cm_code" varchar(10),
	"icd9cm_description" varchar(255),
	"procedure_name" varchar(255) NOT NULL,
	"procedure_name_id" varchar(255),
	"performed_at" timestamp NOT NULL,
	"performed_by" uuid NOT NULL,
	"assisted_by" uuid,
	"location" varchar(100),
	"body_site" varchar(100),
	"outcome" text,
	"complication" text,
	"follow_up_required" boolean DEFAULT false,
	"notes" text,
	"satusehat_procedure_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	CONSTRAINT "procedures_procedure_number_unique" UNIQUE("procedure_number")
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"referral_number" varchar(30) NOT NULL,
	"referral_type" varchar(50) NOT NULL,
	"referred_to" text NOT NULL,
	"referred_to_specialty" varchar(100),
	"referred_to_facility" varchar(255),
	"referred_to_practitioner" varchar(255),
	"referral_reason" text,
	"diagnosis" text,
	"bpjs_rujukan_number" varchar(50),
	"is_urgent" boolean DEFAULT false,
	"status" varchar(20) DEFAULT 'pending',
	"notes" text,
	CONSTRAINT "referrals_referral_number_unique" UNIQUE("referral_number")
);
--> statement-breakpoint
CREATE TABLE "vital_signs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"encounter_id" uuid NOT NULL,
	"recorded_at" timestamp NOT NULL,
	"recorded_by" uuid NOT NULL,
	"temperature" varchar(10),
	"temperature_unit" varchar(5) DEFAULT 'C',
	"heart_rate" integer,
	"blood_pressure_systolic" integer,
	"blood_pressure_diastolic" integer,
	"respiratory_rate" integer,
	"oxygen_saturation" integer,
	"weight" varchar(10),
	"height" varchar(10),
	"bmi" varchar(10),
	"blood_glucose" varchar(10),
	"blood_glucose_unit" varchar(10) DEFAULT 'mg/dL',
	"loinc_codes" jsonb,
	"notes" text,
	"satusehat_observation_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text
);
--> statement-breakpoint
CREATE TABLE "geriatric_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"initial_assessment_id" uuid NOT NULL,
	"morse_history_of_falling" integer,
	"morse_secondary_diagnosis" integer,
	"morse_ambulatory_aid" integer,
	"morse_iv_therapy" integer,
	"morse_gait" integer,
	"morse_mental_status" integer,
	"morse_total_score" integer,
	"morse_fall_risk" varchar(20),
	"adl_bathing" integer,
	"adl_dressing" integer,
	"adl_toileting" integer,
	"adl_transferring" integer,
	"adl_continence" integer,
	"adl_feeding" integer,
	"adl_total_score" integer,
	"adl_independence_level" varchar(50),
	"nutritional_screening_score" integer,
	"nutritional_risk" varchar(20),
	"nutritional_details" jsonb,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "initial_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"encounter_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"assessed_by" uuid NOT NULL,
	"assessment_type" "assessment_type" DEFAULT 'initial' NOT NULL,
	"assessed_at" timestamp DEFAULT now() NOT NULL,
	"triage_level" "triage_level",
	"triage_details" jsonb,
	"pain_scale_type" "pain_scale_type",
	"pain_score" integer,
	"pain_location" varchar(255),
	"pain_details" jsonb,
	"fall_risk_score" integer,
	"fall_risk_level" varchar(20),
	"fall_risk_details" jsonb,
	"is_complete" boolean DEFAULT false,
	"completed_at" timestamp,
	"completed_by" uuid,
	"notes" text,
	"satusehat_observation_ids" jsonb
);
--> statement-breakpoint
CREATE TABLE "nursing_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"initial_assessment_id" uuid NOT NULL,
	"chief_complaint" text,
	"history_of_present_illness" text,
	"past_medical_history" text,
	"allergy_history" text,
	"medication_history" text,
	"contraception_history" text,
	"disease_history" jsonb,
	"psychology_status" "psychology_status",
	"psychology_status_other" varchar(255),
	"understands_treatment" boolean,
	"beliefs_restrictions" text,
	"communication_barriers" text,
	"caretaker" varchar(255),
	"has_insurance" boolean,
	"occupation" varchar(100),
	"education" varchar(100),
	"habits" jsonb,
	"education_provided" text,
	"care_problem" text,
	"care_plan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "obstetric_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"initial_assessment_id" uuid NOT NULL,
	"gravida" integer,
	"para" integer,
	"abortus" integer,
	"living_children" integer,
	"stillbirths" integer,
	"last_delivery_interval" integer,
	"last_delivery_method" varchar(100),
	"last_delivery_assistant" varchar(100),
	"lmp" date,
	"edd" date,
	"gestational_weeks" integer,
	"contraception_before_pregnancy" varchar(100),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "pediatric_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"initial_assessment_id" uuid NOT NULL,
	"birth_method" "birth_method",
	"gestational_status" "gestational_status",
	"birth_weight_grams" integer,
	"birth_length_cm" integer,
	"vaccine_history" jsonb,
	"flacc_face" integer,
	"flacc_legs" integer,
	"flacc_activity" integer,
	"flacc_cry" integer,
	"flacc_consolability" integer,
	"flacc_total_score" integer,
	"current_weight_kg" numeric(5, 2),
	"current_height_cm" numeric(5, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "admissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"admission_number" varchar(30) NOT NULL,
	"encounter_id" uuid,
	"ward_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"bed_id" uuid NOT NULL,
	"admission_date" timestamp NOT NULL,
	"admission_type" "admission_type" NOT NULL,
	"admission_reason" text,
	"discharge_date" timestamp,
	"discharge_disposition" "discharge_disposition",
	"discharge_reason" text,
	"referring_doctor" varchar(255),
	"referring_doctor_id" varchar(100),
	"attending_doctor_id" uuid,
	"status" "admission_status" DEFAULT 'admitted',
	"bpjs_sep_number" varchar(30),
	"notes" text,
	CONSTRAINT "admissions_admission_number_unique" UNIQUE("admission_number")
);
--> statement-breakpoint
CREATE TABLE "beds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"room_id" uuid NOT NULL,
	"bed_code" varchar(20) NOT NULL,
	"bed_number" varchar(20) NOT NULL,
	"bed_type" varchar(50),
	"status" "bed_status" DEFAULT 'available',
	"is_isolation" boolean DEFAULT false,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "inpatient_progress_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"admission_id" uuid NOT NULL,
	"note_date" timestamp NOT NULL,
	"noted_by" uuid NOT NULL,
	"note_type" varchar(50),
	"chief_complaint" text,
	"assessment" text,
	"plan" text,
	"vital_signs" jsonb,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "medication_administrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"admission_id" uuid NOT NULL,
	"medication_name" varchar(255) NOT NULL,
	"medication_name_id" varchar(255),
	"dosage" varchar(50),
	"route" varchar(50),
	"frequency" varchar(50),
	"administered_at" timestamp NOT NULL,
	"administered_by" uuid NOT NULL,
	"status" "mar_status" DEFAULT 'scheduled',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"ward_id" uuid NOT NULL,
	"room_code" varchar(20) NOT NULL,
	"room_name" varchar(255) NOT NULL,
	"room_class" "room_class" NOT NULL,
	"capacity" integer NOT NULL,
	"has_private_bathroom" boolean DEFAULT false,
	"has_tv" boolean DEFAULT false,
	"has_ac" boolean DEFAULT false,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "wards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"ward_code" varchar(20) NOT NULL,
	"ward_name" varchar(255) NOT NULL,
	"ward_name_id" varchar(255),
	"ward_type" varchar(50),
	"floor" varchar(20),
	"location" varchar(100),
	"capacity" integer NOT NULL,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "controlled_substance_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"medication_id" uuid NOT NULL,
	"log_date" timestamp NOT NULL,
	"log_type" varchar(50) NOT NULL,
	"quantity" integer NOT NULL,
	"balance" integer NOT NULL,
	"logged_by" uuid NOT NULL,
	"reference_number" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dispense_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"dispense_id" uuid NOT NULL,
	"medication_id" uuid NOT NULL,
	"batch_id" uuid,
	"line_number" integer NOT NULL,
	"medication_name" varchar(255) NOT NULL,
	"medication_name_id" varchar(255),
	"quantity" varchar(20) NOT NULL,
	"unit" varchar(20),
	"dosage" varchar(50),
	"instructions" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "dispenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"dispense_number" varchar(30) NOT NULL,
	"dispense_date" timestamp NOT NULL,
	"dispensed_by" uuid NOT NULL,
	"status" "dispense_status" DEFAULT 'pending',
	"prescription_number" varchar(30),
	"notes" text,
	CONSTRAINT "dispenses_dispense_number_unique" UNIQUE("dispense_number")
);
--> statement-breakpoint
CREATE TABLE "medication_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"stock_id" uuid NOT NULL,
	"batch_number" varchar(50) NOT NULL,
	"expiration_date" date NOT NULL,
	"quantity" integer NOT NULL,
	"received_date" timestamp NOT NULL,
	"supplier" varchar(255),
	"invoice_number" varchar(50),
	"cost_per_unit" varchar(20),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "medication_stock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"medication_id" uuid NOT NULL,
	"quantity_on_hand" integer NOT NULL,
	"quantity_reserved" integer DEFAULT 0,
	"reorder_level" integer,
	"max_stock_level" integer,
	"last_stock_check" timestamp
);
--> statement-breakpoint
CREATE TABLE "medications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"medication_code" varchar(30) NOT NULL,
	"generic_name" varchar(255) NOT NULL,
	"generic_name_id" varchar(255),
	"brand_name" varchar(255),
	"brand_name_id" varchar(255),
	"dosage_form" varchar(50),
	"strength" varchar(50),
	"strength_unit" varchar(20),
	"medication_type" "medication_type" NOT NULL,
	"controlled_substance_schedule" "controlled_substance_schedule",
	"manufacturer" varchar(255),
	"description" text,
	"indications" text,
	"contraindications" text,
	"side_effects" text,
	"storage_conditions" varchar(255),
	"is_active" boolean DEFAULT true,
	"is_discontinued" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "stock_movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"medication_id" uuid NOT NULL,
	"batch_id" uuid,
	"movement_type" "stock_movement_type" NOT NULL,
	"quantity" integer NOT NULL,
	"movement_date" timestamp NOT NULL,
	"reference_number" varchar(50),
	"reference_type" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "critical_value_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"lab_result_id" uuid NOT NULL,
	"notification_date" timestamp NOT NULL,
	"notified_by" uuid NOT NULL,
	"notified_to" uuid,
	"notification_method" "critical_notification_method" NOT NULL,
	"acknowledged_at" timestamp,
	"acknowledged_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "diagnostic_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"order_id" uuid,
	"report_number" varchar(30) NOT NULL,
	"report_date" timestamp NOT NULL,
	"status" "diagnostic_report_status" DEFAULT 'preliminary',
	"generated_by" uuid NOT NULL,
	"conclusion" text,
	"notes" text,
	"satusehat_diagnostic_report_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text,
	CONSTRAINT "diagnostic_reports_report_number_unique" UNIQUE("report_number")
);
--> statement-breakpoint
CREATE TABLE "lab_order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"order_id" uuid NOT NULL,
	"lab_test_id" uuid NOT NULL,
	"test_code" varchar(20) NOT NULL,
	"test_name" varchar(255) NOT NULL,
	"test_name_id" varchar(255),
	"priority" "lab_queue_priority" DEFAULT 'routine',
	"status" "lab_queue_status" DEFAULT 'pending',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "lab_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"queue_id" uuid,
	"order_number" varchar(30) NOT NULL,
	"ordered_at" timestamp NOT NULL,
	"ordered_by" uuid NOT NULL,
	"priority" "lab_queue_priority" DEFAULT 'routine',
	"status" "lab_queue_status" DEFAULT 'pending',
	"clinical_info" text,
	"notes" text,
	CONSTRAINT "lab_orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
CREATE TABLE "lab_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"queue_number" varchar(20) NOT NULL,
	"status" "lab_queue_status" DEFAULT 'pending',
	"priority" "lab_queue_priority" DEFAULT 'routine',
	"is_fasting" boolean DEFAULT false,
	"fasting_verified" boolean DEFAULT false,
	"fasting_verified_at" timestamp,
	"fasting_verified_by" uuid,
	"clinical_info" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "lab_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"order_item_id" uuid NOT NULL,
	"specimen_id" uuid,
	"result_date" timestamp NOT NULL,
	"result_value" varchar(255),
	"result_text" text,
	"interpretation" "lab_result_interpretation",
	"is_abnormal" boolean DEFAULT false,
	"is_critical" boolean DEFAULT false,
	"status" "lab_result_status" DEFAULT 'preliminary',
	"verified_at" timestamp,
	"verified_by" uuid,
	"notes" text,
	"satusehat_observation_id" varchar(100),
	"is_satusehat_synced" boolean DEFAULT false,
	"satusehat_synced_at" timestamp,
	"satusehat_sync_error" text,
	"is_jkn_synced" boolean DEFAULT false,
	"jkn_synced_at" timestamp,
	"jkn_sync_error" text
);
--> statement-breakpoint
CREATE TABLE "lab_test_reference_ranges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"lab_test_id" uuid NOT NULL,
	"gender" varchar(10),
	"age_min" integer,
	"age_max" integer,
	"age_unit" varchar(20),
	"min_value" varchar(20),
	"max_value" varchar(20),
	"min_value_critical" varchar(20),
	"max_value_critical" varchar(20),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "lab_tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"test_code" varchar(20) NOT NULL,
	"test_name" varchar(255) NOT NULL,
	"test_name_id" varchar(255),
	"test_category" "lab_test_category" NOT NULL,
	"test_type" "lab_test_type" NOT NULL,
	"description" text,
	"specimen_type" varchar(50),
	"result_type" "lab_result_type" NOT NULL,
	"unit" varchar(50),
	"normal_range" text,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "specimens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"order_item_id" uuid NOT NULL,
	"specimen_number" varchar(30) NOT NULL,
	"specimen_type" varchar(50) NOT NULL,
	"collection_date" timestamp NOT NULL,
	"collected_by" uuid NOT NULL,
	"status" "specimen_status" DEFAULT 'collected',
	"condition" "specimen_condition",
	"received_at" timestamp,
	"received_by" uuid,
	"notes" text,
	CONSTRAINT "specimens_specimen_number_unique" UNIQUE("specimen_number")
);
--> statement-breakpoint
CREATE TABLE "cash_closings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"cashier_id" uuid NOT NULL,
	"closing_date" date NOT NULL,
	"shift" "cash_closing_shift" NOT NULL,
	"opening_balance" numeric(15, 2) NOT NULL,
	"total_cash_in" numeric(15, 2) NOT NULL,
	"total_cash_out" numeric(15, 2) NOT NULL,
	"expected_balance" numeric(15, 2) NOT NULL,
	"actual_balance" numeric(15, 2) NOT NULL,
	"variance" numeric(15, 2) NOT NULL,
	"variance_status" "variance_status" NOT NULL,
	"status" "cash_closing_status" DEFAULT 'pending',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "charge_adjustments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"charge_id" uuid NOT NULL,
	"adjustment_type" charge_adjustment_type NOT NULL,
	"original_amount" numeric(15, 2) NOT NULL,
	"adjustment_amount" numeric(15, 2) NOT NULL,
	"new_amount" numeric(15, 2) NOT NULL,
	"reason" text NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "charges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"invoice_id" uuid,
	"charge_number" varchar(30) NOT NULL,
	"charge_date" timestamp NOT NULL,
	"source_type" charge_source_type NOT NULL,
	"source_id" uuid NOT NULL,
	"service_tariff_id" uuid,
	"description" text NOT NULL,
	"quantity" numeric(10, 2) DEFAULT '1',
	"unit_price" numeric(15, 2) NOT NULL,
	"total_price" numeric(15, 2) NOT NULL,
	"status" charge_status DEFAULT 'pending',
	"notes" text,
	CONSTRAINT "charges_charge_number_unique" UNIQUE("charge_number")
);
--> statement-breakpoint
CREATE TABLE "deposit_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"deposit_id" uuid NOT NULL,
	"invoice_id" uuid NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "deposits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"deposit_number" varchar(30) NOT NULL,
	"deposit_date" timestamp NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"payment_method" varchar(20) NOT NULL,
	"reference_number" varchar(50),
	"status" "deposit_status" DEFAULT 'active',
	"notes" text,
	CONSTRAINT "deposits_deposit_number_unique" UNIQUE("deposit_number")
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"invoice_number" varchar(30) NOT NULL,
	"invoice_date" timestamp NOT NULL,
	"invoice_type" "invoice_type" NOT NULL,
	"payer_type" "payer_type" NOT NULL,
	"payer_name" varchar(255),
	"bpjs_number" varchar(20),
	"sep_number" varchar(20),
	"subtotal" numeric(15, 2) NOT NULL,
	"discount" numeric(15, 2) DEFAULT '0',
	"tax" numeric(15, 2) DEFAULT '0',
	"total" numeric(15, 2) NOT NULL,
	"paid_amount" numeric(15, 2) DEFAULT '0',
	"balance" numeric(15, 2) NOT NULL,
	"status" "invoice_status" DEFAULT 'draft',
	"notes" text,
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"invoice_id" uuid,
	"payment_number" varchar(30) NOT NULL,
	"payment_date" timestamp NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"reference_number" varchar(50),
	"bank_name" varchar(100),
	"card_number" varchar(20),
	"status" "payment_status" DEFAULT 'completed',
	"notes" text,
	CONSTRAINT "payments_payment_number_unique" UNIQUE("payment_number")
);
--> statement-breakpoint
CREATE TABLE "refunds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"payment_id" uuid NOT NULL,
	"refund_number" varchar(30) NOT NULL,
	"refund_date" timestamp NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"reason" text NOT NULL,
	"status" "refund_status" DEFAULT 'pending',
	"notes" text,
	CONSTRAINT "refunds_refund_number_unique" UNIQUE("refund_number")
);
--> statement-breakpoint
CREATE TABLE "service_tariffs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"category" "service_tariff_category" NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_id" varchar(255),
	"description" text,
	"unit" varchar(20),
	"price" numeric(15, 2) NOT NULL,
	"bpjs_tariff_code" varchar(20),
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "attendance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"employee_id" uuid NOT NULL,
	"attendance_date" date NOT NULL,
	"check_in_time" timestamp,
	"check_out_time" timestamp,
	"work_hours" numeric(5, 2),
	"overtime_hours" numeric(5, 2),
	"status" "attendance_status" DEFAULT 'present',
	"leave_id" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"department_code" varchar(20) NOT NULL,
	"department_name" varchar(255) NOT NULL,
	"department_name_id" varchar(255),
	"parent_department_id" uuid,
	"head_id" uuid,
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "employee_salary_components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"employee_id" uuid NOT NULL,
	"component_id" uuid NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"effective_from" date NOT NULL,
	"effective_to" date,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"user_id" uuid NOT NULL,
	"employee_number" varchar(30) NOT NULL,
	"department_id" uuid,
	"position_id" uuid,
	"manager_id" uuid,
	"employment_type" "employment_type" NOT NULL,
	"employment_status" "employment_status" DEFAULT 'active',
	"hire_date" date NOT NULL,
	"probation_end_date" date,
	"contract_end_date" date,
	"termination_date" date,
	"termination_reason" text,
	"base_salary" numeric(15, 2),
	"salary_currency" varchar(3) DEFAULT 'IDR',
	"bank_name" varchar(100),
	"bank_account_number" varchar(50),
	"bank_account_name" varchar(255),
	"npwp" varchar(20),
	"bpjs_kesehatan_number" varchar(20),
	"bpjs_ketenagakerjaan_number" varchar(20),
	"annual_leave_balance" integer DEFAULT 12,
	"sick_leave_balance" integer DEFAULT 12,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "leaves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"employee_id" uuid NOT NULL,
	"leave_type" "leave_type" NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"total_days" integer NOT NULL,
	"reason" text,
	"status" "leave_status" DEFAULT 'pending',
	"approved_by" uuid,
	"approved_at" timestamp,
	"rejection_reason" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "payroll_item_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"payroll_item_id" uuid NOT NULL,
	"component_id" uuid NOT NULL,
	"component_type" "salary_component_type" NOT NULL,
	"component_name" varchar(255) NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "payroll_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"payroll_run_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"base_salary" numeric(15, 2) NOT NULL,
	"total_earnings" numeric(15, 2) NOT NULL,
	"total_deductions" numeric(15, 2) NOT NULL,
	"gross_salary" numeric(15, 2) NOT NULL,
	"tax_amount" numeric(15, 2) DEFAULT '0',
	"net_salary" numeric(15, 2) NOT NULL,
	"work_days" integer DEFAULT 0,
	"present_days" integer DEFAULT 0,
	"absent_days" integer DEFAULT 0,
	"leave_days" integer DEFAULT 0,
	"overtime_hours" numeric(5, 2) DEFAULT '0',
	"is_paid" boolean DEFAULT false,
	"paid_at" timestamp,
	"payment_reference" varchar(100),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "payroll_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"payroll_number" varchar(30) NOT NULL,
	"payroll_period" varchar(7) NOT NULL,
	"period_start_date" date NOT NULL,
	"period_end_date" date NOT NULL,
	"status" "payroll_status" DEFAULT 'draft',
	"total_employees" integer DEFAULT 0,
	"total_gross_salary" numeric(18, 2) DEFAULT '0',
	"total_deductions" numeric(18, 2) DEFAULT '0',
	"total_net_salary" numeric(18, 2) DEFAULT '0',
	"processed_at" timestamp,
	"processed_by" uuid,
	"approved_at" timestamp,
	"approved_by" uuid,
	"paid_at" timestamp,
	"paid_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"position_code" varchar(20) NOT NULL,
	"position_name" varchar(255) NOT NULL,
	"position_name_id" varchar(255),
	"department_id" uuid,
	"level" integer DEFAULT 1,
	"min_salary" numeric(15, 2),
	"max_salary" numeric(15, 2),
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "salary_components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"component_code" varchar(20) NOT NULL,
	"component_name" varchar(255) NOT NULL,
	"component_name_id" varchar(255),
	"component_type" "salary_component_type" NOT NULL,
	"is_fixed" boolean DEFAULT true,
	"is_taxable" boolean DEFAULT true,
	"default_amount" numeric(15, 2),
	"default_percentage" numeric(5, 2),
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "data_access_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"user_id" uuid NOT NULL,
	"user_role" varchar(50) NOT NULL,
	"patient_id" uuid NOT NULL,
	"resource_type" "audit_resource_type" NOT NULL,
	"resource_id" uuid,
	"access_reason" varchar(255),
	"emergency_access" varchar(5) DEFAULT 'false',
	"ip_address" "inet",
	"session_id" varchar(100),
	"accessed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" uuid,
	"email" varchar(255) NOT NULL,
	"user_id" uuid,
	"successful" varchar(5) NOT NULL,
	"failure_reason" varchar(100),
	"ip_address" "inet" NOT NULL,
	"user_agent" text,
	"location" varchar(255),
	"suspicious_activity" varchar(5) DEFAULT 'false',
	"mfa_used" varchar(5) DEFAULT 'false',
	"attempted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"key_name" varchar(255) NOT NULL,
	"key_prefix" varchar(10) NOT NULL,
	"key_hash" varchar(255) NOT NULL,
	"scopes" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"last_used_at" timestamp,
	"usage_count" integer DEFAULT 0,
	"expires_at" timestamp,
	"rate_limit" integer DEFAULT 1000,
	"rate_limit_window" integer DEFAULT 3600,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"feature_key" varchar(100) NOT NULL,
	"feature_name" varchar(255) NOT NULL,
	"feature_name_id" varchar(255),
	"description" text,
	"category" varchar(100),
	"module" varchar(100),
	"default_status" "feature_flag_status" DEFAULT 'disabled',
	"minimum_plan" "subscription_plan" DEFAULT 'basic',
	"is_add_on" boolean DEFAULT false,
	"add_on_price" numeric(15, 2),
	"notes" text,
	CONSTRAINT "features_feature_key_unique" UNIQUE("feature_key")
);
--> statement-breakpoint
CREATE TABLE "organization_features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" uuid NOT NULL,
	"feature_id" uuid NOT NULL,
	"status" "feature_flag_status" DEFAULT 'enabled',
	"is_override" boolean DEFAULT false,
	"override_reason" text,
	"enabled_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "subscription_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"subscription_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"previous_plan" "subscription_plan",
	"new_plan" "subscription_plan",
	"previous_status" "subscription_status",
	"new_status" "subscription_status",
	"amount" numeric(15, 2),
	"payment_reference" varchar(100),
	"metadata" jsonb,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"plan" "subscription_plan" NOT NULL,
	"status" "subscription_status" DEFAULT 'trial',
	"billing_cycle" "billing_cycle" DEFAULT 'monthly',
	"trial_start_date" date,
	"trial_end_date" date,
	"current_period_start" date NOT NULL,
	"current_period_end" date NOT NULL,
	"next_billing_date" date,
	"monthly_price" numeric(15, 2),
	"yearly_price" numeric(15, 2),
	"discount_percent" numeric(5, 2),
	"payment_method_id" varchar(100),
	"last_payment_date" date,
	"last_payment_amount" numeric(15, 2),
	"cancelled_at" timestamp,
	"cancel_reason" text,
	"cancel_at_period_end" boolean DEFAULT false,
	"external_subscription_id" varchar(100),
	"external_customer_id" varchar(100),
	"notes" text,
	CONSTRAINT "subscriptions_organization_id_unique" UNIQUE("organization_id")
);
--> statement-breakpoint
CREATE TABLE "usage_quotas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"plan" "subscription_plan" NOT NULL,
	"quota_key" varchar(100) NOT NULL,
	"quota_name" varchar(255) NOT NULL,
	"description" text,
	"limit_value" integer NOT NULL,
	"limit_period" varchar(20),
	"is_soft_limit" boolean DEFAULT false,
	"overage_price" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "usage_tracking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" uuid NOT NULL,
	"quota_key" varchar(100) NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"usage_count" integer DEFAULT 0,
	"limit_value" integer NOT NULL,
	"alert_sent_at_80" timestamp,
	"alert_sent_at_100" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "notification_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid,
	"template_key" varchar(100) NOT NULL,
	"template_name" varchar(255) NOT NULL,
	"description" text,
	"channel" "notification_channel" NOT NULL,
	"subject" varchar(500),
	"body_template" text NOT NULL,
	"body_template_id" text,
	"variables" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"user_id" uuid,
	"recipient_email" varchar(255),
	"recipient_phone" varchar(20),
	"recipient_device_token" text,
	"channel" "notification_channel" NOT NULL,
	"priority" "notification_priority" DEFAULT 'normal',
	"template_id" uuid,
	"title" varchar(500) NOT NULL,
	"body" text NOT NULL,
	"data" jsonb,
	"action_url" varchar(1000),
	"image_url" varchar(1000),
	"status" "notification_status" DEFAULT 'pending',
	"scheduled_at" timestamp,
	"sent_at" timestamp,
	"delivered_at" timestamp,
	"read_at" timestamp,
	"failed_at" timestamp,
	"failure_reason" text,
	"attempts" integer DEFAULT 0,
	"max_attempts" integer DEFAULT 3,
	"next_retry_at" timestamp,
	"external_message_id" varchar(255),
	"expires_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "push_device_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_token" text NOT NULL,
	"device_type" varchar(20) NOT NULL,
	"device_name" varchar(255),
	"app_version" varchar(20),
	"is_active" boolean DEFAULT true,
	"last_used_at" timestamp,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "user_notification_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"enable_in_app" boolean DEFAULT true,
	"enable_email" boolean DEFAULT true,
	"enable_sms" boolean DEFAULT false,
	"enable_whatsapp" boolean DEFAULT false,
	"enable_push" boolean DEFAULT true,
	"enable_appointment_reminders" boolean DEFAULT true,
	"enable_lab_results" boolean DEFAULT true,
	"enable_payment_reminders" boolean DEFAULT true,
	"enable_system_alerts" boolean DEFAULT true,
	"enable_marketing_messages" boolean DEFAULT false,
	"quiet_hours_start" varchar(5),
	"quiet_hours_end" varchar(5),
	"quiet_hours_timezone" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "document_access_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"document_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"user_role" varchar(50),
	"access_type" varchar(50) NOT NULL,
	"ip_address" varchar(50),
	"user_agent" text,
	"access_reason" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "document_shares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"document_id" uuid NOT NULL,
	"shared_by" uuid NOT NULL,
	"shared_with_user_id" uuid,
	"shared_with_email" varchar(255),
	"shared_with_phone" varchar(20),
	"share_token" varchar(100),
	"share_url" text,
	"can_view" boolean DEFAULT true,
	"can_download" boolean DEFAULT false,
	"can_print" boolean DEFAULT false,
	"expires_at" timestamp,
	"max_access_count" integer,
	"access_count" integer DEFAULT 0,
	"is_revoked" boolean DEFAULT false,
	"revoked_at" timestamp,
	"revoked_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "document_uploads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" uuid NOT NULL,
	"file_name" varchar(500) NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"expected_size_bytes" integer NOT NULL,
	"storage_path" varchar(1000) NOT NULL,
	"document_type" "document_type" NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" text,
	"patient_id" uuid,
	"metadata" jsonb,
	"created_by_user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"confirmed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "document_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"document_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"version_label" varchar(100),
	"file_name" varchar(500) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"file_size_bytes" integer NOT NULL,
	"storage_path" varchar(1000) NOT NULL,
	"storage_url" text,
	"md5_hash" varchar(32),
	"sha256_hash" varchar(64),
	"created_by_user_id" uuid NOT NULL,
	"change_notes" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"document_number" varchar(50) NOT NULL,
	"document_type" "document_type" NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" text,
	"file_name" varchar(500) NOT NULL,
	"file_extension" varchar(20),
	"mime_type" varchar(100) NOT NULL,
	"file_size_bytes" integer NOT NULL,
	"storage_provider" varchar(50) NOT NULL,
	"storage_bucket" varchar(255),
	"storage_path" varchar(1000) NOT NULL,
	"storage_url" text,
	"md5_hash" varchar(32),
	"sha256_hash" varchar(64),
	"status" "document_status" DEFAULT 'ready',
	"patient_id" uuid,
	"encounter_id" uuid,
	"appointment_id" uuid,
	"uploaded_by" uuid NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"is_processed" boolean DEFAULT false,
	"processed_at" timestamp,
	"processing_metadata" jsonb,
	"thumbnail_path" varchar(1000),
	"thumbnail_url" text,
	"is_encrypted" boolean DEFAULT false,
	"encryption_key_id" varchar(100),
	"virus_scan_status" "virus_scan_status" DEFAULT 'pending',
	"virus_scan_completed_at" timestamp,
	"access" "file_access" DEFAULT 'private',
	"retention_date" timestamp,
	"is_archived" boolean DEFAULT false,
	"archived_at" timestamp,
	"extracted_text" text,
	"ocr_processed_at" timestamp,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "patient_ihs_lookups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"nik" varchar(16) NOT NULL,
	"satusehat_ihs_id" varchar(100),
	"satusehat_patient_id" uuid,
	"status" "satusehat_lookup_status" DEFAULT 'not_found',
	"verification_method" "satusehat_verification_method" NOT NULL,
	"verified_at" timestamp,
	"verified_by" uuid,
	"lookup_attempts" integer DEFAULT 0,
	"last_lookup_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "satusehat_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"environment" "satusehat_environment" NOT NULL,
	"client_id" varchar(100) NOT NULL,
	"client_secret" varchar(255) NOT NULL,
	"auth_url" varchar(500) NOT NULL,
	"api_url" varchar(500) NOT NULL,
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "satusehat_consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"scope" "satusehat_consent_scope" NOT NULL,
	"method" "satusehat_consent_method" NOT NULL,
	"consent_date" timestamp NOT NULL,
	"consented_by" uuid NOT NULL,
	"is_revoked" boolean DEFAULT false,
	"revoked_at" timestamp,
	"revoked_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "satusehat_error_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"resource_type" "satusehat_resource_type" NOT NULL,
	"operation" "satusehat_operation" NOT NULL,
	"local_id" uuid NOT NULL,
	"satusehat_id" varchar(100),
	"category" "satusehat_error_category" NOT NULL,
	"status_code" integer,
	"error_message" text NOT NULL,
	"resolution" "satusehat_error_resolution" DEFAULT 'pending',
	"resolved_at" timestamp,
	"resolved_by" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "satusehat_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"satusehat_location_id" varchar(100) NOT NULL,
	"satusehat_location_name" varchar(255),
	"local_location_id" uuid NOT NULL,
	"last_synced_at" timestamp,
	"notes" text,
	CONSTRAINT "satusehat_locations_satusehat_location_id_unique" UNIQUE("satusehat_location_id")
);
--> statement-breakpoint
CREATE TABLE "satusehat_practitioners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"satusehat_ihs_id" varchar(100) NOT NULL,
	"satusehat_practitioner_name" varchar(255),
	"local_practitioner_id" uuid NOT NULL,
	"last_synced_at" timestamp,
	"notes" text,
	CONSTRAINT "satusehat_practitioners_satusehat_ihs_id_unique" UNIQUE("satusehat_ihs_id")
);
--> statement-breakpoint
CREATE TABLE "satusehat_sync_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"resource_type" "satusehat_resource_type" NOT NULL,
	"operation" "satusehat_operation" NOT NULL,
	"local_id" uuid NOT NULL,
	"satusehat_id" varchar(100),
	"payload" jsonb,
	"status" "satusehat_sync_status" DEFAULT 'pending',
	"priority" integer DEFAULT 0,
	"attempts" integer DEFAULT 0,
	"max_attempts" integer DEFAULT 3,
	"last_attempt_at" timestamp,
	"next_retry_at" timestamp,
	"base_retry_delay_ms" integer DEFAULT 60000,
	"retry_backoff_multiplier" integer DEFAULT 2,
	"error_message" text,
	"completed_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "satusehat_webhooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"webhook_id" varchar(100) NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"resource_type" "satusehat_resource_type",
	"resource_id" varchar(100),
	"headers" jsonb,
	"payload" jsonb NOT NULL,
	"status" "webhook_status" DEFAULT 'received',
	"processed_at" timestamp,
	"processing_error" text,
	"local_resource_id" uuid,
	"sync_queue_id" uuid,
	"notes" text,
	CONSTRAINT "satusehat_webhooks_webhook_id_unique" UNIQUE("webhook_id")
);
--> statement-breakpoint
CREATE TABLE "jkn_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"api_type" "jkn_api_type" NOT NULL,
	"environment" "bpjs_environment" NOT NULL,
	"cons_id" varchar(50) NOT NULL,
	"secret_key" varchar(255) NOT NULL,
	"user_key" varchar(255),
	"ppk_pelayanan" varchar(20) NOT NULL,
	"ppk_bpjs" varchar(20) NOT NULL,
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_inacbg" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"sep_id" uuid,
	"no_klaim" varchar(30) NOT NULL,
	"tgl_masuk" date NOT NULL,
	"tgl_pulang" date,
	"jenis_rawat" "bpjs_inacbg_tipe_rawat" NOT NULL,
	"kelas_rawat" "bpjs_inacbg_kelas_rawat" NOT NULL,
	"cara_masuk" "bpjs_inacbg_cara_masuk" NOT NULL,
	"los" integer,
	"bb" integer,
	"tb" integer,
	"dpjp" varchar(20),
	"kel_type" "bpjs_inacbg_kel_type",
	"spri" varchar(20),
	"kd_tarif" varchar(20),
	"tarif_poli_eks" numeric(15, 2),
	"biaya_tambahan" numeric(15, 2),
	"total_biaya" numeric(15, 2),
	"status" "bpjs_inacbg_status" DEFAULT 'pending',
	"catatan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_inacbg_obat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"inacbg_id" uuid NOT NULL,
	"kode_obat" varchar(20) NOT NULL,
	"nama_obat" varchar(100) NOT NULL,
	"signa" varchar(50),
	"tarif" numeric(15, 2),
	"qty" integer DEFAULT 1,
	"total" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_inacbg_procedure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"inacbg_id" uuid NOT NULL,
	"kode_tindakan" varchar(20) NOT NULL,
	"nama_tindakan" varchar(100) NOT NULL,
	"tarif" numeric(15, 2),
	"qty" integer DEFAULT 1,
	"total" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_kunjungan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"nomorkartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"notelp" varchar(20) NOT NULL,
	"norm" varchar(20) NOT NULL,
	"tanggalperiksa" date NOT NULL,
	"jeniskunjungan" "bpjs_jenis_kunjungan" NOT NULL,
	"kelasrawat" varchar(20),
	"statuskunjungan" varchar(20) DEFAULT 'Baru',
	"statuspulang" varchar(20),
	"statuspulangsebab" varchar(50),
	"carakeluar" varchar(20),
	"penyebabkematian" varchar(50),
	"kondisipulang" varchar(20),
	"tglpulang" date,
	"klsrawat" varchar(20),
	"klsrawatnaik" varchar(20),
	"klsrawatturun" varchar(20),
	"emas" varchar(20),
	"losminggu" integer
);
--> statement-breakpoint
CREATE TABLE "jkn_monitoring_klaim" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"inacbg_id" uuid,
	"sep_id" uuid,
	"no_sep" varchar(30) NOT NULL,
	"tgl_sep" date NOT NULL,
	"jenis_klaim" "bpjs_monitoring_jenis_klaim" NOT NULL,
	"status" "bpjs_monitoring_status" DEFAULT 'pending',
	"catatan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_peserta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"nik" varchar(16) NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"tgl_lahir" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"mr" varchar(20),
	"umur" integer,
	"umur_tahun" integer,
	"umur_bulan" integer,
	"umur_hari" integer,
	"status" "bpjs_peserta_status" DEFAULT 'active',
	"faskes" varchar(100),
	"tgl_cetak_kartu" date,
	"tgl_tat" date,
	"tgl_tmt" date,
	"hak_kelas" varchar(20),
	"jenis_peserta" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_rujukan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"no_rujukan" varchar(30) NOT NULL,
	"tgl_rujukan" date NOT NULL,
	"asal_rujukan" "bpjs_rujukan_asal_rujukan" NOT NULL,
	"tipe_rujukan" "bpjs_rujukan_tipe_rujukan" NOT NULL,
	"poli_rujukan" "bpjs_rujukan_poli_rujukan" NOT NULL,
	"faskes_perujuk" varchar(100) NOT NULL,
	"faskes_tujuan" varchar(100) NOT NULL,
	"ppk_rujukan" varchar(20) NOT NULL,
	"diagnosa" varchar(100) NOT NULL,
	"keluhan" text,
	"status" "bpjs_rujukan_status" DEFAULT 'active',
	"tgl_berlaku" date,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_rujukan_peserta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"rujukan_id" uuid NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"tgl_lahir" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"no_kartu" varchar(20),
	"hubungan" varchar(50),
	"alamat" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_sep" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"no_sep" varchar(30) NOT NULL,
	"tgl_sep" date NOT NULL,
	"tgl_rujukan" date,
	"no_rujukan" varchar(30),
	"ppk_rujukan" varchar(20) NOT NULL,
	"ppk_pelayanan" varchar(20) NOT NULL,
	"jenis_pelayanan" "bpjs_pelayanan" NOT NULL,
	"kelas_rawat" "bpjs_inacbg_kelas_rawat" NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"tgl_lahir" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"diagnosa_awal" varchar(20) NOT NULL,
	"faskes_asal_rujukan" varchar(100),
	"asal_rujukan" "bpjs_asal_rujukan",
	"tipe_rujukan" "bpjs_rujukan_tipe_rujukan",
	"poli_tujuan" varchar(20),
	"kdpoli" varchar(10),
	"tujuan_kunj" "bpjs_tujuan_kunj",
	"laka_lantas" "bpjs_laka_lantas",
	"pembiayaan" "bpjs_pembiayaan",
	"penjamin" varchar(50),
	"catatan" text,
	"status" "bpjs_sep_status" DEFAULT 'created',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_sep_diagnosa" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"sep_id" uuid NOT NULL,
	"kode_diagnosa" varchar(20) NOT NULL,
	"nama_diagnosa" varchar(100) NOT NULL,
	"level" "bpjs_severity_level",
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_sep_procedure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"sep_id" uuid NOT NULL,
	"kode_tindakan" varchar(20) NOT NULL,
	"nama_tindakan" varchar(100) NOT NULL,
	"tarif" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_prb" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"sep_id" uuid,
	"rujukan_id" uuid,
	"program_prb" "jkn_prb_program" NOT NULL,
	"no_prb" varchar(30) NOT NULL,
	"tgl_prb" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"kd_diagnosa" varchar(20) NOT NULL,
	"nm_diagnosa" varchar(200) NOT NULL,
	"kd_dokter" varchar(20) NOT NULL,
	"nm_dokter" varchar(100) NOT NULL,
	"tgl_mulai" date NOT NULL,
	"tgl_akhir" date NOT NULL,
	"status" "jkn_prb_status" DEFAULT 'active',
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_prb_obat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"prb_id" uuid NOT NULL,
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(200) NOT NULL,
	"signa1" varchar(50),
	"signa2" varchar(50),
	"jml_obat" integer NOT NULL,
	"iterasi" "jkn_iterasi" NOT NULL,
	"tgl_resep" date NOT NULL,
	"harga_satuan" numeric(15, 2),
	"total_harga" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_prb_riwayat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"prb_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"tgl_kunjungan" date NOT NULL,
	"berat_badan" numeric(5, 2),
	"tinggi_badan" integer,
	"tekanan_darah" varchar(20),
	"gula_darah" integer,
	"kepatuhan_minum" varchar(50),
	"kondisi" varchar(50),
	"kd_dokter" varchar(20),
	"nm_dokter" varchar(100),
	"kd_faskes" varchar(20),
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_surat_kontrol" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"sep_id" uuid,
	"prb_id" uuid,
	"no_surat_kontrol" varchar(30) NOT NULL,
	"jenis_kontrol" "jkn_jenis_kontrol" NOT NULL,
	"tgl_rencana_kontrol" date NOT NULL,
	"tgl_surat_kontrol" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"no_sep_asal" varchar(30),
	"tgl_sep" date,
	"kd_poli" varchar(10) NOT NULL,
	"nm_poli" varchar(100) NOT NULL,
	"kd_dokter" varchar(20) NOT NULL,
	"nm_dokter" varchar(100) NOT NULL,
	"kd_faskes" varchar(20) NOT NULL,
	"nm_faskes" varchar(200) NOT NULL,
	"status" "jkn_surat_kontrol_status" DEFAULT 'created',
	"no_sep_baru" varchar(30),
	"tgl_sep_baru" date,
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_surat_kontrol_form_prb" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"surat_kontrol_id" uuid NOT NULL,
	"program_prb" "jkn_prb_program" NOT NULL,
	"form_data" jsonb,
	"keluhan" text,
	"pemeriksaan_fisik" text,
	"diagnosis" text,
	"tatalaksana" text,
	"edukasi" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_lpk" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"sep_id" uuid NOT NULL,
	"no_lpk" varchar(30) NOT NULL,
	"tgl_lpk" date NOT NULL,
	"no_sep" varchar(30) NOT NULL,
	"tgl_sep" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"jenis_pelayanan" "bpjs_pelayanan" NOT NULL,
	"tgl_masuk" date NOT NULL,
	"tgl_pulang" date,
	"kd_dokter" varchar(20) NOT NULL,
	"nm_dokter" varchar(100) NOT NULL,
	"kd_ppk" varchar(20) NOT NULL,
	"nm_ppk" varchar(200) NOT NULL,
	"anamnesa" text,
	"pemeriksaan_fisik" text,
	"pemeriksaan_penunjang" text,
	"terapi_pengobatan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_lpk_diagnosa" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"lpk_id" uuid NOT NULL,
	"kode_diagnosa" varchar(20) NOT NULL,
	"nama_diagnosa" varchar(200) NOT NULL,
	"jenis_diagnosa" varchar(20) NOT NULL,
	"urutan" integer DEFAULT 1,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_lpk_procedure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"lpk_id" uuid NOT NULL,
	"kode_tindakan" varchar(20) NOT NULL,
	"nama_tindakan" varchar(200) NOT NULL,
	"tgl_tindakan" date NOT NULL,
	"kd_dokter" varchar(20),
	"nm_dokter" varchar(100),
	"tarif" numeric(15, 2),
	"qty" integer DEFAULT 1,
	"total" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_lpk_rencana_tindak_lanjut" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"lpk_id" uuid NOT NULL,
	"tindak_lanjut" "jkn_lpk_tindak_lanjut" NOT NULL,
	"keterangan" text,
	"kd_faskes_rujuk" varchar(20),
	"nm_faskes_rujuk" varchar(200),
	"tgl_kontrol" date,
	"kd_poli_kontrol" varchar(10),
	"kd_dokter_kontrol" varchar(20),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_dokter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"poli_id" uuid NOT NULL,
	"kd_dokter" varchar(20) NOT NULL,
	"nm_dokter" varchar(100) NOT NULL,
	"jam_praktek" varchar(20),
	"kapasitas" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_faskes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_ppk" varchar(20) NOT NULL,
	"nm_ppk" varchar(100) NOT NULL,
	"alamat" text,
	"kota" varchar(50),
	"provinsi" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_fkrtl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"kode_booking" varchar(20) NOT NULL,
	"jenispasien" varchar(20) NOT NULL,
	"nomorkartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nohp" varchar(20) NOT NULL,
	"kodepoli" varchar(10) NOT NULL,
	"namapoli" varchar(100) NOT NULL,
	"pasienbaru" integer NOT NULL,
	"norm" varchar(20) NOT NULL,
	"tanggalperiksa" date NOT NULL,
	"kode_dokter" varchar(20) NOT NULL,
	"namadokter" varchar(100) NOT NULL,
	"jampraktek" varchar(20) NOT NULL,
	"jeniskunjungan" integer NOT NULL,
	"status" "bpjs_antrean_status" DEFAULT 'booked',
	"estimasi_dilayani" varchar(20),
	"cara_bayar" varchar(50) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_poli" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"faskes_id" uuid NOT NULL,
	"kd_poli" varchar(10) NOT NULL,
	"nm_poli" varchar(100) NOT NULL,
	"kapasitas" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_fktp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"kode_booking" varchar(20) NOT NULL,
	"nomor_antrean" varchar(10),
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"no_telp" varchar(20) NOT NULL,
	"tanggal_periksa" date NOT NULL,
	"jam_periksa" varchar(10),
	"kd_poli" varchar(10) NOT NULL,
	"nm_poli" varchar(100) NOT NULL,
	"kd_dokter" varchar(20),
	"nm_dokter" varchar(100),
	"status" "jkn_antrean_fktp_status" DEFAULT 'created',
	"waktu_check_in" timestamp,
	"waktu_dilayani" timestamp,
	"waktu_selesai" timestamp,
	"kd_faskes" varchar(20) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_antrean_fktp_status_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"antrean_id" uuid NOT NULL,
	"status_lama" "jkn_antrean_fktp_status" NOT NULL,
	"status_baru" "jkn_antrean_fktp_status" NOT NULL,
	"waktu_update" timestamp DEFAULT now() NOT NULL,
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_pcare_bridging" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"kd_ppk_pcare" varchar(20) NOT NULL,
	"kd_ppk_bpjs" varchar(20) NOT NULL,
	"tgl_daftar" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"tgl_lahir" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"poli" varchar(20) NOT NULL,
	"kd_dokter" varchar(20) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_pcare_reference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"ref_type" varchar(50) NOT NULL,
	"ref_code" varchar(20) NOT NULL,
	"ref_name" varchar(200) NOT NULL,
	"ref_data" text,
	"last_sync" timestamp DEFAULT now(),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_apotek_monitoring" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"resep_id" uuid,
	"no_resep" varchar(30) NOT NULL,
	"tgl_resep" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"by_tag_resep" numeric(15, 2),
	"by_ver_resep" numeric(15, 2),
	"status_verifikasi" varchar(50),
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_obat_riwayat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"resep_id" uuid,
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(200) NOT NULL,
	"tgl_pemberian" date NOT NULL,
	"jml_obat" integer NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_pelayanan_obat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"resep_id" uuid NOT NULL,
	"no_pelayanan" varchar(30) NOT NULL,
	"tgl_pelayanan" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"kd_apoteker" varchar(20),
	"nm_apoteker" varchar(100),
	"total_biaya" numeric(15, 2),
	"by_tag_pelayanan" numeric(15, 2),
	"by_ver_pelayanan" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_resep" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"sep_id" uuid,
	"no_resep" varchar(30) NOT NULL,
	"no_apotik" varchar(30),
	"no_sep_kunjungan" varchar(30),
	"no_kartu" varchar(20) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"tgl_resep" date NOT NULL,
	"tgl_pelayanan_resep" date NOT NULL,
	"kd_dokter" varchar(20) NOT NULL,
	"kd_poli" varchar(10) NOT NULL,
	"kd_jenis_obat" "jkn_jenis_obat" NOT NULL,
	"iterasi" "jkn_iterasi" NOT NULL,
	"faskes_asal" varchar(200),
	"by_tag_resep" numeric(15, 2),
	"by_ver_resep" numeric(15, 2),
	"status" "jkn_resep_status" DEFAULT 'created',
	"tgl_entry" timestamp DEFAULT now(),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_resep_obat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"resep_id" uuid NOT NULL,
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(200) NOT NULL,
	"signa1" varchar(50),
	"signa2" varchar(50),
	"jml_obat" integer NOT NULL,
	"tipe_obat" "jkn_tipe_obat" DEFAULT 'non_racikan',
	"harga_satuan" numeric(15, 2),
	"total_harga" numeric(15, 2),
	"jml_permintaan" integer,
	"jml_pemberian" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_resep_obat_racikan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"resep_id" uuid NOT NULL,
	"nama_racikan" varchar(200) NOT NULL,
	"kd_racikan" varchar(20),
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(200) NOT NULL,
	"jml_obat" integer NOT NULL,
	"signa1" varchar(50),
	"signa2" varchar(50),
	"jml_racikan" integer,
	"tipe_obat" "jkn_tipe_obat" DEFAULT 'racikan',
	"harga_satuan" numeric(15, 2),
	"total_harga" numeric(15, 2),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_sep_kunjungan_apotek" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"no_sep_kunjungan" varchar(30) NOT NULL,
	"tgl_sep" date NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"kd_faskes" varchar(20) NOT NULL,
	"nm_faskes" varchar(200),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_aplicares_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kamar_id" uuid NOT NULL,
	"kode_kamar" varchar(20) NOT NULL,
	"nama_kamar" varchar(200) NOT NULL,
	"kelas_kamar" "jkn_kelas_kamar" NOT NULL,
	"tersedia_pria" integer DEFAULT 0,
	"tersedia_wanita" integer DEFAULT 0,
	"tersedia_priawanita" integer DEFAULT 0,
	"waktu_snapshot" timestamp DEFAULT now() NOT NULL,
	"change_type" varchar(50),
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_aplicares_kamar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kode_kamar" varchar(20) NOT NULL,
	"nama_kamar" varchar(200) NOT NULL,
	"kelas_kamar" "jkn_kelas_kamar" NOT NULL,
	"kapasitas_total" integer NOT NULL,
	"kapasitas_pria" integer DEFAULT 0,
	"kapasitas_wanita" integer DEFAULT 0,
	"kapasitas_priawanita" integer DEFAULT 0,
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_aplicares_ketersediaan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"kamar_id" uuid NOT NULL,
	"tersedia_pria" integer DEFAULT 0,
	"tersedia_wanita" integer DEFAULT 0,
	"tersedia_priawanita" integer DEFAULT 0,
	"waktu_update" timestamp DEFAULT now() NOT NULL,
	"status_ketersediaan" varchar(50),
	"keterangan" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_icare_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"verification_id" uuid NOT NULL,
	"session_id" varchar(100) NOT NULL,
	"session_token" varchar(255),
	"session_started" timestamp DEFAULT now() NOT NULL,
	"session_ended" timestamp,
	"duration" varchar(20),
	"user_agent" text,
	"ip_address" varchar(50),
	"verification_method" varchar(50),
	"verification_score" varchar(10),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_icare_verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"type" "jkn_icare_type" NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"kd_dokter" varchar(20),
	"nm_dokter" varchar(100),
	"kd_faskes" varchar(20) NOT NULL,
	"nm_faskes" varchar(200),
	"status" "jkn_icare_status" NOT NULL,
	"validation_url" text,
	"response_code" varchar(10),
	"response_message" text,
	"verified_at" timestamp DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_rekam_medis_fhir" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"patient_id" uuid NOT NULL,
	"encounter_id" uuid,
	"bundle_id" varchar(100) NOT NULL,
	"no_kartu" varchar(20) NOT NULL,
	"nik" varchar(16) NOT NULL,
	"fhir_bundle" jsonb,
	"bundle_type" varchar(50),
	"resource_count" varchar(10),
	"submission_id" varchar(100),
	"submitted_at" timestamp,
	"response_code" varchar(10),
	"response_message" text,
	"status" "jkn_rekam_medis_status" DEFAULT 'pending',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_rekam_medis_submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"fhir_id" uuid NOT NULL,
	"attempt_number" varchar(5) DEFAULT '1',
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"http_status" varchar(10),
	"response_code" varchar(10),
	"response_message" text,
	"response_data" jsonb,
	"status" "jkn_rekam_medis_status" NOT NULL,
	"error_type" varchar(50),
	"error_details" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_rekam_medis_validation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"fhir_id" uuid NOT NULL,
	"submission_id" uuid,
	"error_type" varchar(50) NOT NULL,
	"error_severity" varchar(20) NOT NULL,
	"error_code" varchar(20),
	"error_message" text NOT NULL,
	"resource_type" varchar(50),
	"resource_path" varchar(255),
	"field_name" varchar(100),
	"is_resolved" varchar(5) DEFAULT 'false',
	"resolved_at" timestamp,
	"resolution_notes" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_cara_keluar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_cara_keluar" varchar(5) NOT NULL,
	"nm_cara_keluar" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_diagnosa" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_diagnosa" varchar(20) NOT NULL,
	"nm_diagnosa" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_dokter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_dokter" varchar(20) NOT NULL,
	"nm_dokter" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_faskes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_faskes" varchar(20) NOT NULL,
	"nm_faskes" varchar(200) NOT NULL,
	"kd_jenis_faskes" varchar(10),
	"nm_jenis_faskes" varchar(100),
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_kelas_rawat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_kelas_rawat" varchar(5) NOT NULL,
	"nm_kelas_rawat" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_kondisi_pulang" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_kondisi_pulang" varchar(5) NOT NULL,
	"nm_kondisi_pulang" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_obat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_obat_dpho" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_obat" varchar(20) NOT NULL,
	"nm_obat" varchar(200) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_poli" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_poli" varchar(10) NOT NULL,
	"nm_poli" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_program_prb" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_program_prb" varchar(5) NOT NULL,
	"nm_program_prb" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_ruang_rawat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_ruang_rawat" varchar(10) NOT NULL,
	"nm_ruang_rawat" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_spesialistik" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_spesialistik" varchar(10) NOT NULL,
	"nm_spesialistik" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_ref_tindakan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"kd_tindakan" varchar(20) NOT NULL,
	"nm_tindakan" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_sync_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_error_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"api_type" "jkn_api_type" NOT NULL,
	"resource_type" "jkn_sync_resource_type" NOT NULL,
	"operation" "jkn_sync_operation" NOT NULL,
	"local_id" uuid,
	"external_id" varchar(100),
	"sync_queue_id" uuid,
	"category" "jkn_error_category" NOT NULL,
	"status_code" integer,
	"error_code" varchar(20),
	"error_message" text NOT NULL,
	"stack_trace" text,
	"request_payload" jsonb,
	"response_payload" jsonb,
	"resolution" "jkn_error_resolution" DEFAULT 'pending',
	"resolved_at" timestamp,
	"resolved_by" uuid,
	"resolution_notes" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_sync_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"api_type" "jkn_api_type" NOT NULL,
	"resource_type" "jkn_sync_resource_type" NOT NULL,
	"operation" "jkn_sync_operation" NOT NULL,
	"local_id" uuid NOT NULL,
	"external_id" varchar(100),
	"request_payload" jsonb,
	"response_payload" jsonb,
	"status" "jkn_sync_status" DEFAULT 'pending',
	"priority" integer DEFAULT 0,
	"attempts" integer DEFAULT 0,
	"max_attempts" integer DEFAULT 3,
	"last_attempt_at" timestamp,
	"next_retry_at" timestamp,
	"base_retry_delay_ms" integer DEFAULT 60000,
	"retry_backoff_multiplier" integer DEFAULT 2,
	"error_code" varchar(20),
	"error_message" text,
	"completed_at" timestamp,
	"correlation_id" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "jkn_webhooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"webhook_id" varchar(100) NOT NULL,
	"source" "webhook_source" NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"api_type" "jkn_api_type" NOT NULL,
	"resource_type" "jkn_sync_resource_type",
	"external_id" varchar(100),
	"headers" jsonb,
	"payload" jsonb NOT NULL,
	"status" "webhook_status" DEFAULT 'received',
	"processed_at" timestamp,
	"processing_error" text,
	"local_resource_id" uuid,
	"sync_queue_id" uuid,
	"notes" text,
	CONSTRAINT "jkn_webhooks_webhook_id_unique" UNIQUE("webhook_id")
);
--> statement-breakpoint
CREATE TABLE "report_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"template_id" uuid NOT NULL,
	"schedule_id" uuid,
	"generated_by" uuid NOT NULL,
	"report_date" date NOT NULL,
	"start_date" date,
	"end_date" date,
	"format" "report_format" NOT NULL,
	"file_path" varchar(500),
	"file_size" integer,
	"status" "report_generation_status" DEFAULT 'pending',
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "report_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"template_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"frequency" "report_frequency" NOT NULL,
	"day_of_week" integer,
	"day_of_month" integer,
	"time" varchar(10),
	"format" "report_format" NOT NULL,
	"recipients" jsonb,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "report_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource" jsonb,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp,
	"deleted_by" uuid,
	"organization_id" uuid NOT NULL,
	"branch_id" uuid,
	"name" varchar(255) NOT NULL,
	"name_id" varchar(255),
	"category" "report_category" NOT NULL,
	"description" text,
	"query" text NOT NULL,
	"parameters" jsonb,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_branches" ADD CONSTRAINT "user_branches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_branches" ADD CONSTRAINT "user_branches_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_invitations" ADD CONSTRAINT "user_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_invitations" ADD CONSTRAINT "user_invitations_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allergies" ADD CONSTRAINT "allergies_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allergies" ADD CONSTRAINT "allergies_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chronic_conditions" ADD CONSTRAINT "chronic_conditions_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_relationships" ADD CONSTRAINT "family_relationships_family_member_id_patients_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_slots" ADD CONSTRAINT "appointment_slots_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_slots" ADD CONSTRAINT "appointment_slots_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_slots" ADD CONSTRAINT "appointment_slots_booked_by_users_id_fk" FOREIGN KEY ("booked_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "polyclinics" ADD CONSTRAINT "polyclinics_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "polyclinics" ADD CONSTRAINT "polyclinics_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_polyclinics" ADD CONSTRAINT "practitioner_polyclinics_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_polyclinics" ADD CONSTRAINT "practitioner_polyclinics_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_schedules" ADD CONSTRAINT "practitioner_schedules_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_schedules" ADD CONSTRAINT "practitioner_schedules_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_exceptions" ADD CONSTRAINT "schedule_exceptions_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_exceptions" ADD CONSTRAINT "schedule_exceptions_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_reminders" ADD CONSTRAINT "appointment_reminders_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_checked_in_by_users_id_fk" FOREIGN KEY ("checked_in_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_cancelled_by_users_id_fk" FOREIGN KEY ("cancelled_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_call_logs" ADD CONSTRAINT "queue_call_logs_queue_id_queues_id_fk" FOREIGN KEY ("queue_id") REFERENCES "public"."queues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_call_logs" ADD CONSTRAINT "queue_call_logs_called_by_users_id_fk" FOREIGN KEY ("called_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_display_configs" ADD CONSTRAINT "queue_display_configs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_display_configs" ADD CONSTRAINT "queue_display_configs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_display_configs" ADD CONSTRAINT "queue_display_configs_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_called_by_users_id_fk" FOREIGN KEY ("called_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_completed_by_users_id_fk" FOREIGN KEY ("completed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queues" ADD CONSTRAINT "queues_skipped_by_users_id_fk" FOREIGN KEY ("skipped_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anc_visits" ADD CONSTRAINT "anc_visits_pregnancy_id_pregnancies_id_fk" FOREIGN KEY ("pregnancy_id") REFERENCES "public"."pregnancies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_signed_off_by_users_id_fk" FOREIGN KEY ("signed_off_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_chart_teeth" ADD CONSTRAINT "dental_chart_teeth_dental_chart_id_dental_charts_id_fk" FOREIGN KEY ("dental_chart_id") REFERENCES "public"."dental_charts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_charts" ADD CONSTRAINT "dental_charts_dental_encounter_id_dental_encounters_id_fk" FOREIGN KEY ("dental_encounter_id") REFERENCES "public"."dental_encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_charts" ADD CONSTRAINT "dental_charts_charted_by_users_id_fk" FOREIGN KEY ("charted_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_encounters" ADD CONSTRAINT "dental_encounters_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_procedures" ADD CONSTRAINT "dental_procedures_dental_encounter_id_dental_encounters_id_fk" FOREIGN KEY ("dental_encounter_id") REFERENCES "public"."dental_encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_treatment_plans" ADD CONSTRAINT "dental_treatment_plans_dental_encounter_id_dental_encounters_id_fk" FOREIGN KEY ("dental_encounter_id") REFERENCES "public"."dental_encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dental_treatment_plans" ADD CONSTRAINT "dental_treatment_plans_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnoses" ADD CONSTRAINT "diagnoses_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_polyclinic_id_polyclinics_id_fk" FOREIGN KEY ("polyclinic_id") REFERENCES "public"."polyclinics"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_measurements" ADD CONSTRAINT "growth_measurements_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_measurements" ADD CONSTRAINT "growth_measurements_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunizations" ADD CONSTRAINT "immunizations_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunizations" ADD CONSTRAINT "immunizations_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunizations" ADD CONSTRAINT "immunizations_administered_by_users_id_fk" FOREIGN KEY ("administered_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_certificates" ADD CONSTRAINT "medical_certificates_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_certificates" ADD CONSTRAINT "medical_certificates_printed_by_users_id_fk" FOREIGN KEY ("printed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_lab_order_items" ADD CONSTRAINT "medical_lab_order_items_lab_order_id_medical_lab_orders_id_fk" FOREIGN KEY ("lab_order_id") REFERENCES "public"."medical_lab_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_lab_orders" ADD CONSTRAINT "medical_lab_orders_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_lab_orders" ADD CONSTRAINT "medical_lab_orders_ordered_by_users_id_fk" FOREIGN KEY ("ordered_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_lab_orders" ADD CONSTRAINT "medical_lab_orders_fasting_verified_by_users_id_fk" FOREIGN KEY ("fasting_verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pregnancies" ADD CONSTRAINT "pregnancies_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pregnancies" ADD CONSTRAINT "pregnancies_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescription_items" ADD CONSTRAINT "prescription_items_prescription_id_prescriptions_id_fk" FOREIGN KEY ("prescription_id") REFERENCES "public"."prescriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_prescribed_by_users_id_fk" FOREIGN KEY ("prescribed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_performed_by_users_id_fk" FOREIGN KEY ("performed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_assisted_by_users_id_fk" FOREIGN KEY ("assisted_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vital_signs" ADD CONSTRAINT "vital_signs_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vital_signs" ADD CONSTRAINT "vital_signs_recorded_by_users_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "geriatric_assessments" ADD CONSTRAINT "geriatric_assessments_initial_assessment_id_initial_assessments_id_fk" FOREIGN KEY ("initial_assessment_id") REFERENCES "public"."initial_assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_assessed_by_users_id_fk" FOREIGN KEY ("assessed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initial_assessments" ADD CONSTRAINT "initial_assessments_completed_by_users_id_fk" FOREIGN KEY ("completed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nursing_assessments" ADD CONSTRAINT "nursing_assessments_initial_assessment_id_initial_assessments_id_fk" FOREIGN KEY ("initial_assessment_id") REFERENCES "public"."initial_assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "obstetric_assessments" ADD CONSTRAINT "obstetric_assessments_initial_assessment_id_initial_assessments_id_fk" FOREIGN KEY ("initial_assessment_id") REFERENCES "public"."initial_assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pediatric_assessments" ADD CONSTRAINT "pediatric_assessments_initial_assessment_id_initial_assessments_id_fk" FOREIGN KEY ("initial_assessment_id") REFERENCES "public"."initial_assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_ward_id_wards_id_fk" FOREIGN KEY ("ward_id") REFERENCES "public"."wards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_bed_id_beds_id_fk" FOREIGN KEY ("bed_id") REFERENCES "public"."beds"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_attending_doctor_id_practitioners_id_fk" FOREIGN KEY ("attending_doctor_id") REFERENCES "public"."practitioners"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beds" ADD CONSTRAINT "beds_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatient_progress_notes" ADD CONSTRAINT "inpatient_progress_notes_admission_id_admissions_id_fk" FOREIGN KEY ("admission_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatient_progress_notes" ADD CONSTRAINT "inpatient_progress_notes_noted_by_users_id_fk" FOREIGN KEY ("noted_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_administrations" ADD CONSTRAINT "medication_administrations_admission_id_admissions_id_fk" FOREIGN KEY ("admission_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_administrations" ADD CONSTRAINT "medication_administrations_administered_by_users_id_fk" FOREIGN KEY ("administered_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_ward_id_wards_id_fk" FOREIGN KEY ("ward_id") REFERENCES "public"."wards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wards" ADD CONSTRAINT "wards_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wards" ADD CONSTRAINT "wards_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "controlled_substance_logs" ADD CONSTRAINT "controlled_substance_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "controlled_substance_logs" ADD CONSTRAINT "controlled_substance_logs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "controlled_substance_logs" ADD CONSTRAINT "controlled_substance_logs_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "controlled_substance_logs" ADD CONSTRAINT "controlled_substance_logs_logged_by_users_id_fk" FOREIGN KEY ("logged_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispense_items" ADD CONSTRAINT "dispense_items_dispense_id_dispenses_id_fk" FOREIGN KEY ("dispense_id") REFERENCES "public"."dispenses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispense_items" ADD CONSTRAINT "dispense_items_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispense_items" ADD CONSTRAINT "dispense_items_batch_id_medication_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."medication_batches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispenses" ADD CONSTRAINT "dispenses_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispenses" ADD CONSTRAINT "dispenses_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispenses" ADD CONSTRAINT "dispenses_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispenses" ADD CONSTRAINT "dispenses_dispensed_by_users_id_fk" FOREIGN KEY ("dispensed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_batches" ADD CONSTRAINT "medication_batches_stock_id_medication_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."medication_stock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_stock" ADD CONSTRAINT "medication_stock_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_stock" ADD CONSTRAINT "medication_stock_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medication_stock" ADD CONSTRAINT "medication_stock_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medications" ADD CONSTRAINT "medications_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_batch_id_medication_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."medication_batches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_lab_result_id_lab_results_id_fk" FOREIGN KEY ("lab_result_id") REFERENCES "public"."lab_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_notified_by_users_id_fk" FOREIGN KEY ("notified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_notified_to_users_id_fk" FOREIGN KEY ("notified_to") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "critical_value_notifications" ADD CONSTRAINT "critical_value_notifications_acknowledged_by_users_id_fk" FOREIGN KEY ("acknowledged_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnostic_reports" ADD CONSTRAINT "diagnostic_reports_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnostic_reports" ADD CONSTRAINT "diagnostic_reports_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnostic_reports" ADD CONSTRAINT "diagnostic_reports_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnostic_reports" ADD CONSTRAINT "diagnostic_reports_order_id_lab_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."lab_orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagnostic_reports" ADD CONSTRAINT "diagnostic_reports_generated_by_users_id_fk" FOREIGN KEY ("generated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_order_items" ADD CONSTRAINT "lab_order_items_order_id_lab_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."lab_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_order_items" ADD CONSTRAINT "lab_order_items_lab_test_id_lab_tests_id_fk" FOREIGN KEY ("lab_test_id") REFERENCES "public"."lab_tests"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_orders" ADD CONSTRAINT "lab_orders_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_orders" ADD CONSTRAINT "lab_orders_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_orders" ADD CONSTRAINT "lab_orders_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_orders" ADD CONSTRAINT "lab_orders_queue_id_lab_queue_id_fk" FOREIGN KEY ("queue_id") REFERENCES "public"."lab_queue"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_orders" ADD CONSTRAINT "lab_orders_ordered_by_users_id_fk" FOREIGN KEY ("ordered_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_queue" ADD CONSTRAINT "lab_queue_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_queue" ADD CONSTRAINT "lab_queue_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_queue" ADD CONSTRAINT "lab_queue_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_queue" ADD CONSTRAINT "lab_queue_fasting_verified_by_users_id_fk" FOREIGN KEY ("fasting_verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_results" ADD CONSTRAINT "lab_results_order_item_id_lab_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."lab_order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_results" ADD CONSTRAINT "lab_results_specimen_id_specimens_id_fk" FOREIGN KEY ("specimen_id") REFERENCES "public"."specimens"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_results" ADD CONSTRAINT "lab_results_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_test_reference_ranges" ADD CONSTRAINT "lab_test_reference_ranges_lab_test_id_lab_tests_id_fk" FOREIGN KEY ("lab_test_id") REFERENCES "public"."lab_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_tests" ADD CONSTRAINT "lab_tests_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_order_item_id_lab_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."lab_order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_collected_by_users_id_fk" FOREIGN KEY ("collected_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_received_by_users_id_fk" FOREIGN KEY ("received_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cash_closings" ADD CONSTRAINT "cash_closings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cash_closings" ADD CONSTRAINT "cash_closings_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cash_closings" ADD CONSTRAINT "cash_closings_cashier_id_users_id_fk" FOREIGN KEY ("cashier_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charge_adjustments" ADD CONSTRAINT "charge_adjustments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charge_adjustments" ADD CONSTRAINT "charge_adjustments_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charge_adjustments" ADD CONSTRAINT "charge_adjustments_charge_id_charges_id_fk" FOREIGN KEY ("charge_id") REFERENCES "public"."charges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charges" ADD CONSTRAINT "charges_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charges" ADD CONSTRAINT "charges_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charges" ADD CONSTRAINT "charges_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charges" ADD CONSTRAINT "charges_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charges" ADD CONSTRAINT "charges_service_tariff_id_service_tariffs_id_fk" FOREIGN KEY ("service_tariff_id") REFERENCES "public"."service_tariffs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit_applications" ADD CONSTRAINT "deposit_applications_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit_applications" ADD CONSTRAINT "deposit_applications_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit_applications" ADD CONSTRAINT "deposit_applications_deposit_id_deposits_id_fk" FOREIGN KEY ("deposit_id") REFERENCES "public"."deposits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit_applications" ADD CONSTRAINT "deposit_applications_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_tariffs" ADD CONSTRAINT "service_tariffs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_tariffs" ADD CONSTRAINT "service_tariffs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_leave_id_leaves_id_fk" FOREIGN KEY ("leave_id") REFERENCES "public"."leaves"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_salary_components" ADD CONSTRAINT "employee_salary_components_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_salary_components" ADD CONSTRAINT "employee_salary_components_component_id_salary_components_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."salary_components"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_item_details" ADD CONSTRAINT "payroll_item_details_payroll_item_id_payroll_items_id_fk" FOREIGN KEY ("payroll_item_id") REFERENCES "public"."payroll_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_item_details" ADD CONSTRAINT "payroll_item_details_component_id_salary_components_id_fk" FOREIGN KEY ("component_id") REFERENCES "public"."salary_components"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_payroll_run_id_payroll_runs_id_fk" FOREIGN KEY ("payroll_run_id") REFERENCES "public"."payroll_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_processed_by_users_id_fk" FOREIGN KEY ("processed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_paid_by_users_id_fk" FOREIGN KEY ("paid_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_components" ADD CONSTRAINT "salary_components_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_access_logs" ADD CONSTRAINT "data_access_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_access_logs" ADD CONSTRAINT "data_access_logs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_access_logs" ADD CONSTRAINT "data_access_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_attempts" ADD CONSTRAINT "login_attempts_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_attempts" ADD CONSTRAINT "login_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_features" ADD CONSTRAINT "organization_features_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_features" ADD CONSTRAINT "organization_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_history" ADD CONSTRAINT "subscription_history_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_history" ADD CONSTRAINT "subscription_history_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_tracking" ADD CONSTRAINT "usage_tracking_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_templates" ADD CONSTRAINT "notification_templates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_template_id_notification_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."notification_templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_device_tokens" ADD CONSTRAINT "push_device_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notification_preferences" ADD CONSTRAINT "user_notification_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_shared_by_users_id_fk" FOREIGN KEY ("shared_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_shared_with_user_id_users_id_fk" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_revoked_by_users_id_fk" FOREIGN KEY ("revoked_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_uploads" ADD CONSTRAINT "document_uploads_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_uploads" ADD CONSTRAINT "document_uploads_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_uploads" ADD CONSTRAINT "document_uploads_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_ihs_lookups" ADD CONSTRAINT "patient_ihs_lookups_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_ihs_lookups" ADD CONSTRAINT "patient_ihs_lookups_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_ihs_lookups" ADD CONSTRAINT "patient_ihs_lookups_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_ihs_lookups" ADD CONSTRAINT "patient_ihs_lookups_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_configs" ADD CONSTRAINT "satusehat_configs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_configs" ADD CONSTRAINT "satusehat_configs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_consents" ADD CONSTRAINT "satusehat_consents_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_consents" ADD CONSTRAINT "satusehat_consents_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_consents" ADD CONSTRAINT "satusehat_consents_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_consents" ADD CONSTRAINT "satusehat_consents_consented_by_users_id_fk" FOREIGN KEY ("consented_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_consents" ADD CONSTRAINT "satusehat_consents_revoked_by_users_id_fk" FOREIGN KEY ("revoked_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_error_logs" ADD CONSTRAINT "satusehat_error_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_error_logs" ADD CONSTRAINT "satusehat_error_logs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_error_logs" ADD CONSTRAINT "satusehat_error_logs_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_locations" ADD CONSTRAINT "satusehat_locations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_locations" ADD CONSTRAINT "satusehat_locations_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_locations" ADD CONSTRAINT "satusehat_locations_local_location_id_organizations_id_fk" FOREIGN KEY ("local_location_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_practitioners" ADD CONSTRAINT "satusehat_practitioners_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_practitioners" ADD CONSTRAINT "satusehat_practitioners_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_practitioners" ADD CONSTRAINT "satusehat_practitioners_local_practitioner_id_practitioners_id_fk" FOREIGN KEY ("local_practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_sync_queue" ADD CONSTRAINT "satusehat_sync_queue_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_sync_queue" ADD CONSTRAINT "satusehat_sync_queue_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_webhooks" ADD CONSTRAINT "satusehat_webhooks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_webhooks" ADD CONSTRAINT "satusehat_webhooks_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "satusehat_webhooks" ADD CONSTRAINT "satusehat_webhooks_sync_queue_id_satusehat_sync_queue_id_fk" FOREIGN KEY ("sync_queue_id") REFERENCES "public"."satusehat_sync_queue"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_configs" ADD CONSTRAINT "jkn_configs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_configs" ADD CONSTRAINT "jkn_configs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg" ADD CONSTRAINT "jkn_inacbg_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg" ADD CONSTRAINT "jkn_inacbg_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg" ADD CONSTRAINT "jkn_inacbg_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg" ADD CONSTRAINT "jkn_inacbg_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg" ADD CONSTRAINT "jkn_inacbg_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg_obat" ADD CONSTRAINT "jkn_inacbg_obat_inacbg_id_jkn_inacbg_id_fk" FOREIGN KEY ("inacbg_id") REFERENCES "public"."jkn_inacbg"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_inacbg_procedure" ADD CONSTRAINT "jkn_inacbg_procedure_inacbg_id_jkn_inacbg_id_fk" FOREIGN KEY ("inacbg_id") REFERENCES "public"."jkn_inacbg"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_kunjungan" ADD CONSTRAINT "jkn_kunjungan_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_kunjungan" ADD CONSTRAINT "jkn_kunjungan_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_kunjungan" ADD CONSTRAINT "jkn_kunjungan_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_monitoring_klaim" ADD CONSTRAINT "jkn_monitoring_klaim_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_monitoring_klaim" ADD CONSTRAINT "jkn_monitoring_klaim_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_monitoring_klaim" ADD CONSTRAINT "jkn_monitoring_klaim_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_monitoring_klaim" ADD CONSTRAINT "jkn_monitoring_klaim_inacbg_id_jkn_inacbg_id_fk" FOREIGN KEY ("inacbg_id") REFERENCES "public"."jkn_inacbg"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_monitoring_klaim" ADD CONSTRAINT "jkn_monitoring_klaim_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_peserta" ADD CONSTRAINT "jkn_peserta_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_peserta" ADD CONSTRAINT "jkn_peserta_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_peserta" ADD CONSTRAINT "jkn_peserta_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rujukan" ADD CONSTRAINT "jkn_rujukan_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rujukan" ADD CONSTRAINT "jkn_rujukan_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rujukan" ADD CONSTRAINT "jkn_rujukan_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rujukan_peserta" ADD CONSTRAINT "jkn_rujukan_peserta_rujukan_id_jkn_rujukan_id_fk" FOREIGN KEY ("rujukan_id") REFERENCES "public"."jkn_rujukan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep" ADD CONSTRAINT "jkn_sep_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep" ADD CONSTRAINT "jkn_sep_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep" ADD CONSTRAINT "jkn_sep_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep" ADD CONSTRAINT "jkn_sep_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep_diagnosa" ADD CONSTRAINT "jkn_sep_diagnosa_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep_procedure" ADD CONSTRAINT "jkn_sep_procedure_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb" ADD CONSTRAINT "jkn_prb_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb" ADD CONSTRAINT "jkn_prb_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb" ADD CONSTRAINT "jkn_prb_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb" ADD CONSTRAINT "jkn_prb_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb" ADD CONSTRAINT "jkn_prb_rujukan_id_jkn_rujukan_id_fk" FOREIGN KEY ("rujukan_id") REFERENCES "public"."jkn_rujukan"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb_obat" ADD CONSTRAINT "jkn_prb_obat_prb_id_jkn_prb_id_fk" FOREIGN KEY ("prb_id") REFERENCES "public"."jkn_prb"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb_riwayat" ADD CONSTRAINT "jkn_prb_riwayat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb_riwayat" ADD CONSTRAINT "jkn_prb_riwayat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb_riwayat" ADD CONSTRAINT "jkn_prb_riwayat_prb_id_jkn_prb_id_fk" FOREIGN KEY ("prb_id") REFERENCES "public"."jkn_prb"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_prb_riwayat" ADD CONSTRAINT "jkn_prb_riwayat_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol" ADD CONSTRAINT "jkn_surat_kontrol_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol" ADD CONSTRAINT "jkn_surat_kontrol_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol" ADD CONSTRAINT "jkn_surat_kontrol_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol" ADD CONSTRAINT "jkn_surat_kontrol_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol" ADD CONSTRAINT "jkn_surat_kontrol_prb_id_jkn_prb_id_fk" FOREIGN KEY ("prb_id") REFERENCES "public"."jkn_prb"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_surat_kontrol_form_prb" ADD CONSTRAINT "jkn_surat_kontrol_form_prb_surat_kontrol_id_jkn_surat_kontrol_id_fk" FOREIGN KEY ("surat_kontrol_id") REFERENCES "public"."jkn_surat_kontrol"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk" ADD CONSTRAINT "jkn_lpk_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk" ADD CONSTRAINT "jkn_lpk_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk" ADD CONSTRAINT "jkn_lpk_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk" ADD CONSTRAINT "jkn_lpk_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk" ADD CONSTRAINT "jkn_lpk_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk_diagnosa" ADD CONSTRAINT "jkn_lpk_diagnosa_lpk_id_jkn_lpk_id_fk" FOREIGN KEY ("lpk_id") REFERENCES "public"."jkn_lpk"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk_procedure" ADD CONSTRAINT "jkn_lpk_procedure_lpk_id_jkn_lpk_id_fk" FOREIGN KEY ("lpk_id") REFERENCES "public"."jkn_lpk"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_lpk_rencana_tindak_lanjut" ADD CONSTRAINT "jkn_lpk_rencana_tindak_lanjut_lpk_id_jkn_lpk_id_fk" FOREIGN KEY ("lpk_id") REFERENCES "public"."jkn_lpk"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_dokter" ADD CONSTRAINT "jkn_antrean_dokter_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_dokter" ADD CONSTRAINT "jkn_antrean_dokter_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_dokter" ADD CONSTRAINT "jkn_antrean_dokter_poli_id_jkn_antrean_poli_id_fk" FOREIGN KEY ("poli_id") REFERENCES "public"."jkn_antrean_poli"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_faskes" ADD CONSTRAINT "jkn_antrean_faskes_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_faskes" ADD CONSTRAINT "jkn_antrean_faskes_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fkrtl" ADD CONSTRAINT "jkn_antrean_fkrtl_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fkrtl" ADD CONSTRAINT "jkn_antrean_fkrtl_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fkrtl" ADD CONSTRAINT "jkn_antrean_fkrtl_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_poli" ADD CONSTRAINT "jkn_antrean_poli_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_poli" ADD CONSTRAINT "jkn_antrean_poli_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_poli" ADD CONSTRAINT "jkn_antrean_poli_faskes_id_jkn_antrean_faskes_id_fk" FOREIGN KEY ("faskes_id") REFERENCES "public"."jkn_antrean_faskes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fktp" ADD CONSTRAINT "jkn_antrean_fktp_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fktp" ADD CONSTRAINT "jkn_antrean_fktp_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fktp" ADD CONSTRAINT "jkn_antrean_fktp_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_antrean_fktp_status_log" ADD CONSTRAINT "jkn_antrean_fktp_status_log_antrean_id_jkn_antrean_fktp_id_fk" FOREIGN KEY ("antrean_id") REFERENCES "public"."jkn_antrean_fktp"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pcare_bridging" ADD CONSTRAINT "jkn_pcare_bridging_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pcare_bridging" ADD CONSTRAINT "jkn_pcare_bridging_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pcare_bridging" ADD CONSTRAINT "jkn_pcare_bridging_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pcare_reference" ADD CONSTRAINT "jkn_pcare_reference_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pcare_reference" ADD CONSTRAINT "jkn_pcare_reference_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_apotek_monitoring" ADD CONSTRAINT "jkn_apotek_monitoring_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_apotek_monitoring" ADD CONSTRAINT "jkn_apotek_monitoring_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_apotek_monitoring" ADD CONSTRAINT "jkn_apotek_monitoring_resep_id_jkn_resep_id_fk" FOREIGN KEY ("resep_id") REFERENCES "public"."jkn_resep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_obat_riwayat" ADD CONSTRAINT "jkn_obat_riwayat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_obat_riwayat" ADD CONSTRAINT "jkn_obat_riwayat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_obat_riwayat" ADD CONSTRAINT "jkn_obat_riwayat_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_obat_riwayat" ADD CONSTRAINT "jkn_obat_riwayat_resep_id_jkn_resep_id_fk" FOREIGN KEY ("resep_id") REFERENCES "public"."jkn_resep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pelayanan_obat" ADD CONSTRAINT "jkn_pelayanan_obat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pelayanan_obat" ADD CONSTRAINT "jkn_pelayanan_obat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_pelayanan_obat" ADD CONSTRAINT "jkn_pelayanan_obat_resep_id_jkn_resep_id_fk" FOREIGN KEY ("resep_id") REFERENCES "public"."jkn_resep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep" ADD CONSTRAINT "jkn_resep_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep" ADD CONSTRAINT "jkn_resep_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep" ADD CONSTRAINT "jkn_resep_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep" ADD CONSTRAINT "jkn_resep_sep_id_jkn_sep_id_fk" FOREIGN KEY ("sep_id") REFERENCES "public"."jkn_sep"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep_obat" ADD CONSTRAINT "jkn_resep_obat_resep_id_jkn_resep_id_fk" FOREIGN KEY ("resep_id") REFERENCES "public"."jkn_resep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_resep_obat_racikan" ADD CONSTRAINT "jkn_resep_obat_racikan_resep_id_jkn_resep_id_fk" FOREIGN KEY ("resep_id") REFERENCES "public"."jkn_resep"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep_kunjungan_apotek" ADD CONSTRAINT "jkn_sep_kunjungan_apotek_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep_kunjungan_apotek" ADD CONSTRAINT "jkn_sep_kunjungan_apotek_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sep_kunjungan_apotek" ADD CONSTRAINT "jkn_sep_kunjungan_apotek_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_history" ADD CONSTRAINT "jkn_aplicares_history_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_history" ADD CONSTRAINT "jkn_aplicares_history_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_history" ADD CONSTRAINT "jkn_aplicares_history_kamar_id_jkn_aplicares_kamar_id_fk" FOREIGN KEY ("kamar_id") REFERENCES "public"."jkn_aplicares_kamar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_kamar" ADD CONSTRAINT "jkn_aplicares_kamar_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_kamar" ADD CONSTRAINT "jkn_aplicares_kamar_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_aplicares_ketersediaan" ADD CONSTRAINT "jkn_aplicares_ketersediaan_kamar_id_jkn_aplicares_kamar_id_fk" FOREIGN KEY ("kamar_id") REFERENCES "public"."jkn_aplicares_kamar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_session" ADD CONSTRAINT "jkn_icare_session_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_session" ADD CONSTRAINT "jkn_icare_session_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_session" ADD CONSTRAINT "jkn_icare_session_verification_id_jkn_icare_verification_id_fk" FOREIGN KEY ("verification_id") REFERENCES "public"."jkn_icare_verification"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_verification" ADD CONSTRAINT "jkn_icare_verification_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_verification" ADD CONSTRAINT "jkn_icare_verification_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_icare_verification" ADD CONSTRAINT "jkn_icare_verification_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_fhir" ADD CONSTRAINT "jkn_rekam_medis_fhir_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_fhir" ADD CONSTRAINT "jkn_rekam_medis_fhir_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_fhir" ADD CONSTRAINT "jkn_rekam_medis_fhir_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_fhir" ADD CONSTRAINT "jkn_rekam_medis_fhir_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_submission" ADD CONSTRAINT "jkn_rekam_medis_submission_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_submission" ADD CONSTRAINT "jkn_rekam_medis_submission_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_submission" ADD CONSTRAINT "jkn_rekam_medis_submission_fhir_id_jkn_rekam_medis_fhir_id_fk" FOREIGN KEY ("fhir_id") REFERENCES "public"."jkn_rekam_medis_fhir"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_validation" ADD CONSTRAINT "jkn_rekam_medis_validation_fhir_id_jkn_rekam_medis_fhir_id_fk" FOREIGN KEY ("fhir_id") REFERENCES "public"."jkn_rekam_medis_fhir"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_rekam_medis_validation" ADD CONSTRAINT "jkn_rekam_medis_validation_submission_id_jkn_rekam_medis_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."jkn_rekam_medis_submission"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_cara_keluar" ADD CONSTRAINT "jkn_ref_cara_keluar_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_cara_keluar" ADD CONSTRAINT "jkn_ref_cara_keluar_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_diagnosa" ADD CONSTRAINT "jkn_ref_diagnosa_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_diagnosa" ADD CONSTRAINT "jkn_ref_diagnosa_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_dokter" ADD CONSTRAINT "jkn_ref_dokter_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_dokter" ADD CONSTRAINT "jkn_ref_dokter_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_faskes" ADD CONSTRAINT "jkn_ref_faskes_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_faskes" ADD CONSTRAINT "jkn_ref_faskes_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_kelas_rawat" ADD CONSTRAINT "jkn_ref_kelas_rawat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_kelas_rawat" ADD CONSTRAINT "jkn_ref_kelas_rawat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_kondisi_pulang" ADD CONSTRAINT "jkn_ref_kondisi_pulang_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_kondisi_pulang" ADD CONSTRAINT "jkn_ref_kondisi_pulang_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_obat" ADD CONSTRAINT "jkn_ref_obat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_obat" ADD CONSTRAINT "jkn_ref_obat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_obat_dpho" ADD CONSTRAINT "jkn_ref_obat_dpho_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_obat_dpho" ADD CONSTRAINT "jkn_ref_obat_dpho_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_poli" ADD CONSTRAINT "jkn_ref_poli_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_poli" ADD CONSTRAINT "jkn_ref_poli_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_program_prb" ADD CONSTRAINT "jkn_ref_program_prb_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_program_prb" ADD CONSTRAINT "jkn_ref_program_prb_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_ruang_rawat" ADD CONSTRAINT "jkn_ref_ruang_rawat_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_ruang_rawat" ADD CONSTRAINT "jkn_ref_ruang_rawat_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_spesialistik" ADD CONSTRAINT "jkn_ref_spesialistik_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_spesialistik" ADD CONSTRAINT "jkn_ref_spesialistik_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_tindakan" ADD CONSTRAINT "jkn_ref_tindakan_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_ref_tindakan" ADD CONSTRAINT "jkn_ref_tindakan_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_error_logs" ADD CONSTRAINT "jkn_error_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_error_logs" ADD CONSTRAINT "jkn_error_logs_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_error_logs" ADD CONSTRAINT "jkn_error_logs_sync_queue_id_jkn_sync_queue_id_fk" FOREIGN KEY ("sync_queue_id") REFERENCES "public"."jkn_sync_queue"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_error_logs" ADD CONSTRAINT "jkn_error_logs_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sync_queue" ADD CONSTRAINT "jkn_sync_queue_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_sync_queue" ADD CONSTRAINT "jkn_sync_queue_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_webhooks" ADD CONSTRAINT "jkn_webhooks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_webhooks" ADD CONSTRAINT "jkn_webhooks_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jkn_webhooks" ADD CONSTRAINT "jkn_webhooks_sync_queue_id_jkn_sync_queue_id_fk" FOREIGN KEY ("sync_queue_id") REFERENCES "public"."jkn_sync_queue"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_generations" ADD CONSTRAINT "report_generations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_generations" ADD CONSTRAINT "report_generations_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_generations" ADD CONSTRAINT "report_generations_template_id_report_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."report_templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_generations" ADD CONSTRAINT "report_generations_schedule_id_report_schedules_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."report_schedules"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_generations" ADD CONSTRAINT "report_generations_generated_by_users_id_fk" FOREIGN KEY ("generated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_schedules" ADD CONSTRAINT "report_schedules_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_schedules" ADD CONSTRAINT "report_schedules_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_schedules" ADD CONSTRAINT "report_schedules_template_id_report_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."report_templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_templates" ADD CONSTRAINT "report_templates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_templates" ADD CONSTRAINT "report_templates_branch_id_organizations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_branch_org_id" ON "branches" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_branch_code" ON "branches" USING btree ("organization_id","branch_code");--> statement-breakpoint
CREATE INDEX "idx_branch_satusehat_id" ON "branches" USING btree ("satusehat_location_id");--> statement-breakpoint
CREATE INDEX "idx_branch_active" ON "branches" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_branch_satusehat_synced" ON "branches" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_org_code" ON "organizations" USING btree ("org_code");--> statement-breakpoint
CREATE INDEX "idx_org_type" ON "organizations" USING btree ("org_type");--> statement-breakpoint
CREATE INDEX "idx_satusehat_org_id" ON "organizations" USING btree ("satusehat_org_id");--> statement-breakpoint
CREATE INDEX "idx_bpjs_ppk_code" ON "organizations" USING btree ("bpjs_ppk_code");--> statement-breakpoint
CREATE INDEX "idx_org_active" ON "organizations" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_org_satusehat_synced" ON "organizations" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_org_jkn_synced" ON "organizations" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_audit_org_id" ON "audit_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_audit_branch_id" ON "audit_logs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_audit_user_id" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_audit_action" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "idx_audit_entity_type" ON "audit_logs" USING btree ("entity_type");--> statement-breakpoint
CREATE INDEX "idx_audit_entity_id" ON "audit_logs" USING btree ("entity_id");--> statement-breakpoint
CREATE INDEX "idx_audit_created_at" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_user_branch_user_id" ON "user_branches" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_branch_branch_id" ON "user_branches" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_branch_unique" ON "user_branches" USING btree ("user_id","branch_id");--> statement-breakpoint
CREATE INDEX "idx_user_branch_primary" ON "user_branches" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "idx_invitation_org_id" ON "user_invitations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_invitation_branch_id" ON "user_invitations" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_invitation_email" ON "user_invitations" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_invitation_token" ON "user_invitations" USING btree ("token");--> statement-breakpoint
CREATE INDEX "idx_invitation_status" ON "user_invitations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_invitation_expires_at" ON "user_invitations" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_session_user_id" ON "user_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_session_org_id" ON "user_sessions" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_session_branch_id" ON "user_sessions" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_session_token" ON "user_sessions" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_session_refresh_token" ON "user_sessions" USING btree ("refresh_token");--> statement-breakpoint
CREATE INDEX "idx_session_expires_at" ON "user_sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_session_active" ON "user_sessions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_user_org_id" ON "users" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_user_branch_id" ON "users" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_username" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_user_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_user_status" ON "users" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_user_practitioner_id" ON "users" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_allergy_patient_id" ON "allergies" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_allergy_type" ON "allergies" USING btree ("allergy_type");--> statement-breakpoint
CREATE INDEX "idx_allergy_severity" ON "allergies" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "idx_allergy_satusehat_synced" ON "allergies" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_chronic_condition_patient_id" ON "chronic_conditions" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_chronic_condition_icd10" ON "chronic_conditions" USING btree ("icd10_code");--> statement-breakpoint
CREATE INDEX "idx_family_relationship_patient_id" ON "family_relationships" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_family_relationship_member_id" ON "family_relationships" USING btree ("family_member_id");--> statement-breakpoint
CREATE INDEX "idx_family_relationship_type" ON "family_relationships" USING btree ("relationship_type");--> statement-breakpoint
CREATE INDEX "idx_patient_org_id" ON "patients" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_patient_branch_id" ON "patients" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_patient_mrn" ON "patients" USING btree ("mrn");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_patient_nik" ON "patients" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_patient_name" ON "patients" USING btree ("full_name");--> statement-breakpoint
CREATE INDEX "idx_patient_dob" ON "patients" USING btree ("date_of_birth");--> statement-breakpoint
CREATE INDEX "idx_patient_status" ON "patients" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_patient_bpjs_number" ON "patients" USING btree ("bpjs_number");--> statement-breakpoint
CREATE INDEX "idx_patient_satusehat_ihs_id" ON "patients" USING btree ("satusehat_ihs_id");--> statement-breakpoint
CREATE INDEX "idx_patient_satusehat_synced" ON "patients" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_patient_jkn_verified" ON "patients" USING btree ("is_jkn_verified");--> statement-breakpoint
CREATE INDEX "idx_appointment_slot_practitioner_id" ON "appointment_slots" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_slot_polyclinic_id" ON "appointment_slots" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_slot_date" ON "appointment_slots" USING btree ("slot_date");--> statement-breakpoint
CREATE INDEX "idx_appointment_slot_available" ON "appointment_slots" USING btree ("is_available");--> statement-breakpoint
CREATE INDEX "idx_appointment_slot_booked" ON "appointment_slots" USING btree ("is_booked");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_org_id" ON "polyclinics" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_branch_id" ON "polyclinics" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_polyclinic_code" ON "polyclinics" USING btree ("organization_id","polyclinic_code");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_type" ON "polyclinics" USING btree ("polyclinic_type");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_satusehat_id" ON "polyclinics" USING btree ("satusehat_location_id");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_bpjs_code" ON "polyclinics" USING btree ("bpjs_poli_code");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_active" ON "polyclinics" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_satusehat_synced" ON "polyclinics" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_polyclinic_jkn_synced" ON "polyclinics" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_practitioner_poly_practitioner_id" ON "practitioner_polyclinics" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_practitioner_poly_polyclinic_id" ON "practitioner_polyclinics" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_practitioner_poly_unique" ON "practitioner_polyclinics" USING btree ("practitioner_id","polyclinic_id","effective_from");--> statement-breakpoint
CREATE INDEX "idx_practitioner_poly_primary" ON "practitioner_polyclinics" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "idx_practitioner_schedule_practitioner_id" ON "practitioner_schedules" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_practitioner_schedule_polyclinic_id" ON "practitioner_schedules" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_practitioner_schedule_day" ON "practitioner_schedules" USING btree ("day_of_week");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_practitioner_schedule_unique" ON "practitioner_schedules" USING btree ("practitioner_id","polyclinic_id","day_of_week","effective_from");--> statement-breakpoint
CREATE INDEX "idx_practitioner_org_id" ON "practitioners" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_practitioner_branch_id" ON "practitioners" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_practitioner_number" ON "practitioners" USING btree ("practitioner_number");--> statement-breakpoint
CREATE INDEX "idx_practitioner_type" ON "practitioners" USING btree ("practitioner_type");--> statement-breakpoint
CREATE INDEX "idx_practitioner_specialty" ON "practitioners" USING btree ("specialty");--> statement-breakpoint
CREATE INDEX "idx_practitioner_satusehat_ihs_id" ON "practitioners" USING btree ("satusehat_ihs_id");--> statement-breakpoint
CREATE INDEX "idx_practitioner_active" ON "practitioners" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_practitioner_satusehat_synced" ON "practitioners" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_practitioner_jkn_synced" ON "practitioners" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_schedule_exception_practitioner_id" ON "schedule_exceptions" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_schedule_exception_polyclinic_id" ON "schedule_exceptions" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_schedule_exception_date" ON "schedule_exceptions" USING btree ("exception_date");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_schedule_exception_unique" ON "schedule_exceptions" USING btree ("practitioner_id","polyclinic_id","exception_date");--> statement-breakpoint
CREATE INDEX "idx_reminder_appointment_id" ON "appointment_reminders" USING btree ("appointment_id");--> statement-breakpoint
CREATE INDEX "idx_reminder_time" ON "appointment_reminders" USING btree ("reminder_time");--> statement-breakpoint
CREATE INDEX "idx_reminder_status" ON "appointment_reminders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_appointment_org_id" ON "appointments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_branch_id" ON "appointments" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_patient_id" ON "appointments" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_practitioner_id" ON "appointments" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_appointment_polyclinic_id" ON "appointments" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_appointment_number" ON "appointments" USING btree ("appointment_number");--> statement-breakpoint
CREATE INDEX "idx_appointment_date" ON "appointments" USING btree ("appointment_date");--> statement-breakpoint
CREATE INDEX "idx_appointment_status" ON "appointments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_appointment_jkn_synced" ON "appointments" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_queue_call_queue_id" ON "queue_call_logs" USING btree ("queue_id");--> statement-breakpoint
CREATE INDEX "idx_queue_call_called_at" ON "queue_call_logs" USING btree ("called_at");--> statement-breakpoint
CREATE INDEX "idx_queue_display_org_id" ON "queue_display_configs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_queue_display_branch_id" ON "queue_display_configs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_queue_display_polyclinic_id" ON "queue_display_configs" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_queue_display_active" ON "queue_display_configs" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_queue_org_id" ON "queues" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_queue_branch_id" ON "queues" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_queue_polyclinic_id" ON "queues" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_queue_date" ON "queues" USING btree ("queue_date");--> statement-breakpoint
CREATE INDEX "idx_queue_number" ON "queues" USING btree ("queue_number");--> statement-breakpoint
CREATE INDEX "idx_queue_patient_id" ON "queues" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_queue_appointment_id" ON "queues" USING btree ("appointment_id");--> statement-breakpoint
CREATE INDEX "idx_queue_practitioner_id" ON "queues" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_queue_status" ON "queues" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_queue_priority" ON "queues" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_anc_visit_pregnancy_id" ON "anc_visits" USING btree ("pregnancy_id");--> statement-breakpoint
CREATE INDEX "idx_anc_visit_date" ON "anc_visits" USING btree ("visit_date");--> statement-breakpoint
CREATE INDEX "idx_consultation_encounter_id" ON "consultations" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_dental_chart_teeth_dental_chart_id" ON "dental_chart_teeth" USING btree ("dental_chart_id");--> statement-breakpoint
CREATE INDEX "idx_dental_chart_teeth_tooth_number" ON "dental_chart_teeth" USING btree ("tooth_number");--> statement-breakpoint
CREATE INDEX "idx_dental_chart_dental_encounter_id" ON "dental_charts" USING btree ("dental_encounter_id");--> statement-breakpoint
CREATE INDEX "idx_dental_encounter_encounter_id" ON "dental_encounters" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_dental_procedure_dental_encounter_id" ON "dental_procedures" USING btree ("dental_encounter_id");--> statement-breakpoint
CREATE INDEX "idx_dental_treatment_plan_dental_encounter_id" ON "dental_treatment_plans" USING btree ("dental_encounter_id");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_encounter_id" ON "diagnoses" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_icd10" ON "diagnoses" USING btree ("icd10_code");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_type" ON "diagnoses" USING btree ("diagnosis_type");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_primary" ON "diagnoses" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_satusehat_synced" ON "diagnoses" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_diagnosis_jkn_synced" ON "diagnoses" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_encounter_org_id" ON "encounters" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_encounter_branch_id" ON "encounters" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_encounter_patient_id" ON "encounters" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_encounter_practitioner_id" ON "encounters" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_encounter_polyclinic_id" ON "encounters" USING btree ("polyclinic_id");--> statement-breakpoint
CREATE INDEX "idx_encounter_appointment_id" ON "encounters" USING btree ("appointment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_encounter_number" ON "encounters" USING btree ("encounter_number");--> statement-breakpoint
CREATE INDEX "idx_encounter_date" ON "encounters" USING btree ("encounter_date");--> statement-breakpoint
CREATE INDEX "idx_encounter_status" ON "encounters" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_encounter_satusehat_synced" ON "encounters" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_encounter_jkn_synced" ON "encounters" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_growth_measurement_patient_id" ON "growth_measurements" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_growth_measurement_encounter_id" ON "growth_measurements" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_growth_measurement_date" ON "growth_measurements" USING btree ("measurement_date");--> statement-breakpoint
CREATE INDEX "idx_immunization_patient_id" ON "immunizations" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_immunization_encounter_id" ON "immunizations" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_immunization_type" ON "immunizations" USING btree ("immunization_type");--> statement-breakpoint
CREATE INDEX "idx_immunization_satusehat_synced" ON "immunizations" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_medical_certificate_encounter_id" ON "medical_certificates" USING btree ("encounter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_medical_certificate_number" ON "medical_certificates" USING btree ("certificate_number");--> statement-breakpoint
CREATE INDEX "idx_medical_lab_order_item_lab_order_id" ON "medical_lab_order_items" USING btree ("lab_order_id");--> statement-breakpoint
CREATE INDEX "idx_medical_lab_order_encounter_id" ON "medical_lab_orders" USING btree ("encounter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_medical_lab_order_number" ON "medical_lab_orders" USING btree ("order_number");--> statement-breakpoint
CREATE INDEX "idx_pregnancy_patient_id" ON "pregnancies" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_pregnancy_encounter_id" ON "pregnancies" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_prescription_item_prescription_id" ON "prescription_items" USING btree ("prescription_id");--> statement-breakpoint
CREATE INDEX "idx_prescription_encounter_id" ON "prescriptions" USING btree ("encounter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_prescription_number" ON "prescriptions" USING btree ("prescription_number");--> statement-breakpoint
CREATE INDEX "idx_prescription_status" ON "prescriptions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_prescription_satusehat_synced" ON "prescriptions" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_prescription_jkn_synced" ON "prescriptions" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_procedure_encounter_id" ON "procedures" USING btree ("encounter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_procedure_number" ON "procedures" USING btree ("procedure_number");--> statement-breakpoint
CREATE INDEX "idx_procedure_status" ON "procedures" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_procedure_category" ON "procedures" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_procedure_icd9cm" ON "procedures" USING btree ("icd9cm_code");--> statement-breakpoint
CREATE INDEX "idx_procedure_performed_at" ON "procedures" USING btree ("performed_at");--> statement-breakpoint
CREATE INDEX "idx_procedure_satusehat_synced" ON "procedures" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_procedure_jkn_synced" ON "procedures" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_referral_encounter_id" ON "referrals" USING btree ("encounter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_referral_number" ON "referrals" USING btree ("referral_number");--> statement-breakpoint
CREATE INDEX "idx_vital_signs_encounter_id" ON "vital_signs" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_vital_signs_recorded_at" ON "vital_signs" USING btree ("recorded_at");--> statement-breakpoint
CREATE INDEX "idx_vital_signs_satusehat_synced" ON "vital_signs" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_geriatric_assessment_id" ON "geriatric_assessments" USING btree ("initial_assessment_id");--> statement-breakpoint
CREATE INDEX "idx_assessment_org_id" ON "initial_assessments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_assessment_branch_id" ON "initial_assessments" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_assessment_encounter_id" ON "initial_assessments" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_assessment_patient_id" ON "initial_assessments" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_assessment_type" ON "initial_assessments" USING btree ("assessment_type");--> statement-breakpoint
CREATE INDEX "idx_assessment_triage" ON "initial_assessments" USING btree ("triage_level");--> statement-breakpoint
CREATE INDEX "idx_assessment_assessed_at" ON "initial_assessments" USING btree ("assessed_at");--> statement-breakpoint
CREATE INDEX "idx_assessment_complete" ON "initial_assessments" USING btree ("is_complete");--> statement-breakpoint
CREATE INDEX "idx_nursing_assessment_id" ON "nursing_assessments" USING btree ("initial_assessment_id");--> statement-breakpoint
CREATE INDEX "idx_obstetric_assessment_id" ON "obstetric_assessments" USING btree ("initial_assessment_id");--> statement-breakpoint
CREATE INDEX "idx_pediatric_assessment_id" ON "pediatric_assessments" USING btree ("initial_assessment_id");--> statement-breakpoint
CREATE INDEX "idx_admission_org_id" ON "admissions" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_admission_branch_id" ON "admissions" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_admission_patient_id" ON "admissions" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_admission_encounter_id" ON "admissions" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_admission_ward_id" ON "admissions" USING btree ("ward_id");--> statement-breakpoint
CREATE INDEX "idx_admission_room_id" ON "admissions" USING btree ("room_id");--> statement-breakpoint
CREATE INDEX "idx_admission_bed_id" ON "admissions" USING btree ("bed_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_admission_number" ON "admissions" USING btree ("admission_number");--> statement-breakpoint
CREATE INDEX "idx_admission_status" ON "admissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_bed_room_id" ON "beds" USING btree ("room_id");--> statement-breakpoint
CREATE INDEX "idx_bed_status" ON "beds" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_bed_active" ON "beds" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_inpatient_progress_note_admission_id" ON "inpatient_progress_notes" USING btree ("admission_id");--> statement-breakpoint
CREATE INDEX "idx_inpatient_progress_note_date" ON "inpatient_progress_notes" USING btree ("note_date");--> statement-breakpoint
CREATE INDEX "idx_medication_administration_admission_id" ON "medication_administrations" USING btree ("admission_id");--> statement-breakpoint
CREATE INDEX "idx_medication_administration_status" ON "medication_administrations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_room_ward_id" ON "rooms" USING btree ("ward_id");--> statement-breakpoint
CREATE INDEX "idx_room_class" ON "rooms" USING btree ("room_class");--> statement-breakpoint
CREATE INDEX "idx_room_active" ON "rooms" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_ward_org_id" ON "wards" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_ward_branch_id" ON "wards" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_ward_active" ON "wards" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_controlled_substance_log_org_id" ON "controlled_substance_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_controlled_substance_log_branch_id" ON "controlled_substance_logs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_controlled_substance_log_medication_id" ON "controlled_substance_logs" USING btree ("medication_id");--> statement-breakpoint
CREATE INDEX "idx_controlled_substance_log_date" ON "controlled_substance_logs" USING btree ("log_date");--> statement-breakpoint
CREATE INDEX "idx_controlled_substance_log_type" ON "controlled_substance_logs" USING btree ("log_type");--> statement-breakpoint
CREATE INDEX "idx_dispense_item_dispense_id" ON "dispense_items" USING btree ("dispense_id");--> statement-breakpoint
CREATE INDEX "idx_dispense_item_medication_id" ON "dispense_items" USING btree ("medication_id");--> statement-breakpoint
CREATE INDEX "idx_dispense_org_id" ON "dispenses" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_dispense_branch_id" ON "dispenses" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_dispense_patient_id" ON "dispenses" USING btree ("patient_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_dispense_number" ON "dispenses" USING btree ("dispense_number");--> statement-breakpoint
CREATE INDEX "idx_dispense_status" ON "dispenses" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_dispense_date" ON "dispenses" USING btree ("dispense_date");--> statement-breakpoint
CREATE INDEX "idx_medication_batch_stock_id" ON "medication_batches" USING btree ("stock_id");--> statement-breakpoint
CREATE INDEX "idx_medication_batch_number" ON "medication_batches" USING btree ("batch_number");--> statement-breakpoint
CREATE INDEX "idx_medication_batch_expiration" ON "medication_batches" USING btree ("expiration_date");--> statement-breakpoint
CREATE INDEX "idx_medication_stock_org_id" ON "medication_stock" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_medication_stock_branch_id" ON "medication_stock" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_medication_stock_medication_id" ON "medication_stock" USING btree ("medication_id");--> statement-breakpoint
CREATE INDEX "idx_medication_stock_reorder" ON "medication_stock" USING btree ("reorder_level");--> statement-breakpoint
CREATE INDEX "idx_medication_org_id" ON "medications" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_medication_code" ON "medications" USING btree ("medication_code");--> statement-breakpoint
CREATE INDEX "idx_medication_generic_name" ON "medications" USING btree ("generic_name");--> statement-breakpoint
CREATE INDEX "idx_medication_type" ON "medications" USING btree ("medication_type");--> statement-breakpoint
CREATE INDEX "idx_medication_active" ON "medications" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_stock_movement_org_id" ON "stock_movements" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_stock_movement_branch_id" ON "stock_movements" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_stock_movement_medication_id" ON "stock_movements" USING btree ("medication_id");--> statement-breakpoint
CREATE INDEX "idx_stock_movement_type" ON "stock_movements" USING btree ("movement_type");--> statement-breakpoint
CREATE INDEX "idx_stock_movement_date" ON "stock_movements" USING btree ("movement_date");--> statement-breakpoint
CREATE INDEX "idx_critical_notification_org_id" ON "critical_value_notifications" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_critical_notification_branch_id" ON "critical_value_notifications" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_critical_notification_lab_result_id" ON "critical_value_notifications" USING btree ("lab_result_id");--> statement-breakpoint
CREATE INDEX "idx_critical_notification_date" ON "critical_value_notifications" USING btree ("notification_date");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_org_id" ON "diagnostic_reports" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_branch_id" ON "diagnostic_reports" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_patient_id" ON "diagnostic_reports" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_order_id" ON "diagnostic_reports" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_diagnostic_report_number" ON "diagnostic_reports" USING btree ("report_number");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_status" ON "diagnostic_reports" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_date" ON "diagnostic_reports" USING btree ("report_date");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_satusehat_synced" ON "diagnostic_reports" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_diagnostic_report_jkn_synced" ON "diagnostic_reports" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_lab_order_item_order_id" ON "lab_order_items" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "idx_lab_order_item_lab_test_id" ON "lab_order_items" USING btree ("lab_test_id");--> statement-breakpoint
CREATE INDEX "idx_lab_order_item_status" ON "lab_order_items" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lab_order_org_id" ON "lab_orders" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_lab_order_branch_id" ON "lab_orders" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_lab_order_patient_id" ON "lab_orders" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_lab_order_queue_id" ON "lab_orders" USING btree ("queue_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_lab_order_number" ON "lab_orders" USING btree ("order_number");--> statement-breakpoint
CREATE INDEX "idx_lab_order_status" ON "lab_orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lab_order_ordered_at" ON "lab_orders" USING btree ("ordered_at");--> statement-breakpoint
CREATE INDEX "idx_lab_queue_org_id" ON "lab_queue" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_lab_queue_branch_id" ON "lab_queue" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_lab_queue_patient_id" ON "lab_queue" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_lab_queue_status" ON "lab_queue" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lab_queue_priority" ON "lab_queue" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_lab_result_order_item_id" ON "lab_results" USING btree ("order_item_id");--> statement-breakpoint
CREATE INDEX "idx_lab_result_specimen_id" ON "lab_results" USING btree ("specimen_id");--> statement-breakpoint
CREATE INDEX "idx_lab_result_status" ON "lab_results" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lab_result_date" ON "lab_results" USING btree ("result_date");--> statement-breakpoint
CREATE INDEX "idx_lab_result_satusehat_synced" ON "lab_results" USING btree ("is_satusehat_synced");--> statement-breakpoint
CREATE INDEX "idx_lab_result_jkn_synced" ON "lab_results" USING btree ("is_jkn_synced");--> statement-breakpoint
CREATE INDEX "idx_lab_test_reference_lab_test_id" ON "lab_test_reference_ranges" USING btree ("lab_test_id");--> statement-breakpoint
CREATE INDEX "idx_lab_test_reference_gender" ON "lab_test_reference_ranges" USING btree ("gender");--> statement-breakpoint
CREATE INDEX "idx_lab_test_org_id" ON "lab_tests" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_lab_test_code" ON "lab_tests" USING btree ("test_code");--> statement-breakpoint
CREATE INDEX "idx_lab_test_category" ON "lab_tests" USING btree ("test_category");--> statement-breakpoint
CREATE INDEX "idx_lab_test_active" ON "lab_tests" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_specimen_order_item_id" ON "specimens" USING btree ("order_item_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_specimen_number" ON "specimens" USING btree ("specimen_number");--> statement-breakpoint
CREATE INDEX "idx_specimen_status" ON "specimens" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_specimen_collection_date" ON "specimens" USING btree ("collection_date");--> statement-breakpoint
CREATE INDEX "idx_cash_closing_org_id" ON "cash_closings" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_cash_closing_branch_id" ON "cash_closings" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_cash_closing_cashier_id" ON "cash_closings" USING btree ("cashier_id");--> statement-breakpoint
CREATE INDEX "idx_cash_closing_date" ON "cash_closings" USING btree ("closing_date");--> statement-breakpoint
CREATE INDEX "idx_cash_closing_status" ON "cash_closings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_charge_adjustment_org_id" ON "charge_adjustments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_charge_adjustment_branch_id" ON "charge_adjustments" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_charge_adjustment_charge_id" ON "charge_adjustments" USING btree ("charge_id");--> statement-breakpoint
CREATE INDEX "idx_charge_adjustment_type" ON "charge_adjustments" USING btree ("adjustment_type");--> statement-breakpoint
CREATE INDEX "idx_charge_org_id" ON "charges" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_charge_branch_id" ON "charges" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_charge_patient_id" ON "charges" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_charge_invoice_id" ON "charges" USING btree ("invoice_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_charge_number" ON "charges" USING btree ("charge_number");--> statement-breakpoint
CREATE INDEX "idx_charge_source" ON "charges" USING btree ("source_type","source_id");--> statement-breakpoint
CREATE INDEX "idx_charge_date" ON "charges" USING btree ("charge_date");--> statement-breakpoint
CREATE INDEX "idx_charge_status" ON "charges" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_deposit_application_org_id" ON "deposit_applications" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_application_branch_id" ON "deposit_applications" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_application_deposit_id" ON "deposit_applications" USING btree ("deposit_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_application_invoice_id" ON "deposit_applications" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_org_id" ON "deposits" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_branch_id" ON "deposits" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_deposit_patient_id" ON "deposits" USING btree ("patient_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_deposit_number" ON "deposits" USING btree ("deposit_number");--> statement-breakpoint
CREATE INDEX "idx_deposit_status" ON "deposits" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_deposit_date" ON "deposits" USING btree ("deposit_date");--> statement-breakpoint
CREATE INDEX "idx_invoice_org_id" ON "invoices" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_invoice_branch_id" ON "invoices" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_invoice_patient_id" ON "invoices" USING btree ("patient_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_invoice_number" ON "invoices" USING btree ("invoice_number");--> statement-breakpoint
CREATE INDEX "idx_invoice_type" ON "invoices" USING btree ("invoice_type");--> statement-breakpoint
CREATE INDEX "idx_invoice_payer_type" ON "invoices" USING btree ("payer_type");--> statement-breakpoint
CREATE INDEX "idx_invoice_status" ON "invoices" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_invoice_date" ON "invoices" USING btree ("invoice_date");--> statement-breakpoint
CREATE INDEX "idx_payment_org_id" ON "payments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_payment_branch_id" ON "payments" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_payment_patient_id" ON "payments" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_payment_invoice_id" ON "payments" USING btree ("invoice_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_payment_number" ON "payments" USING btree ("payment_number");--> statement-breakpoint
CREATE INDEX "idx_payment_method" ON "payments" USING btree ("payment_method");--> statement-breakpoint
CREATE INDEX "idx_payment_status" ON "payments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_payment_date" ON "payments" USING btree ("payment_date");--> statement-breakpoint
CREATE INDEX "idx_refund_org_id" ON "refunds" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_refund_branch_id" ON "refunds" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_refund_patient_id" ON "refunds" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_refund_payment_id" ON "refunds" USING btree ("payment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_refund_number" ON "refunds" USING btree ("refund_number");--> statement-breakpoint
CREATE INDEX "idx_refund_status" ON "refunds" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_refund_date" ON "refunds" USING btree ("refund_date");--> statement-breakpoint
CREATE INDEX "idx_service_tariff_org_id" ON "service_tariffs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_service_tariff_branch_id" ON "service_tariffs" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_service_tariff_code" ON "service_tariffs" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_service_tariff_category" ON "service_tariffs" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_service_tariff_active" ON "service_tariffs" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_attendance_org_id" ON "attendance" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_branch_id" ON "attendance" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_employee_id" ON "attendance" USING btree ("employee_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_attendance_employee_date" ON "attendance" USING btree ("employee_id","attendance_date");--> statement-breakpoint
CREATE INDEX "idx_attendance_date" ON "attendance" USING btree ("attendance_date");--> statement-breakpoint
CREATE INDEX "idx_attendance_status" ON "attendance" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_department_org_id" ON "departments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_department_branch_id" ON "departments" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_department_code" ON "departments" USING btree ("organization_id","department_code");--> statement-breakpoint
CREATE INDEX "idx_department_parent_id" ON "departments" USING btree ("parent_department_id");--> statement-breakpoint
CREATE INDEX "idx_department_active" ON "departments" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_emp_salary_component_employee_id" ON "employee_salary_components" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_emp_salary_component_component_id" ON "employee_salary_components" USING btree ("component_id");--> statement-breakpoint
CREATE INDEX "idx_emp_salary_component_effective" ON "employee_salary_components" USING btree ("effective_from");--> statement-breakpoint
CREATE INDEX "idx_employee_org_id" ON "employees" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_employee_branch_id" ON "employees" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_employee_user_id" ON "employees" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_employee_number" ON "employees" USING btree ("organization_id","employee_number");--> statement-breakpoint
CREATE INDEX "idx_employee_department_id" ON "employees" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "idx_employee_position_id" ON "employees" USING btree ("position_id");--> statement-breakpoint
CREATE INDEX "idx_employee_manager_id" ON "employees" USING btree ("manager_id");--> statement-breakpoint
CREATE INDEX "idx_employee_status" ON "employees" USING btree ("employment_status");--> statement-breakpoint
CREATE INDEX "idx_leave_org_id" ON "leaves" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_leave_branch_id" ON "leaves" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_leave_employee_id" ON "leaves" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_leave_type" ON "leaves" USING btree ("leave_type");--> statement-breakpoint
CREATE INDEX "idx_leave_status" ON "leaves" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_leave_dates" ON "leaves" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX "idx_payroll_item_detail_payroll_item_id" ON "payroll_item_details" USING btree ("payroll_item_id");--> statement-breakpoint
CREATE INDEX "idx_payroll_item_detail_component_id" ON "payroll_item_details" USING btree ("component_id");--> statement-breakpoint
CREATE INDEX "idx_payroll_item_payroll_run_id" ON "payroll_items" USING btree ("payroll_run_id");--> statement-breakpoint
CREATE INDEX "idx_payroll_item_employee_id" ON "payroll_items" USING btree ("employee_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_payroll_item_unique" ON "payroll_items" USING btree ("payroll_run_id","employee_id");--> statement-breakpoint
CREATE INDEX "idx_payroll_item_paid" ON "payroll_items" USING btree ("is_paid");--> statement-breakpoint
CREATE INDEX "idx_payroll_run_org_id" ON "payroll_runs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_payroll_run_branch_id" ON "payroll_runs" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_payroll_run_number" ON "payroll_runs" USING btree ("organization_id","payroll_number");--> statement-breakpoint
CREATE INDEX "idx_payroll_run_period" ON "payroll_runs" USING btree ("payroll_period");--> statement-breakpoint
CREATE INDEX "idx_payroll_run_status" ON "payroll_runs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_position_org_id" ON "positions" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_position_code" ON "positions" USING btree ("organization_id","position_code");--> statement-breakpoint
CREATE INDEX "idx_position_department_id" ON "positions" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "idx_position_active" ON "positions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_salary_component_org_id" ON "salary_components" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_salary_component_code" ON "salary_components" USING btree ("organization_id","component_code");--> statement-breakpoint
CREATE INDEX "idx_salary_component_type" ON "salary_components" USING btree ("component_type");--> statement-breakpoint
CREATE INDEX "idx_salary_component_active" ON "salary_components" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_org_id" ON "data_access_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_user_id" ON "data_access_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_patient_id" ON "data_access_logs" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_accessed_at" ON "data_access_logs" USING btree ("accessed_at");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_patient_time" ON "data_access_logs" USING btree ("patient_id","accessed_at");--> statement-breakpoint
CREATE INDEX "idx_data_access_logs_emergency" ON "data_access_logs" USING btree ("emergency_access");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_email" ON "login_attempts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_user_id" ON "login_attempts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_ip" ON "login_attempts" USING btree ("ip_address");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_time" ON "login_attempts" USING btree ("attempted_at");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_success" ON "login_attempts" USING btree ("successful");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_failed" ON "login_attempts" USING btree ("email","successful","attempted_at");--> statement-breakpoint
CREATE INDEX "idx_login_attempts_suspicious" ON "login_attempts" USING btree ("suspicious_activity");--> statement-breakpoint
CREATE INDEX "idx_api_key_org_id" ON "api_keys" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_api_key_prefix" ON "api_keys" USING btree ("key_prefix");--> statement-breakpoint
CREATE INDEX "idx_api_key_active" ON "api_keys" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_api_key_expires" ON "api_keys" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_feature_key" ON "features" USING btree ("feature_key");--> statement-breakpoint
CREATE INDEX "idx_feature_category" ON "features" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_feature_module" ON "features" USING btree ("module");--> statement-breakpoint
CREATE INDEX "idx_feature_minimum_plan" ON "features" USING btree ("minimum_plan");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_org_feature_unique" ON "organization_features" USING btree ("organization_id","feature_id");--> statement-breakpoint
CREATE INDEX "idx_org_feature_org_id" ON "organization_features" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_org_feature_feature_id" ON "organization_features" USING btree ("feature_id");--> statement-breakpoint
CREATE INDEX "idx_org_feature_status" ON "organization_features" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_subscription_history_subscription_id" ON "subscription_history" USING btree ("subscription_id");--> statement-breakpoint
CREATE INDEX "idx_subscription_history_org_id" ON "subscription_history" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_subscription_history_event_type" ON "subscription_history" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_subscription_history_created_at" ON "subscription_history" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_subscription_org_id" ON "subscriptions" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_subscription_status" ON "subscriptions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_subscription_plan" ON "subscriptions" USING btree ("plan");--> statement-breakpoint
CREATE INDEX "idx_subscription_next_billing" ON "subscriptions" USING btree ("next_billing_date");--> statement-breakpoint
CREATE INDEX "idx_subscription_external_id" ON "subscriptions" USING btree ("external_subscription_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_usage_quota_plan_key" ON "usage_quotas" USING btree ("plan","quota_key");--> statement-breakpoint
CREATE INDEX "idx_usage_quota_plan" ON "usage_quotas" USING btree ("plan");--> statement-breakpoint
CREATE INDEX "idx_usage_quota_key" ON "usage_quotas" USING btree ("quota_key");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_usage_tracking_unique" ON "usage_tracking" USING btree ("organization_id","quota_key","period_start");--> statement-breakpoint
CREATE INDEX "idx_usage_tracking_org_id" ON "usage_tracking" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_usage_tracking_quota_key" ON "usage_tracking" USING btree ("quota_key");--> statement-breakpoint
CREATE INDEX "idx_usage_tracking_period" ON "usage_tracking" USING btree ("period_start","period_end");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_notification_template_key" ON "notification_templates" USING btree ("organization_id","template_key","channel");--> statement-breakpoint
CREATE INDEX "idx_notification_template_org_id" ON "notification_templates" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_notification_template_channel" ON "notification_templates" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "idx_notification_template_active" ON "notification_templates" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_notification_org_id" ON "notifications" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_notification_branch_id" ON "notifications" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_notification_user_id" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_notification_channel" ON "notifications" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "idx_notification_status" ON "notifications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_notification_priority" ON "notifications" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_notification_scheduled_at" ON "notifications" USING btree ("scheduled_at");--> statement-breakpoint
CREATE INDEX "idx_notification_queue_poll" ON "notifications" USING btree ("status","scheduled_at","priority");--> statement-breakpoint
CREATE INDEX "idx_notification_created_at" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_push_device_token_user_id" ON "push_device_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_push_device_token_unique" ON "push_device_tokens" USING btree ("device_token");--> statement-breakpoint
CREATE INDEX "idx_push_device_token_active" ON "push_device_tokens" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_notification_pref_user_id" ON "user_notification_preferences" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_document_access_log_document_id" ON "document_access_logs" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_document_access_log_user_id" ON "document_access_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_document_access_log_created_at" ON "document_access_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_document_access_log_access_type" ON "document_access_logs" USING btree ("access_type");--> statement-breakpoint
CREATE INDEX "idx_document_share_document_id" ON "document_shares" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_document_share_shared_by" ON "document_shares" USING btree ("shared_by");--> statement-breakpoint
CREATE INDEX "idx_document_share_user_id" ON "document_shares" USING btree ("shared_with_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_document_share_token" ON "document_shares" USING btree ("share_token");--> statement-breakpoint
CREATE INDEX "idx_document_share_expires" ON "document_shares" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_document_share_revoked" ON "document_shares" USING btree ("is_revoked");--> statement-breakpoint
CREATE INDEX "idx_document_upload_org_id" ON "document_uploads" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_document_upload_created_by" ON "document_uploads" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_document_upload_expires" ON "document_uploads" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_document_upload_confirmed" ON "document_uploads" USING btree ("confirmed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_document_version_unique" ON "document_versions" USING btree ("document_id","version_number");--> statement-breakpoint
CREATE INDEX "idx_document_version_document_id" ON "document_versions" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_document_version_created_at" ON "document_versions" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_document_number" ON "documents" USING btree ("organization_id","document_number");--> statement-breakpoint
CREATE INDEX "idx_document_org_id" ON "documents" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_document_branch_id" ON "documents" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_document_type" ON "documents" USING btree ("document_type");--> statement-breakpoint
CREATE INDEX "idx_document_status" ON "documents" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_document_patient_id" ON "documents" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_document_encounter_id" ON "documents" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_document_uploaded_by" ON "documents" USING btree ("uploaded_by");--> statement-breakpoint
CREATE INDEX "idx_document_uploaded_at" ON "documents" USING btree ("uploaded_at");--> statement-breakpoint
CREATE INDEX "idx_document_archived" ON "documents" USING btree ("is_archived");--> statement-breakpoint
CREATE INDEX "idx_document_retention" ON "documents" USING btree ("retention_date");--> statement-breakpoint
CREATE INDEX "idx_document_virus_scan" ON "documents" USING btree ("virus_scan_status");--> statement-breakpoint
CREATE INDEX "idx_document_access" ON "documents" USING btree ("access");--> statement-breakpoint
CREATE INDEX "idx_patient_ihs_lookup_org_id" ON "patient_ihs_lookups" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_patient_ihs_lookup_branch_id" ON "patient_ihs_lookups" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_patient_ihs_lookup_patient_id" ON "patient_ihs_lookups" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_patient_ihs_lookup_nik" ON "patient_ihs_lookups" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_patient_ihs_lookup_status" ON "patient_ihs_lookups" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_satusehat_config_org_id" ON "satusehat_configs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_config_branch_id" ON "satusehat_configs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_config_active" ON "satusehat_configs" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_satusehat_consent_org_id" ON "satusehat_consents" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_consent_branch_id" ON "satusehat_consents" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_consent_patient_id" ON "satusehat_consents" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_consent_scope" ON "satusehat_consents" USING btree ("scope");--> statement-breakpoint
CREATE INDEX "idx_satusehat_consent_date" ON "satusehat_consents" USING btree ("consent_date");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_org_id" ON "satusehat_error_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_branch_id" ON "satusehat_error_logs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_category" ON "satusehat_error_logs" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_status_code" ON "satusehat_error_logs" USING btree ("status_code");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_resolution" ON "satusehat_error_logs" USING btree ("resolution");--> statement-breakpoint
CREATE INDEX "idx_satusehat_error_created_at" ON "satusehat_error_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_satusehat_location_org_id" ON "satusehat_locations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_location_branch_id" ON "satusehat_locations" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_satusehat_location_satusehat_id" ON "satusehat_locations" USING btree ("satusehat_location_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_location_local_id" ON "satusehat_locations" USING btree ("local_location_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_practitioner_org_id" ON "satusehat_practitioners" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_practitioner_branch_id" ON "satusehat_practitioners" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_satusehat_practitioner_ihs_id" ON "satusehat_practitioners" USING btree ("satusehat_ihs_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_practitioner_local_id" ON "satusehat_practitioners" USING btree ("local_practitioner_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_sync_org_id" ON "satusehat_sync_queue" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_sync_branch_id" ON "satusehat_sync_queue" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_sync_status" ON "satusehat_sync_queue" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_satusehat_sync_priority" ON "satusehat_sync_queue" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_satusehat_sync_next_retry" ON "satusehat_sync_queue" USING btree ("next_retry_at");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_org_id" ON "satusehat_webhooks" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_branch_id" ON "satusehat_webhooks" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_satusehat_webhook_id" ON "satusehat_webhooks" USING btree ("webhook_id");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_event_type" ON "satusehat_webhooks" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_resource_type" ON "satusehat_webhooks" USING btree ("resource_type");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_status" ON "satusehat_webhooks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_satusehat_webhook_created_at" ON "satusehat_webhooks" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_jkn_config_org_id" ON "jkn_configs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_config_branch_id" ON "jkn_configs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_config_api_type" ON "jkn_configs" USING btree ("api_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_config_active" ON "jkn_configs" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_org_id" ON "jkn_inacbg" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_branch_id" ON "jkn_inacbg" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_patient_id" ON "jkn_inacbg" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_encounter_id" ON "jkn_inacbg" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_sep_id" ON "jkn_inacbg" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_no_klaim" ON "jkn_inacbg" USING btree ("no_klaim");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_tgl_masuk" ON "jkn_inacbg" USING btree ("tgl_masuk");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_status" ON "jkn_inacbg" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_inacbg_no_klaim" ON "jkn_inacbg" USING btree ("no_klaim");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_obat_inacbg_id" ON "jkn_inacbg_obat" USING btree ("inacbg_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_obat_kode" ON "jkn_inacbg_obat" USING btree ("kode_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_procedure_inacbg_id" ON "jkn_inacbg_procedure" USING btree ("inacbg_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_inacbg_procedure_kode" ON "jkn_inacbg_procedure" USING btree ("kode_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_org_id" ON "jkn_kunjungan" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_branch_id" ON "jkn_kunjungan" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_patient_id" ON "jkn_kunjungan" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_nomorkartu" ON "jkn_kunjungan" USING btree ("nomorkartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_nik" ON "jkn_kunjungan" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_tanggal" ON "jkn_kunjungan" USING btree ("tanggalperiksa");--> statement-breakpoint
CREATE INDEX "idx_jkn_kunjungan_status" ON "jkn_kunjungan" USING btree ("statuskunjungan");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_org_id" ON "jkn_monitoring_klaim" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_branch_id" ON "jkn_monitoring_klaim" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_patient_id" ON "jkn_monitoring_klaim" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_inacbg_id" ON "jkn_monitoring_klaim" USING btree ("inacbg_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_sep_id" ON "jkn_monitoring_klaim" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_no_sep" ON "jkn_monitoring_klaim" USING btree ("no_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_tgl_sep" ON "jkn_monitoring_klaim" USING btree ("tgl_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_monitoring_klaim_status" ON "jkn_monitoring_klaim" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_org_id" ON "jkn_peserta" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_branch_id" ON "jkn_peserta" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_patient_id" ON "jkn_peserta" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_nik" ON "jkn_peserta" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_no_kartu" ON "jkn_peserta" USING btree ("no_kartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_peserta_status" ON "jkn_peserta" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_peserta_nik" ON "jkn_peserta" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_org_id" ON "jkn_rujukan" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_branch_id" ON "jkn_rujukan" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_patient_id" ON "jkn_rujukan" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_no_rujukan" ON "jkn_rujukan" USING btree ("no_rujukan");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_tgl_rujukan" ON "jkn_rujukan" USING btree ("tgl_rujukan");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_status" ON "jkn_rujukan" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_rujukan_no_rujukan" ON "jkn_rujukan" USING btree ("no_rujukan");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_peserta_rujukan_id" ON "jkn_rujukan_peserta" USING btree ("rujukan_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rujukan_peserta_nik" ON "jkn_rujukan_peserta" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_org_id" ON "jkn_sep" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_branch_id" ON "jkn_sep" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_patient_id" ON "jkn_sep" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_encounter_id" ON "jkn_sep" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_no_sep" ON "jkn_sep" USING btree ("no_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_no_rujukan" ON "jkn_sep" USING btree ("no_rujukan");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_tgl_sep" ON "jkn_sep" USING btree ("tgl_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_nik" ON "jkn_sep" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_status" ON "jkn_sep" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_sep_no_sep" ON "jkn_sep" USING btree ("no_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_diagnosa_sep_id" ON "jkn_sep_diagnosa" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_diagnosa_kode" ON "jkn_sep_diagnosa" USING btree ("kode_diagnosa");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_procedure_sep_id" ON "jkn_sep_procedure" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_procedure_kode" ON "jkn_sep_procedure" USING btree ("kode_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_org_id" ON "jkn_prb" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_branch_id" ON "jkn_prb" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_patient_id" ON "jkn_prb" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_sep_id" ON "jkn_prb" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_rujukan_id" ON "jkn_prb" USING btree ("rujukan_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_no_prb" ON "jkn_prb" USING btree ("no_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_program" ON "jkn_prb" USING btree ("program_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_status" ON "jkn_prb" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_tgl_prb" ON "jkn_prb" USING btree ("tgl_prb");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_prb_no_prb" ON "jkn_prb" USING btree ("no_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_obat_prb_id" ON "jkn_prb_obat" USING btree ("prb_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_obat_kd_obat" ON "jkn_prb_obat" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_obat_iterasi" ON "jkn_prb_obat" USING btree ("iterasi");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_obat_tgl_resep" ON "jkn_prb_obat" USING btree ("tgl_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_org_id" ON "jkn_prb_riwayat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_branch_id" ON "jkn_prb_riwayat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_prb_id" ON "jkn_prb_riwayat" USING btree ("prb_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_patient_id" ON "jkn_prb_riwayat" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_no_kartu" ON "jkn_prb_riwayat" USING btree ("no_kartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_prb_riwayat_tgl_kunjungan" ON "jkn_prb_riwayat" USING btree ("tgl_kunjungan");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_org_id" ON "jkn_surat_kontrol" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_branch_id" ON "jkn_surat_kontrol" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_patient_id" ON "jkn_surat_kontrol" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_sep_id" ON "jkn_surat_kontrol" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_prb_id" ON "jkn_surat_kontrol" USING btree ("prb_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_no" ON "jkn_surat_kontrol" USING btree ("no_surat_kontrol");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_jenis" ON "jkn_surat_kontrol" USING btree ("jenis_kontrol");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_tgl_rencana" ON "jkn_surat_kontrol" USING btree ("tgl_rencana_kontrol");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_status" ON "jkn_surat_kontrol" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_surat_kontrol_no" ON "jkn_surat_kontrol" USING btree ("no_surat_kontrol");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_form_prb_surat_id" ON "jkn_surat_kontrol_form_prb" USING btree ("surat_kontrol_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_surat_kontrol_form_prb_program" ON "jkn_surat_kontrol_form_prb" USING btree ("program_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_org_id" ON "jkn_lpk" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_branch_id" ON "jkn_lpk" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_patient_id" ON "jkn_lpk" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_encounter_id" ON "jkn_lpk" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_sep_id" ON "jkn_lpk" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_no_lpk" ON "jkn_lpk" USING btree ("no_lpk");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_no_sep" ON "jkn_lpk" USING btree ("no_sep");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_tgl_lpk" ON "jkn_lpk" USING btree ("tgl_lpk");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_lpk_no_lpk" ON "jkn_lpk" USING btree ("no_lpk");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_diagnosa_lpk_id" ON "jkn_lpk_diagnosa" USING btree ("lpk_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_diagnosa_kode" ON "jkn_lpk_diagnosa" USING btree ("kode_diagnosa");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_diagnosa_jenis" ON "jkn_lpk_diagnosa" USING btree ("jenis_diagnosa");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_procedure_lpk_id" ON "jkn_lpk_procedure" USING btree ("lpk_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_procedure_kode" ON "jkn_lpk_procedure" USING btree ("kode_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_procedure_tgl" ON "jkn_lpk_procedure" USING btree ("tgl_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_tindak_lanjut_lpk_id" ON "jkn_lpk_rencana_tindak_lanjut" USING btree ("lpk_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_tindak_lanjut_type" ON "jkn_lpk_rencana_tindak_lanjut" USING btree ("tindak_lanjut");--> statement-breakpoint
CREATE INDEX "idx_jkn_lpk_tindak_lanjut_tgl_kontrol" ON "jkn_lpk_rencana_tindak_lanjut" USING btree ("tgl_kontrol");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_dokter_org_id" ON "jkn_antrean_dokter" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_dokter_branch_id" ON "jkn_antrean_dokter" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_dokter_poli_id" ON "jkn_antrean_dokter" USING btree ("poli_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_dokter_kd_dokter" ON "jkn_antrean_dokter" USING btree ("kd_dokter");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_faskes_org_id" ON "jkn_antrean_faskes" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_faskes_branch_id" ON "jkn_antrean_faskes" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_faskes_kd_ppk" ON "jkn_antrean_faskes" USING btree ("kd_ppk");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_org_id" ON "jkn_antrean_fkrtl" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_branch_id" ON "jkn_antrean_fkrtl" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_patient_id" ON "jkn_antrean_fkrtl" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_kode_booking" ON "jkn_antrean_fkrtl" USING btree ("kode_booking");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_nomorkartu" ON "jkn_antrean_fkrtl" USING btree ("nomorkartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_nik" ON "jkn_antrean_fkrtl" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_tanggal" ON "jkn_antrean_fkrtl" USING btree ("tanggalperiksa");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fkrtl_status" ON "jkn_antrean_fkrtl" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_poli_org_id" ON "jkn_antrean_poli" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_poli_branch_id" ON "jkn_antrean_poli" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_poli_faskes_id" ON "jkn_antrean_poli" USING btree ("faskes_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_poli_kd_poli" ON "jkn_antrean_poli" USING btree ("kd_poli");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_org_id" ON "jkn_antrean_fktp" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_branch_id" ON "jkn_antrean_fktp" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_patient_id" ON "jkn_antrean_fktp" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_kode_booking" ON "jkn_antrean_fktp" USING btree ("kode_booking");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_no_kartu" ON "jkn_antrean_fktp" USING btree ("no_kartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_tanggal" ON "jkn_antrean_fktp" USING btree ("tanggal_periksa");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_status" ON "jkn_antrean_fktp" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_status_log_antrean_id" ON "jkn_antrean_fktp_status_log" USING btree ("antrean_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_antrean_fktp_status_log_waktu" ON "jkn_antrean_fktp_status_log" USING btree ("waktu_update");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_bridging_org_id" ON "jkn_pcare_bridging" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_bridging_branch_id" ON "jkn_pcare_bridging" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_bridging_patient_id" ON "jkn_pcare_bridging" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_bridging_nik" ON "jkn_pcare_bridging" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_bridging_tgl_daftar" ON "jkn_pcare_bridging" USING btree ("tgl_daftar");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_reference_org_id" ON "jkn_pcare_reference" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_reference_branch_id" ON "jkn_pcare_reference" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_reference_type" ON "jkn_pcare_reference" USING btree ("ref_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_pcare_reference_code" ON "jkn_pcare_reference" USING btree ("ref_code");--> statement-breakpoint
CREATE INDEX "idx_jkn_apotek_monitoring_org_id" ON "jkn_apotek_monitoring" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_apotek_monitoring_branch_id" ON "jkn_apotek_monitoring" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_apotek_monitoring_resep_id" ON "jkn_apotek_monitoring" USING btree ("resep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_apotek_monitoring_no_resep" ON "jkn_apotek_monitoring" USING btree ("no_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_apotek_monitoring_tgl" ON "jkn_apotek_monitoring" USING btree ("tgl_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_org_id" ON "jkn_obat_riwayat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_branch_id" ON "jkn_obat_riwayat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_patient_id" ON "jkn_obat_riwayat" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_resep_id" ON "jkn_obat_riwayat" USING btree ("resep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_kd_obat" ON "jkn_obat_riwayat" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_obat_riwayat_tgl" ON "jkn_obat_riwayat" USING btree ("tgl_pemberian");--> statement-breakpoint
CREATE INDEX "idx_jkn_pelayanan_obat_org_id" ON "jkn_pelayanan_obat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pelayanan_obat_branch_id" ON "jkn_pelayanan_obat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pelayanan_obat_resep_id" ON "jkn_pelayanan_obat" USING btree ("resep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_pelayanan_obat_no" ON "jkn_pelayanan_obat" USING btree ("no_pelayanan");--> statement-breakpoint
CREATE INDEX "idx_jkn_pelayanan_obat_tgl" ON "jkn_pelayanan_obat" USING btree ("tgl_pelayanan");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_pelayanan_obat_no" ON "jkn_pelayanan_obat" USING btree ("no_pelayanan");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_org_id" ON "jkn_resep" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_branch_id" ON "jkn_resep" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_patient_id" ON "jkn_resep" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_sep_id" ON "jkn_resep" USING btree ("sep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_no_resep" ON "jkn_resep" USING btree ("no_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_no_apotik" ON "jkn_resep" USING btree ("no_apotik");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_tgl_resep" ON "jkn_resep" USING btree ("tgl_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_status" ON "jkn_resep" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_resep_no_resep" ON "jkn_resep" USING btree ("no_resep");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_resep_id" ON "jkn_resep_obat" USING btree ("resep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_kd_obat" ON "jkn_resep_obat" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_tipe" ON "jkn_resep_obat" USING btree ("tipe_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_racikan_resep_id" ON "jkn_resep_obat_racikan" USING btree ("resep_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_racikan_kd_obat" ON "jkn_resep_obat_racikan" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_resep_obat_racikan_kd_racikan" ON "jkn_resep_obat_racikan" USING btree ("kd_racikan");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_kunjungan_apotek_org_id" ON "jkn_sep_kunjungan_apotek" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_kunjungan_apotek_branch_id" ON "jkn_sep_kunjungan_apotek" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_kunjungan_apotek_patient_id" ON "jkn_sep_kunjungan_apotek" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sep_kunjungan_apotek_no_sep" ON "jkn_sep_kunjungan_apotek" USING btree ("no_sep_kunjungan");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_sep_kunjungan_apotek_no_sep" ON "jkn_sep_kunjungan_apotek" USING btree ("no_sep_kunjungan");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_history_org_id" ON "jkn_aplicares_history" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_history_branch_id" ON "jkn_aplicares_history" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_history_kamar_id" ON "jkn_aplicares_history" USING btree ("kamar_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_history_waktu" ON "jkn_aplicares_history" USING btree ("waktu_snapshot");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_history_kode_kamar" ON "jkn_aplicares_history" USING btree ("kode_kamar");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_kamar_org_id" ON "jkn_aplicares_kamar" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_kamar_branch_id" ON "jkn_aplicares_kamar" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_kamar_kode" ON "jkn_aplicares_kamar" USING btree ("kode_kamar");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_kamar_kelas" ON "jkn_aplicares_kamar" USING btree ("kelas_kamar");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_aplicares_kamar_kode_org" ON "jkn_aplicares_kamar" USING btree ("kode_kamar","organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_ketersediaan_kamar_id" ON "jkn_aplicares_ketersediaan" USING btree ("kamar_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_aplicares_ketersediaan_waktu" ON "jkn_aplicares_ketersediaan" USING btree ("waktu_update");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_session_org_id" ON "jkn_icare_session" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_session_branch_id" ON "jkn_icare_session" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_session_verification_id" ON "jkn_icare_session" USING btree ("verification_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_session_session_id" ON "jkn_icare_session" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_session_started" ON "jkn_icare_session" USING btree ("session_started");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_org_id" ON "jkn_icare_verification" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_branch_id" ON "jkn_icare_verification" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_patient_id" ON "jkn_icare_verification" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_type" ON "jkn_icare_verification" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_status" ON "jkn_icare_verification" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_no_kartu" ON "jkn_icare_verification" USING btree ("no_kartu");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_nik" ON "jkn_icare_verification" USING btree ("nik");--> statement-breakpoint
CREATE INDEX "idx_jkn_icare_verification_verified_at" ON "jkn_icare_verification" USING btree ("verified_at");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_org_id" ON "jkn_rekam_medis_fhir" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_branch_id" ON "jkn_rekam_medis_fhir" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_patient_id" ON "jkn_rekam_medis_fhir" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_encounter_id" ON "jkn_rekam_medis_fhir" USING btree ("encounter_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_bundle_id" ON "jkn_rekam_medis_fhir" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_status" ON "jkn_rekam_medis_fhir" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_fhir_submitted_at" ON "jkn_rekam_medis_fhir" USING btree ("submitted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_rekam_medis_fhir_bundle_id" ON "jkn_rekam_medis_fhir" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_submission_org_id" ON "jkn_rekam_medis_submission" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_submission_branch_id" ON "jkn_rekam_medis_submission" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_submission_fhir_id" ON "jkn_rekam_medis_submission" USING btree ("fhir_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_submission_status" ON "jkn_rekam_medis_submission" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_submission_submitted_at" ON "jkn_rekam_medis_submission" USING btree ("submitted_at");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_validation_fhir_id" ON "jkn_rekam_medis_validation" USING btree ("fhir_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_validation_submission_id" ON "jkn_rekam_medis_validation" USING btree ("submission_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_validation_error_type" ON "jkn_rekam_medis_validation" USING btree ("error_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_validation_severity" ON "jkn_rekam_medis_validation" USING btree ("error_severity");--> statement-breakpoint
CREATE INDEX "idx_jkn_rekam_medis_validation_resolved" ON "jkn_rekam_medis_validation" USING btree ("is_resolved");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_cara_keluar_org_id" ON "jkn_ref_cara_keluar" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_cara_keluar_branch_id" ON "jkn_ref_cara_keluar" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_cara_keluar_kd" ON "jkn_ref_cara_keluar" USING btree ("kd_cara_keluar");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_cara_keluar_active" ON "jkn_ref_cara_keluar" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_cara_keluar_org_kd" ON "jkn_ref_cara_keluar" USING btree ("organization_id","kd_cara_keluar");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_diagnosa_org_id" ON "jkn_ref_diagnosa" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_diagnosa_branch_id" ON "jkn_ref_diagnosa" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_diagnosa_kd" ON "jkn_ref_diagnosa" USING btree ("kd_diagnosa");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_diagnosa_active" ON "jkn_ref_diagnosa" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_diagnosa_org_kd" ON "jkn_ref_diagnosa" USING btree ("organization_id","kd_diagnosa");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_dokter_org_id" ON "jkn_ref_dokter" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_dokter_branch_id" ON "jkn_ref_dokter" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_dokter_kd" ON "jkn_ref_dokter" USING btree ("kd_dokter");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_dokter_active" ON "jkn_ref_dokter" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_dokter_org_kd" ON "jkn_ref_dokter" USING btree ("organization_id","kd_dokter");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_faskes_org_id" ON "jkn_ref_faskes" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_faskes_branch_id" ON "jkn_ref_faskes" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_faskes_kd" ON "jkn_ref_faskes" USING btree ("kd_faskes");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_faskes_active" ON "jkn_ref_faskes" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_faskes_org_kd" ON "jkn_ref_faskes" USING btree ("organization_id","kd_faskes");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kelas_rawat_org_id" ON "jkn_ref_kelas_rawat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kelas_rawat_branch_id" ON "jkn_ref_kelas_rawat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kelas_rawat_kd" ON "jkn_ref_kelas_rawat" USING btree ("kd_kelas_rawat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kelas_rawat_active" ON "jkn_ref_kelas_rawat" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_kelas_rawat_org_kd" ON "jkn_ref_kelas_rawat" USING btree ("organization_id","kd_kelas_rawat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kondisi_pulang_org_id" ON "jkn_ref_kondisi_pulang" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kondisi_pulang_branch_id" ON "jkn_ref_kondisi_pulang" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kondisi_pulang_kd" ON "jkn_ref_kondisi_pulang" USING btree ("kd_kondisi_pulang");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_kondisi_pulang_active" ON "jkn_ref_kondisi_pulang" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_kondisi_pulang_org_kd" ON "jkn_ref_kondisi_pulang" USING btree ("organization_id","kd_kondisi_pulang");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_org_id" ON "jkn_ref_obat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_branch_id" ON "jkn_ref_obat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_kd" ON "jkn_ref_obat" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_active" ON "jkn_ref_obat" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_obat_org_kd" ON "jkn_ref_obat" USING btree ("organization_id","kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_dpho_org_id" ON "jkn_ref_obat_dpho" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_dpho_branch_id" ON "jkn_ref_obat_dpho" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_dpho_kd" ON "jkn_ref_obat_dpho" USING btree ("kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_obat_dpho_active" ON "jkn_ref_obat_dpho" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_obat_dpho_org_kd" ON "jkn_ref_obat_dpho" USING btree ("organization_id","kd_obat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_poli_org_id" ON "jkn_ref_poli" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_poli_branch_id" ON "jkn_ref_poli" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_poli_kd" ON "jkn_ref_poli" USING btree ("kd_poli");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_poli_active" ON "jkn_ref_poli" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_poli_org_kd" ON "jkn_ref_poli" USING btree ("organization_id","kd_poli");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_program_prb_org_id" ON "jkn_ref_program_prb" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_program_prb_branch_id" ON "jkn_ref_program_prb" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_program_prb_kd" ON "jkn_ref_program_prb" USING btree ("kd_program_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_program_prb_active" ON "jkn_ref_program_prb" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_program_prb_org_kd" ON "jkn_ref_program_prb" USING btree ("organization_id","kd_program_prb");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_ruang_rawat_org_id" ON "jkn_ref_ruang_rawat" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_ruang_rawat_branch_id" ON "jkn_ref_ruang_rawat" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_ruang_rawat_kd" ON "jkn_ref_ruang_rawat" USING btree ("kd_ruang_rawat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_ruang_rawat_active" ON "jkn_ref_ruang_rawat" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_ruang_rawat_org_kd" ON "jkn_ref_ruang_rawat" USING btree ("organization_id","kd_ruang_rawat");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_spesialistik_org_id" ON "jkn_ref_spesialistik" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_spesialistik_branch_id" ON "jkn_ref_spesialistik" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_spesialistik_kd" ON "jkn_ref_spesialistik" USING btree ("kd_spesialistik");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_spesialistik_active" ON "jkn_ref_spesialistik" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_spesialistik_org_kd" ON "jkn_ref_spesialistik" USING btree ("organization_id","kd_spesialistik");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_tindakan_org_id" ON "jkn_ref_tindakan" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_tindakan_branch_id" ON "jkn_ref_tindakan" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_tindakan_kd" ON "jkn_ref_tindakan" USING btree ("kd_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_ref_tindakan_active" ON "jkn_ref_tindakan" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "uk_jkn_ref_tindakan_org_kd" ON "jkn_ref_tindakan" USING btree ("organization_id","kd_tindakan");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_org_id" ON "jkn_error_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_branch_id" ON "jkn_error_logs" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_api_type" ON "jkn_error_logs" USING btree ("api_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_category" ON "jkn_error_logs" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_status_code" ON "jkn_error_logs" USING btree ("status_code");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_resolution" ON "jkn_error_logs" USING btree ("resolution");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_sync_queue_id" ON "jkn_error_logs" USING btree ("sync_queue_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_error_logs_created_at" ON "jkn_error_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_poll" ON "jkn_sync_queue" USING btree ("status","next_retry_at","priority");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_resource" ON "jkn_sync_queue" USING btree ("local_id","resource_type","status");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_org_id" ON "jkn_sync_queue" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_branch_id" ON "jkn_sync_queue" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_api_type" ON "jkn_sync_queue" USING btree ("api_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_external_id" ON "jkn_sync_queue" USING btree ("external_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_sync_queue_correlation" ON "jkn_sync_queue" USING btree ("correlation_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_org_id" ON "jkn_webhooks" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_branch_id" ON "jkn_webhooks" USING btree ("branch_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_jkn_webhook_id" ON "jkn_webhooks" USING btree ("webhook_id");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_source" ON "jkn_webhooks" USING btree ("source");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_api_type" ON "jkn_webhooks" USING btree ("api_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_event_type" ON "jkn_webhooks" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_status" ON "jkn_webhooks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_jkn_webhook_created_at" ON "jkn_webhooks" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_report_generation_org_id" ON "report_generations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_report_generation_branch_id" ON "report_generations" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_report_generation_template_id" ON "report_generations" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "idx_report_generation_schedule_id" ON "report_generations" USING btree ("schedule_id");--> statement-breakpoint
CREATE INDEX "idx_report_generation_generated_by" ON "report_generations" USING btree ("generated_by");--> statement-breakpoint
CREATE INDEX "idx_report_generation_report_date" ON "report_generations" USING btree ("report_date");--> statement-breakpoint
CREATE INDEX "idx_report_generation_status" ON "report_generations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_report_schedule_org_id" ON "report_schedules" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_report_schedule_branch_id" ON "report_schedules" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_report_schedule_template_id" ON "report_schedules" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "idx_report_schedule_frequency" ON "report_schedules" USING btree ("frequency");--> statement-breakpoint
CREATE INDEX "idx_report_schedule_active" ON "report_schedules" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_report_template_org_id" ON "report_templates" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_report_template_branch_id" ON "report_templates" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "idx_report_template_category" ON "report_templates" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_report_template_active" ON "report_templates" USING btree ("is_active");