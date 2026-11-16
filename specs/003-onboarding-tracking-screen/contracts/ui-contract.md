# UI Contract: Onboarding Tracking Screen

## Route contract

| Route | Responsibility | Network/data |
|---|---|---|
| `/onboarding` | Existing first introduction; exposes one actionable lower CTA | None |
| `/onboarding-tracking` | Second introduction matching Figma node `5:387` | None |

The existing root Expo Router `Stack` owns navigation history. No Firebase, backend, MQTT, or
vehicle contract changes.

## Forward transition

- Trigger: activate the first page's complete lower CTA target.
- Native action: `router.navigate("/onboarding-tracking")`.
- Accessibility: role `button`; label `Continue to tracking introduction`.
- Postcondition: exactly one tracking page is current, including after rapid repeated activation.
- Availability: works without a network connection.

## Back transition

- Trigger: the platform Back action while `/onboarding-tracking` is current.
- Postcondition: `/onboarding` becomes current after one Back action.
- Invariant: neither route is duplicated.

## Tracking-page rendering contract

Visual order:

1. heading;
2. supporting copy;
3. supplied tracking illustration;
4. three-position progress indicator with inactive-active-inactive positions;
5. rounded lower CTA treatment with provisional text.

The route must respect top and bottom safe areas on supported portrait phones. Text may reflow for
device size and text scaling without overlapping or hiding meaningful content.

## Accessibility contract

- Heading uses header semantics.
- Heading, supporting copy, and lower CTA text remain readable in visual order.
- The tracking illustration and progress shapes are decorative and hidden from assistive
  technology.
- The lower CTA on the tracking page has no press handler, button role, accessibility action, or
  destination in this feature.

## Failure behavior

Because all values and artwork are bundled locally, network unavailability does not create a
loading, empty, or error state. A missing local asset or unresolved route is a build-time/export
failure and must block handoff.
