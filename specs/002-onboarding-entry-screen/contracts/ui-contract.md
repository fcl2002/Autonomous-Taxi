# UI Contract: Splash to First Onboarding Page

## Route Contract

| Route | Entry | Exit in this feature | Back behavior |
|-------|-------|----------------------|---------------|
| `/` | App launch | Activate anywhere on the visible splash | N/A |
| `/onboarding` | Replacement from `/` or direct route access | None | Must not reveal a duplicate splash created by the transition |

## Splash Activation Contract

- The whole safe-area content is one activation target.
- Its accessible role is `button`.
- Its accessible name communicates both `Vazy` and `Continue to onboarding`.
- The visible Vazy text and splash artwork do not create additional accessibility targets.
- The first activation replaces `/` with `/onboarding`.
- Further rapid activations before unmount do not start another transition.

## Onboarding Presentation Contract

Visible and reading order:

1. Non-empty provisional heading.
2. Non-empty provisional supporting copy.
3. Decorative taxi-and-passenger illustration from Figma node `5:206`.
4. Decorative status badge from Figma node `5:384` in its overlapping design position.
5. Three-position progress indicator with position one active.
6. Rounded visual CTA treatment with a non-empty provisional label.

The illustration, badge, and progress shapes are excluded from the accessibility tree. The heading,
supporting copy, and CTA label remain readable in visual order. The CTA has no button role,
activation handler, or destination in this feature.

## Layout Contract

- Both routes use a light `#F8F8FF` background and dark status-bar content.
- Meaningful content stays inside protected system areas.
- The onboarding hierarchy remains intact on supported small, reference, and large portrait phones.
- Artwork retains its aspect ratio and is not substituted, redrawn, stretched, or cropped.
- Provisional text may reflow with increased text size without hiding the heading or overlapping
  another meaningful region.

## Offline and Failure Contract

- Both routes, navigation, copy, and artwork are bundled locally.
- No network, Firebase, backend, MQTT, user, ride, or vehicle state is required.
- Missing or empty local asset files fail acceptance; no remote fallback is permitted.
