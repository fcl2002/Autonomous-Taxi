// Fake vehicle for SIMULATE_VEHICLE=1: takes a mission, reports status events on a timer.
// The MQTT adapter replaces this file later with the same shape: mission in, events out.
import { stopsAhead, type Status } from "./dispatch.ts";

const SECONDS_PER_STOP = 3;
const SECONDS_AT_PICKUP = 5;

export type Mission = { rideId: string; originStopId: string; destinationStopId: string; carStopId: string };
/** `seconds`: how long until the next event, so the app can show a timer and move the car. */
export type Report = (rideId: string, status: Status, seconds: number) => void;

// SIM_SPEED=10 runs the fake vehicle 10x faster (used by smoke.check.ts); reported seconds are scaled too.
const SPEED = Number(process.env.SIM_SPEED) || 1;
const wait = (seconds: number) => new Promise((resolve) => setTimeout(resolve, (seconds / SPEED) * 1000));

/** Drives the mission from `from` (a resumed ride restarts its current step) and reports each step. */
export async function runMission(mission: Mission, from: Status, report: Report) {
  const steps: [Status, number][] = [
    ["to_pickup", SECONDS_PER_STOP * stopsAhead(mission.carStopId, mission.originStopId)],
    ["at_pickup", SECONDS_AT_PICKUP],
    ["to_destination", SECONDS_PER_STOP * stopsAhead(mission.originStopId, mission.destinationStopId)],
    ["completed", 0],
  ];
  const resumeAt = steps.findIndex(([status]) => status === from);
  if (resumeAt >= 0) await wait(steps[resumeAt][1]);
  await wait(1);
  for (const [status, seconds] of steps.slice(resumeAt + 1)) {
    report(mission.rideId, status, seconds / SPEED);
    await wait(seconds);
  }
}
