"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { auditLogsListOptions } from "contracts/@tanstack/react-query.gen";
import type { AuditLog } from "contracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Shield, Search, Eye, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const eventTypeFilters = [
  { value: "all", label: "All Events" },
  { value: "create", label: "Create" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

export default function AuditPage() {
  const [actionFilter, setActionFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data, isLoading, error } = useQuery(
    auditLogsListOptions({
      path: { orgId: ORG_ID },
      query: actionFilter !== "all" ? { eventType: actionFilter } : undefined,
    })
  );

  const auditLogs = (data && "data" in data ? data.data : []) ?? [];

  const getActionColor = (eventType: string) => {
    if (eventType.includes("create")) return "text-green-600";
    if (eventType.includes("update")) return "text-blue-600";
    if (eventType.includes("delete")) return "text-red-600";
    return "text-gray-600";
  };

  const columns: Column<AuditLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      cell: (log) => (
        <div>
          <p className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(log.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      key: "eventType",
      header: "Event",
      cell: (log) => (
        <span className={`font-mono text-sm ${getActionColor(log.eventType)}`}>
          {log.eventType}
        </span>
      ),
    },
    {
      key: "actor",
      header: "Actor",
      cell: (log) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm">{log.actor?.type || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">{log.actor?.id || "-"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "resource",
      header: "Resource",
      cell: (log) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm capitalize">{log.resource?.type || "Unknown"}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {log.resource?.id?.slice(0, 8) || "-"}...
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (log) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
      className: "w-[50px]",
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <PageHeader title="Audit Logs" description="View system audit trail" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading audit logs</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Audit Logs"
        description="Track all system activities and changes"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Audit Trail ({auditLogs.length})
              </CardTitle>
              <CardDescription>
                Complete history of system events and changes
              </CardDescription>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                {eventTypeFilters.map((filter) => (
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
            data={auditLogs}
            keyExtractor={(log) => log.eventId}
            isLoading={isLoading}
            emptyTitle="No audit logs found"
            emptyDescription="Audit events will appear here as they occur."
          />
        </CardContent>
      </Card>

      {/* Audit Log Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Event ID: {selectedLog?.eventId}
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Event Type</p>
                  <p className="font-mono">{selectedLog.eventType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Actor</p>
                <div className="bg-muted p-3 rounded-md">
                  <p><span className="text-muted-foreground">Type:</span> {selectedLog.actor?.type}</p>
                  <p><span className="text-muted-foreground">ID:</span> {selectedLog.actor?.id}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Resource</p>
                <div className="bg-muted p-3 rounded-md">
                  <p><span className="text-muted-foreground">Type:</span> {selectedLog.resource?.type}</p>
                  <p><span className="text-muted-foreground">ID:</span> {selectedLog.resource?.id}</p>
                </div>
              </div>

              {selectedLog.changes && Object.keys(selectedLog.changes).length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Changes</p>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(selectedLog.changes, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {selectedLog.metadata && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Metadata</p>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
