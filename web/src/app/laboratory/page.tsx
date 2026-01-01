"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  labOrdersListOptions,
  labTestsListOptions,
} from "contracts/@tanstack/react-query.gen";
import type { LabOrder, LabTest } from "contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { DataTable, Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Plus, Eye, FlaskConical, TestTube } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function LaboratoryPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery(
    labOrdersListOptions({ path: { orgId: ORG_ID } })
  );

  const { data: testsData, isLoading: testsLoading } = useQuery(
    labTestsListOptions({ path: { orgId: ORG_ID } })
  );

  const orders = (ordersData && "data" in ordersData ? ordersData.data : []) ?? [];
  const tests = (testsData && "data" in testsData ? testsData.data : []) ?? [];

  const orderColumns: Column<LabOrder>[] = [
    {
      key: "number",
      header: "Order #",
      cell: (order) => (
        <span className="font-mono text-sm">{order.orderNumber}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (order) => new Date(order.orderedAt).toLocaleDateString(),
    },
    {
      key: "priority",
      header: "Priority",
      cell: (order) => (
        <span className={`capitalize ${order.priority === "stat" ? "text-destructive font-medium" : ""}`}>
          {order.priority}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (order) => <StatusBadge status={order.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/laboratory/orders/${order.id}`}>
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

  const testColumns: Column<LabTest>[] = [
    {
      key: "code",
      header: "Code",
      cell: (test) => (
        <span className="font-mono text-sm">{test.testCode}</span>
      ),
    },
    {
      key: "name",
      header: "Test Name",
      cell: (test) => test.testName,
    },
    {
      key: "category",
      header: "Category",
      cell: (test) => (
        <span className="capitalize">{test.testCategory?.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (test) => (
        <span className="capitalize">{test.testType?.replace(/_/g, " ") ?? "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (test) => (
        <StatusBadge status={test.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (test) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/laboratory/tests/${test.id}`}>
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

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Laboratory"
        description="Manage lab orders, tests, and results"
        action={
          <Button asChild>
            <Link href="/laboratory/orders/new">
              <Plus className="mr-2 h-4 w-4" />
              New Lab Order
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">
            <FlaskConical className="h-4 w-4 mr-2" />
            Lab Orders
          </TabsTrigger>
          <TabsTrigger value="tests">
            <TestTube className="h-4 w-4 mr-2" />
            Test Catalog
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Lab Orders ({orders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={orderColumns}
                data={orders}
                keyExtractor={(o) => o.id}
                isLoading={ordersLoading}
                emptyTitle="No lab orders found"
                emptyDescription="Create your first lab order to get started."
                emptyAction={
                  <Button asChild>
                    <Link href="/laboratory/orders/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Lab Order
                    </Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Catalog ({tests.length})</CardTitle>
                <Button asChild size="sm">
                  <Link href="/laboratory/tests/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Test
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={testColumns}
                data={tests}
                keyExtractor={(t) => t.id}
                isLoading={testsLoading}
                emptyTitle="No tests found"
                emptyDescription="Add your first lab test to the catalog."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
