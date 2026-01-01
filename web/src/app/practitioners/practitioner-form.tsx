"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import type { Practitioner, CreatePractitionerRequest } from "contracts";

const practitionerTypes = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "midwife", label: "Midwife" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "labTech", label: "Lab Technician" },
  { value: "radiologist", label: "Radiologist" },
  { value: "specialist", label: "Specialist" },
] as const;

const specialties = [
  { value: "generalPractice", label: "General Practice" },
  { value: "internalMedicine", label: "Internal Medicine" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "obgyn", label: "OB/GYN" },
  { value: "surgery", label: "Surgery" },
  { value: "dentistry", label: "Dentistry" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "radiology", label: "Radiology" },
  { value: "pathology", label: "Pathology" },
  { value: "other", label: "Other" },
] as const;

const practitionerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  practitionerType: z.enum(["doctor", "nurse", "midwife", "pharmacist", "labTech", "radiologist", "specialist"]),
  specialty: z.enum(["generalPractice", "internalMedicine", "pediatrics", "obgyn", "surgery", "dentistry", "ophthalmology", "dermatology", "psychiatry", "radiology", "pathology", "other"]).optional(),
  licenseNumber: z.string().optional(),
  licenseExpiry: z.string().optional(),
  nip: z.string().optional(),
  sip: z.string().optional(),
  str: z.string().optional(),
  bio: z.string().optional(),
});

type PractitionerFormValues = z.infer<typeof practitionerFormSchema>;

interface PractitionerFormProps {
  practitioner?: Practitioner;
  onSubmit: (data: CreatePractitionerRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function PractitionerForm({ practitioner, onSubmit, onCancel, isSubmitting }: PractitionerFormProps) {
  const form = useForm<PractitionerFormValues>({
    resolver: zodResolver(practitionerFormSchema),
    defaultValues: {
      firstName: practitioner?.firstName || "",
      lastName: practitioner?.lastName || "",
      gender: practitioner?.gender || undefined,
      dateOfBirth: practitioner?.dateOfBirth?.split("T")[0] || "",
      phone: practitioner?.phone || "",
      mobile: practitioner?.mobile || "",
      email: practitioner?.email || "",
      practitionerType: practitioner?.practitionerType || "doctor",
      specialty: practitioner?.specialty || undefined,
      licenseNumber: practitioner?.licenseNumber || "",
      licenseExpiry: practitioner?.licenseExpiry?.split("T")[0] || "",
      nip: practitioner?.nip || "",
      sip: practitioner?.sip || "",
      str: practitioner?.str || "",
      bio: practitioner?.bio || "",
    },
  });

  const handleSubmit = (values: PractitionerFormValues) => {
    const data: CreatePractitionerRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      practitionerType: values.practitionerType,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth || undefined,
      phone: values.phone || undefined,
      mobile: values.mobile || undefined,
      email: values.email || undefined,
      specialty: values.specialty,
      licenseNumber: values.licenseNumber || undefined,
      licenseExpiry: values.licenseExpiry || undefined,
      nip: values.nip || undefined,
      sip: values.sip || undefined,
      str: values.str || undefined,
      bio: values.bio || undefined,
    };
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter first name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter last name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="practitionerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Practitioner Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {practitionerTypes.map((type) => (
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
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {specialties.map((spec) => (
                      <SelectItem key={spec.value} value={spec.value}>
                        {spec.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Email address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Mobile number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-4">Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="NIP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="License number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="sip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIP (Practice License)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SIP number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="str"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>STR (Registration Certificate)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="STR number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="licenseExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Expiry</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Short biography" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : practitioner ? "Update Practitioner" : "Create Practitioner"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
