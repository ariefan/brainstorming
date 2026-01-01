/**
 * ============================================================================
 * JKN/BPJS KESEHATAN API ROUTES
 * ============================================================================
 *
 * RESTful API for JKN/BPJS Kesehatan healthcare data:
 * - SEP (Surat Eligibilitas Peserta)
 * - Rujukan (Referrals)
 * - PRB (Program Rujuk Balik)
 * - Surat Kontrol (Control Letters)
 * - LPK (Lembar Pengajuan Klaim)
 * - Antrean (Queue Management)
 * - Resep (Prescriptions)
 * - Aplicares (Bed Availability)
 * - Peserta (Participant Lookup)
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/jkn.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// SEP (Surat Eligibilitas Peserta)
// ============================================================================

/**
 * JKN SEP API
 *
 * Authorization letters for BPJS healthcare services
 */
@route("/v1/orgs/{orgId}/jkn/sep")
@tag("JKN")
interface JknSeps {
  /**
   * List SEPs
   */
  @get
  @summary("List SEPs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate,

    /** Search by SEP number */
    @query noSep?: string,

    /** Search by BPJS card number */
    @query noKartu?: string
  ): JknSepListResponse | ErrorResponse;

  /**
   * Create SEP
   */
  @post
  @summary("Create SEP")
  create(
    @path orgId: string,
    @body body: CreateJknSepRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknSepResponse;
      }
    | ErrorResponse;

  /**
   * Get SEP
   */
  @route("/{sepId}")
  @get
  @summary("Get SEP")
  get(
    @path orgId: string,
    @path sepId: string
  ): JknSepResponse | ErrorResponse;

  /**
   * Update SEP
   */
  @route("/{sepId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update SEP")
  update(
    @path orgId: string,
    @path sepId: string,
    @body body: UpdateJknSepRequest
  ): JknSepResponse | ErrorResponse;

  /**
   * Delete/Cancel SEP
   */
  @route("/{sepId}")
  @delete
  @summary("Delete SEP")
  delete(
    @path orgId: string,
    @path sepId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;

  /**
   * Sync SEP with BPJS
   */
  @route("/{sepId}/sync")
  @post
  @summary("Sync SEP with BPJS")
  sync(
    @path orgId: string,
    @path sepId: string
  ): JknSepResponse | ErrorResponse;
}

// ============================================================================
// RUJUKAN (Referrals)
// ============================================================================

/**
 * JKN Rujukan API
 *
 * BPJS referral letters
 */
@route("/v1/orgs/{orgId}/jkn/rujukan")
@tag("JKN")
interface JknRujukans {
  /**
   * List referrals
   */
  @get
  @summary("List referrals")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate,

    /** Search by referral number */
    @query noRujukan?: string
  ): JknRujukanListResponse | ErrorResponse;

  /**
   * Create referral
   */
  @post
  @summary("Create referral")
  create(
    @path orgId: string,
    @body body: CreateJknRujukanRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknRujukanResponse;
      }
    | ErrorResponse;

  /**
   * Get referral
   */
  @route("/{rujukanId}")
  @get
  @summary("Get referral")
  get(
    @path orgId: string,
    @path rujukanId: string
  ): JknRujukanResponse | ErrorResponse;

  /**
   * Lookup referral from BPJS
   */
  @route("/lookup")
  @get
  @summary("Lookup referral from BPJS")
  lookup(
    @path orgId: string,

    /** Referral number */
    @query noRujukan: string
  ): JknRujukanResponse | ErrorResponse;
}

// ============================================================================
// PRB (Program Rujuk Balik)
// ============================================================================

/**
 * JKN PRB API
 *
 * Chronic disease management program
 */
@route("/v1/orgs/{orgId}/jkn/prb")
@tag("JKN")
interface JknPrbs {
  /**
   * List PRBs
   */
  @get
  @summary("List PRBs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by program */
    @query programPrb?: string,

    /** Filter by status */
    @query status?: string
  ): JknPrbListResponse | ErrorResponse;

  /**
   * Create PRB
   */
  @post
  @summary("Create PRB")
  create(
    @path orgId: string,
    @body body: CreateJknPrbRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknPrbResponse;
      }
    | ErrorResponse;

  /**
   * Get PRB
   */
  @route("/{prbId}")
  @get
  @summary("Get PRB")
  get(
    @path orgId: string,
    @path prbId: string
  ): JknPrbResponse | ErrorResponse;
}

// ============================================================================
// SURAT KONTROL
// ============================================================================

/**
 * JKN Surat Kontrol API
 *
 * Follow-up control letters
 */
@route("/v1/orgs/{orgId}/jkn/surat-kontrol")
@tag("JKN")
interface JknSuratKontrols {
  /**
   * List control letters
   */
  @get
  @summary("List control letters")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by type */
    @query jenisKontrol?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): JknSuratKontrolListResponse | ErrorResponse;

  /**
   * Create control letter
   */
  @post
  @summary("Create control letter")
  create(
    @path orgId: string,
    @body body: CreateJknSuratKontrolRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknSuratKontrolResponse;
      }
    | ErrorResponse;

  /**
   * Get control letter
   */
  @route("/{suratKontrolId}")
  @get
  @summary("Get control letter")
  get(
    @path orgId: string,
    @path suratKontrolId: string
  ): JknSuratKontrolResponse | ErrorResponse;
}

// ============================================================================
// LPK (Lembar Pengajuan Klaim)
// ============================================================================

/**
 * JKN LPK API
 *
 * Claim submission forms
 */
@route("/v1/orgs/{orgId}/jkn/lpk")
@tag("JKN")
interface JknLpks {
  /**
   * List LPKs
   */
  @get
  @summary("List LPKs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by SEP */
    @query sepId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): JknLpkListResponse | ErrorResponse;

  /**
   * Get LPK
   */
  @route("/{lpkId}")
  @get
  @summary("Get LPK")
  get(
    @path orgId: string,
    @path lpkId: string
  ): JknLpkResponse | ErrorResponse;
}

// ============================================================================
// ANTREAN (Queue)
// ============================================================================

/**
 * JKN Antrean API
 *
 * Hospital queue management
 */
@route("/v1/orgs/{orgId}/jkn/antrean")
@tag("JKN")
interface JknAntreans {
  /**
   * List queue bookings
   */
  @get
  @summary("List queue bookings")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by polyclinic */
    @query kodepoli?: string,

    /** Filter by doctor */
    @query kodedokter?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by service date */
    @query tanggalperiksa?: plainDate
  ): JknAntreanListResponse | ErrorResponse;

  /**
   * Create queue booking
   */
  @post
  @summary("Create queue booking")
  create(
    @path orgId: string,
    @body body: CreateJknAntreanRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknAntreanResponse;
      }
    | ErrorResponse;

  /**
   * Get queue booking
   */
  @route("/{antreanId}")
  @get
  @summary("Get queue booking")
  get(
    @path orgId: string,
    @path antreanId: string
  ): JknAntreanResponse | ErrorResponse;

  /**
   * Update task status
   */
  @route("/{antreanId}/task")
  @post
  @summary("Update queue task status")
  updateTask(
    @path orgId: string,
    @path antreanId: string,
    @body body: UpdateJknAntreanTaskRequest
  ): JknAntreanResponse | ErrorResponse;

  /**
   * Cancel queue booking
   */
  @route("/{antreanId}/cancel")
  @post
  @summary("Cancel queue booking")
  cancel(
    @path orgId: string,
    @path antreanId: string
  ): JknAntreanResponse | ErrorResponse;
}

// ============================================================================
// RESEP (Prescriptions)
// ============================================================================

/**
 * JKN Resep API
 *
 * Prescriptions for BPJS pharmacy
 */
@route("/v1/orgs/{orgId}/jkn/resep")
@tag("JKN")
interface JknReseps {
  /**
   * List prescriptions
   */
  @get
  @summary("List prescriptions")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by SEP */
    @query sepId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by drug type */
    @query jenisObat?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): JknResepListResponse | ErrorResponse;

  /**
   * Create prescription
   */
  @post
  @summary("Create prescription")
  create(
    @path orgId: string,
    @body body: CreateJknResepRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknResepResponse;
      }
    | ErrorResponse;

  /**
   * Get prescription
   */
  @route("/{resepId}")
  @get
  @summary("Get prescription")
  get(
    @path orgId: string,
    @path resepId: string
  ): JknResepResponse | ErrorResponse;

  /**
   * Delete prescription
   */
  @route("/{resepId}")
  @delete
  @summary("Delete prescription")
  delete(
    @path orgId: string,
    @path resepId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// APLICARES (Bed Availability)
// ============================================================================

/**
 * JKN Aplicares API
 *
 * Hospital bed availability management
 */
@route("/v1/orgs/{orgId}/jkn/aplicares")
@tag("JKN")
interface JknAplicares {
  /**
   * List rooms/beds
   */
  @get
  @summary("List rooms")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by room class */
    @query kelasKamar?: string
  ): JknAplicaresKamarListResponse | ErrorResponse;

  /**
   * Get room
   */
  @route("/{kamarId}")
  @get
  @summary("Get room")
  get(
    @path orgId: string,
    @path kamarId: string
  ): JknAplicaresKamarResponse | ErrorResponse;

  /**
   * Update room availability
   */
  @route("/{kamarId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update room availability")
  update(
    @path orgId: string,
    @path kamarId: string,
    @body body: UpdateJknAplicaresKamarRequest
  ): JknAplicaresKamarResponse | ErrorResponse;

  /**
   * Sync all rooms with BPJS
   */
  @route("/sync")
  @post
  @summary("Sync all rooms with BPJS")
  syncAll(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string
  ): JknAplicaresKamarListResponse | ErrorResponse;
}

// ============================================================================
// PESERTA (Participant Lookup)
// ============================================================================

/**
 * JKN Peserta API
 *
 * BPJS participant lookup
 */
@route("/v1/orgs/{orgId}/jkn/peserta")
@tag("JKN")
interface JknPesertas {
  /**
   * Lookup participant
   */
  @get
  @summary("Lookup BPJS participant")
  lookup(
    @path orgId: string,

    /** BPJS card number */
    @query noKartu?: string,

    /** NIK */
    @query nik?: string,

    /** Service date for eligibility */
    @query tglPelayanan?: plainDate
  ): JknPesertaResponse | ErrorResponse;

  /**
   * Get cached participant
   */
  @route("/{pesertaId}")
  @get
  @summary("Get cached participant")
  get(
    @path orgId: string,
    @path pesertaId: string
  ): JknPesertaResponse | ErrorResponse;
}
