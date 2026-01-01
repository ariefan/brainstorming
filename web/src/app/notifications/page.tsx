"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notificationsListOptions,
  notificationsListQueryKey,
  notificationsMarkReadMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Notification } from "contracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { DataTable, Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Bell, Mail, MessageSquare, Phone, Check, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const statusFilters = [
  { value: "all", label: "All Notifications" },
  { value: "pending", label: "Pending" },
  { value: "queued", label: "Queued" },
  { value: "processing", label: "Processing" },
  { value: "sent", label: "Sent" },
  { value: "delivered", label: "Delivered" },
  { value: "failed", label: "Failed" },
  { value: "bounced", label: "Bounced" },
];

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "email":
      return <Mail className="h-4 w-4" />;
    case "sms":
      return <Phone className="h-4 w-4" />;
    case "push":
      return <Bell className="h-4 w-4" />;
    case "telegram":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function NotificationsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    notificationsListOptions({
      query: statusFilter !== "all" ? { status: statusFilter as any } : undefined,
    })
  );

  const markAsReadMutation = useMutation({
    ...notificationsMarkReadMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsListQueryKey({}) });
      toast.success("Notification marked as read");
    },
    onError: (error) => {
      toast.error("Failed to mark as read: " + (error as Error).message);
    },
  });

  const notifications = (data && "data" in data ? data.data : []) ?? [];

  const columns: Column<Notification>[] = [
    {
      key: "channel",
      header: "Channel",
      cell: (notification) => (
        <div className="flex items-center gap-2">
          {getChannelIcon(notification.channel)}
          <span className="capitalize">{notification.channel}</span>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      cell: (notification) => (
        <div>
          <p className="font-medium">{notification.subject || "No subject"}</p>
          <p className="text-sm text-muted-foreground truncate max-w-[300px]">
            {notification.body?.slice(0, 100) || ""}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (notification) => (
        <span className="capitalize">{notification.category?.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      cell: (notification) => (
        <span
          className={`capitalize ${
            notification.priority === "urgent"
              ? "text-red-600 font-medium"
              : notification.priority === "high"
              ? "text-orange-600"
              : ""
          }`}
        >
          {notification.priority}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (notification) => <StatusBadge status={notification.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (notification) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {notification.status === "delivered" && (
              <DropdownMenuItem
                onClick={() => {
                  markAsReadMutation.mutate({
                    path: { id: notification.id },
                  });
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark as Read
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-[50px]",
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <PageHeader title="Notifications" description="View system notifications" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading notifications</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Notifications"
        description="Manage system notifications and alerts"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications ({notifications.length})
              </CardTitle>
              <CardDescription>
                Email, SMS, and push notifications
              </CardDescription>
            </div>
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
            data={notifications}
            keyExtractor={(n) => n.id}
            isLoading={isLoading}
            emptyTitle="No notifications found"
            emptyDescription="Notifications will appear here as they are sent."
          />
        </CardContent>
      </Card>
    </div>
  );
}
