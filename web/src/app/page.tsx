"use client";

import { useQuery } from "@tanstack/react-query";
import {
  healthCheckOptions,
  patientsListOptions,
  appointmentsListOptions,
  practitionersListOptions,
} from "contracts/@tanstack/react-query.gen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Default organization ID for development
const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function DashboardPage() {
  const { data: health } = useQuery(healthCheckOptions({}));
  const { data: patientsData } = useQuery(patientsListOptions({ path: { orgId: ORG_ID } }));
  const { data: appointmentsData } = useQuery(appointmentsListOptions({ path: { orgId: ORG_ID } }));
  const { data: practitionersData } = useQuery(practitionersListOptions({ path: { orgId: ORG_ID } }));

  // Extract data arrays with type narrowing
  const patients = patientsData && "data" in patientsData ? patientsData.data : [];
  const appointments = appointmentsData && "data" in appointmentsData ? appointmentsData.data : [];
  const practitioners = practitionersData && "data" in practitionersData ? practitionersData.data : [];

  const stats = [
    {
      title: "Total Patients",
      value: patients?.length ?? 0,
      href: "/patients",
      description: "Registered patients",
    },
    {
      title: "Appointments Today",
      value: appointments?.length ?? 0,
      href: "/appointments",
      description: "Scheduled appointments",
    },
    {
      title: "Practitioners",
      value: practitioners?.length ?? 0,
      href: "/practitioners",
      description: "Active practitioners",
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Clinic Management System
          </p>
        </div>
        <Badge variant={health?.status === "ok" ? "default" : "destructive"}>
          API: {health?.status ?? "checking..."}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            {patients && patients.length > 0 ? (
              patients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{patient.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      MRN: {patient.medicalRecordNumber}
                    </p>
                  </div>
                  <Badge variant="outline">{patient.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No patients found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments && appointments.length > 0 ? (
              appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.startTime}
                    </p>
                  </div>
                  <Badge variant="outline">{appointment.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No appointments found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
