# Research: Onboarding Location Consent Screen

## Decision 1: Reuse Expo Router `navigate`

**Decision**: Change the tracking page's static lower treatment into a native `Pressable` that
calls `router.navigate("/onboarding-location")`.

**Rationale**: `navigate` adds the missing destination so platform Back returns to the tracking
page, while reusing or unwinding to an existing route instead of deliberately stacking another
copy. The existing root `Stack` needs no change or custom press guard.

**Alternatives considered**:

- `router.replace`: rejected because Back would not restore the tracking page.
- `router.push`: rejected because it deliberately adds route instances.
- Local state, refs, or navigation listeners: rejected because router semantics already cover the
  required transition.

**Sources**: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/) and
[Expo Router Stack](https://docs.expo.dev/router/advanced/stack/).

## Decision 2: Preserve each supplied illustration layer

**Decision**: Export Figma nodes `5:4`, `5:36`, `5:49`, `5:52`, and `5:59` as five local PNGs and
compose them in a single decorative illustration stage using their relative reference geometry.

**Rationale**: Figma node `5:2` stores the background, person, globe ring, globe, and pin as separate
visible sibling layers rather than one illustration group. Local PNG exports preserve their exact
appearance, work offline, and avoid adding an SVG runtime dependency. The existing asset inclusion
and exclusion configuration already reflects the user's desired repository policy and remains
untouched.

**Alternatives considered**:

- Exporting the whole screen: rejected because a rendered screen image is not an implementation
  asset and would duplicate live text and controls.
- Redrawing the supplied vectors: rejected because the design requires the exact assets.
- Adding an SVG renderer: rejected because five static PNG exports meet the current need without a
  dependency.
- Combining or cropping the exports after download: rejected because it would alter supplied
  assets and make visual verification less direct.

**Source**: [Expo local assets](https://docs.expo.dev/develop/user-interface/assets/).

## Decision 3: Keep permission and LGPD logic absent

**Decision**: Render the final `Allow Location` treatment as a styled `View` with ordinary text and
no press handler, button role, permission call, consent mutation, or navigation destination.

**Rationale**: The specification intentionally completes the visible onboarding sequence first.
Permission scope, consent states, refusal behavior, legal wording, and the login destination are
not yet defined; pretending to grant consent would be misleading.

**Alternatives considered**:

- Request foreground location now: rejected because the current feature excludes permission logic
  and its result states.
- Add a location package or native configuration preemptively: rejected because no current behavior
  needs it.
- Route to a placeholder login screen: rejected because that screen is not part of this feature.

**Source**: [Expo Location SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/location/).

## Decision 4: Follow existing native accessibility patterns

**Decision**: Give the tracking CTA button semantics and a purpose-based label independent of its
provisional visible copy. Keep final-page text in visual order and hide the complete layered
illustration container from assistive technology. Leave the final CTA text readable as text, not a
control.

**Rationale**: This exposes one real navigation action without falsely announcing the final visual
treatment as actionable. The project already uses the same decorative-container pattern.

**Alternatives considered**:

- Giving the final CTA a disabled button role: rejected because it suggests functionality that is
  deliberately absent.
- Labeling every illustration layer: rejected because the privacy message conveys the meaning and
  the artwork is decorative.

**Sources**: [React Native Pressable](https://reactnative.dev/docs/0.86/pressable) and
[React Native accessibility](https://reactnative.dev/docs/0.86/accessibility).

## Decision 5: Keep the final screen standalone

**Decision**: Add one flat route using the current safe-area, status-bar, proportional layout, text,
and bottom-treatment patterns.

**Rationale**: The three onboarding pages now differ materially in content structure. A carousel or
configuration-driven shared screen would add indirection without required swipe behavior or shared
state.

**Alternatives considered**:

- Carousel dependency: out of scope and unnecessary.
- Shared configurable onboarding shell: deferred until a demonstrated maintenance problem exists.

## Decision 6: Stage final acceptance with the complete first flow

**Decision**: Run all available static gates for this increment and defer the complete physical
device, screen-reader, measured timing, airplane-mode installed-build, and five-reviewer matrix
until the onboarding-to-login flow exists.

**Rationale**: This follows the agreed development checkpoint while retaining an explicit owner,
risk, and removal condition in `quickstart.md`.

**Alternatives considered**:

- Treating the final onboarding screen as the final application acceptance point: rejected because
  the agreed first-flow checkpoint ends at login.
