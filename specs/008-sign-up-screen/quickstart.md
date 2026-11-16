# Quickstart: Validate Sign Up Screen

## Prerequisites

- Install the existing app dependencies.
- Run commands from `app/`.

## Static validation

```powershell
npx tsc --noEmit
npx expo lint
```

Expected: both commands complete with no new errors.

## User-run integrated validation

1. Start the existing app and follow launch through onboarding to login.
2. Activate **Sign Up** and confirm one Vazy sign-up page opens.
3. Confirm the visible order matches the contract and no Qwiker branding appears.
4. Enter and edit full-name, email, and phone values; verify each field uses appropriate keyboard behavior.
5. With each field focused, confirm the field and primary action remain reachable on small, reference, and large portrait phones.
6. Activate the primary **Sign Up** action and confirm it produces no request, account, navigation, success message, or persisted value.
7. Reopen sign up, activate **Sign In**, and confirm login appears without an extra sign-up page in Back history.
8. Repeat the relevant flow on Android and iOS, offline, with increased text size, and with VoiceOver or TalkBack.

Expected:

- Navigation connects login and sign up without duplicate routes.
- The responsive Vazy screen matches the reference hierarchy.
- All values remain transient and no signup logic executes.
