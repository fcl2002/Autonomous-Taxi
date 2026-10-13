# Quickstart: Validate the Onboarding Entry Screen

## Prerequisites

- Install the repository's locked app dependencies.
- Have at least one supported iOS phone and one supported Android phone available for final manual
  validation; use installed preview or release builds for the offline test.

## Static Validation

From `app/`:

```text
npm install
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export --platform all
```

Expected result: every command exits successfully. Confirm both onboarding asset files exist, are
non-empty and transparent where required, and no temporary Figma asset URL appears in application
source.

## Run the App

From `app/`:

```text
npx expo start
```

Open the app on a supported phone and begin on the Vazy splash screen.

## P1: Splash-to-Onboarding Transition

1. Confirm the splash looks unchanged before interaction.
2. Tap once anywhere on its visible content.
3. Confirm the onboarding page fully replaces it within 300 ms.
4. Press Back and confirm the transition did not create a duplicate splash entry.
5. Relaunch and repeat with at least 10 rapid taps; confirm only one onboarding page appears.
6. Enable VoiceOver or TalkBack. Confirm the splash exposes exactly one button named to communicate
   `Vazy` and `Continue to onboarding`, then activate it.

## P2: Onboarding Presentation

Compare the rendered page with Figma node `5:147` on the reference phone size, one smaller phone,
and one larger phone for both iOS and Android.

Confirm:

- Heading, supporting text, illustration, separate status badge, first-active three-position
  indicator, and lower CTA treatment appear in the reference order.
- Artwork is neither substituted, stretched, nor unintentionally cropped.
- No meaningful content overlaps another region or a system status/home-indicator area.
- Increased text size does not hide the heading or overlap meaningful content.
- VoiceOver and TalkBack announce heading, supporting copy, and CTA label in order; artwork, badge,
  and dots are silent; the CTA is not announced as a button.

## Offline Validation

1. Install a preview or release build containing the bundle and assets.
2. Enable airplane mode and close the app completely.
3. Relaunch, activate the splash, and confirm the full onboarding page appears without missing
   artwork, delay caused by a remote request, or error state.

Record device model, OS version, build identifier, transition timing, and pass/fail results for each
manual scenario before marking implementation complete.
