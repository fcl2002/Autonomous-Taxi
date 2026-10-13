# Quickstart: Onboarding Location Consent Screen

## Prerequisites

- Install the existing dependencies from `app/package.json`.
- Use an iOS or Android portrait simulator/device supported by Expo SDK 57.
- Start from the completed implementation of the [UI contract](./contracts/ui-contract.md).
- Preserve the existing asset inclusion and exclusion configuration unchanged.

## Static validation

From `app/` run:

```powershell
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export
```

All commands must exit successfully. Export must resolve the new route and all five bundled image
layers without a runtime network asset.

## Increment checks

- Open `/onboarding-tracking`, activate its lower CTA rapidly, and confirm only one final page
  appears.
- Invoke platform Back once and confirm the tracking page reappears.
- Reach `/onboarding-location` through the tracking introduction CTA and compare its hierarchy and
  illustration geometry with Figma node `5:2`.
- Confirm the privacy message and visual-only `Allow Location` treatment are present.
- Confirm activating or focusing the final treatment does not request location, change consent, or
  navigate.
- Confirm the tracking CTA has one clear button announcement; the final illustration is silent;
  and final-page text is read in visual order.
- Check a small and large portrait viewport with increased text size for overlap and safe-area use.
- Verify the existing asset inclusion and exclusion configuration has no diff.

## Tracked acceptance-test exception

**Exception**: The complete physical iOS/Android matrix, VoiceOver/TalkBack runs, measured 300 ms
transition, installed-build airplane-mode runs, and five first-time-reviewer assessment are not
required at this individual screen increment.

**Risk**: Platform-specific layout, navigation, accessibility, timing, or offline packaging defects
may remain undiscovered during incremental development.

**Owner**: Vazy mobile team.

**Removal condition**: Complete and record every deferred scenario before the first onboarding-to-
login flow is accepted or merged as complete. Static validation and locally available increment
checks are not deferred.
