# Quickstart: Validate Shared Themed Onboarding Components

## Prerequisites

- Install the existing app dependencies.
- Run commands from `app/`.

## Static validation

```powershell
npx tsc --noEmit
npx expo lint
```

Expected: both commands complete with no new errors.

## Integrated flow validation

1. Start the existing Expo app with `npx expo start`.
2. Open the launch screen and enter onboarding.
3. Verify the launch brand text uses the configured Vazy font and activate the full-screen launch control.
4. Verify the first onboarding heading, description, and primary action use the configured Vazy fonts and colors.
5. Activate the primary action and repeat the visual check on the tracking page.
6. Activate the tracking action and repeat the check on the location page.
7. Activate **Allow Location** and confirm the login page opens.
8. Verify login brand, heading, guidance, sign-up prompt/link, and **Send Code** use the shared presentation while the phone input remains unchanged.
9. Activate **Send Code** and confirm the app stays on login with no request, authentication attempt, navigation, or other state change.
10. Repeat on a narrow viewport and the reference-size viewport.

Expected:

- The launch, onboarding, and login copy, artwork, form, progress indicators, and spacing remain intact.
- No text or button label is clipped.
- Navigation controls remain accessible and open their previous destinations; **Send Code** remains an enabled no-op.
- Decorative images remain excluded from the accessibility tree.
