import type { FeastDay, FeastKey } from "@/types/feast";
import feast_1_1 from "./1-1.json";

import feast_1_9 from "./1-9.json"; // ← add this import

const registry: Record<FeastKey, FeastDay> = {
  "1-1": feast_1_1 as FeastDay,
  "1-9": feast_1_9 as FeastDay, // ← add this line
};

// As you add more files (1-2.json, 2-1.json, ...), import and register
// them here. This static-import approach (rather than reading the
// filesystem at request time) is what lets `next build --output export`
// bundle every feast into the offline build with zero runtime cost.

export function getFeastByKey(key: FeastKey): FeastDay | undefined {
  return registry[key];
}

export function getAllFeastKeys(): FeastKey[] {
  return Object.keys(registry) as FeastKey[];
}

export function getAllFeasts(): FeastDay[] {
  return Object.values(registry);
}
