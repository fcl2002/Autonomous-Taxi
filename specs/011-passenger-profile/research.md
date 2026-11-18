# Research: Passenger Profile

## R1. Making sign-up "not lost" without a server step

- **Decision**: After `createUserWithEmailAndPassword`, call `setDoc(doc(db, "users", uid), { fullName, email })` without awaiting it. Report errors only by logging them.
- **Rationale**:
  - The Firestore SDK applies the write locally and queues it, then retries it until the server acknowledges it or rejects it permanently.
  - The auth guard from spec 010 unmounts the sign-up screen right away, so awaiting the write would show nothing useful anyway (FR-003, SC-005).
  - The memory cache is lost if the app is killed. R3 covers that case.
- **Alternatives considered**:
  - **A Cloud Functions `onCreate` auth trigger** writing the profile on the server: needs the Blaze plan.
  - **The backend creating the account with the Admin SDK**: passwords would pass through our server, and the backend isn't deployed yet.
  - **Rolling back with `user.delete()` on failure**: it needs the same network that just failed.

## R2. The write must be safe to repeat

- **Decision**: Use the auth uid as the document id, and write with a full `setDoc` (not `addDoc`, and not `merge`).
- **Rationale**:
  - The same id means one document per account (FR-002).
  - A full set replaces the document with exactly `{ fullName, email }`, so it can't leave extra fields that the rules would reject later.
  - The rules treat a repeat as an `update`, which the owner may do.

## R3. Detecting a missing profile without false prompts

- **Decision**:
  - In `_layout.tsx`, while `user` is set, subscribe to `onSnapshot(doc(db, "users", uid), { includeMetadataChanges: true }, …)`.
  - Treat the profile as **missing** only when `!snap.exists() && !snap.metadata.fromCache`, meaning the server confirmed it's absent.
  - When the snapshot `exists()` (including a pending local write), the profile is **present**.
  - Any other state is **unknown**: keep the current routing.
- **Rationale**:
  - Right after sign-up, the queued local write makes the snapshot exist immediately. The passenger isn't prompted while the write is still in flight (US2 #1).
  - When offline, snapshots are `fromCache`, so the app doesn't block (edge case "opened offline").
  - After an app kill, the first online snapshot is a server-confirmed "missing", so the prompt shows once (US2 #2, SC-003).
- **Alternatives considered**: a one-off `getDoc` at launch. It can't tell "offline" from "missing" as cleanly, and it misses the moment the connection comes back.

## R4. Routing to the name prompt

- **Decision**: Use a third `Stack.Protected` group, `guard={!!user && profile === "missing"}`, around `complete-profile`. The `map` group's guard becomes `!!user && profile !== "missing"`.
- **Rationale**:
  - It reuses the pattern from spec 010, with no manual navigation.
  - After the prompt's write, the snapshot exists, the guard flips, and the router moves to the map.
- **To verify in quickstart**: when `map` becomes unavailable because the profile is missing, the `map` group's `redirectTo="/login"` points to a route the signed-in user can't reach. Check that the router falls through to `complete-profile`. If it doesn't, drop `redirectTo` and do the logout → login navigation in the sign-out feature instead.

## R5. Rules tests on the free plan

- **Decision**:
  - Add `firebase-tools` and `@firebase/rules-unit-testing` as `backend/` devDependencies.
  - Add `npm run test:rules`, which runs `firebase emulators:exec --only firestore "node --test firestore.rules.test.ts"`.
- **Rationale**:
  - The emulator is free and local, and needs no deploy.
  - `node:test` is built in, so no test framework is added.
- **Prerequisite**: the Firestore emulator needs a JDK. Version 17 is installed, but recent `firebase-tools` releases require **JDK 21+**. Check this on the first run, and install Temurin 21 if the emulator refuses to start.

## R6. React Native transport

- **Decision**: Use the plain `getFirestore(app)`.
- **Rationale**: Since v10, the SDK auto-detects when it must fall back to long polling, which is the usual React Native issue.
- **Fallback**: if snapshots stall on the emulator, use `initializeFirestore(app, { experimentalForceLongPolling: true })`.
