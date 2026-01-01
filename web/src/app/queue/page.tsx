"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  queuesListOptions,
  queuesListQueryKey,
  queuesGetDisplayOptions,
  queuesCallNextMutation,
  queuesCompleteMutation,
  queuesSkipMutation,
} from "contracts/@tanstack/react-query.gen";
import type { Queue } from "contracts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { Users, Play, SkipForward, CheckCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ORG_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

export default function QueuePage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery(
    queuesListOptions({
      path: { orgId: ORG_ID },
      query: { status: "waiting" },
    })
  );

  const callNextMutation = useMutation({
    ...queuesCallNextMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queuesListQueryKey({ path: { orgId: ORG_ID } }) });
      toast.success("Next patient called");
    },
    onError: (error) => {
      toast.error("Failed to call next: " + (error as Error).message);
    },
  });

  const completeMutation = useMutation({
    ...queuesCompleteMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queuesListQueryKey({ path: { orgId: ORG_ID } }) });
      toast.success("Queue completed");
    },
    onError: (error) => {
      toast.error("Failed to complete: " + (error as Error).message);
    },
  });

  const skipMutation = useMutation({
    ...queuesSkipMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queuesListQueryKey({ path: { orgId: ORG_ID } }) });
      toast.success("Patient skipped");
    },
    onError: (error) => {
      toast.error("Failed to skip: " + (error as Error).message);
    },
  });

  const queues = (data && "data" in data ? data.data : []) ?? [];

  const handleCallNext = (polyclinicId: string) => {
    callNextMutation.mutate({
      path: { orgId: ORG_ID },
      body: { polyclinicId },
    });
  };

  const handleComplete = (queueId: string) => {
    completeMutation.mutate({
      path: { orgId: ORG_ID, queueId },
    });
  };

  const handleSkip = (queueId: string) => {
    skipMutation.mutate({
      path: { orgId: ORG_ID, queueId },
    });
  };

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <PageHeader title="Queue Management" description="Manage patient queues" />
        <Card>
          <CardContent className="py-8">
            <p className="text-destructive text-center">Error loading queue</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Queue Management"
        description="Manage patient queues and call patients"
        action={
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Waiting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {queues.filter(q => q.status === "waiting").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Called
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {queues.filter(q => q.status === "called").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Serving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {queues.filter(q => q.status === "serving").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Current Queue
              </CardTitle>
              <CardDescription>
                {queues.length} patients in queue
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-center py-8">Loading queue...</p>
          ) : queues.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No patients in queue. Queue will update automatically.
            </p>
          ) : (
            <div className="space-y-4">
              {queues.map((queue, index) => (
                <div
                  key={queue.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {queue.queueNumber}
                    </div>
                    <div>
                      <p className="font-medium">Queue #{queue.queueNumber}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={queue.status} />
                        {queue.priority === "urgent" && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                        {queue.priority === "emergency" && (
                          <Badge variant="destructive" className="bg-red-600">Emergency</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {queue.status === "waiting" && index === 0 && (
                      <Button
                        size="sm"
                        onClick={() => handleCallNext(queue.polyclinicId)}
                        disabled={callNextMutation.isPending}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                    )}
                    {queue.status === "called" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSkip(queue.id)}
                          disabled={skipMutation.isPending}
                        >
                          <SkipForward className="mr-2 h-4 w-4" />
                          Skip
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleComplete(queue.id)}
                          disabled={completeMutation.isPending}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete
                        </Button>
                      </>
                    )}
                    {queue.status === "serving" && (
                      <Button
                        size="sm"
                        onClick={() => handleComplete(queue.id)}
                        disabled={completeMutation.isPending}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
