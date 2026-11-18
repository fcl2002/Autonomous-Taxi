# Research: Signed-Out Onboarding

## R1. How routes are gated by session

- **Decision**: Use Expo Router `Stack.Protected` in `src/app/_layout.tsx`:
  - `guard={!!user}` around `map`;
  - `guard={!user}` around `index`, `onboarding`, `onboarding-tracking`, `onboarding-location`, `login` and `signup`.
- **Rationale**:
  - It's built into the installed `expo-router` 58.0.31.
  - It redirects automatically when a guard turns false.
  - It removes a forbidden screen's history entries, which covers FR-003 and SC-004 (no Back into onboarding).
  - When the protected `index` is unavailable, the router falls back to the first available screen, which is `map` for a signed-in user.
- **Alternatives considered**:
  - A `<Redirect>` in `index.tsx`: it only guards the first page, not Back or deep links.
  - Manual `router.replace` on every auth change: it duplicates what `Stack.Protected` does and leaves history behind.
- **Source**: https://docs.expo.dev/router/advanced/protected/, and `node_modules/expo-router/build/views/Protected.d.ts` (`guard`, `redirectTo`).

## R2. Knowing the session at launch without flashing a screen

- **Decision**:
  - Track `user` as `undefined`, meaning "still checking", until the first `onAuthStateChanged` callback arrives.
  - The root layout renders nothing while `user === undefined` or fonts are loading, so the native splash stays up through the existing `SplashScreen.preventAutoHideAsync()`.
  - Hide the splash once both are ready.
- **Rationale**: Firebase restores the persisted session from AsyncStorage and then calls the listener once. That works offline, so the edge case "no connection at launch while signed in" opens on the map (FR-005).
- **Alternatives considered**: a JS loading spinner, which adds a visible screen the spec doesn't need.

## R3. Navigation after login and sign-up

- **Decision**: Delete `router.replace("/map")` from `login.tsx` and `signup.tsx`.
- **Rationale**:
  - The auth listener flips `user`, and the signed-out group's guard turns false.
  - The router then leaves login or sign-up for the first available screen (`map`) and removes their history (FR-006).
  - Keeping the manual replace could race the guard: it could run before re-render, while `map` is still guarded, and bounce through the anchor.
- **Consequence**: In sign-up, the screen may unmount while `updateProfile` is still running, so a failure there wouldn't be shown. This is already tracked as the separate "sign-up partial-failure recovery" item (spec Assumptions).

## R4. Logout and invalidation

- **Decision**: Nothing to build here.
  - A future `signOut(auth)` fires the listener with `null`. The `map` guard turns false and redirects to `/login` via `redirectTo` (US2 #3, owner decision).
  - A disabled or deleted account fails its next token refresh, Firebase signs it out, and the same path follows.
- **Verification until sign-out exists**: clear the app data, as noted in the spec Assumptions.
