# Data Model: Onboarding Tracking Screen

This feature has no persisted or remote data model.

## Transient navigation state

| State | Route | Entered by | Exited by |
|---|---|---|---|
| First onboarding step | `/onboarding` | Existing splash flow or Back from step two | First CTA calls `router.navigate` |
| Tracking onboarding step | `/onboarding-tracking` | First page CTA or direct local route | Platform Back returns to step one |

Valid transition:

```text
/onboarding -> /onboarding-tracking -> Back -> /onboarding
```

Repeated activation must resolve to the same tracking route rather than add another tracking route
instance. No step, completion flag, user identifier, or timestamp is stored.

## Presentation values

The second route renders fixed local values:

- a non-empty provisional heading;
- non-empty provisional supporting copy;
- the bundled tracking illustration;
- three progress positions with the middle position active;
- non-empty provisional text in a visual-only lower CTA treatment.

Validation is structural: meaningful text is present, the required local asset resolves, and the
progress order is inactive-active-inactive. There are no loading, empty, success, or failure data
states because the route has no data dependency.
