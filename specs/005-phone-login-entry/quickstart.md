# Quickstart: Phone Login Entry Screen

## Prerequisites

- Install the existing dependencies from `app/package.json`.
- Use iOS and Android portrait simulators/devices supported by Expo SDK 57.
- Start from the launch route; do not validate the login page as an isolated render.
- Preserve dependency files, `.gitignore`, and asset inclusion/exclusion configuration unchanged.

## Static validation

From `app/` run:

```powershell
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export
```

All commands must exit successfully. Export must discover `/login` without a runtime network
asset or configuration change.

## Integrated flow validation

Repeat the following full flow 10 times:

1. Open the launch page and touch it to start onboarding.
2. Advance through Accept a Job, Tracking Realtime, and the final location introduction.
3. Activate the final onboarding CTA and confirm exactly one `/login` page appears within 300 ms.
4. Confirm Vazy, Login, phone guidance, Phone Number, Send Code, and the sign-up prompt are visible;
   confirm Qwiker and its logo are absent.
5. Focus the phone field, enter and edit digits, dismiss the keyboard, and confirm the field and
   Send Code treatment remain visible without overlap.
6. Confirm Send Code and Sign Up perform no action, no permission prompt appears, and no network or
   persistence side effect occurs.
7. Invoke platform Back once and confirm the final onboarding page returns.

## Required test matrix

- Run the integrated flow on iOS and Android.
- On each platform, check one small, the 428 by 926 reference, and one larger portrait viewport.
- Repeat with increased text size and VoiceOver or TalkBack; confirm the onboarding CTA is one
  clearly labelled button, login content is read in visual order, and the phone field has a clear
  label.
- Run an installed preview or release build in airplane mode and confirm the complete flow remains
  available.
- Ask five first-time reviewers to identify the product, purpose, input, primary treatment, and
  sign-up prompt without seeing legacy branding.

Record device/OS, viewport, text scale, assistive technology, observed transition time, result,
and any defect for each run. This is the first complete-flow checkpoint; these checks are not
deferred to isolated later screens.
