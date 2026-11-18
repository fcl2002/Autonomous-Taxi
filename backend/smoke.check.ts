// End-to-end check of the orchestrator against the Firestore emulator. Run: npm run test:smoke
// Starts the backend with a 10x-speed fake vehicle, sends rides as the app would, and checks the outcome.
import { strict as assert } from "node:assert";
import { spawn } from "node:child_process";
import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

initializeApp({ projectId: "demo-vazy" });
const db = getFirestore();
const rides = db.collection("rides");

// A crash right after completing a ride, before freeing the car: recovery must place the car at that ride's end.
await rides.doc("crashed").set({ passengerUid: "zoe", originStopId: "nw-corner", destinationStopId: "faculte", status: "completed" });
await db.doc("vehicles/vazy-1").set({ status: "busy", rideId: "crashed", currentStopId: "nw-corner" });

const backend = spawn(process.execPath, ["src/index.ts"], {
  env: { ...process.env, SIMULATE_VEHICLE: "1", SIM_SPEED: "10" },
  stdio: "inherit",
});
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const request = (uid: string, originStopId: string, destinationStopId: string) =>
  rides.add({ schemaVersion: 1, passengerUid: uid, originStopId, destinationStopId, status: "requested", createdAt: FieldValue.serverTimestamp() });

try {
  // Order in which rides get the car.
  const assigned: string[] = [];
  rides.where("status", "==", "assigned").onSnapshot((snap) => {
    for (const change of snap.docChanges()) if (change.type === "added") assigned.push(change.doc.id);
  });
  await sleep(2000);

  const a = await request("ana", "central-crossing", "rue-cuvier");
  await sleep(1000); // the car is now busy with A
  const b = await request("bob", "faculte", "nw-corner");
  const c = await request("cal", "cell-dynamics", "atrium-cafe");
  // Same passenger twice at once: exactly one is kept, and it must be the earlier one.
  const [d1, d2] = await Promise.all([request("dan", "west-path", "faculte"), request("dan", "west-path", "faculte")]);
  // Cancelled before the backend looks at it, or while queued: either way it never gets the car.
  const e = await request("eve", "quai-saint-bernard", "faculte");
  await e.update({ status: "cancelled", queuePosition: null }); // what the app sends

  const all = [a, b, c, d1, d2, e];
  for (let i = 0; i < 60; i++) {
    const docs = await Promise.all(all.map((ref) => ref.get()));
    if (docs.every((d) => ["completed", "failed", "cancelled"].includes(d.get("status")))) break;
    await sleep(1000);
  }
  const [A, B, C, D1, D2, E] = await Promise.all(all.map((ref) => ref.get()));

  assert.equal(E.get("status"), "cancelled");
  assert.equal(E.get("queuePosition") ?? null, null);
  const [kept, dropped] = D1.get("status") === "failed" ? [D2, D1] : [D1, D2];
  assert.equal(dropped.get("status"), "failed");
  assert.equal(dropped.get("failureReason"), "active_ride_exists");
  assert.equal(kept.get("status"), "completed");
  const older = D1.get("createdAt").toMillis() !== D2.get("createdAt").toMillis()
    ? (D1.get("createdAt").toMillis() < D2.get("createdAt").toMillis() ? D1 : D2)
    : (D1.id < D2.id ? D1 : D2);
  assert.equal(kept.id, older.id, "the earlier request must be the one kept");
  for (const done of [A, B, C]) assert.equal(done.get("status"), "completed", done.id);
  assert.equal(A.get("vehicleStopId"), "faculte", "recovered car must start from the crashed ride's destination");
  // A first; then from rue-cuvier: C (1 stop ahead), dan at west-path (1 ahead of atrium-cafe), B last.
  assert.deepEqual(assigned, [A.id, C.id, kept.id, B.id]);
  const car = await db.doc("vehicles/vazy-1").get();
  assert.deepEqual([car.get("status"), car.get("currentStopId")], ["idle", "nw-corner"]);
  console.log("smoke check passed");
} finally {
  backend.kill();
}
process.exit(0);
