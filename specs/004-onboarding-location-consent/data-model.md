# Data Model: Onboarding Location Consent Screen

This feature has no persisted or remote data model. It does not create a consent record, permission
record, location sample, user preference, or onboarding-completion flag.

## Transient navigation state

| State | Route | Entered by | Exited by |
|---|---|---|---|
| Tracking onboarding step | `/onboarding-tracking` | Existing onboarding flow or Back from the final step | Tracking CTA calls `router.navigate` |
| Location introduction step | `/onboarding-location` | Tracking page CTA | Platform Back returns to tracking |

Valid transition:

```text
/onboarding-tracking -> /onboarding-location -> Back -> /onboarding-tracking
```

Repeated activation must resolve to the same final route rather than add another final route
instance. No state is stored when the visual-only final CTA is displayed.

## Presentation values

The final route renders fixed local values:

- five supplied decorative illustration layers;
- non-empty provisional privacy reassurance;
- non-empty provisional location-related text in a visual-only lower treatment.

Validation is structural: text is present, every required local asset resolves, and the layer order
matches the referenced design. There are no loading, empty, success, denial, or failure data states
because the route does not request permission or load data.
