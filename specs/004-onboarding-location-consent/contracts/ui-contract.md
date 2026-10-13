# UI Contract: Onboarding Location Consent Screen

## Route contract

| Route | Responsibility | Network/data |
|---|---|---|
| `/onboarding-tracking` | Existing second introduction; exposes one actionable lower CTA | None |
| `/onboarding-location` | Final privacy/location introduction matching Figma node `5:2` | None |

The existing root navigation stack owns route history. No permission, LGPD-consent, Firebase,
backend, MQTT, or vehicle contract changes.

## Forward transition

- Trigger: activate the tracking page's complete lower CTA target.
- Navigation target: `/onboarding-location`.
- Accessibility: role `button`; label states that it continues to the location privacy
  introduction.
- Postcondition: exactly one final page is current, including after rapid repeated activation.
- Availability: works without a network connection.

## Back transition

- Trigger: the platform Back action after `/onboarding-location` was opened from
  `/onboarding-tracking`.
- Postcondition: `/onboarding-tracking` becomes current after one Back action.
- Invariant: neither route is duplicated.

## Final-page rendering contract

Visual order:

1. supplied privacy/location illustration in the upper portion;
2. privacy reassurance below the illustration;
3. wide rounded lower treatment with location-related text near the bottom.

The illustration stage layers the supplied background, person, globe ring, globe, and location pin
in their Figma order and relative geometry. The route respects top and bottom safe areas on
supported portrait phones. Text may reflow for device size and text scaling without overlapping or
hiding meaningful content.

## Accessibility contract

- Privacy reassurance and final CTA text are read in visual order.
- The complete layered illustration is decorative and hidden from assistive technology.
- The final CTA has no press handler, button role, accessibility action, permission request, or
  destination in this feature.

## Failure behavior

Because all values and artwork are bundled locally, network unavailability does not create a
loading, empty, or error state. A missing layer, unresolved route, changed asset configuration, or
build/export failure must block handoff.
