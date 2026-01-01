"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  practitionersListOptions,
  practitionersListQueryKey,
  practitionersCreateMutation,
  practitionersDeleteMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Practitioner, CreatePractitionerRequest } from "contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";
import { DataTable, Column } from "@/components/data-table";
import { SearchInput } from "@/components/search-input";
import { StatusBadge } from "@/components/status-badge";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { PractitionerForm } from "./practitioner-form";
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

export default function PractitionersPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPractitioner, setEditingPractitioner] = useState<Practitioner | null>(null);
  const [deletingPractitioner, setDeletingPractitioner] = useState<Practitioner | null>(null);

  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    practitionersListOptions({
      path: { orgId: ORG_ID },
      query: debouncedSearch ? { search: debouncedSearch } : undefined,
    })
  );

  const createMutation = useMutation({
    ...practitionersCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: practitionersListQueryKey({ path: { orgId: ORG_ID } }) });
      setIsCreateOpen(false);
      toast.success("Practitioner created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create practitioner: " + (error as Error).message);
    },
  });

  const deleteMutation = useMutation({
    ...practitionersDeleteMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: practitionersListQueryKey({ path: { orgId: ORG_ID } }) });
      setDeletingPractitioner(null);
      toast.success("Practitioner deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete practitioner: " + (error as Error).message);
    },
  });

  const practitioners = (data && "data" in data ? data.data : []) ?? [];

  const handleCreate = (formData: CreatePractitionerRequest) => {
    createMutation.mutate({
      path: { orgId: ORG_ID },
      body: formData,
    });
  };

  const handleDelete = () => {
    if (deletingPractitioner) {
      deleteMutation.mutate({
        path: { orgId: ORG_ID, practitionerId: deletingPractitioner.id },
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const columns: Column<Practitioner>[] = [
    {
      key: "name",
      header: "Practitioner",
      cell: (practitioner) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(practitioner.fullName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{practitioner.fullName}</p>
            {practitioner.email && (
              <p className="text-sm text-muted-foreground">{practitioner.email}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "sip",
      header: "SIP",
      cell: (practitioner) => (
        <span className="font-mono text-sm">{practitioner.sip || "-"}</span>
      ),
    },
    {
      key: "specialty",
      header: "Specialty",
      cell: (practitioner) => (
        <span className="capitalize">{practitioner.specialty?.replace(/_/g, " ") || "-"}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (practitioner) => (
        <span className="capitalize">{practitioner.practitionerType?.replace(/([A-Z])/g, " $1").trim()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (practitioner) => (
        <StatusBadge status={practitioner.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (practitioner) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/practitioners/${practitioner.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingPractitioner(practitioner)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeletingPractitioner(practitioner)}
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
        <PageHeader title="Practitioners" description="Manage healthcare practitioners" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading practitioners</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Practitioners"
        description="Manage healthcare practitioners and their information"
        action={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Practitioner
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Practitioners ({practitioners.length})</CardTitle>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name, specialty..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={practitioners}
            keyExtractor={(p) => p.id}
            isLoading={isLoading}
            emptyTitle="No practitioners found"
            emptyDescription="Add your first practitioner to get started."
            emptyAction={
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Practitioner
              </Button>
            }
          />
        </CardContent>
      </Card>

      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Practitioner</SheetTitle>
            <SheetDescription>
              Enter the practitioner's information below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <PractitionerForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              isSubmitting={createMutation.isPending}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!editingPractitioner} onOpenChange={() => setEditingPractitioner(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Practitioner</SheetTitle>
            <SheetDescription>
              Update the practitioner's information below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingPractitioner && (
              <PractitionerForm
                practitioner={editingPractitioner}
                onSubmit={(data) => {
                  toast.info("Update functionality coming soon");
                  setEditingPractitioner(null);
                }}
                onCancel={() => setEditingPractitioner(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DeleteConfirmDialog
        open={!!deletingPractitioner}
        onOpenChange={() => setDeletingPractitioner(null)}
        onConfirm={handleDelete}
        title="Delete Practitioner"
        description={`Are you sure you want to delete ${deletingPractitioner?.fullName}? This action cannot be undone.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
