# Implementation Plan: Signed-Out Onboarding

**Branch**: `010-signed-out-onboarding` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/010-signed-out-onboarding/spec.md`

## Summary

The passenger's Firebase Auth session becomes the single switch for what the app shows.

The root layout:
1. subscribes to `onAuthStateChanged`;
2. keeps the native splash screen up until the first answer arrives;
3. wraps the routes in two Expo Router `Stack.Protected` groups:
   - `map` is guarded by "signed in";
   - the splash page, the three onboarding pages, login and sign-up are guarded by "signed out".

When the session starts or ends, the guards redirect automatically and remove the now-forbidden pages from history. The manual `router.replace("/map")` calls after login and sign-up are deleted.

No new dependency, no stored "onboarding done" flag, and no new screen.

## Technical Context

**Language/Version**: TypeScript (strict), React 19.3, React Native 0.88.1

**Primary Dependencies**: Expo SDK 58, `expo-router` 58.0.31 (`Stack.Protected`, `redirectTo`), `firebase` 13.3 (`onAuthStateChanged`), `expo-splash-screen`

**Storage**: Firebase Auth's own session persistence (AsyncStorage on native, already configured in `src/lib/firebase.ts`). Nothing new is stored.

**Testing**: `npx tsc --noEmit`, `npx expo lint`, and the manual scenarios in [quickstart.md](./quickstart.md) on the Android dev build

**Target Platform**: Android (dev build, emulator "Medium Phone API 35"). Web is out of scope.

**Project Type**: Mobile app (`vazy-app/`)

**Performance Goals**: A signed-in passenger reaches an interactive map within 3 seconds of launch (SC-002). Restoring the session reads from local storage only.

**Constraints**:
- Launch must not depend on the network.
- No page may flash before the session is known (FR-005).

**Scale/Scope**: 1 file changed substantially (`src/app/_layout.tsx`) and 2 trimmed (`login.tsx`, `signup.tsx`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Safety boundaries | ✅ N/A | No vehicle or hardware path is touched. |
| II. Contracts at every boundary | ✅ | No new Firebase record, event, or MQTT message. The only boundary is the Auth SDK session, which is documented in [contracts/navigation.md](./contracts/navigation.md). |
| III. UI first, one slice at a time | ✅ | No new screens. This wires existing screens to the existing auth slice. Loading state is the splash screen; success state is the map or entry flow; failure state is "treated as signed out". |
| IV. Secure, minimal data access | ✅ with note | Route guards are client-side only, so they hide screens but don't protect data. That's acceptable because the map shows no private data yet. Ride data will be protected by Security Rules in its own slice. Nothing new is persisted. |
| V. Observable, testable, simple | ✅ | No new abstraction, context provider, or dependency. The guard is declarative config, with no branching logic to unit-test, and is verified by the quickstart scenarios. |

**Post-design re-check**: still passes. The design adds no persistence, contract or package.

## Project Structure

### Documentation (this feature)

```text
specs/010-signed-out-onboarding/
├── spec.md
├── plan.md              # this file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── navigation.md
├── checklists/
│   └── requirements.md
└── tasks.md             # $speckit-tasks (not created here)
```

### Source Code (repository root)

```text
vazy-app/src/
├── app/
│   ├── _layout.tsx      # CHANGED: auth listener + splash gate + two Stack.Protected groups
│   ├── login.tsx        # CHANGED: drop router.replace("/map"); the guard navigates
│   ├── signup.tsx       # CHANGED: drop router.replace("/map"); the guard navigates
│   ├── index.tsx, onboarding*.tsx, map.tsx   # unchanged
└── lib/
    └── firebase.ts      # unchanged (exports `auth` with persistence)
```

**Structure Decision**: Everything stays inside the existing `vazy-app/src/app` routes. No context or hook file is added, because the auth state is only needed by the root layout.

## Complexity Tracking

None. No constitution violations to justify.
