# Research: Vazy Splash Screen

## Decision 1: Use the index route for the complete design

**Decision**: Implement the responsive Vazy composition in `app/src/app/index.tsx`. Keep the native
launch screen limited to the same light background, without an image until a real logo exists.

**Rationale**: Expo's native splash configuration supports a background and a centered image meant
for an icon or logo. The requested screen contains independently positioned text and a large lower
illustration, so the existing React Native route is the smallest cross-platform way to preserve the
composition. No artificial delay or splash-screen lifecycle call is needed because navigation
timing is outside this feature.

**Alternatives considered**:

- Full-screen native splash image: rejected because the compatibility property is legacy and the
  layout must adapt to different phone aspect ratios.
- Runtime `preventAutoHideAsync`: rejected because no asynchronous resource must finish before the
  bundled route can render.

**Source**: [Expo SDK 57 SplashScreen](https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/)

## Decision 2: Bundle one raster illustration locally

**Decision**: Export the passenger-and-taxi artwork from Figma node `5:678` as a transparent PNG,
save it as `app/assets/images/vazy-taxi-passenger.png`, and render it with React Native's built-in
Image component using a static local source and aspect-preserving containment.

**Rationale**: A local PNG works offline, avoids temporary Figma URLs, requires no SVG transformer,
and is supported on both target platforms. Metro bundles statically referenced images into the app,
so no loader, cache layer, or runtime download is needed.

**Alternatives considered**:

- Remote Figma asset URL: rejected because it expires and violates offline rendering.
- Local SVG plus a new renderer: rejected because one raster export avoids a dependency and SVG
  decoding has cross-platform edge cases.
- Multiple sliced assets: rejected because the approved illustration is a single decorative unit.

**Sources**:

- [Expo assets guide](https://docs.expo.dev/develop/user-interface/assets/)
- [React Native 0.86 images](https://reactnative.dev/docs/0.86/images)

## Decision 3: Use existing layout primitives and system typography

**Decision**: Use `StyleSheet`, flex layout, and the installed safe-area package. Add one
SafeAreaProvider at the app root, render "Vazy" as bold system text, keep the brand region centered,
and anchor the illustration to the lower region with width and height limits that preserve its
aspect ratio.

**Rationale**: These built-in primitives cover the required small-to-large portrait range without
absolute coordinates from the Figma reference. System text avoids creating a temporary wordmark or
adding a font before the brand system exists.

**Alternatives considered**:

- Pixel-for-pixel absolute positioning: rejected because it would fail across iOS and Android
  aspect ratios.
- Custom font or wordmark asset: rejected because logo and brand-system design are out of scope.
- A reusable design-system component: rejected because there is only one static screen.

**Source**: [Expo SDK 57 safe-area context](https://docs.expo.dev/versions/v57.0.0/sdk/safe-area-context/)

## Decision 4: Preserve native system UI and accessibility

**Decision**: Hide the route header, show dark status-bar content over the light background, expose
only the Vazy text to screen readers, and mark the illustration as decorative.

**Rationale**: The route should occupy the full screen without imitating system bars. React Native
text is accessible by default, while images are not accessibility elements unless explicitly made
accessible. This produces the single "Vazy" announcement required by the specification.

**Alternatives considered**:

- Draw status and home indicators inside the screen: rejected because the operating system owns
  them.
- Add an accessibility label to the decorative illustration: rejected because it would duplicate
  non-actionable visual content.

**Sources**:

- [Expo Router navigation layouts](https://docs.expo.dev/router/basics/navigation-layouts/)
- [React Native accessibility](https://reactnative.dev/docs/accessibility)

## Decision 5: Do not add a test framework for a static layout

**Decision**: Use the repository's lint and TypeScript checks plus the acceptance matrix in
`quickstart.md`. Validate final native launch behavior in a preview or production build.

**Rationale**: The feature contains no branch, parser, state machine, or boundary adapter that
benefits from a unit test. Expo notes that Expo Go and development builds are not authoritative for
testing native splash screens.

**Alternatives considered**:

- Add Jest and snapshot tests: rejected because the repository has no test stack and snapshots do
  not prove cross-device geometry.
- Add screenshot-diff tooling: rejected until the project has more screens and repeated visual
  regression needs.

**Source**: [Expo splash screen and app icon guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)

## Decision 6: Remove invalid template asset references without creating branding

**Decision**: Update the app display name to `Vazy`, remove the missing native splash image from the
Expo splash plugin, and remove only launcher-icon fields that point to nonexistent files. Keep the
matching light launch background and do not create a replacement icon or logo.

**Rationale**: `app.json` currently references missing `icon.png`, splash icon, and Android adaptive
icon files. Leaving those paths would make configuration and build validation fail. Removing invalid
references is configuration cleanup, not a new brand-system design.

**Alternatives considered**:

- Create placeholder Vazy icons: rejected because temporary logos are prohibited and logo design is
  outside this feature.
- Leave broken paths: rejected because the app could not pass build/configuration validation.
