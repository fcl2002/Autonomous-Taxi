# Contract: Passenger Profile `users/{uid}` (v1)

- **Producer**: the Vazy app: the sign-up screen and the `complete-profile` screen, both through `saveProfile` in `src/lib/profile.ts`.
- **Consumers**: the Vazy app (the root layout's profile listener); later, the backend and other screens that show the name.
- **Enforced by**: `backend/firestore.rules`.

## Document

- **Path**: `users/{uid}`, where `uid` is the Firebase Auth uid of the owning passenger.

```json
{ "fullName": "Ana Souza", "email": "ana@example.com" }
```

| Field | Required | Validation |
|---|---|---|
| `fullName` | yes | string; `fullName == fullName.trim()`; length 1–100 |
| `email` | yes | string; equals `request.auth.token.email` |

There are no other keys. No timestamps or schema version in v1: nothing consumes them. Adding either is a v2 change, and must update the rules and every producer together.

## Operations

| Operation | Who | Allowed |
|---|---|---|
| `get` | owner (`request.auth.uid == uid`) | yes |
| `get` | another passenger, or signed out | no |
| `list` (query the collection) | anyone | no |
| `create` / `update` | owner, with a valid body | yes |
| `create` / `update` | owner with an invalid body, another passenger, or signed out | no |
| `delete` | anyone, from a client | no |

## Idempotency and failure behaviour

- Writes are a full `setDoc` to the same id, so repeating one gives the same single document.
- **Producer validation**: the app trims the name and rejects an empty one before writing.
- **Offline**: the SDK queues the write and retries it while the app is running. If the app is killed first, the write is lost, and the consumer's "missing" detection triggers `complete-profile`.
- **Rejected by the rules**: the write fails with `permission-denied`. The sign-up path only logs it; `complete-profile` shows a generic error and lets the user retry.
