# Quickstart: Validate Tracking Layout Fix

## Prerequisites

- Install the existing app dependencies.
- Run commands from `app/`.

## Static validation

```powershell
npx tsc --noEmit
npx expo lint
```

Expected: both commands complete with no new errors.

## User-run screen validation

1. Start the existing Expo app and follow the launch and first onboarding screens to the tracking page.
2. On a short portrait phone, confirm the complete illustration is centered and appears above the complete progress indicator with visible separation.
3. Repeat on the reference portrait size and a tall portrait phone.
4. Confirm the heading, supporting copy, illustration, progress indicator, and action remain in top-to-bottom order without clipping or protected-area intrusion.
5. Activate **Get Started** and confirm the existing location onboarding page opens.
6. Repeat the relevant checks on Android and iOS.

Expected:

- The illustration never overlaps the progress indicator.
- The illustration sits slightly higher while remaining separated from the introductory copy.
- Existing content, accessibility behavior, and navigation are unchanged.
