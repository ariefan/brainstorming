"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  organizationsGetOptions,
  branchesListOptions,
  branchesListQueryKey,
  branchesCreateMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Organization, Branch, CreateBranchRequest } from "contracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { LoadingSpinner } from "@/components/loading-spinner";
import { StatusBadge } from "@/components/status-badge";
import { DataTable, Column } from "@/components/data-table";
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
import { toast } from "sonner";
import { useState } from "react";
import {
  Building,
  MapPin,
  Settings,
  Plus,
  Phone,
  Mail,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function SettingsPage() {
  const [isCreateBranchOpen, setIsCreateBranchOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: orgData, isLoading: orgLoading } = useQuery(
    organizationsGetOptions({ path: { orgId: ORG_ID } })
  );

  const { data: branchesData, isLoading: branchesLoading } = useQuery(
    branchesListOptions({ path: { orgId: ORG_ID } })
  );

  const organization = orgData && "data" in orgData ? orgData.data : null;
  const branches = (branchesData && "data" in branchesData ? branchesData.data : []) ?? [];

  const createBranchMutation = useMutation({
    ...branchesCreateMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchesListQueryKey({ path: { orgId: ORG_ID } }) });
      setIsCreateBranchOpen(false);
      toast.success("Branch created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create branch: " + (error as Error).message);
    },
  });

  const branchColumns: Column<Branch>[] = [
    {
      key: "name",
      header: "Name",
      cell: (branch) => (
        <div>
          <p className="font-medium">{branch.branchName}</p>
          <p className="text-sm text-muted-foreground">{branch.branchCode}</p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (branch) => (
        <span className="text-sm">{branch.city || "-"}</span>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      cell: (branch) => (
        <div className="text-sm">
          {branch.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {branch.phone}
            </div>
          )}
          {branch.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {branch.email}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (branch) => (
        <StatusBadge status={branch.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (branch) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/settings/branches/${branch.id}`}>
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

  if (orgLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Settings"
        description="Manage organization settings and configuration"
      />

      <Tabs defaultValue="organization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="organization">
            <Building className="h-4 w-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="branches">
            <MapPin className="h-4 w-4 mr-2" />
            Branches
          </TabsTrigger>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Your organization's profile and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {organization ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Name</p>
                    <p className="font-medium text-lg">{organization.orgName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Code</p>
                    <p className="font-mono">{organization.orgCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="capitalize">{organization.orgType?.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <StatusBadge status={organization.isActive ? "active" : "inactive"} />
                  </div>
                  {organization.address && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{organization.address}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{organization.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{organization.email || "-"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Organization data not available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Branches ({branches.length})
                  </CardTitle>
                  <CardDescription>
                    Manage your organization's branches and locations
                  </CardDescription>
                </div>
                <Button onClick={() => setIsCreateBranchOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Branch
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={branchColumns}
                data={branches}
                keyExtractor={(b) => b.id}
                isLoading={branchesLoading}
                emptyTitle="No branches found"
                emptyDescription="Create your first branch to get started."
                emptyAction={
                  <Button onClick={() => setIsCreateBranchOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Branch
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure application-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                General settings will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Branch Sheet */}
      <Sheet open={isCreateBranchOpen} onOpenChange={setIsCreateBranchOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Branch</SheetTitle>
            <SheetDescription>
              Create a new branch location for your organization.
            </SheetDescription>
          </SheetHeader>
          <BranchForm
            onSubmit={(data) => {
              createBranchMutation.mutate({
                path: { orgId: ORG_ID },
                body: data,
              });
            }}
            onCancel={() => setIsCreateBranchOpen(false)}
            isSubmitting={createBranchMutation.isPending}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function BranchForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: CreateBranchRequest) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.branchCode || !formData.branchName) {
      toast.error("Branch code and name are required");
      return;
    }
    onSubmit({
      branchCode: formData.branchCode,
      branchName: formData.branchName,
      address: formData.address || undefined,
      city: formData.city || undefined,
      province: formData.province || undefined,
      postalCode: formData.postalCode || undefined,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Branch Code *</Label>
          <Input
            value={formData.branchCode}
            onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
            placeholder="e.g., BR001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Branch Name *</Label>
          <Input
            value={formData.branchName}
            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
            placeholder="Branch name"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Address</Label>
        <Textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Full address"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label>Province</Label>
          <Input
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            placeholder="Province"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone number"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email address"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Branch"}
        </Button>
      </div>
    </form>
  );
}
