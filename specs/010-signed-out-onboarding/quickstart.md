# Quickstart: Signed-Out Onboarding

## Prerequisites

- An Android dev build that includes AsyncStorage (`cd vazy-app && npx expo run:android`).
- `vazy-app/.env` with the Firebase config, and at least one account, created through sign-up or in the console.

## Static checks

```bash
cd vazy-app
npx tsc --noEmit
npx expo lint
```

## Scenarios (maps to spec)

| # | Steps | Expected | Spec |
|---|---|---|---|
| 1 | Clear the app data (Settings → Apps → Vazy → Storage → Clear), then open the app | splash → Request a ride → Track → Allow location → login | US2-1, SC-003 |
| 2 | From scenario 1, log in | map appears; Back exits the app instead of returning to login | US1-3, FR-003 |
| 3 | Fully close the app (swipe from recents) and reopen it, 10 times | opens on the map every time, with no onboarding or login flash | US1-1, US1-4, SC-001 |
| 4 | Turn on airplane mode, then reopen the app | still opens on the map | Edge: no connection |
| 5 | Clear the app data, go through the entry flow, and sign up a new account | map appears; Back doesn't return to sign-up | US1-2, FR-006 |
| 6 | Signed in: run `adb shell am start -a android.intent.action.VIEW -d "vazy://login"` | stays on, or lands on, the map | FR-003, SC-004 |
| 7 | Signed out (clear data): run `adb shell am start -a android.intent.action.VIEW -d "vazy://map"` | lands on the entry flow, not the map | FR-004, SC-004 |
| 8 | In the Firebase console, disable the account, then reopen the app later | moves to the entry flow once the session refresh fails (can take up to 1 hour, when the token expires) | Edge: invalid session |

Scenario US2-3 (logout → login) is verified once the sign-out feature exists; until then, scenario 1 covers the signed-out start.
