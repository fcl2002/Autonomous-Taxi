# Quickstart: Onboarding Tracking Screen

## Prerequisites

- Install the existing dependencies from `app/package.json`.
- Use an iOS or Android portrait simulator/device supported by Expo SDK 57.
- Start from the completed implementation of the [UI contract](./contracts/ui-contract.md).

## Static validation

From `app/` run:

```powershell
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export
```

All commands must exit successfully. Export must resolve the new route and bundled image without a
network-loaded runtime asset.

## Increment checks

- Open `/onboarding`, activate the first CTA rapidly, and confirm only one tracking page appears.
- Invoke platform Back once and confirm the first page reappears.
- Open `/onboarding-tracking` directly and compare structure with Figma node `5:387`.
- Confirm the progress order is inactive-active-inactive and the lower CTA does nothing.
- Confirm the first CTA has one clear button announcement; tracking art and progress are silent;
  the second page's CTA is read only as text.
- Check a small and large portrait viewport with increased text size for overlap and safe-area use.

## Tracked acceptance-test exception

**Exception**: The complete physical iOS/Android matrix, VoiceOver/TalkBack runs, measured 300 ms
transition, installed-build airplane-mode runs, and five first-time-reviewer assessment are not
required at this individual screen increment.

**Risk**: Platform-specific layout, navigation, accessibility, timing, or offline packaging defects
may remain undiscovered during incremental development.

**Owner**: Vazy mobile team.

**Removal condition**: Complete and record every deferred scenario before the first onboarding-to-
login flow is accepted or merged as complete. Static validation and the locally available increment
checks above are not deferred.
