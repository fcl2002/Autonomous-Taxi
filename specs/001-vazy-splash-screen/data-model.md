# Data Model: Vazy Splash Screen

## Domain entities

None. This feature does not read, create, update, or persist user, ride, vehicle, or application
state.

## Display inputs

The screen has two fixed local inputs:

| Input | Type | Validation |
|-------|------|------------|
| Product name | Static text | Exactly `Vazy`; no Qwiker or temporary logo text |
| Illustration | Bundled image asset | Non-empty local PNG exported from Figma node `5:678`; decorative to assistive technology |

## State transitions

The operating system shows the native light launch background while the bundle starts, then the
Expo Router index route renders the complete static composition. Duration and onward navigation are
outside this feature, so there is no application state machine.
