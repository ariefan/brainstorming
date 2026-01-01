"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  encountersGetOptions,
  encountersUpdateMutation,
  vitalSignsApiGetOptions,
  vitalSignsApiCreateMutation,
  vitalSignsApiUpdateMutation,
  diagnosesListOptions,
  diagnosesListQueryKey,
  diagnosesCreateMutation,
  diagnosesDeleteMutation,
  prescriptionsListOptions,
  prescriptionsListQueryKey,
  prescriptionsCreateMutation,
  prescriptionsCancelMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Encounter, VitalSigns, Diagnosis, Prescription, CreateDiagnosisRequest, CreatePrescriptionRequest, RecordVitalSignsRequest } from "contracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft,
  Heart,
  Thermometer,
  Activity,
  Weight,
  Ruler,
  Stethoscope,
  Pill,
  Plus,
  Trash2,
  Edit,
  X,
} from "lucide-react";
import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EncounterDetailPage({ params }: PageProps) {
  const { id: encounterId } = use(params);
  const queryClient = useQueryClient();

  const [isVitalsOpen, setIsVitalsOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [deletingDiagnosis, setDeletingDiagnosis] = useState<Diagnosis | null>(null);
  const [cancellingPrescription, setCancellingPrescription] = useState<Prescription | null>(null);

  const { data: encounterData, isLoading: encounterLoading } = useQuery(
    encountersGetOptions({ path: { orgId: ORG_ID, encounterId } })
  );

  const { data: vitalsData, isLoading: vitalsLoading } = useQuery(
    vitalSignsApiGetOptions({ path: { orgId: ORG_ID, encounterId } })
  );

  const { data: diagnosesData, isLoading: diagnosesLoading } = useQuery(
    diagnosesListOptions({ path: { orgId: ORG_ID, encounterId } })
  );

  const { data: prescriptionsData, isLoading: prescriptionsLoading } = useQuery(
    prescriptionsListOptions({ path: { orgId: ORG_ID, encounterId } })
  );

  const encounter = encounterData && "data" in encounterData ? encounterData.data : null;
  const vitals = vitalsData && "data" in vitalsData ? vitalsData.data : null;
  const diagnoses = (diagnosesData && "data" in diagnosesData ? diagnosesData.data : []) ?? [];
  const prescriptions = (prescriptionsData && "data" in prescriptionsData ? prescriptionsData.data : []) ?? [];

  const createVitalsMutation = useMutation({
    ...vitalSignsApiCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vitalSignsApiGet"] });
      setIsVitalsOpen(false);
      toast.success("Vital signs recorded");
    },
    onError: (error) => {
      toast.error("Failed to record vital signs: " + (error as Error).message);
    },
  });

  const updateVitalsMutation = useMutation({
    ...vitalSignsApiUpdateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vitalSignsApiGet"] });
      setIsVitalsOpen(false);
      toast.success("Vital signs updated");
    },
    onError: (error) => {
      toast.error("Failed to update vital signs: " + (error as Error).message);
    },
  });

  const createDiagnosisMutation = useMutation({
    ...diagnosesCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: diagnosesListQueryKey({ path: { orgId: ORG_ID, encounterId } }) });
      setIsDiagnosisOpen(false);
      toast.success("Diagnosis added");
    },
    onError: (error) => {
      toast.error("Failed to add diagnosis: " + (error as Error).message);
    },
  });

  const deleteDiagnosisMutation = useMutation({
    ...diagnosesDeleteMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: diagnosesListQueryKey({ path: { orgId: ORG_ID, encounterId } }) });
      setDeletingDiagnosis(null);
      toast.success("Diagnosis removed");
    },
    onError: (error) => {
      toast.error("Failed to remove diagnosis: " + (error as Error).message);
    },
  });

  const createPrescriptionMutation = useMutation({
    ...prescriptionsCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionsListQueryKey({ path: { orgId: ORG_ID, encounterId } }) });
      setIsPrescriptionOpen(false);
      toast.success("Prescription created");
    },
    onError: (error) => {
      toast.error("Failed to create prescription: " + (error as Error).message);
    },
  });

  const cancelPrescriptionMutation = useMutation({
    ...prescriptionsCancelMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionsListQueryKey({ path: { orgId: ORG_ID, encounterId } }) });
      setCancellingPrescription(null);
      toast.success("Prescription cancelled");
    },
    onError: (error) => {
      toast.error("Failed to cancel prescription: " + (error as Error).message);
    },
  });

  if (encounterLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!encounter) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Encounter not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link
          href="/encounters"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Encounters
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Encounter #{encounter.encounterNumber}</h1>
            <p className="text-muted-foreground mt-1">
              {new Date(encounter.startTime).toLocaleString()}
            </p>
          </div>
          <StatusBadge status={encounter.status} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses ({diagnoses.length})</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions ({prescriptions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Encounter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{encounter.encounterType?.replace(/([A-Z])/g, " $1").trim()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium capitalize">{encounter.encounterClass?.replace(/([A-Z])/g, " $1").trim()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-medium">{new Date(encounter.startTime).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Time</p>
                  <p className="font-medium">{encounter.endTime ? new Date(encounter.endTime).toLocaleString() : "-"}</p>
                </div>
              </div>
              {encounter.chiefComplaint && (
                <div>
                  <p className="text-sm text-muted-foreground">Chief Complaint</p>
                  <p className="font-medium">{encounter.chiefComplaint}</p>
                </div>
              )}
              {encounter.reasonForVisit && (
                <div>
                  <p className="text-sm text-muted-foreground">Reason for Visit</p>
                  <p className="font-medium">{encounter.reasonForVisit}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Vital Signs
                  </CardTitle>
                  <CardDescription>Patient vital measurements</CardDescription>
                </div>
                <Button onClick={() => setIsVitalsOpen(true)}>
                  {vitals ? (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Vitals
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Record Vitals
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {vitalsLoading ? (
                <LoadingSpinner />
              ) : vitals ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Thermometer className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-lg font-medium">{vitals.temperature ? `${vitals.temperature}°C` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Heart className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p className="text-lg font-medium">{vitals.heartRate ? `${vitals.heartRate} bpm` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                      <p className="text-lg font-medium">
                        {vitals.systolicBp && vitals.diastolicBp
                          ? `${vitals.systolicBp}/${vitals.diastolicBp} mmHg`
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">SpO2</p>
                      <p className="text-lg font-medium">{vitals.oxygenSaturation ? `${vitals.oxygenSaturation}%` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Weight className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-lg font-medium">{vitals.weight ? `${vitals.weight} kg` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Ruler className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="text-lg font-medium">{vitals.height ? `${vitals.height} cm` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Activity className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">BMI</p>
                      <p className="text-lg font-medium">{vitals.bmi ? vitals.bmi.toFixed(1) : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Activity className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Resp. Rate</p>
                      <p className="text-lg font-medium">{vitals.respiratoryRate ? `${vitals.respiratoryRate}/min` : "-"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No vital signs recorded for this encounter.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnoses">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Diagnoses
                  </CardTitle>
                  <CardDescription>ICD-10 coded diagnoses</CardDescription>
                </div>
                <Button onClick={() => setIsDiagnosisOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Diagnosis
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {diagnosesLoading ? (
                <LoadingSpinner />
              ) : diagnoses.length > 0 ? (
                <div className="space-y-3">
                  {diagnoses.map((diagnosis) => (
                    <div
                      key={diagnosis.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                            {diagnosis.icd10Code}
                          </span>
                          <span className="font-medium">{diagnosis.diagnosisName}</span>
                          <StatusBadge status={diagnosis.diagnosisType} />
                        </div>
                        {diagnosis.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{diagnosis.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingDiagnosis(diagnosis)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No diagnoses recorded for this encounter.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Prescriptions
                  </CardTitle>
                  <CardDescription>Medication prescriptions</CardDescription>
                </div>
                <Button onClick={() => setIsPrescriptionOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Prescription
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {prescriptionsLoading ? (
                <LoadingSpinner />
              ) : prescriptions.length > 0 ? (
                <div className="space-y-3">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">
                            {prescription.prescriptionNumber}
                          </span>
                          <StatusBadge status={prescription.status} />
                          <StatusBadge status={prescription.dispenseStatus} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Prescribed: {new Date(prescription.prescribedAt).toLocaleString()}
                        </p>
                        {prescription.notes && (
                          <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                        )}
                      </div>
                      {prescription.status === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCancellingPrescription(prescription)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No prescriptions for this encounter.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vital Signs Sheet */}
      <Sheet open={isVitalsOpen} onOpenChange={setIsVitalsOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{vitals ? "Edit" : "Record"} Vital Signs</SheetTitle>
            <SheetDescription>
              Enter the patient's vital measurements.
            </SheetDescription>
          </SheetHeader>
          <VitalsForm
            existingVitals={vitals}
            onSubmit={(data) => {
              if (vitals) {
                updateVitalsMutation.mutate({
                  path: { orgId: ORG_ID, encounterId },
                  body: data as RecordVitalSignsRequest,
                });
              } else {
                createVitalsMutation.mutate({
                  path: { orgId: ORG_ID, encounterId },
                  body: data as RecordVitalSignsRequest,
                });
              }
            }}
            onCancel={() => setIsVitalsOpen(false)}
            isSubmitting={createVitalsMutation.isPending || updateVitalsMutation.isPending}
          />
        </SheetContent>
      </Sheet>

      {/* Diagnosis Sheet */}
      <Sheet open={isDiagnosisOpen} onOpenChange={setIsDiagnosisOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Diagnosis</SheetTitle>
            <SheetDescription>
              Enter the ICD-10 diagnosis information.
            </SheetDescription>
          </SheetHeader>
          <DiagnosisForm
            onSubmit={(data) => {
              createDiagnosisMutation.mutate({
                path: { orgId: ORG_ID, encounterId },
                body: data,
              });
            }}
            onCancel={() => setIsDiagnosisOpen(false)}
            isSubmitting={createDiagnosisMutation.isPending}
          />
        </SheetContent>
      </Sheet>

      {/* Prescription Sheet */}
      <Sheet open={isPrescriptionOpen} onOpenChange={setIsPrescriptionOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Prescription</SheetTitle>
            <SheetDescription>
              Create a new prescription.
            </SheetDescription>
          </SheetHeader>
          <PrescriptionForm
            onSubmit={(data) => {
              createPrescriptionMutation.mutate({
                path: { orgId: ORG_ID, encounterId },
                body: data,
              });
            }}
            onCancel={() => setIsPrescriptionOpen(false)}
            isSubmitting={createPrescriptionMutation.isPending}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Diagnosis Confirm */}
      <DeleteConfirmDialog
        open={!!deletingDiagnosis}
        onOpenChange={() => setDeletingDiagnosis(null)}
        onConfirm={() => {
          if (deletingDiagnosis) {
            deleteDiagnosisMutation.mutate({
              path: { orgId: ORG_ID, encounterId, diagnosisId: deletingDiagnosis.id },
            });
          }
        }}
        title="Remove Diagnosis"
        description={`Are you sure you want to remove the diagnosis "${deletingDiagnosis?.diagnosisName}"?`}
        confirmText="Remove"
        loading={deleteDiagnosisMutation.isPending}
      />

      {/* Cancel Prescription Confirm */}
      <DeleteConfirmDialog
        open={!!cancellingPrescription}
        onOpenChange={() => setCancellingPrescription(null)}
        onConfirm={() => {
          if (cancellingPrescription) {
            cancelPrescriptionMutation.mutate({
              path: { orgId: ORG_ID, encounterId, prescriptionId: cancellingPrescription.id },
            });
          }
        }}
        title="Cancel Prescription"
        description={`Are you sure you want to cancel prescription "${cancellingPrescription?.prescriptionNumber}"?`}
        confirmText="Cancel Prescription"
        loading={cancelPrescriptionMutation.isPending}
      />
    </div>
  );
}

// Vitals Form Component
function VitalsForm({
  existingVitals,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  existingVitals: VitalSigns | null;
  onSubmit: (data: RecordVitalSignsRequest) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState({
    temperature: existingVitals?.temperature?.toString() || "",
    heartRate: existingVitals?.heartRate?.toString() || "",
    systolicBp: existingVitals?.systolicBp?.toString() || "",
    diastolicBp: existingVitals?.diastolicBp?.toString() || "",
    respiratoryRate: existingVitals?.respiratoryRate?.toString() || "",
    oxygenSaturation: existingVitals?.oxygenSaturation?.toString() || "",
    weight: existingVitals?.weight?.toString() || "",
    height: existingVitals?.height?.toString() || "",
    bloodGlucose: existingVitals?.bloodGlucose?.toString() || "",
    notes: existingVitals?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
      heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
      systolicBp: formData.systolicBp ? parseInt(formData.systolicBp) : undefined,
      diastolicBp: formData.diastolicBp ? parseInt(formData.diastolicBp) : undefined,
      respiratoryRate: formData.respiratoryRate ? parseInt(formData.respiratoryRate) : undefined,
      oxygenSaturation: formData.oxygenSaturation ? parseFloat(formData.oxygenSaturation) : undefined,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
      bloodGlucose: formData.bloodGlucose ? parseFloat(formData.bloodGlucose) : undefined,
      notes: formData.notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Temperature (°C)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
            placeholder="36.5"
          />
        </div>
        <div className="space-y-2">
          <Label>Heart Rate (bpm)</Label>
          <Input
            type="number"
            value={formData.heartRate}
            onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
            placeholder="80"
          />
        </div>
        <div className="space-y-2">
          <Label>Systolic BP (mmHg)</Label>
          <Input
            type="number"
            value={formData.systolicBp}
            onChange={(e) => setFormData({ ...formData, systolicBp: e.target.value })}
            placeholder="120"
          />
        </div>
        <div className="space-y-2">
          <Label>Diastolic BP (mmHg)</Label>
          <Input
            type="number"
            value={formData.diastolicBp}
            onChange={(e) => setFormData({ ...formData, diastolicBp: e.target.value })}
            placeholder="80"
          />
        </div>
        <div className="space-y-2">
          <Label>Respiratory Rate (/min)</Label>
          <Input
            type="number"
            value={formData.respiratoryRate}
            onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
            placeholder="16"
          />
        </div>
        <div className="space-y-2">
          <Label>SpO2 (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.oxygenSaturation}
            onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
            placeholder="98"
          />
        </div>
        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="70"
          />
        </div>
        <div className="space-y-2">
          <Label>Height (cm)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            placeholder="170"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Blood Glucose (mg/dL)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.bloodGlucose}
            onChange={(e) => setFormData({ ...formData, bloodGlucose: e.target.value })}
            placeholder="100"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Vitals"}
        </Button>
      </div>
    </form>
  );
}

// Diagnosis Form Component
function DiagnosisForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: CreateDiagnosisRequest) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState({
    icd10Code: "",
    diagnosisName: "",
    diagnosisType: "primary" as "primary" | "secondary" | "admission" | "discharge",
    verificationStatus: "confirmed" as "confirmed" | "provisional" | "differential" | "refuted",
    isChronic: false,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.icd10Code || !formData.diagnosisName) {
      toast.error("ICD-10 code and diagnosis name are required");
      return;
    }
    onSubmit({
      icd10Code: formData.icd10Code,
      diagnosisName: formData.diagnosisName,
      diagnosisType: formData.diagnosisType,
      verificationStatus: formData.verificationStatus,
      isChronic: formData.isChronic,
      notes: formData.notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label>ICD-10 Code *</Label>
        <Input
          value={formData.icd10Code}
          onChange={(e) => setFormData({ ...formData, icd10Code: e.target.value.toUpperCase() })}
          placeholder="e.g., J06.9"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Diagnosis Name *</Label>
        <Input
          value={formData.diagnosisName}
          onChange={(e) => setFormData({ ...formData, diagnosisName: e.target.value })}
          placeholder="e.g., Acute upper respiratory infection"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={formData.diagnosisType}
            onValueChange={(value: any) => setFormData({ ...formData, diagnosisType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="admission">Admission</SelectItem>
              <SelectItem value="discharge">Discharge</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Verification</Label>
          <Select
            value={formData.verificationStatus}
            onValueChange={(value: any) => setFormData({ ...formData, verificationStatus: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="provisional">Provisional</SelectItem>
              <SelectItem value="differential">Differential</SelectItem>
              <SelectItem value="refuted">Refuted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isChronic"
          checked={formData.isChronic}
          onChange={(e) => setFormData({ ...formData, isChronic: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="isChronic">Chronic condition</Label>
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Diagnosis"}
        </Button>
      </div>
    </form>
  );
}

// Prescription Form Component
function PrescriptionForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: CreatePrescriptionRequest) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState({
    genericName: "",
    brandName: "",
    strength: "",
    dosageForm: "tablet" as "tablet" | "capsule" | "syrup" | "injection" | "ointment" | "drops" | "inhaler" | "suppository" | "other",
    frequency: "threeTimesDaily" as "onceDaily" | "twiceDaily" | "threeTimesDaily" | "fourTimesDaily" | "every8Hours" | "every12Hours" | "every24Hours" | "asNeeded" | "other",
    quantity: "",
    duration: "",
    instructions: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.genericName) {
      toast.error("Medication name is required");
      return;
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      toast.error("Quantity is required");
      return;
    }
    onSubmit({
      notes: formData.notes || undefined,
      items: [
        {
          genericName: formData.genericName,
          brandName: formData.brandName || undefined,
          strength: formData.strength || undefined,
          dosageForm: formData.dosageForm,
          frequency: formData.frequency,
          quantity: parseInt(formData.quantity),
          durationDays: formData.duration ? parseInt(formData.duration) : undefined,
          instructions: formData.instructions || undefined,
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label>Medication Name *</Label>
        <Input
          value={formData.genericName}
          onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
          placeholder="Generic name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Brand Name</Label>
        <Input
          value={formData.brandName}
          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
          placeholder="Brand name (optional)"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Strength</Label>
          <Input
            value={formData.strength}
            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
            placeholder="e.g., 500mg"
          />
        </div>
        <div className="space-y-2">
          <Label>Dosage Form</Label>
          <Select
            value={formData.dosageForm}
            onValueChange={(value: any) => setFormData({ ...formData, dosageForm: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="capsule">Capsule</SelectItem>
              <SelectItem value="syrup">Syrup</SelectItem>
              <SelectItem value="injection">Injection</SelectItem>
              <SelectItem value="ointment">Ointment</SelectItem>
              <SelectItem value="drops">Drops</SelectItem>
              <SelectItem value="inhaler">Inhaler</SelectItem>
              <SelectItem value="suppository">Suppository</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Frequency</Label>
        <Select
          value={formData.frequency}
          onValueChange={(value: any) => setFormData({ ...formData, frequency: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="onceDaily">Once Daily</SelectItem>
            <SelectItem value="twiceDaily">Twice Daily</SelectItem>
            <SelectItem value="threeTimesDaily">Three Times Daily</SelectItem>
            <SelectItem value="fourTimesDaily">Four Times Daily</SelectItem>
            <SelectItem value="every8Hours">Every 8 Hours</SelectItem>
            <SelectItem value="every12Hours">Every 12 Hours</SelectItem>
            <SelectItem value="every24Hours">Every 24 Hours</SelectItem>
            <SelectItem value="asNeeded">As Needed (PRN)</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="Number of units"
          />
        </div>
        <div className="space-y-2">
          <Label>Duration (days)</Label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Number of days"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Instructions</Label>
        <Textarea
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          placeholder="Special instructions for patient..."
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={2}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Prescription"}
        </Button>
      </div>
    </form>
  );
}
