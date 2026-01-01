import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

const statusVariants: Record<string, StatusVariant> = {
  // Generic
  active: "success",
  inactive: "secondary",
  pending: "warning",
  completed: "success",
  cancelled: "destructive",

  // Appointments
  scheduled: "default",
  confirmed: "success",
  checked_in: "warning",
  in_progress: "warning",
  no_show: "destructive",

  // Patients
  deceased: "destructive",

  // Encounters
  planned: "secondary",
  arrived: "warning",
  triaged: "warning",
  finished: "success",

  // Invoices
  draft: "secondary",
  issued: "default",
  paid: "success",
  overdue: "destructive",
  void: "secondary",

  // Payments
  verified: "success",
  failed: "destructive",
  refunded: "outline",

  // Lab
  ordered: "default",
  collected: "warning",
  processing: "warning",

  // Queue
  waiting: "default",
  called: "warning",
  serving: "warning",
  skipped: "secondary",
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "_");
  const resolvedVariant = variant || statusVariants[normalizedStatus] || "outline";

  const variantClasses: Record<StatusVariant, string> = {
    default: "",
    secondary: "",
    destructive: "",
    outline: "",
    success: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100",
  };

  const displayStatus = status.replace(/_/g, " ");

  return (
    <Badge
      variant={resolvedVariant === "success" || resolvedVariant === "warning" ? "outline" : resolvedVariant}
      className={cn(variantClasses[resolvedVariant], "capitalize", className)}
    >
      {displayStatus}
    </Badge>
  );
}
