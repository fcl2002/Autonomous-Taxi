# Quickstart: Validate the Vazy Splash Screen

## Prerequisites

- Node.js and npm
- One iOS phone or simulator and one Android phone or emulator across the acceptance run
- VoiceOver on iOS and TalkBack on Android for accessibility checks

## Static checks

From `app/`:

```powershell
npm install
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export --platform all
```

Expected: dependency installation, lint, typecheck, project diagnostics, and bundle export complete
successfully without missing local-asset errors.

## Run the screen

```powershell
npm start
```

Open the project on an iOS and Android target. Expo Go is sufficient for iterating on the React
Native route; use a preview or production build for final native launch-screen verification.

## Acceptance matrix

Repeat the following on both platforms using a small, reference-sized, and large portrait phone:

1. Launch the app from a closed state.
2. Confirm the native light background hands off to the complete screen without a conflicting blue
   screen, missing asset, or blank frame.
3. Confirm `Vazy` is the only product name; `Qwiker`, its symbol, and temporary logos are absent.
4. Confirm the passenger-and-taxi illustration is visible, proportional, bottom-anchored, and does
   not overlap the brand or system areas.
5. Enable airplane mode, relaunch, and confirm the result is unchanged.
6. Increase the system text size, relaunch, and confirm `Vazy` remains visible on one line.
7. Enable VoiceOver or TalkBack and confirm `Vazy` is announced once while the illustration is not
   focusable or announced.
8. In a preview or production build, record that the complete branded route appears within one
   second of launch.

The screen passes when every check succeeds on both platforms and all three phone-size classes.

## Implementation validation: 2026-10-06

- PASS: ESLint completed without findings.
- PASS: TypeScript completed without errors.
- PASS: Expo Doctor completed all 21 checks.
- PASS: Expo exported iOS, Android, and web bundles with the local illustration included.
- PASS by inspection: `Vazy` is the only product text, the illustration is local and decorative,
  and the native and route backgrounds both use `#F8F8FF`.
- PENDING: Small/reference/large physical-device layout checks, airplane-mode relaunch,
  VoiceOver/TalkBack, native splash handoff, five first-time reviewers, and the one-second launch
  measurement. No Android device/emulator or iOS simulator was available in this Windows workspace.
