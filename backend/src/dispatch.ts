// Pure dispatch rules for one vehicle (docs/contracts/rides.md). No Firebase here, so it is checkable on its own.
import { STOP_IDS } from "./stops.ts";

export const MAX_WAIT_MS = 10 * 60 * 1000;

export type Status =
  | "requested" | "queued" | "assigned" | "to_pickup" | "at_pickup" | "to_destination"
  | "completed" | "cancelled" | "failed";

// Allowed status changes. Anything else (duplicate or stale event) is ignored.
export const NEXT: Record<Status, Status[]> = {
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

export const ACTIVE: Status[] = ["requested", "queued", "assigned", "to_pickup", "at_pickup", "to_destination"];

export type QueuedRide = { id: string; originStopId: string; destinationStopId: string; createdAt: number };

const ORDER = [...STOP_IDS]; // Set keeps the loop order of STOP_DEFS

/** Stops the car must pass to get from `from` to `to` on the one-way loop (0 = same stop). */
export function stopsAhead(from: string, to: string) {
  return (ORDER.indexOf(to) - ORDER.indexOf(from) + ORDER.length) % ORDER.length;
}

/** Next ride to serve: the oldest one waiting over MAX_WAIT, else the nearest pickup ahead (ties: oldest). */
export function pickNext(queued: QueuedRide[], carStopId: string, now: number) {
  const byAge = [...queued].sort((a, b) => a.createdAt - b.createdAt);
  const overdue = byAge.find((ride) => now - ride.createdAt > MAX_WAIT_MS);
  if (overdue) return overdue;
  let best: QueuedRide | undefined;
  for (const ride of byAge) {
    if (!best || stopsAhead(carStopId, ride.originStopId) < stopsAhead(carStopId, best.originStopId)) best = ride;
  }
  return best;
}

/** Serving order if nothing changes: each pick moves the car to that ride's destination. Map of id -> 1-based position. */
export function queuePositions(queued: QueuedRide[], carStopId: string, now: number) {
  const positions = new Map<string, number>();
  let left = queued;
  let car = carStopId;
  while (left.length) {
    const next = pickNext(left, car, now)!;
    positions.set(next.id, positions.size + 1);
    left = left.filter((ride) => ride !== next);
    car = next.destinationStopId;
  }
  return positions;
}
