# Research: Onboarding Tracking Screen

## Decision 1: Use Expo Router `navigate`

**Decision**: The first page uses `router.navigate("/onboarding-tracking")` from a native
`Pressable`.

**Rationale**: `navigate` adds the missing destination so platform Back returns to the first page,
while Expo Router reuses or unwinds to an existing route instead of deliberately stacking another
copy. The existing root `Stack` needs no change and no local navigation guard is required.

**Alternatives considered**:

- `router.replace`: rejected because Back would not restore the first onboarding page.
- `router.push` or `Link push`: rejected because push deliberately adds route history and may create
  repeated route instances.
- `useState`, a ref guard, or a navigation listener: rejected because router semantics already
  provide the required behavior.
- A default `Link` with `asChild`: valid, but `Pressable` plus `navigate` states the button semantics
  and action directly.

**Sources**: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/),
[Expo Router Stack](https://docs.expo.dev/router/advanced/stack/), and
[Expo Router Link API](https://docs.expo.dev/versions/v57.0.0/sdk/router/link/).

## Decision 2: Preserve native accessibility semantics

**Decision**: Expose the first CTA as one `Pressable` with `accessibilityRole="button"` and the
purpose-based label `Continue to tracking introduction`. Keep the second page's CTA a plain styled
`View` with text because it is intentionally not actionable. Keep meaningful text in visual JSX
order and hide illustration/progress containers using the repository's existing accessibility
pattern.

**Rationale**: This gives assistive technology one clear action without falsely exposing the
second CTA as a disabled or working control. The purpose-based label remains correct when the
provisional visible copy changes.

**Alternatives considered**:

- Adding an accessibility hint: unnecessary because the label already states the outcome.
- Giving the second CTA a button or disabled role: rejected because the specification defines it
  as visual-only.

**Sources**: [React Native Pressable](https://reactnative.dev/docs/0.86/pressable) and
[React Native accessibility](https://reactnative.dev/docs/0.86/accessibility).

## Decision 3: Add only the unique illustration

**Decision**: Export Figma node `5:443` as `app/assets/images/onboarding-tracking.png`, reference it
with static `require()`, and reuse the existing active and dot progress images in inactive-active-
inactive order.

**Rationale**: Static local assets are bundled with the app and work offline. The progress shapes
already exist and match the same design system, so duplicate binaries add no value.

**Alternatives considered**:

- Loading the temporary Figma asset URL at runtime: rejected because it expires and violates the
  offline requirement.
- Adding a second set of progress images: rejected because only their order changes.
- Drawing or approximating the supplied illustration: rejected because the specification requires
  the supplied artwork.

**Source**: [Expo local assets](https://docs.expo.dev/develop/user-interface/assets/).

## Decision 4: Keep the second screen standalone

**Decision**: Follow the existing screen's safe-area and proportional flex layout directly in the
new route, adjusting only the illustration slot and progress order required by node `5:387`.

**Rationale**: There are only two pages, their illustrations differ structurally, and no shared
behavior exists beyond ordinary React Native primitives. A carousel, screen configuration model,
or reusable onboarding shell would add indirection before a stable third-page pattern exists.

**Alternatives considered**:

- Carousel or swipe dependency: out of scope and unnecessary.
- Shared configurable onboarding component: deferred until repeated structure creates a concrete
  maintenance need.

## Decision 5: Stage acceptance with the complete first flow

**Decision**: Run all available static gates for this increment and defer the full device,
screen-reader, timing, airplane-mode installed-build, and five-reviewer matrix until the
onboarding-to-login flow exists.

**Rationale**: This matches the project's stated testing checkpoint while retaining the checks and
exit condition in `quickstart.md`. It does not defer implementation correctness or static checks.

**Alternatives considered**:

- Treating the current screen as a final isolated MVP: rejected because the agreed development
  checkpoint is the complete first flow through login.
