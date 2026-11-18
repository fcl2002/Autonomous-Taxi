// Fake vehicle for SIMULATE_VEHICLE=1: takes a mission, reports status events on a timer.
// The MQTT adapter replaces this file later with the same shape: mission in, events out.
import { stopsAhead, type Status } from "./dispatch.ts";

const SECONDS_PER_STOP = 3;
const SECONDS_AT_PICKUP = 5;

export type Mission = { rideId: string; originStopId: string; destinationStopId: string; carStopId: string };

const wait = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/** Drives the mission from `from` (a resumed ride starts mid-way) and calls `report` at each step. */
export async function runMission(mission: Mission, from: Status, report: (rideId: string, status: Status) => void) {
  const steps: [Status, number][] = [
    ["to_pickup", 1],
    ["at_pickup", SECONDS_PER_STOP * stopsAhead(mission.carStopId, mission.originStopId)],
    ["to_destination", SECONDS_AT_PICKUP],
    ["completed", SECONDS_PER_STOP * stopsAhead(mission.originStopId, mission.destinationStopId)],
  ];
  const order: Status[] = ["assigned", "to_pickup", "at_pickup", "to_destination", "completed"];
  for (const [status, seconds] of steps) {
    if (order.indexOf(status) <= order.indexOf(from)) continue;
    await wait(seconds);
    report(mission.rideId, status);
  }
}
