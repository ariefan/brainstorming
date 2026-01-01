import type { ResponseMeta } from "contracts";
import { randomUUID } from "crypto";

export function createMeta(requestId: string): ResponseMeta {
  return {
    requestId,
    timestamp: new Date().toISOString(),
  };
}

export function generateId(_prefix?: string): string {
  // Database expects UUID format
  return randomUUID();
}
