// Pure dispatch rules for one vehicle (docs/contracts/rides.md). No Firebase here, so it is checkable on its own.
import { isTerminal, NEXT, RIDE_STATUSES, type RideStatus } from "../../vazy-app/src/constants/ride-status.ts";
import { STOP_IDS } from "./stops.ts";

export const MAX_WAIT_MS = 10 * 60 * 1000;

export { NEXT };
export type Status = RideStatus;
export const ACTIVE: Status[] = RIDE_STATUSES.filter((status) => !isTerminal(status));
/** Statuses where the vehicle is working on the ride. */
export const ON_VEHICLE: Status[] = ACTIVE.filter((status) => status !== "requested" && status !== "queued");

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
