# Research: Onboarding Entry Screen

## Route Transition

**Decision**: Add `src/app/onboarding.tsx` and call the existing router's replacement navigation
directly from the splash screen.

**Rationale**: Replacement removes the current entry instead of pushing another one, so repeated
requests for the same destination cannot stack splash or onboarding entries. The file-based route
is already supported by the project and needs no custom navigation state, navigator configuration,
or package.

**Alternatives considered**:

- Push navigation was rejected because Back could reveal the splash and repeated taps could add
  duplicate entries.
- Timed automatic navigation was rejected because the user explicitly requested tap activation.
- A custom tap lock was rejected because same-destination replacement already provides the required
  navigation-history behavior.
- A navigation service or onboarding state machine was rejected because there is one transition.

Reference: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/).

## Splash Interaction and Accessibility

**Decision**: Make the safe-area content one full-screen native press target with a button role and
a direct label that includes both the Vazy identity and continuation purpose. Hide its visual text
and illustration as separate accessibility children.

**Rationale**: This creates one predictable touch and assistive-technology target while preserving
the existing visual composition. Native press behavior provides keyboard and accessibility
activation without a gesture dependency.

**Alternatives considered**:

- An invisible overlay was rejected because it duplicates the visible tree and is easier to size
  incorrectly.
- Nested actions were rejected because the requirement calls for one screen-wide action.
- A gesture library was rejected because native press handling already covers the interaction.

References: [React Native Pressable](https://reactnative.dev/docs/0.86/pressable) and
[React Native accessibility](https://reactnative.dev/docs/0.86/accessibility).

## Figma Assets

**Decision**: Export Figma node `5:206` as `onboarding-taxi-passenger.png` and node `5:384` as
`onboarding-status-badge.png`, preserving transparency. Store both locally and render them with the
native image component using aspect-preserving sizing.

**Rationale**: The second screen uses different artwork from the splash, and the badge is a separate
visible design layer. Local PNG exports preserve the exact artwork, work offline, and avoid adding
SVG rendering configuration for two decorative assets.

**Alternatives considered**:

- Reusing the splash illustration was rejected because it does not match the referenced node.
- Rasterizing the entire page was rejected because text would not reflow or expose correct
  accessibility semantics.
- Recreating the artwork or badge with native shapes was rejected because it would substitute the
  supplied design assets.
- Adding an SVG dependency was rejected because transparent PNG exports meet the current need.

Reference: [Expo local assets](https://docs.expo.dev/develop/user-interface/assets/).

## Responsive Composition

**Decision**: Use the existing safe-area and status-bar setup, a vertical flex layout, and bounded
aspect-preserving image slots. Keep JSX and accessibility order as heading, supporting copy,
illustration with badge, progress indicator, then CTA label.

**Rationale**: Flexible regions retain the Figma hierarchy across supported phone heights while
keeping meaningful content out of system areas. Absolute positioning is limited to the badge inside
the illustration's bounded wrapper because it is an overlapping design layer.

**Alternatives considered**:

- Scaling fixed Figma coordinates was rejected because it clips on small or unusually tall phones.
- A scrolling container was rejected for the default layout because the reference is one fixed
  onboarding viewport; it should only be introduced if device testing proves content cannot fit.

References: [Expo safe areas](https://docs.expo.dev/develop/user-interface/safe-areas/) and
[React Native Image](https://reactnative.dev/docs/0.86/image).

## Provisional Copy and Call-to-Action

**Decision**: Keep the reference copy as local constants within the onboarding route, use the
platform font, and render the CTA treatment as a styled non-pressable container with readable text.

**Rationale**: The user will replace the wording later, and no destination is specified. This keeps
copy changes local, avoids an unapproved font asset, and does not expose a false button action to
assistive technology.

**Alternatives considered**:

- A working or disabled button was rejected because no behavior is in scope and either would imply
  an unsupported action.
- A shared copy/configuration layer was rejected because only one static screen uses the values.
- Adding custom fonts was deferred until final brand typography is approved.

## Verification

**Decision**: Run lint, TypeScript checking, Expo Doctor, and multi-platform export, then manually
verify rapid taps, Back behavior, three phone sizes per platform, screen readers, offline launch,
asset geometry, and the 300 ms transition target.

**Rationale**: Static checks cover project integrity; the visual, assistive-technology, and device
timing outcomes require actual rendering on supported phones.

**Alternatives considered**: Adding a UI test framework was rejected because the repository has no
such framework and this single static flow does not justify a new dependency.
