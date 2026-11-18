# Tasks: Passenger Profile

**Input**: Design documents from `/specs/011-passenger-profile/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/users.md, quickstart.md

**Tests**: The spec requires rules tests (FR-010, SC-004). App behaviour is verified by the manual quickstart scenarios.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup

- [x] T001 Add devDependencies `firebase-tools` and `@firebase/rules-unit-testing` to backend/package.json (`npm install -D` in `backend/`), plus the script `"test:rules": "firebase emulators:exec --only firestore \"node --test firestore.rules.test.ts\""`
- [x] T002 [P] Create backend/firebase.json with `{ "firestore": { "rules": "firestore.rules" }, "emulators": { "firestore": { "port": 8080 }, "ui": { "enabled": false } } }`
- [x] T003 [P] Create backend/.firebaserc with `{ "projects": {} }`. The owner sets the default with `npx firebase use <project-id>`. Never copy the project id from `vazy-app/.env` into the repo yourself.

## Phase 2: Foundational

- [x] T004 Export `db = getFirestore(app)` from vazy-app/src/lib/firebase.ts (research R6)
- [x] T005 Create vazy-app/src/lib/profile.ts with `saveProfile(user: User, fullName: string)`. It calls `setDoc(doc(db, "users", user.uid), { fullName: fullName.trim(), email: user.email })`: a full set, no merge (research R2). Also export `profileRef(uid)`.

## Phase 3: User Story 3 – Profiles are private (P1)

**Goal**: Owner-only access with schema enforcement.
**Independent test**: `cd backend && npm run test:rules`.

- [x] T006 [US3] Write backend/firestore.rules for `match /users/{uid}`:
  - `allow get` if `request.auth.uid == uid`;
  - `allow create, update` if the owner and the body is valid: `keys().hasOnly(['fullName','email'])`, `hasAll`, `fullName is string`, "fullName == fullName.trim()", "length 1–100", `email == request.auth.token.email`;
  - no `list` or `delete`;
  - deny everything else by default.
- [x] T007 [US3] Write backend/firestore.rules.test.ts using `node:test` and `@firebase/rules-unit-testing`, covering every row of contracts/users.md:
  - allowed: owner get, create and update;
  - denied: other passenger get, create, update and delete; signed-out get and write; list; owner delete; extra field; missing field; empty name; untrimmed name; 101-character name; wrong email.
- [ ] T008 [US3] Run `npm run test:rules` in backend/. All cases pass. If the emulator refuses to start, install JDK 21 (research R5).

## Phase 4: User Story 1 – Sign-up creates the profile (P1)

**Goal**: Sign-up writes `users/{uid}`, and the name lives only there.
**Independent test**: quickstart scenario 1.

- [x] T009 [US1] In vazy-app/src/app/signup.tsx:
  - remove `updateProfile` and its `shortcut:` comment;
  - after `createUserWithEmailAndPassword`, call `saveProfile(user, name).catch(console.warn)` without awaiting it (FR-003, research R1);
  - update the comment to say the write is queued and recovered by `complete-profile`.

## Phase 5: User Story 2 – A dropped connection doesn't lose the profile (P1)

**Goal**: A missing profile is detected and recovered once.
**Independent test**: quickstart scenarios 2–9.

- [x] T010 [US2] Create vazy-app/src/app/complete-profile.tsx, a name prompt that reuses ThemedText, ThemedButton and the sign-up styles:
  - a "Full Name" field;
  - an error alert (empty name gives "Enter your full name.", and other errors go through `authErrorMessage`);
  - a busy button;
  - on submit, `await saveProfile(auth.currentUser!, name)`;
  - no manual navigation, because the guard moves the user on.
- [x] T011 [US2] In vazy-app/src/app/_layout.tsx:
  - add a `profile` state (`"unknown" | "present" | "missing"`);
  - while `user` is set, subscribe to `onSnapshot(profileRef(user.uid), { includeMetadataChanges: true })` with the mapping from research R3, and reset to `"unknown"` when signed out;
  - set the `map` guard to `!!user && profile !== "missing"`;
  - add a `Stack.Protected` with `guard={!!user && profile === "missing"}` around `complete-profile`.
- [x] T012 [US2] Map `permission-denied` → "Couldn't save your profile. Try again." in vazy-app/src/lib/auth.ts MESSAGES, so the prompt shows it (edge case: rules refusal).

## Phase 6: Polish

- [x] T013 [P] Update backend/README.md:
  - `users/{uid}` holds `fullName` and `email` (no phone);
  - tick the Firestore, rules and emulator items that are done;
  - mention `npm run test:rules` and the rules deploy.
- [x] T014 Run `npx tsc --noEmit` and `npx expo lint` in vazy-app/, `npm run typecheck` in backend/, then `graphify update .` at the repo root.
- [ ] T015 Owner: run `cd backend && npx firebase login && npx firebase use <project-id> && npx firebase deploy --only firestore:rules`, rebuild the dev app, and run the quickstart scenarios.

## Dependencies

- Setup (T001–T003) blocks US3. Foundational (T004–T005) blocks US1 and US2.
- US3 (rules) must be deployed before US1 and US2 can work against the real database, because production mode denies everything.
- US2 depends on US1's `saveProfile` usage (shared in T005), not on US1 itself.

## Parallel opportunities

- T002 and T003 run together; T004/T005 can run alongside T006/T007 (app vs backend).
- T013 can run any time after T008.

## Implementation strategy

The MVP is US3 + US1: the rules, plus sign-up writing the profile. US2 adds recovery. Deploy the rules (T015) before testing any app scenario on a device.
