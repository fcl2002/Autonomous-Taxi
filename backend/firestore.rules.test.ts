// Allowed/denied cases from specs/011-passenger-profile/contracts/users.md. Run: npm run test:rules
import { readFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const env = await initializeTestEnvironment({
  projectId: "demo-vazy",
  firestore: { rules: readFileSync("firestore.rules", "utf8") },
});

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
