import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// JKN/BPJS KESEHATAN BUSINESS DATA MODELS
// ============================================================================
// Models for Indonesian National Health Insurance (JKN) integration
// Covers: SEP, Rujukan, PRB, Surat Kontrol, LPK, Antrean, Apotek, Aplicares
// ============================================================================

// --- SEP (Surat Eligibilitas Peserta) ---

/**
 * JKN SEP - Authorization letter for BPJS healthcare services
 */
model JknSep {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID (internal) */
  patientId: string;

  /** Encounter ID (internal) */
  encounterId?: string;

  /** BPJS SEP number */
  noSep: string;

  /** BPJS participant number */
  noKartu: string;

  /** Patient name */
  nama: string;

  /** Date of birth */
  tglLahir: plainDate;

  /** Gender (L/P) */
  kelamin: string;

  /** Diagnosis code (ICD-10) */
  kdDiagAwal: string;

  /** Diagnosis name */
  nmDiagAwal: string;

  /** Service type (1=Rawat Inap, 2=Rawat Jalan) */
  jnsPelayanan: string;

  /** SEP date */
  tglSep: plainDate;

  /** Polyclinic code */
  kdPoli: string;

  /** Polyclinic name */
  nmPoli: string;

  /** Ward class (1, 2, 3) */
  klsRawat: string;

  /** Referral number */
  noRujukan?: string;

  /** Referral type (1=FKTP, 2=Internal, 0=Self) */
  asalRujukan: string;

  /** Accident indicator */
  kdLakaLantas?: string;

  /** Severity level (I, II, III) */
  kdSeverityLevel?: string;

  /** Visit type (1=New, 2=Follow-up) */
  kdJenisKunjungan?: string;

  /** DPJP doctor code */
  dpjp?: string;

  /** Status */
  status: BpjsSepStatus;

  /** BPJS response data */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Rujukan (Referral) ---

/**
 * JKN Rujukan - BPJS referral letters
 */
model JknRujukan {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Referral number */
  noRujukan: string;

  /** BPJS card number */
  noKartu: string;

  /** Patient name */
  nama: string;

  /** Referral date */
  tglRujukan: plainDate;

  /** Referring PPK code */
  ppkPerujuk: string;

  /** Referring PPK name */
  nmPpkPerujuk: string;

  /** Destination PPK code */
  ppkDirujuk?: string;

  /** Destination PPK name */
  nmPpkDirujuk?: string;

  /** Diagnosis code */
  kdDiagnosa: string;

  /** Diagnosis name */
  nmDiagnosa: string;

  /** Destination polyclinic code */
  kdPoliTujuan: string;

  /** Destination polyclinic name */
  nmPoliTujuan: string;

  /** Referral type */
  jnsRujukan: string;

  /** Status */
  status: BpjsRujukanStatusEnum;

  /** Valid until date */
  tglBerlaku?: plainDate;

  /** BPJS response data */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** Rujukan status enum */
enum BpjsRujukanStatusEnum {
  active: "active",
  used: "used",
  expired: "expired",
  cancelled: "cancelled",
}

// --- PRB (Program Rujuk Balik) ---

/**
 * JKN PRB - Chronic disease management program
 */
model JknPrb {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId?: string;

  /** PRB number */
  noSrb: string;

  /** BPJS card number */
  noKartu: string;

  /** Patient name */
  nama: string;

  /** Program type */
  programPrb: JknPrbProgram;

  /** DPJP code */
  kdDpjp: string;

  /** DPJP name */
  nmDpjp: string;

  /** Referral FKTP code */
  kdFktpPerujuk: string;

  /** Referral FKTP name */
  nmFktpPerujuk: string;

  /** Start date */
  tglMulai: plainDate;

  /** End date */
  tglAkhir?: plainDate;

  /** Status */
  status: JknPrbStatus;

  /** BPJS response data */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Surat Kontrol ---

/**
 * JKN Surat Kontrol - Follow-up control letters
 */
model JknSuratKontrol {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId?: string;

  /** Control letter number */
  noSuratKontrol: string;

  /** Control type (1=SPRI, 2=Surat Kontrol) */
  jenisKontrol: JknJenisKontrol;

  /** BPJS card number */
  noKartu: string;

  /** Patient name */
  nama: string;

  /** Original SEP number */
  noSepAsal: string;

  /** Polyclinic code */
  kdPoli: string;

  /** Polyclinic name */
  nmPoli: string;

  /** DPJP code */
  kdDokter: string;

  /** DPJP name */
  nmDokter: string;

  /** Planned control date */
  tglRencanaKontrol: plainDate;

  /** Actual control date */
  tglTerbitKontrol?: plainDate;

  /** Status */
  status: JknSuratKontrolStatus;

  /** BPJS response data */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- LPK (Lembar Pengajuan Klaim) ---

/**
 * JKN LPK - Claim submission form
 */
model JknLpk {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** SEP ID */
  sepId?: string;

  /** SEP number */
  noSep: string;

  /** Service type */
  jnsPelayanan: string;

  /** Admission date */
  tglMasuk: plainDate;

  /** Discharge date */
  tglPulang?: plainDate;

  /** Discharge type */
  tindakLanjut: JknLpkTindakLanjut;

  /** Diagnosis list */
  diagnosa: JknLpkDiagnosa[];

  /** Procedure list */
  prosedur: JknLpkProsedur[];

  /** Total tariff */
  tarifRs?: float64;

  /** INACBG tariff */
  tarifInacbg?: float64;

  /** INACBG code */
  inacbgCode?: string;

  /** Status */
  status: string;

  /** BPJS response */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** LPK Diagnosis */
model JknLpkDiagnosa {
  /** Diagnosis code (ICD-10) */
  kdDiagnosa: string;

  /** Diagnosis name */
  nmDiagnosa?: string;

  /** Type (P=Primary, S=Secondary) */
  jenis: string;
}

/** LPK Procedure */
model JknLpkProsedur {
  /** Procedure code (ICD-9-CM) */
  kdProsedur: string;

  /** Procedure name */
  nmProsedur?: string;
}

// --- Antrean (Queue) ---

/**
 * JKN Antrean - Hospital queue booking
 */
model JknAntrean {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Booking code */
  kodebooking: string;

  /** BPJS card number */
  nomorkartu: string;

  /** NIK */
  nik: string;

  /** Patient name */
  nama: string;

  /** Phone number */
  nohp: string;

  /** Polyclinic code */
  kodepoli: string;

  /** Polyclinic name */
  namapoli: string;

  /** Service date */
  tanggalperiksa: plainDate;

  /** Doctor code */
  kodedokter: string;

  /** Doctor name */
  namadokter: string;

  /** Queue type (JKN/Non-JKN) */
  jeniskunjungan: string;

  /** Referral number */
  nomorreferensi?: string;

  /** Queue number */
  nomorantrean?: string;

  /** Estimated time */
  estimasidilayani?: int32;

  /** Status */
  status: BpjsAntreanStatus;

  /** Task status flags */
  taskId1?: boolean;
  taskId2?: boolean;
  taskId3?: boolean;
  taskId4?: boolean;
  taskId5?: boolean;
  taskId6?: boolean;
  taskId7?: boolean;

  /** BPJS response */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Resep Apotek ---

/**
 * JKN Resep - Prescription for BPJS pharmacy
 */
model JknResep {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId?: string;

  /** Prescription number */
  noResep: string;

  /** SEP number */
  noSep: string;

  /** BPJS card number */
  noKartu: string;

  /** Prescription date */
  tglResep: plainDate;

  /** Drug type */
  jenisObat: JknJenisObat;

  /** Iteration (0=Non-iterasi, 1=Iterasi) */
  iterasi: JknIterasi;

  /** Prescription items */
  obat: JknResepObat[];

  /** Status */
  status: JknResepStatus;

  /** BPJS response */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** Prescription item */
model JknResepObat {
  /** Drug code */
  kdObat: string;

  /** Drug name */
  nmObat?: string;

  /** Signa 1 */
  signa1?: string;

  /** Signa 2 */
  signa2?: string;

  /** Quantity */
  jmlObat: int32;

  /** Type (non_racikan/racikan) */
  tipeObat: JknTipeObat;
}

// --- Aplicares (Bed Management) ---

/**
 * JKN Aplicares Kamar - Room/bed availability
 */
model JknAplicaresKamar {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Room code */
  kodeKamar: string;

  /** Room name */
  namaKamar: string;

  /** Room class */
  kelasKamar: JknKelasKamar;

  /** Total capacity */
  kapasitas: int32;

  /** Available beds */
  tersedia: int32;

  /** Male available */
  tersediaLaki?: int32;

  /** Female available */
  tersediaWanita?: int32;

  /** Waiting list count */
  antrian: int32;

  /** Last update time */
  lastUpdate: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Peserta (Participant) ---

/**
 * JKN Peserta - BPJS participant lookup result
 */
model JknPeserta {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** BPJS card number */
  noKartu: string;

  /** NIK */
  nik: string;

  /** Name */
  nama: string;

  /** Date of birth */
  tglLahir: plainDate;

  /** Gender */
  kelamin: string;

  /** Participant status */
  statusPeserta: string;

  /** Active status */
  statusAktif: boolean;

  /** FKTP code */
  kdFktp: string;

  /** FKTP name */
  nmFktp: string;

  /** Class */
  kelas: string;

  /** Participation type */
  jenisPeserta: string;

  /** Last lookup date */
  lastLookup: utcDateTime;

  /** BPJS response */
  bpjsResponse?: Record<unknown>;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create SEP request */
model CreateJknSepRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** BPJS card number */
  @minLength(13)
  @maxLength(13)
  noKartu: string;

  /** Referral number (required for hospital) */
  noRujukan?: string;

  /** Referral type */
  asalRujukan: string;

  /** Service type */
  jnsPelayanan: string;

  /** SEP date */
  tglSep: plainDate;

  /** Polyclinic code */
  kdPoli: string;

  /** Ward class */
  klsRawat: string;

  /** Diagnosis code */
  kdDiagAwal: string;

  /** DPJP doctor code */
  dpjp?: string;

  /** Visit type */
  kdJenisKunjungan?: string;

  /** Accident code */
  kdLakaLantas?: string;

  /** Notes */
  catatan?: string;
}

/** Update SEP request */
model UpdateJknSepRequest {
  /** Ward class */
  klsRawat?: string;

  /** Diagnosis code */
  kdDiagAwal?: string;

  /** Notes */
  catatan?: string;
}

/** Create Rujukan request */
model CreateJknRujukanRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** BPJS card number */
  noKartu: string;

  /** Referral date */
  tglRujukan: plainDate;

  /** Diagnosis code */
  kdDiagnosa: string;

  /** Referral type */
  jnsRujukan: string;

  /** Destination PPK code */
  ppkDirujuk: string;

  /** Destination polyclinic code */
  kdPoliTujuan: string;

  /** Notes */
  catatan?: string;
}

/** Create Antrean request */
model CreateJknAntreanRequest {
  /** Patient ID */
  patientId: string;

  /** Referral number */
  nomorreferensi?: string;

  /** Polyclinic code */
  kodepoli: string;

  /** Doctor code */
  kodedokter: string;

  /** Service date */
  tanggalperiksa: plainDate;

  /** Visit type */
  jeniskunjungan: string;
}

/** Update Antrean task status */
model UpdateJknAntreanTaskRequest {
  /** Task ID (1-7) */
  taskId: int32;

  /** Timestamp */
  waktu: utcDateTime;
}

/** Create PRB request */
model CreateJknPrbRequest {
  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId?: string;

  /** PRB program */
  programPrb: JknPrbProgram;

  /** DPJP code */
  kdDpjp: string;

  /** FKTP code */
  kdFktpPerujuk: string;

  /** Start date */
  tglMulai: plainDate;
}

/** Create Surat Kontrol request */
model CreateJknSuratKontrolRequest {
  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId: string;

  /** Control type */
  jenisKontrol: JknJenisKontrol;

  /** Polyclinic code */
  kdPoli: string;

  /** Doctor code */
  kdDokter: string;

  /** Planned date */
  tglRencanaKontrol: plainDate;
}

/** Create Resep request */
model CreateJknResepRequest {
  /** Patient ID */
  patientId: string;

  /** SEP ID */
  sepId: string;

  /** Drug type */
  jenisObat: JknJenisObat;

  /** Iteration */
  iterasi: JknIterasi;

  /** Drug items */
  obat: JknResepObat[];
}

/** Update Aplicares Kamar availability */
model UpdateJknAplicaresKamarRequest {
  /** Total capacity */
  kapasitas?: int32;

  /** Available beds */
  tersedia: int32;

  /** Male available */
  tersediaLaki?: int32;

  /** Female available */
  tersediaWanita?: int32;

  /** Waiting list */
  antrian?: int32;
}

/** Peserta lookup request */
model JknPesertaLookupRequest {
  /** Search by BPJS card number */
  noKartu?: string;

  /** Search by NIK */
  nik?: string;

  /** Service date (for eligibility check) */
  tglPelayanan?: plainDate;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** SEP response */
model JknSepResponse is SingleResourceResponse<JknSep>;

/** SEP list response */
model JknSepListResponse is CollectionResponse<JknSep>;

/** Rujukan response */
model JknRujukanResponse is SingleResourceResponse<JknRujukan>;

/** Rujukan list response */
model JknRujukanListResponse is CollectionResponse<JknRujukan>;

/** PRB response */
model JknPrbResponse is SingleResourceResponse<JknPrb>;

/** PRB list response */
model JknPrbListResponse is CollectionResponse<JknPrb>;

/** Surat Kontrol response */
model JknSuratKontrolResponse is SingleResourceResponse<JknSuratKontrol>;

/** Surat Kontrol list response */
model JknSuratKontrolListResponse is CollectionResponse<JknSuratKontrol>;

/** LPK response */
model JknLpkResponse is SingleResourceResponse<JknLpk>;

/** LPK list response */
model JknLpkListResponse is CollectionResponse<JknLpk>;

/** Antrean response */
model JknAntreanResponse is SingleResourceResponse<JknAntrean>;

/** Antrean list response */
model JknAntreanListResponse is CollectionResponse<JknAntrean>;

/** Resep response */
model JknResepResponse is SingleResourceResponse<JknResep>;

/** Resep list response */
model JknResepListResponse is CollectionResponse<JknResep>;

/** Aplicares Kamar response */
model JknAplicaresKamarResponse is SingleResourceResponse<JknAplicaresKamar>;

/** Aplicares Kamar list response */
model JknAplicaresKamarListResponse is CollectionResponse<JknAplicaresKamar>;

/** Peserta response */
model JknPesertaResponse is SingleResourceResponse<JknPeserta>;
