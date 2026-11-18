# Implementation Plan: Passenger Profile

**Branch**: `011-passenger-profile` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/011-passenger-profile/spec.md`

## Summary

Each passenger gets one Firestore document, `users/{uid}`, holding `{ fullName, email }`. The database lives in `europe-west9` (Paris).

- **Sign-up**: create the account, then `setDoc` the profile. The app doesn't await the write: the Firestore SDK keeps retrying it while the app is open, and the auth guards from spec 010 move the user to the map straight away. `updateProfile(displayName)` is removed.
- **Recovery**: the root layout listens to the signed-in user's profile document. When the server confirms it doesn't exist, the user is routed to a new `complete-profile` screen, which asks for the name once and writes the same document.
- **Access**: Security Rules allow only the owner to `get`, `create` and `update` their document, with exactly the two fields, a trimmed name of 1–100 characters, and `email == request.auth.token.email`. No `list` and no `delete`. The rules are tested in the Firestore emulator.

## Technical Context

**Language/Version**: TypeScript (strict). App: React 19.3, React Native 0.88.1. Backend tooling: Node ≥ 22.18, which runs `.ts` natively.

**Primary Dependencies**:
- App: `firebase` 13.3 (`firebase/firestore` is already installed through it), Expo Router 58 (`Stack.Protected`).
- `backend/` dev only: `firebase-tools` (CLI and emulator) and `@firebase/rules-unit-testing`.

**Storage**: Cloud Firestore (Native mode), location `europe-west9`, Spark plan. The SDK's default memory cache holds pending writes and retries them.

**Testing**:
- Rules: `node --test` with `@firebase/rules-unit-testing`, run inside `firebase emulators:exec --only firestore`.
- App: `tsc`, lint, and the manual scenarios in [quickstart.md](./quickstart.md).

**Target Platform**: Android dev build. Web is out of scope.

**Project Type**: Mobile app (`vazy-app/`) plus Firebase config and rules tests (`backend/`)

**Performance Goals**: Sign-up reaches the map no more than 1 s slower than today (SC-005). The profile write is never awaited on that path.

**Constraints**:
- Free (Spark) plan, so no Cloud Functions triggers.
- The database location is permanent.
- No service credentials in the app.

**Scale/Scope**:
- 1 collection.
- 1 new screen (`complete-profile`), about 1 new lib file (`profile.ts`), and edits to `firebase.ts`, `_layout.tsx` and `signup.tsx`.
- In `backend/`: 1 rules file and 1 rules test.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Safety boundaries | ✅ N/A | No vehicle path is involved. |
| II. Contracts at every boundary | ✅ | [contracts/users.md](./contracts/users.md) v1 covers fields, id, validation, idempotency (same doc id, full `setDoc`) and failure behaviour. No timestamps: nothing reads them (see Complexity Tracking). The rules are the consumer-side validation; the app validates before writing. |
| III. UI first, one slice | ✅ | One new screen with loading (button busy), failure (inline error) and success (guard moves on) states. It reuses the sign-up screen's components and styles. Firebase is wired for this one flow only. |
| IV. Secure, minimal data | ✅ | Least-privilege rules: owner-only `get`, `create` and `update`; no `list` or `delete`; schema enforced. Only the name and email are stored, and only the client-safe config is used. |
| V. Observable, testable, simple | ✅ | The rules, a boundary adapter, get an automated allowed/denied check. There's no ride or mission, so no correlation id. No new app dependency. |

**Post-design re-check**: still passes.

## Project Structure

### Documentation (this feature)

```text
specs/011-passenger-profile/
├── spec.md
├── plan.md              # this file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── users.md
├── checklists/
│   └── requirements.md
└── tasks.md             # $speckit-tasks
```

### Source Code (repository root)

```text
vazy-app/src/
├── lib/
│   ├── firebase.ts          # CHANGED: export `db = getFirestore(app)`
│   └── profile.ts           # NEW: saveProfile(user, fullName) → setDoc(users/{uid}, { fullName, email })
└── app/
    ├── _layout.tsx          # CHANGED: profile listener; `complete-profile` guard
    ├── signup.tsx           # CHANGED: drop updateProfile; fire-and-forget saveProfile
    └── complete-profile.tsx # NEW: name prompt, reusing sign-up styles and components

backend/
├── firebase.json            # NEW: firestore rules path + firestore emulator
├── .firebaserc              # NEW: default project (owner runs `firebase use`)
├── firestore.rules          # NEW: owner-only users/{uid}
├── firestore.rules.test.ts  # NEW: allowed/denied cases (node --test)
├── package.json             # CHANGED: devDeps firebase-tools, @firebase/rules-unit-testing; script test:rules
└── README.md                # CHANGED: users/{uid} without phone; tick done items
```

**Structure Decision**: The rules and their test live in `backend/`, as [backend/README.md](../../backend/README.md) already planned (`firebase init firestore emulators` in `backend/`). The app keeps its existing `src/lib` and `src/app` layout. There's no context or hook file, because only the root layout needs the profile state.

## Complexity Tracking

| Choice | Why | Simpler option rejected because |
|---|---|---|
| No `createdAt` or `schemaVersion` on the profile | Nothing reads them. The rules' `hasOnly` would have to allow them too. | Adding them is easy later through a contract v2, and it isn't needed now. |
| A recovery screen instead of a stored "pending name" | It handles accounts that existed before this feature, and app kills, the same way. | Storing the name in AsyncStorage misses accounts from before this feature and adds a second source of truth. |
