# Quickstart: Passenger Profile

## Prerequisites

- **Firestore database created** by the owner:
  - Native mode
  - location `europe-west9` (Paris)
  - production mode, so everything is denied until the rules are deployed
- Firebase CLI logged in: `cd backend && npx firebase login && npx firebase use <project-id>`.
- JDK 21+ on the PATH for the emulator (see research R5).
- Android dev build, rebuilt with `npx expo run:android`.

## Static and rules checks

```bash
cd backend && npm run test:rules     # every allowed/denied case in US3 passes
cd ../vazy-app && npx tsc --noEmit && npx expo lint
```

## Deploy rules

```bash
cd backend && npx firebase deploy --only firestore:rules
```

## Scenarios

| # | Steps | Expected | Spec |
|---|---|---|---|
| 1 | Sign up with name "  Ana Souza  " | The map appears. In the console, `users/{uid}` = `{ fullName: "Ana Souza", email }` within 5 s | US1-1, US1-2, SC-001 |
| 2 | Sign up, and turn on airplane mode as soon as you tap "Sign Up" (the account must be created first; repeat until it is). Keep the app open, then turn airplane mode off | The map appears. The profile shows up in the console after reconnecting, and no name prompt appears | US2-1, SC-002 |
| 3 | Like #2, but kill the app while offline. Turn airplane mode off and reopen the app | The name prompt appears once. Submitting it saves the profile and shows the map | US2-2, SC-003 |
| 4 | From #3, close and reopen the app | Straight to the map, with no prompt | US2-3 |
| 5 | On the prompt, submit an empty name | "Enter your full name." Nothing is written | US2-4 |
| 6 | On the prompt, turn on airplane mode and submit | The map is shown; the profile appears in the console after reconnecting with the app open | Edge: no connection |
| 7 | Log in with an account created before this feature | The name prompt appears once | Edge: older accounts |
| 8 | Open the app offline as a signed-in user | The map is shown, with no prompt | Edge: opened offline |
| 9 | Verify R4: in #3, the router lands on `complete-profile`, not on a redirect loop toward `/login` | The prompt is shown | R4 |
