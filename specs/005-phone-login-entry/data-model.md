# Data Model: Phone Login Entry Screen

This feature creates no persisted or remote data model. It does not create a user, credential,
verification code, consent record, location sample, or onboarding-completion flag.

## Transient navigation state

| State | Route | Entered by | Exited by |
|---|---|---|---|
| Final onboarding step | `/onboarding-location` | Existing onboarding flow or Back from login | Final CTA calls `router.navigate` |
| Phone login entry | `/login` | Final onboarding CTA | Platform Back returns to final onboarding |

Valid transition:

```text
/onboarding-location -> /login -> Back -> /onboarding-location
```

Repeated activation resolves to the same login route rather than adding another login instance.

## Phone Login Draft

| Field | Type | Initial value | Lifetime | Validation |
|---|---|---|---|---|
| `phoneNumber` | text | empty string | Current `/login` mount only | None in this UI-first feature |

The value changes only through the visible phone field. It is not normalized, submitted, logged,
stored, or restored. Leaving the mounted route discards it according to normal component lifetime.

## Presentation values

The route renders fixed local copy for Vazy identity, the Login heading, phone guidance, phone
placeholder, Send Code treatment, and sign-up prompt. There are no loading, success, empty,
verification, or failure data states because no remote operation occurs.
