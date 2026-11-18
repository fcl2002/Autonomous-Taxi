// Ride statuses and their allowed changes (docs/contracts/rides.md v1).
// Single source for the app and the backend (backend/src/dispatch.ts imports it), like stops.ts.
// Adding a status: add it here and to the state machine in the contract; the rules list client-writable ones.
export const RIDE_STATUSES = [
  "requested", "queued", "assigned", "to_pickup", "at_pickup", "to_destination",
  "completed", "cancelled", "failed",
] as const;

export type RideStatus = (typeof RIDE_STATUSES)[number];

// Allowed changes. Anything else (a duplicate or stale event) is ignored by the backend.
export const NEXT: Record<RideStatus, RideStatus[]> = {
  requested: ["queued", "failed", "cancelled"],
  queued: ["assigned", "cancelled"],
  assigned: ["to_pickup"],
  to_pickup: ["at_pickup"],
  at_pickup: ["to_destination"],
  to_destination: ["completed"],
  completed: [],
  cancelled: [],
  failed: [],
};

/** A ride with no way forward has ended. */
export const isTerminal = (status: RideStatus) => NEXT[status].length === 0;
