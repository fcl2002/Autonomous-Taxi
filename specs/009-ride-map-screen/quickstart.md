# Quickstart: Validate Ride Map Screen

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

1. Start the app and follow launch, onboarding, login, and sign up.
2. Enter any signup text and activate **Sign Up**.
3. Confirm one map page opens without validation, account creation, permission prompt, or network request.
4. Confirm the map shows five taxis, one highlighted passenger position, and the menu treatment.
5. Confirm the lower sheet shows its heading, pickup address, divider, and destination prompt.
6. Activate the menu and destination treatments and confirm neither produces a side effect.
7. Invoke Back and confirm sign up returns with no duplicate map page.
8. Repeat on small, reference, and large portrait phones on Android and iOS, offline, with increased text size, and with VoiceOver or TalkBack.

Expected:

- The complete page matches Figma node `5:1446` using only bundled assets.
- The sheet remains readable and the passenger marker remains visible.
- No account, location, map, or ride logic runs.
