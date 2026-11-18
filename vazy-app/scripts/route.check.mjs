// Run: node scripts/route.check.mjs (Node 22.18+ strips the TS types).
import assert from "node:assert/strict";
import { STOPS } from "../src/constants/circuit.ts";
import { bounds, meters, nearestStop, pointAlong, summary, tripPath } from "../src/lib/route.ts";

// Real circuit: catches stops.ts edited without re-running build-circuit.mjs.
assert.equal(new Set(STOPS.map((s) => s.id)).size, STOPS.length, "stop ids must be unique");
STOPS.forEach((stop, i) => {
  const next = STOPS[(i + 1) % STOPS.length];
  assert.ok(stop.path, `${stop.id}: no leg, re-run scripts/build-circuit.mjs`);
  assert.ok(meters(stop.path[0], stop.lngLat) < 15, `${stop.id}: leg doesn't start at the stop, re-run build`);
  assert.deepEqual(stop.path.at(-1), next.path[0], `${stop.id}: leg doesn't reach ${next.id}, re-run build`);
});

// Three stops on a line; each leg's path ends where the next one starts.
const stops = [
  { name: "A", lngLat: [0, 0], distance: 10, path: [[0, 0], [1, 0]] },
  { name: "B", lngLat: [1, 0], distance: 20, path: [[1, 0], [2, 0]] },
  { name: "C", lngLat: [2, 0], distance: 30, path: [[2, 0], [0, 0]] },
];

// Forward: A -> C goes through B, without repeating the shared point.
assert.deepEqual(tripPath(stops, 0, 2), { coordinates: [[0, 0], [1, 0], [2, 0]], distance: 30, stops: 2 });
// One-way: B -> A must wrap through C, never go backwards.
assert.deepEqual(tripPath(stops, 1, 0), { coordinates: [[1, 0], [2, 0], [0, 0]], distance: 50, stops: 2 });
// Same stop: empty trip.
assert.deepEqual(tripPath(stops, 1, 1), { coordinates: [], distance: 0, stops: 0 });

// Nearest stop picks the closest one and reports meters.
assert.equal(nearestStop(stops, [1.9, 0]).index, 2);
assert.equal(nearestStop(stops, [0, 0]).distance, 0);

assert.deepEqual(bounds([[2.35, 48.84], [2.29, 48.86], [2.31, 48.85]]), [2.29, 48.84, 2.35, 48.86]);
assert.equal(summary({ stops: 3, distance: 213 }), "3 stops · 213 m");
assert.equal(summary({ stops: 1, distance: 54 }), "1 stop · 54 m");

// Vehicle position along a path: ends, middle of the second (equal-length) leg, and clamping.
const line = [[0, 0], [0.001, 0], [0.002, 0]];
assert.deepEqual(pointAlong(line, 0), [0, 0]);
assert.deepEqual(pointAlong(line, 1), [0.002, 0]);
assert.ok(Math.abs(pointAlong(line, 0.75)[0] - 0.0015) < 1e-9);
assert.deepEqual(pointAlong(line, 2), [0.002, 0]);
assert.deepEqual(pointAlong([[1, 1]], 0.5), [1, 1]);

console.log("route.check: ok");
