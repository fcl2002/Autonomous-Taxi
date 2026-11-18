// Allowed/denied cases from specs/011-passenger-profile/contracts/users.md and docs/contracts/rides.md. Run: npm run test:rules
import { readFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { strict as assert } from "node:assert";
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where,
} from "firebase/firestore";
import { STOP_DEFS } from "../vazy-app/src/constants/stops.ts";

const rules = readFileSync("firestore.rules", "utf8");
const env = await initializeTestEnvironment({ projectId: "demo-vazy", firestore: { rules } });

const ana = () => env.authenticatedContext("ana", { email: "ana@example.com" }).firestore();
const bob = () => env.authenticatedContext("bob", { email: "bob@example.com" }).firestore();
const anon = () => env.unauthenticatedContext().firestore();
const valid = { fullName: "Ana Souza", email: "ana@example.com" };

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled((ctx) => setDoc(doc(ctx.firestore(), "users/ana"), valid));
});
after(() => env.cleanup());

test("owner can get, create and update", async () => {
  await assertSucceeds(getDoc(doc(ana(), "users/ana")));
  await env.clearFirestore();
  await assertSucceeds(setDoc(doc(ana(), "users/ana"), valid));
  await assertSucceeds(setDoc(doc(ana(), "users/ana"), { ...valid, fullName: "Ana S." }));
});

test("other passenger and signed-out visitor are denied", async () => {
  await assertFails(getDoc(doc(bob(), "users/ana")));
  await assertFails(setDoc(doc(bob(), "users/ana"), { ...valid, email: "bob@example.com" }));
  await assertFails(deleteDoc(doc(bob(), "users/ana")));
  await assertFails(getDoc(doc(anon(), "users/ana")));
  await assertFails(setDoc(doc(anon(), "users/ana"), valid));
});

test("nobody can list profiles or delete their own", async () => {
  await assertFails(getDocs(collection(ana(), "users")));
  await assertFails(deleteDoc(doc(ana(), "users/ana")));
});

test("invalid bodies are denied", async () => {
  const bad = [
    { ...valid, phone: "123" },
    { fullName: "Ana Souza" },
    { ...valid, fullName: "" },
    { ...valid, fullName: " Ana " },
    { ...valid, fullName: "a".repeat(101) },
    { ...valid, fullName: 42 },
    { ...valid, email: "other@example.com" },
  ];
  for (const body of bad) await assertFails(setDoc(doc(ana(), "users/ana"), body));
  await assertSucceeds(setDoc(doc(ana(), "users/ana"), { ...valid, fullName: "a".repeat(100) }));
});

// --- rides (docs/contracts/rides.md) ---

const request = (uid = "ana") => ({
  schemaVersion: 1,
  passengerUid: uid,
  originStopId: "nw-corner",
  destinationStopId: "faculte",
  status: "requested",
  createdAt: serverTimestamp(),
});
// Seeds a ride as the backend would, bypassing the rules.
const seedRide = (status: string, uid = "ana") =>
  env.withSecurityRulesDisabled((ctx) =>
    setDoc(doc(ctx.firestore(), "rides/r1"), { ...request(uid), status, queuePosition: 1 }));

test("rules stop ids match STOP_DEFS", () => {
  const ids = rules.match(/function stopIds\(\) \{\s*return \[([^\]]*)\]/)![1].match(/'[^']+'/g)!.map((q) => q.slice(1, -1));
  assert.deepEqual(ids, STOP_DEFS.map((s) => s.id));
});

test("passenger can create a valid ride request", async () => {
  await assertSucceeds(addDoc(collection(ana(), "rides"), request()));
});

test("invalid ride requests are denied", async () => {
  const bad = [
    { ...request(), passengerUid: "bob" },
    { ...request(), status: "queued" },
    { ...request(), originStopId: "nowhere" },
    { ...request(), destinationStopId: "nw-corner" },
    { ...request(), schemaVersion: 2 },
    { ...request(), queuePosition: 1 },
    { ...request(), createdAt: new Date(0) },
  ];
  for (const body of bad) await assertFails(addDoc(collection(ana(), "rides"), body));
  await assertFails(addDoc(collection(anon(), "rides"), request()));
});

test("only the passenger reads their rides, and only with their own filter", async () => {
  await seedRide("queued");
  await assertSucceeds(getDoc(doc(ana(), "rides/r1")));
  await assertSucceeds(getDocs(query(collection(ana(), "rides"), where("passengerUid", "==", "ana"))));
  await assertFails(getDoc(doc(bob(), "rides/r1")));
  await assertFails(getDocs(collection(ana(), "rides")));
  await assertFails(getDoc(doc(anon(), "rides/r1")));
});

test("passenger can cancel while requested", async () => {
  await seedRide("requested");
  await assertSucceeds(updateDoc(doc(ana(), "rides/r1"), { status: "cancelled" }));
});

test("passenger can cancel only while queued, and change nothing else", async () => {
  await seedRide("queued");
  await assertFails(updateDoc(doc(bob(), "rides/r1"), { status: "cancelled" }));
  await assertFails(updateDoc(doc(ana(), "rides/r1"), { status: "cancelled", queuePosition: null }));
  await assertFails(updateDoc(doc(ana(), "rides/r1"), { status: "completed" }));
  await assertSucceeds(updateDoc(doc(ana(), "rides/r1"), { status: "cancelled" }));
  await seedRide("assigned");
  await assertFails(updateDoc(doc(ana(), "rides/r1"), { status: "cancelled" }));
  await assertFails(deleteDoc(doc(ana(), "rides/r1")));
});

test("clients have no access to vehicles", async () => {
  await assertFails(getDoc(doc(ana(), "vehicles/vazy-1")));
  await assertFails(setDoc(doc(ana(), "vehicles/vazy-1"), { status: "idle" }));
});
