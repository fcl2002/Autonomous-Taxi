# Navigation Contract: Signed-Out Onboarding (v1)

This is the contract between the Firebase Auth session (producer: `onAuthStateChanged` on `auth` from `src/lib/firebase.ts`) and the root navigator (consumer: `src/app/_layout.tsx`).

## Route access

| Route | Reachable when | When not reachable, the user goes to |
|---|---|---|
| `/` (`index`, splash) | signed out | `/map` (first available screen) |
| `/onboarding` | signed out | `/map` |
| `/onboarding-tracking` | signed out | `/map` |
| `/onboarding-location` | signed out | `/map` |
| `/login` | signed out | `/map` |
| `/signup` | signed out | `/map` |
| `/map` | signed in | `/login` (`redirectTo`) |

## Guarantees

1. No route renders until the first auth state is known. The native splash stays up until then.
2. When the session changes, the pages that become unreachable are removed from Back history.
3. Screens never navigate after an auth call. The guards are the only thing that moves the user between the entry flow and the map.
4. Inside the entry flow, screen-to-screen navigation is unchanged: `index` → `onboarding` → `onboarding-tracking` → `onboarding-location` → `login` ⇄ `signup`.

## Failure behaviour

- If the session can't be restored (corrupt storage, or an invalidated account), the user is treated as signed out.
- With no network at launch, a saved session is still honoured.
