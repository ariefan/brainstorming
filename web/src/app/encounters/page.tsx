"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  encountersListOptions,
  encountersListQueryKey,
  encountersCreateMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Encounter, CreateEncounterRequest } from "contracts";
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
import { toast } from "sonner";
import { Plus, Eye, Stethoscope } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  { value: "planned", label: "Planned" },
  { value: "arrived", label: "Arrived" },
  { value: "inProgress", label: "In Progress" },
  { value: "onLeave", label: "On Leave" },
  { value: "finished", label: "Finished" },
  { value: "cancelled", label: "Cancelled" },
];

export default function EncountersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    encountersListOptions({
      path: { orgId: ORG_ID },
      query: statusFilter !== "all" ? { status: statusFilter as any } : undefined,
    })
  );

  const encounters = (data && "data" in data ? data.data : []) ?? [];

  const columns: Column<Encounter>[] = [
    {
      key: "number",
      header: "Encounter #",
      cell: (encounter) => (
        <span className="font-mono text-sm">{encounter.encounterNumber}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (encounter) => (
        <div>
          <p className="font-medium">
            {new Date(encounter.startTime).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(encounter.startTime).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (encounter) => (
        <span className="capitalize">{encounter.encounterType?.replace(/([A-Z])/g, " $1").trim()}</span>
      ),
    },
    {
      key: "class",
      header: "Class",
      cell: (encounter) => (
        <span className="capitalize">{encounter.encounterClass?.replace(/([A-Z])/g, " $1").trim()}</span>
      ),
    },
    {
      key: "complaint",
      header: "Chief Complaint",
      cell: (encounter) => (
        <span className="truncate max-w-[200px] block">
          {encounter.chiefComplaint || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (encounter) => <StatusBadge status={encounter.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (encounter) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/encounters/${encounter.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
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
        <PageHeader title="Encounters" description="Manage medical encounters" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading encounters</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Encounters"
        description="Manage patient medical encounters and clinical documentation"
        action={
          <Button asChild>
            <Link href="/encounters/new">
              <Plus className="mr-2 h-4 w-4" />
              New Encounter
            </Link>
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Medical Encounters ({encounters.length})
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
            data={encounters}
            keyExtractor={(e) => e.id}
            isLoading={isLoading}
            emptyTitle="No encounters found"
            emptyDescription="Create your first encounter to get started."
            emptyAction={
              <Button asChild>
                <Link href="/encounters/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Encounter
                </Link>
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
