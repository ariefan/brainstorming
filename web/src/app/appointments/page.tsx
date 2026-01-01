"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  appointmentsListOptions,
  appointmentsListQueryKey,
  appointmentsCreateMutation,
  appointmentsCancelMutation,
  appointmentsCheckInMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Appointment, CreateAppointmentRequest } from "contracts";
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
import { StatusBadge } from "@/components/status-badge";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { AppointmentForm } from "./appointment-form";
import { toast } from "sonner";
import { Plus, Eye, XCircle, CheckCircle, Calendar } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const statusFilters = [
  { value: "all", label: "All Statuses" },
  { value: "booked", label: "Booked" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checkedIn", label: "Checked In" },
  { value: "inQueue", label: "In Queue" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "noShow", label: "No Show" },
];

export default function AppointmentsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [cancellingAppointment, setCancellingAppointment] = useState<Appointment | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    appointmentsListOptions({
      path: { orgId: ORG_ID },
      query: statusFilter !== "all" ? { status: statusFilter as any } : undefined,
    })
  );

  const createMutation = useMutation({
    ...appointmentsCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsListQueryKey({ path: { orgId: ORG_ID } }) });
      setIsCreateOpen(false);
      toast.success("Appointment created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create appointment: " + (error as Error).message);
    },
  });

  const cancelMutation = useMutation({
    ...appointmentsCancelMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsListQueryKey({ path: { orgId: ORG_ID } }) });
      setCancellingAppointment(null);
      toast.success("Appointment cancelled");
    },
    onError: (error) => {
      toast.error("Failed to cancel appointment: " + (error as Error).message);
    },
  });

  const checkInMutation = useMutation({
    ...appointmentsCheckInMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsListQueryKey({ path: { orgId: ORG_ID } }) });
      toast.success("Patient checked in");
    },
    onError: (error) => {
      toast.error("Failed to check in: " + (error as Error).message);
    },
  });

  const appointments = (data && "data" in data ? data.data : []) ?? [];

  const handleCreate = (formData: CreateAppointmentRequest) => {
    createMutation.mutate({
      path: { orgId: ORG_ID },
      body: formData,
    });
  };

  const handleCancel = () => {
    if (cancellingAppointment) {
      cancelMutation.mutate({
        path: { orgId: ORG_ID, appointmentId: cancellingAppointment.id },
        body: { cancellationReason: "Cancelled by user" },
      });
    }
  };

  const handleCheckIn = (appointment: Appointment) => {
    checkInMutation.mutate({
      path: { orgId: ORG_ID, appointmentId: appointment.id },
      body: {},
    });
  };

  const columns: Column<Appointment>[] = [
    {
      key: "date",
      header: "Date",
      cell: (appointment) => (
        <div>
          <p className="font-medium">
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {appointment.startTime}
            {appointment.endTime ? ` - ${appointment.endTime}` : ""}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (appointment) => (
        <span className="capitalize">{appointment.appointmentType?.replace(/([A-Z])/g, " $1").trim()}</span>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      cell: (appointment) => (
        <span className="truncate max-w-[200px] block">
          {appointment.reasonForVisit || "-"}
        </span>
      ),
    },
    {
      key: "walkIn",
      header: "Walk-in",
      cell: (appointment) => (
        appointment.isWalkIn ? (
          <span className="text-green-600 text-sm">Yes</span>
        ) : (
          <span className="text-muted-foreground text-sm">No</span>
        )
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (appointment) => <StatusBadge status={appointment.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (appointment) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/appointments/${appointment.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            {appointment.status === "booked" || appointment.status === "confirmed" ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCheckIn(appointment)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check In
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCancellingAppointment(appointment)}
                  className="text-destructive"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-[50px]",
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <PageHeader title="Appointments" description="Manage patient appointments" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading appointments</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Appointments"
        description="Manage patient appointments and schedules"
        action={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointments ({appointments.length})
            </CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={appointments}
            keyExtractor={(a) => a.id}
            isLoading={isLoading}
            emptyTitle="No appointments found"
            emptyDescription="Schedule your first appointment to get started."
            emptyAction={
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            }
          />
        </CardContent>
      </Card>

      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Schedule New Appointment</SheetTitle>
            <SheetDescription>
              Enter the appointment details below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <AppointmentForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              isSubmitting={createMutation.isPending}
            />
          </div>
        </SheetContent>
      </Sheet>

      <DeleteConfirmDialog
        open={!!cancellingAppointment}
        onOpenChange={() => setCancellingAppointment(null)}
        onConfirm={handleCancel}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment? The patient will be notified."
        confirmText="Cancel Appointment"
        loading={cancelMutation.isPending}
      />
    </div>
  );
}
