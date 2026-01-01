"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  patientsListOptions,
  practitionersListOptions,
  polyclinicsListOptions,
} from "contracts/@tanstack/react-query.gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { Appointment, CreateAppointmentRequest } from "contracts";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const appointmentTypes = [
  { value: "consultation", label: "Consultation" },
  { value: "followUp", label: "Follow Up" },
  { value: "procedure", label: "Procedure" },
  { value: "lab", label: "Laboratory" },
  { value: "imaging", label: "Imaging" },
  { value: "vaccination", label: "Vaccination" },
  { value: "checkup", label: "Check Up" },
] as const;

const appointmentFormSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  practitionerId: z.string().min(1, "Practitioner is required"),
  polyclinicId: z.string().min(1, "Polyclinic is required"),
  appointmentType: z.enum(["consultation", "followUp", "procedure", "lab", "imaging", "vaccination", "checkup"]),
  appointmentDate: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().optional(),
  reasonForVisit: z.string().optional(),
  notes: z.string().optional(),
  isWalkIn: z.boolean(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  appointment?: Appointment;
  defaultPatientId?: string;
  onSubmit: (data: CreateAppointmentRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AppointmentForm({
  appointment,
  defaultPatientId,
  onSubmit,
  onCancel,
  isSubmitting
}: AppointmentFormProps) {
  const { data: patientsData } = useQuery(
    patientsListOptions({ path: { orgId: ORG_ID } })
  );
  const { data: practitionersData } = useQuery(
    practitionersListOptions({ path: { orgId: ORG_ID } })
  );
  const { data: polyclinicsData } = useQuery(
    polyclinicsListOptions({ path: { orgId: ORG_ID } })
  );

  const patients = (patientsData && "data" in patientsData ? patientsData.data : []) ?? [];
  const practitioners = (practitionersData && "data" in practitionersData ? practitionersData.data : []) ?? [];
  const polyclinics = (polyclinicsData && "data" in polyclinicsData ? polyclinicsData.data : []) ?? [];

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientId: appointment?.patientId || defaultPatientId || "",
      practitionerId: appointment?.practitionerId || "",
      polyclinicId: appointment?.polyclinicId || "",
      appointmentType: appointment?.appointmentType || "consultation",
      appointmentDate: appointment?.appointmentDate?.split("T")[0] || "",
      startTime: appointment?.startTime || "",
      endTime: appointment?.endTime || "",
      reasonForVisit: appointment?.reasonForVisit || "",
      notes: appointment?.notes || "",
      isWalkIn: appointment?.isWalkIn || false,
    },
  });

  const handleSubmit = (values: AppointmentFormValues) => {
    const data: CreateAppointmentRequest = {
      patientId: values.patientId,
      practitionerId: values.practitionerId,
      polyclinicId: values.polyclinicId,
      appointmentType: values.appointmentType,
      appointmentDate: values.appointmentDate,
      startTime: values.startTime,
      endTime: values.endTime || undefined,
      reasonForVisit: values.reasonForVisit || undefined,
      notes: values.notes || undefined,
      isWalkIn: values.isWalkIn,
    };
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.fullName} ({patient.medicalRecordNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="practitionerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Practitioner *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select practitioner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {practitioners.map((practitioner) => (
                      <SelectItem key={practitioner.id} value={practitioner.id}>
                        {practitioner.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="polyclinicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Polyclinic *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select polyclinic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {polyclinics.map((polyclinic) => (
                      <SelectItem key={polyclinic.id} value={polyclinic.id}>
                        {polyclinic.polyclinicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="appointmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reasonForVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe the reason for the appointment" rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Additional notes" rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isWalkIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Walk-in appointment</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : appointment ? "Update Appointment" : "Create Appointment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
