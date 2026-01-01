"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  invoicesListOptions,
  invoicesListQueryKey,
} from "contracts/@tanstack/react-query.gen";
import type { Invoice } from "contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { DataTable, Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Plus, Eye, Receipt, DollarSign } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const statusFilters = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "issued", label: "Issued" },
  { value: "paid", label: "Paid" },
  { value: "partiallyPaid", label: "Partially Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
  { value: "void", label: "Void" },
];

export default function BillingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error } = useQuery(
    invoicesListOptions({
      path: { orgId: ORG_ID },
      query: statusFilter !== "all" ? { status: statusFilter as any } : undefined,
    })
  );

  const invoices = (data && "data" in data ? data.data : []) ?? [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns: Column<Invoice>[] = [
    {
      key: "number",
      header: "Invoice #",
      cell: (invoice) => (
        <span className="font-mono text-sm">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (invoice) => new Date(invoice.invoiceDate).toLocaleDateString(),
    },
    {
      key: "dueDate",
      header: "Due Date",
      cell: (invoice) => invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-",
    },
    {
      key: "total",
      header: "Total",
      cell: (invoice) => (
        <span className="font-medium">{formatCurrency(invoice.totalAmount)}</span>
      ),
    },
    {
      key: "paid",
      header: "Paid",
      cell: (invoice) => formatCurrency(invoice.amountPaid || 0),
    },
    {
      key: "balance",
      header: "Balance",
      cell: (invoice) => (
        <span className={invoice.balanceDue > 0 ? "text-destructive font-medium" : "text-green-600"}>
          {formatCurrency(invoice.balanceDue)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (invoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/billing/invoices/${invoice.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/billing/invoices/${invoice.id}/payment`}>
                <DollarSign className="mr-2 h-4 w-4" />
                Record Payment
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
        <PageHeader title="Billing" description="Manage invoices and payments" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading invoices</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Billing"
        description="Manage invoices, payments, and financial records"
        action={
          <Button asChild>
            <Link href="/billing/invoices/new">
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">
            <Receipt className="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="payments">
            <DollarSign className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoices ({invoices.length})</CardTitle>
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
                data={invoices}
                keyExtractor={(i) => i.id}
                isLoading={isLoading}
                emptyTitle="No invoices found"
                emptyDescription="Create your first invoice to get started."
                emptyAction={
                  <Button asChild>
                    <Link href="/billing/invoices/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Invoice
                    </Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Payment history will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
