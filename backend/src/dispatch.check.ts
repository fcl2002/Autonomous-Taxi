// Run: node src/dispatch.check.ts
import { strict as assert } from "node:assert";
import { MAX_WAIT_MS, NEXT, pickNext, queuePositions, stopsAhead, type QueuedRide } from "./dispatch.ts";

const ride = (id: string, originStopId: string, createdAt: number, destinationStopId = "faculte"): QueuedRide =>
  ({ id, originStopId, destinationStopId, createdAt });
const now = 1_000_000_000;

// Loop distance, including wrap-around past the last stop.
assert.equal(stopsAhead("nw-corner", "nw-corner"), 0);
assert.equal(stopsAhead("nw-corner", "rue-cuvier"), 3);
assert.equal(stopsAhead("faculte", "nw-corner"), 1);
assert.equal(stopsAhead("rue-cuvier", "central-crossing"), 7);

// Nearest ahead wins, even if it arrived later.
assert.equal(pickNext([ride("far", "faculte", now - 60_000), ride("near", "rue-cuvier", now)], "central-crossing", now)!.id, "near");
// A stop just behind the car is almost a full lap away.
assert.equal(pickNext([ride("behind", "nw-corner", now - 1), ride("ahead", "west-path", now)], "central-crossing", now)!.id, "ahead");
// Same distance: oldest first.
assert.equal(pickNext([ride("new", "rue-cuvier", now), ride("old", "rue-cuvier", now - 1)], "nw-corner", now)!.id, "old");
// Waiting over 10 min beats distance.
assert.equal(pickNext([ride("near", "central-crossing", now), ride("starving", "faculte", now - MAX_WAIT_MS - 1)], "nw-corner", now)!.id, "starving");
assert.equal(pickNext([], "nw-corner", now), undefined);

// Queue order follows the car: after A (to rue-cuvier), B at cell-dynamics is next, then C.
const positions = queuePositions(
  [ride("C", "nw-corner", now - 3), ride("A", "central-crossing", now - 2, "rue-cuvier"), ride("B", "cell-dynamics", now - 1)],
  "nw-corner",
  now,
);
assert.deepEqual([...positions], [["C", 1], ["A", 2], ["B", 3]]);

// Transitions: cancel only while queued, no going back.
assert.ok(NEXT.queued.includes("cancelled"));
assert.ok(!NEXT.assigned.includes("cancelled"));
assert.ok(!NEXT.completed.length);

console.log("dispatch checks passed");
