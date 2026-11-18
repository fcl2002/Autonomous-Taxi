// Ride orchestrator (docs/contracts/rides.md): validates requests, keeps the queue, assigns the one vehicle.
// Needs GOOGLE_APPLICATION_CREDENTIALS (service-account key) in backend/.env. Run: npm start
import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore, type DocumentSnapshot } from "firebase-admin/firestore";
import { ACTIVE, NEXT, pickNext, queuePositions, type QueuedRide, type Status } from "./dispatch.ts";
import { runMission } from "./simulator.ts";
import { STOP_IDS } from "./stops.ts";

initializeApp();
const db = getFirestore();
const rides = db.collection("rides");
const vehicle = db.doc("vehicles/vazy-1");
const SIMULATE = process.env.SIMULATE_VEHICLE === "1";

// shortcut: one backend process handles one change at a time; run a single instance, add a lease if it ever runs twice.
let chain: Promise<unknown> = Promise.resolve();
const serial = (job: () => Promise<unknown>) => {
  chain = chain.then(job).catch((error) => console.error("vazy-backend: job failed", error));
};

/** Applies a status change only if the contract allows it from the ride's current status. */
async function move(rideId: string, to: Status, extra: Record<string, unknown> = {}) {
  return db.runTransaction(async (tx) => {
    const ride = await tx.get(rides.doc(rideId));
    const from = ride.get("status") as Status | undefined;
    if (!from || !NEXT[from].includes(to)) {
      console.warn(`${rideId} ignored ${from}→${to}`);
      return false;
    }
    tx.update(ride.ref, { status: to, updatedAt: FieldValue.serverTimestamp(), ...extra });
    console.log(`${rideId} ${from}→${to}`);
    return true;
  });
}

async function validate(ride: DocumentSnapshot) {
  const { originStopId, destinationStopId, passengerUid } = ride.data()!;
  let failureReason: string | null = null;
  if (!STOP_IDS.has(originStopId) || !STOP_IDS.has(destinationStopId)) failureReason = "invalid_stops";
  else if (originStopId === destinationStopId) failureReason = "same_stop";
  else {
    const mine = await rides.where("passengerUid", "==", passengerUid).get();
    if (mine.docs.some((d) => d.id !== ride.id && ACTIVE.includes(d.get("status")))) failureReason = "active_ride_exists";
  }
  await move(ride.id, failureReason ? "failed" : "queued", failureReason ? { failureReason } : {});
}

const toQueued = (d: DocumentSnapshot): QueuedRide => ({
  id: d.id,
  originStopId: d.get("originStopId"),
  destinationStopId: d.get("destinationStopId"),
  createdAt: d.get("createdAt")?.toMillis() ?? Date.now(),
});

/** If the vehicle is idle, assigns the next ride; then rewrites everyone's place in line. */
async function dispatch() {
  const mission = await db.runTransaction(async (tx) => {
    const car = await tx.get(vehicle);
    if (car.get("status") !== "idle") return null;
    const queued = await tx.get(rides.where("status", "==", "queued"));
    const next = pickNext(queued.docs.map(toQueued), car.get("currentStopId"), Date.now());
    if (!next) return null;
    tx.update(rides.doc(next.id), { status: "assigned", queuePosition: null, updatedAt: FieldValue.serverTimestamp() });
    tx.update(vehicle, { status: "busy", rideId: next.id });
    console.log(`${next.id} queued→assigned`);
    return { rideId: next.id, originStopId: next.originStopId, destinationStopId: next.destinationStopId, carStopId: car.get("currentStopId") };
  });
  if (mission && SIMULATE) void runMission(mission, "assigned", report);

  const [car, queued] = await Promise.all([vehicle.get(), rides.where("status", "==", "queued").get()]);
  const positions = queuePositions(queued.docs.map(toQueued), car.get("currentStopId"), Date.now());
  const batch = db.batch();
  for (const d of queued.docs) {
    if (d.get("queuePosition") !== positions.get(d.id)) batch.update(d.ref, { queuePosition: positions.get(d.id) });
  }
  await batch.commit();
}

/** Vehicle events (from the simulator now, MQTT later). Completion frees the car and dispatches the next ride. */
function report(rideId: string, status: Status) {
  serial(async () => {
    if (!(await move(rideId, status))) return;
    if (status !== "completed") return;
    const ride = await rides.doc(rideId).get();
    await vehicle.update({ status: "idle", currentStopId: ride.get("destinationStopId"), rideId: null });
    await dispatch();
  });
}

/** Restart recovery: create the vehicle once, resume or release the ride it was on. */
async function recover() {
  const car = await vehicle.get();
  if (!car.exists) {
    await vehicle.set({ status: "idle", currentStopId: "nw-corner", rideId: null });
    return;
  }
  if (car.get("status") !== "busy") return;
  const ride = await rides.doc(car.get("rideId")).get();
  const status = ride.get("status") as Status | undefined;
  if (!status || !["assigned", "to_pickup", "at_pickup", "to_destination"].includes(status)) {
    await vehicle.update({ status: "idle", rideId: null });
  } else if (SIMULATE) {
    const mission = { rideId: ride.id, originStopId: ride.get("originStopId"), destinationStopId: ride.get("destinationStopId"), carStopId: car.get("currentStopId") };
    void runMission(mission, status, report);
  }
}

serial(recover);
rides.where("status", "in", ["requested", "queued"]).onSnapshot(
  (snap) =>
    serial(async () => {
      for (const change of snap.docChanges()) {
        if (change.type !== "removed" && change.doc.get("status") === "requested") await validate(change.doc);
      }
      await dispatch();
    }),
  (error) => {
    console.error("vazy-backend: listener failed", error);
    process.exit(1);
  },
);
console.log(`vazy-backend: ${STOP_IDS.size} stops, vehicle simulator ${SIMULATE ? "on" : "off"}`);
