# Data Model: Signed-Out Onboarding

No new data is stored. The only state is the passenger session, which Firebase Auth already owns and persists on the device.

## Passenger session (in memory, in the root layout)

| Value of `user` | Meaning | What is shown |
|---|---|---|
| `undefined` | Session not checked yet (app just launched) | Native splash screen. Nothing is rendered. |
| `null` | Signed out | Entry flow: `index` → onboarding ×3 → `login` (or `signup`) |
| `User` | Signed in | `map` |

## Transitions

```text
undefined ──(listener: no saved session)──► null
undefined ──(listener: saved session)─────► User
null ──(login / sign-up succeeds)─────────► User   → guard moves to map, entry history removed
User ──(logout / account invalidated)─────► null   → guard redirects to login, map history removed
```

`undefined` is only the starting value; nothing returns to it.
