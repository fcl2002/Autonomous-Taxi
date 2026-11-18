# Vazy backend (to be built)

Nothing here is implemented yet. This is the build list for Firebase, the backend service and the MQTT link to the vehicle, based on the app as of 2026-11-16 (branch `vazy-ui`).

Before you design anything, read [`.specify/memory/constitution.md`](../.specify/memory/constitution.md). It is binding. The rules that matter most here:

- The app and Firebase never command hardware. Commands go backend → MQTT → Raspberry Pi → STM32.
- Every boundary has a versioned contract before integration.
- Build one flow end to end at a time.
- Security Rules follow least privilege.
- One correlation id is shared across Firebase, the backend, MQTT and device logs.

## Layout

Node 22.18+ runs the TypeScript directly (type stripping), the same way the app's checks run. There is no build step.

```
backend/
  package.json             npm start / check / typecheck / test:rules
  firebase.json            Firestore rules + emulator config
  firestore.rules          client access (users, rides; vehicles denied)
  firestore.rules.test.ts  allowed/denied cases, run in the emulator
  src/
    index.ts               ride orchestrator: validate, queue, assign, restart recovery
    dispatch.ts            pure rules: pickNext, queuePositions, NEXT transitions
    dispatch.check.ts      assert check for dispatch.ts
    simulator.ts           fake vehicle (SIMULATE_VEHICLE=1); MQTT adapter replaces it
    stops.ts               stop ids, imported from vazy-app/src/constants/stops.ts (single source)
```

Contracts: [`users`](../specs/011-passenger-profile/contracts/users.md), [`rides`](../docs/contracts/rides.md). Sequence: [`docs/sequence_diagram.md`](../docs/sequence_diagram.md).

Still to add: `src/mqtt.ts` (publish missions, consume Pi events) and a standalone Pi simulator, when the vehicle link starts.

## Run

1. Firebase console → Project settings → Service accounts → **Generate new private key**. Save it as `backend/service-account.json`. It's gitignored; never commit or share it.
2. Create `backend/.env`:
   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   SIMULATE_VEHICLE=1
   ```
3. Run:
   ```bash
   cd backend
   npm install
   npm run check        # dispatch rule
   npm run test:rules   # needs JDK 21+ on JAVA_HOME
   npx firebase deploy --only firestore:rules   # after any change to the rules
   npm start            # "vazy-backend: 9 stops, vehicle simulator on"
   ```

Keep exactly one `npm start` running: the backend assumes it is the only dispatcher.

## Where the app stands

- **Auth screens are visual only.** `login.tsx` has a phone field and a "Send Code" button that does nothing. `signup.tsx` asks for full name, email and phone, then goes straight to `/map`.
- **The map screen works offline.** The user location is fixed at Place Jussieu. The origin is the stop nearest to it. The user taps a destination stop, and "Confirm destination" only draws the trip locally.
- **Stops are a fixed one-way loop of 9 stops**, defined in [`vazy-app/src/constants/stops.ts`](../vazy-app/src/constants/stops.ts), which is the source of truth.
  - **Store and send the stop `id`** (for example `faculte` or `rue-cuvier`). Never use the list index or the name.
  - Ids are never renamed or reused.
  - The travel order is the array order, and the last stop wraps back to the first.
- **No Firebase packages are installed and there is no Firebase config.**

## Build list

### 0. Contracts (`v1`), before any code

- [ ] **Ride record**: fields, types, units, timestamps, and which side writes each field.
- [ ] **Ride state machine**: states, allowed transitions, who may perform each one, and the terminal states. A starting proposal is below.
- [ ] **MQTT topics and payloads**: the mission command (backend → Pi), mission events (Pi → backend), and vehicle presence/heartbeat.
- [ ] **Failure behaviour**: no vehicle available, vehicle offline, no acknowledgement within N seconds, duplicate messages, backend restart mid-ride, and cancellation.
- [ ] **Stop table shared by app, backend and Pi**: one source (`stops.ts`) exported to something the backend and Pi can read, such as a generated `stops.json`. Each consumer validates stop ids against it.

Proposed ride states (to validate with the owner):

```
requested ──► rejected                       (invalid / no vehicle)
    │
    ▼
assigned ──► to_pickup ──► at_pickup ──► to_destination ──► completed
    │            │             │               │
    └────────────┴─────────────┴───────────────┴──► cancelled | failed
```

### 1. Firebase project

- [x] Create the Firebase project (Spark plan) and its Firestore database in `europe-west9` (Paris).
- [x] Client SDK: the Firebase JS SDK (works with Expo SDK 58, no native config files).
- [x] Firestore emulator for rules tests: `npm run test:rules` (needs JDK 21+). Deploy rules with `npx firebase deploy --only firestore:rules`.
- [ ] Keep only client-safe config in the app. Service accounts and broker credentials never go there.

### 2. Authentication

- [x] Email and password login and sign-up (phone OTP dropped: SMS needs the Blaze plan).
- [x] **Sign-up** creates `users/{uid}` with `fullName` and `email` (spec 011). A missing profile is recovered by the `complete-profile` screen.
- [x] Sign-out: map menu → "Log out?" → `signOut`; the route guard lands on login.

### 3. Firestore data model

- [x] `users/{uid}`: the profile from sign-up ([contract v1](../specs/011-passenger-profile/contracts/users.md)).
- [x] `rides/{rideId}` ([contract v1](../docs/contracts/rides.md)), originally planned as:
  - `schemaVersion`
  - `passengerUid`
  - `originStopId`
  - `destinationStopId`
  - `status`
  - `vehicleId`
  - `createdAt` and `updatedAt` (server timestamps)
  - `failureReason`
  - The correlation id is the `rideId`, unless the contract says otherwise.
- [x] `vehicles/vazy-1`: `status`, `currentStopId` and `rideId`, written by the backend only. `online`/`lastSeenAt` come with MQTT presence.
- [ ] Retention: a TTL policy or cleanup job so demo rides can be removed without manual database surgery.

### 4. Security Rules (test allowed and denied cases in the emulator)

- [x] A passenger may **create** a ride only when all of the following hold:
  - `passengerUid == auth.uid`
  - `status == "requested"`
  - both stop ids are in the known set
  - `originStopId != destinationStopId`
  - there are no extra fields
- [x] A passenger may **read** only their own rides and their own `users/{uid}`.
- [x] A passenger may **not** change any backend-owned field. Cancelling is the single permitted change: `queued → cancelled`.
- [x] Only the backend (Admin SDK) writes the status after `requested`, and only it writes `vehicles/*`.

### 5. Backend service (ride orchestrator)

- [x] **Runs on the owner's laptop for now** (`npm start`, see Run below). A long-running Node service with the Admin SDK fits better than plain Cloud Functions, because it has to stay subscribed to MQTT for vehicle events. Functions can handle the Firestore triggers, but something persistent still has to hold the MQTT subscription.
- [x] Listen for new `requested` rides and validate them:
  - the stop ids are valid
  - the origin differs from the destination
  - the passenger has no other active ride
  - a vehicle is available

  Every valid request is accepted into the queue (`queued`); invalid ones become `failed` with a `failureReason`. When the vehicle is free, the next ride is chosen by `pickNext` (nearest pickup ahead on the loop, unless someone waited over 10 min) and set to `assigned`.
- [ ] Publish the mission to MQTT with `rideId`, `originStopId`, `destinationStopId` and `schemaVersion`.
- [ ] Consume the Pi's events, check each one is an allowed transition, and update the ride status.
- [ ] **Idempotency**: deduplicate by `rideId` plus event sequence or id, and ignore stale or out-of-order transitions.
- [ ] **Timeouts**: if there is no acknowledgement or heartbeat from the vehicle, mark the ride `failed` and free the vehicle.
- [x] **Restart recovery**: on startup, reload the non-terminal rides and reconcile them with the vehicle state.
- [ ] Write structured logs that include the correlation id and never contain secrets or personal data.

### 6. MQTT

- [ ] Run a broker (for example Mosquitto) with authentication and TLS, plus per-client ACLs: the backend publishes commands and the Pi publishes events.
- [ ] Topics, versioned. These are a proposal:
  - `vazy/v1/vehicles/{vehicleId}/missions` (backend → Pi)
  - `vazy/v1/vehicles/{vehicleId}/events` (Pi → backend)
  - `vazy/v1/vehicles/{vehicleId}/presence`, carrying an LWT `offline` message
- [ ] Use QoS 1 with a deduplication key in every payload, and validate payloads on both ends.
- [ ] **Vehicle simulator**: a small script that plays the Pi's role, so the whole flow can be demonstrated before any hardware is involved.

### 7. Checks (the smallest set that catches regressions)

- [x] Rules tests against the emulator, covering the allowed and denied cases above (`npm run test:rules`).
- [x] A unit check of the dispatch rule and the transition table (`npm run check`).
- [ ] Payload validation checks for the ride record and the MQTT messages.
- [ ] An end-to-end demo with the simulator:
  - the happy path
  - invalid stop ids
  - a duplicate message
  - the vehicle going offline
  - a backend restart

## Frontend work that depends on this (for reference)

- Firebase init and the auth wiring on `login.tsx` and `signup.tsx`.
- [x] "Request ride" creates `rides/{rideId}` from the chosen pickup and destination stops, then shows the ride status (place in line, vehicle progress, cancel while queued) from a Firestore listener.
- Not backend work: GPS for the origin and an ETA. An ETA needs the vehicle's speed, which the backend or the Pi could provide later.

## Open questions for the owner

Answered 2026-11-18: one vehicle, one passenger at a time; cancel only while `queued`; backend on the owner's laptop; email and password auth.

1. Where will the MQTT broker run during demos: laptop, cloud, or the Pi?
