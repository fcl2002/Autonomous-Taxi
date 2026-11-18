# Data Model: Passenger Profile

## `users/{uid}` (Firestore, `europe-west9`)

| Field | Type | Rules |
|---|---|---|
| *(document id)* | string | Equals the Firebase Auth `uid` of the owner |
| `fullName` | string | Required. Trimmed (no leading or trailing spaces), 1–100 characters |
| `email` | string | Required. Equals the owner's `request.auth.token.email` |

No other fields are allowed. The full contract is in [contracts/users.md](./contracts/users.md).

## Profile state in the root layout (in memory)

| `profile` | Meaning | Route shown to a signed-in user |
|---|---|---|
| `"unknown"` | No server answer yet, or offline | `map` |
| `"present"` | The document exists, including a pending local write | `map` |
| `"missing"` | The server confirmed there's no document | `complete-profile` |

## Transitions

```text
sign-up ─► account created ─► local setDoc (pending) ─► "present" ─► (server ack, no change)
launch, signed in ─► "unknown" ─► server says absent ─► "missing" ─► name submitted ─► "present"
launch, signed in, offline ─► "unknown" (stays on map until online)
sign-out ─► listener removed, state reset to "unknown"
```
