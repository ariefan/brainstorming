"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patientsListOptions,
  patientsListQueryKey,
  patientsCreateMutation,
  patientsDeleteMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Patient, CreatePatientRequest } from "contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { PageHeader } from "@/components/page-header";
import { DataTable, Column } from "@/components/data-table";
import { SearchInput } from "@/components/search-input";
import { StatusBadge } from "@/components/status-badge";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { PatientForm } from "./patient-form";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { Plus, Trash2, Eye, Edit } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    patientsListOptions({
      path: { orgId: ORG_ID },
      query: debouncedSearch ? { search: debouncedSearch } : undefined,
    })
  );

  const createMutation = useMutation({
    ...patientsCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsListQueryKey({ path: { orgId: ORG_ID } }) });
      setIsCreateOpen(false);
      toast.success("Patient created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create patient: " + (error as Error).message);
    },
  });

  const deleteMutation = useMutation({
    ...patientsDeleteMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsListQueryKey({ path: { orgId: ORG_ID } }) });
      setDeletingPatient(null);
      toast.success("Patient deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete patient: " + (error as Error).message);
    },
  });

  const patients = (data && "data" in data ? data.data : []) ?? [];

  const handleCreate = (formData: CreatePatientRequest) => {
    createMutation.mutate({
      path: { orgId: ORG_ID },
      body: formData,
    });
  };

  const handleDelete = () => {
    if (deletingPatient) {
      deleteMutation.mutate({
        path: { orgId: ORG_ID, patientId: deletingPatient.id },
      });
    }
  };

  const columns: Column<Patient>[] = [
    {
      key: "mrn",
      header: "MRN",
      cell: (patient) => (
        <span className="font-mono text-sm">{patient.medicalRecordNumber}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (patient) => (
        <div>
          <p className="font-medium">{patient.fullName}</p>
          {patient.email && (
            <p className="text-sm text-muted-foreground">{patient.email}</p>
          )}
        </div>
      ),
    },
    {
      key: "nik",
      header: "NIK",
      cell: (patient) => (
        <span className="font-mono text-sm">{patient.nik || "-"}</span>
      ),
    },
    {
      key: "gender",
      header: "Gender",
      cell: (patient) => (
        <span className="capitalize">{patient.gender}</span>
      ),
    },
    {
      key: "dob",
      header: "Date of Birth",
      cell: (patient) => new Date(patient.dateOfBirth).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      cell: (patient) => <StatusBadge status={patient.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (patient) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/patients/${patient.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingPatient(patient)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeletingPatient(patient)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-[50px]",
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <PageHeader title="Patients" description="Manage patient records" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading patients</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Patients"
        description="Manage patient records and information"
        action={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Patients ({patients.length})</CardTitle>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name, MRN, NIK..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={patients}
            keyExtractor={(p) => p.id}
            isLoading={isLoading}
            emptyTitle="No patients found"
            emptyDescription="Add your first patient to get started."
            emptyAction={
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            }
          />
        </CardContent>
      </Card>

      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Patient</SheetTitle>
            <SheetDescription>
              Enter the patient's information below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <PatientForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              isSubmitting={createMutation.isPending}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Patient</SheetTitle>
            <SheetDescription>
              Update the patient's information below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingPatient && (
              <PatientForm
                patient={editingPatient}
                onSubmit={(data) => {
                  // TODO: Implement update mutation
                  toast.info("Update functionality coming soon");
                  setEditingPatient(null);
                }}
                onCancel={() => setEditingPatient(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DeleteConfirmDialog
        open={!!deletingPatient}
        onOpenChange={() => setDeletingPatient(null)}
        onConfirm={handleDelete}
        title="Delete Patient"
        description={`Are you sure you want to delete ${deletingPatient?.fullName}? This action cannot be undone.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
