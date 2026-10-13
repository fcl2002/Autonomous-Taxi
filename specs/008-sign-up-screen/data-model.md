# Data Model: Sign Up Screen

## Sign-Up Draft

A transient page-local value group used only to display the current form entries.

| Field | Type | Required for UI | Validation in this feature | Persistence |
|---|---|---:|---|---|
| Full name | Text | Yes | None | None |
| Email | Text | Yes | None | None |
| Phone number | Text | Yes | None | None |

## Lifecycle

1. All three values begin empty when the sign-up page mounts.
2. Editing a field updates only its corresponding page-local value.
3. Activating the primary signup action causes no state transition.
4. Leaving the page discards the draft.

No state crosses Firebase, backend, MQTT, vehicle, logging, or persistent-storage boundaries.
