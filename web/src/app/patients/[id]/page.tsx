"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { patientsGetOptions, encountersListOptions, appointmentsListOptions } from "contracts/@tanstack/react-query.gen";
import type { Appointment, Encounter } from "contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { LoadingPage } from "@/components/loading-spinner";
import { ErrorPage } from "@/components/error-state";
import { StatusBadge } from "@/components/status-badge";
import { DataTable, Column } from "@/components/data-table";
import { ArrowLeft, Edit, Calendar, FileText, Activity } from "lucide-react";
import Link from "next/link";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const { data: patientData, isLoading, error } = useQuery(
    patientsGetOptions({
      path: { orgId: ORG_ID, patientId },
    })
  );

  const { data: encountersData } = useQuery(
    encountersListOptions({
      path: { orgId: ORG_ID },
      query: { patientId },
    })
  );

  const { data: appointmentsData } = useQuery(
    appointmentsListOptions({
      path: { orgId: ORG_ID },
      query: { patientId },
    })
  );

  if (isLoading) {
    return <LoadingPage text="Loading patient..." />;
  }

  if (error || !patientData) {
    return (
      <ErrorPage
        title="Patient not found"
        message="The patient you're looking for doesn't exist or has been deleted."
        onRetry={() => router.push("/patients")}
      />
    );
  }

  const patient = patientData && "data" in patientData ? patientData.data : null;
  const encounters = (encountersData && "data" in encountersData ? encountersData.data : []) ?? [];
  const appointments = (appointmentsData && "data" in appointmentsData ? appointmentsData.data : []) ?? [];

  if (!patient) {
    return (
      <ErrorPage
        title="Patient not found"
        message="The patient you're looking for doesn't exist or has been deleted."
      />
    );
  }

  const encounterColumns: Column<Encounter>[] = [
    {
      key: "date",
      header: "Date",
      cell: (e) => new Date(e.startTime).toLocaleDateString(),
    },
    {
      key: "type",
      header: "Type",
      cell: (e) => <span className="capitalize">{e.encounterType?.replace(/_/g, " ")}</span>,
    },
    {
      key: "class",
      header: "Class",
      cell: (e) => <span className="capitalize">{e.encounterClass?.replace(/_/g, " ")}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (e) => <StatusBadge status={e.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (e) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/encounters/${e.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  const appointmentColumns: Column<Appointment>[] = [
    {
      key: "date",
      header: "Date",
      cell: (a) => new Date(a.appointmentDate).toLocaleDateString(),
    },
    {
      key: "time",
      header: "Time",
      cell: (a) => a.startTime,
    },
    {
      key: "type",
      header: "Type",
      cell: (a) => <span className="capitalize">{a.appointmentType?.replace(/_/g, " ")}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (a) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/appointments/${a.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/patients")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{patient.fullName}</h1>
            <StatusBadge status={patient.status} />
          </div>
          <p className="text-muted-foreground">
            MRN: {patient.medicalRecordNumber}
          </p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Patient
        </Button>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">
            <FileText className="h-4 w-4 mr-2" />
            Information
          </TabsTrigger>
          <TabsTrigger value="encounters">
            <Activity className="h-4 w-4 mr-2" />
            Encounters ({encounters.length})
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments ({appointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoRow label="Full Name" value={patient.fullName} />
                <InfoRow label="NIK" value={patient.nik} />
                <InfoRow label="BPJS Number" value={patient.bpjsNumber} />
                <Separator />
                <InfoRow label="Gender" value={patient.gender} className="capitalize" />
                <InfoRow label="Date of Birth" value={new Date(patient.dateOfBirth).toLocaleDateString()} />
                <InfoRow label="Place of Birth" value={patient.placeOfBirth} />
                <InfoRow label="Marital Status" value={patient.maritalStatus} className="capitalize" />
                <Separator />
                <InfoRow label="Blood Type" value={patient.bloodType?.toUpperCase()} />
                <InfoRow label="Rhesus" value={patient.rhesus} className="capitalize" />
                <InfoRow label="Religion" value={patient.religion} />
                <InfoRow label="Nationality" value={patient.nationality} />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoRow label="Phone" value={patient.phone} />
                  <InfoRow label="Mobile" value={patient.mobile} />
                  <InfoRow label="Email" value={patient.email} />
                  <Separator />
                  <InfoRow label="Address" value={patient.address} />
                  <InfoRow label="City" value={patient.city} />
                  <InfoRow label="Province" value={patient.province} />
                  <InfoRow label="Postal Code" value={patient.postalCode} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoRow label="Name" value={patient.emergencyContactName} />
                  <InfoRow label="Phone" value={patient.emergencyContactPhone} />
                  <InfoRow label="Relationship" value={patient.emergencyContactRelationship} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="encounters">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medical Encounters</CardTitle>
                <Button size="sm" asChild>
                  <Link href={`/encounters/new?patientId=${patient.id}`}>
                    New Encounter
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={encounterColumns}
                data={encounters}
                keyExtractor={(e) => e.id}
                emptyTitle="No encounters yet"
                emptyDescription="This patient has no medical encounters on record."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Appointments</CardTitle>
                <Button size="sm" asChild>
                  <Link href={`/appointments/new?patientId=${patient.id}`}>
                    New Appointment
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={appointmentColumns}
                data={appointments}
                keyExtractor={(a) => a.id}
                emptyTitle="No appointments yet"
                emptyDescription="This patient has no appointments scheduled."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoRow({ label, value, className }: { label: string; value?: string | null; className?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={className}>{value || "-"}</span>
    </div>
  );
}
