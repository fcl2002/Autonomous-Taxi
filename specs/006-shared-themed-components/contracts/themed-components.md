# UI Contract: Themed Components

## ThemedText

- Accepts all standard React Native text properties.
- Provides named variants for the brand, heading, body, link, and action-label roles shared by the entry flow.
- Uses configured Vazy font families and theme colors by default.
- Applies caller-provided styles after defaults so a screen may set layout-specific values.
- Preserves children, accessibility properties, line limits, and font-fitting properties unchanged.

## ThemedButton

- Accepts all standard React Native pressable properties plus a text label.
- Uses the Vazy primary action appearance and shared action-label typography by default.
- Invokes a supplied press handler once per native activation; when no handler is supplied, the button remains enabled and performs no action.
- Preserves caller accessibility labels and exposes the button role.
- Honors the native disabled state and does not activate while disabled.
- Applies caller-provided container and label styles after defaults for screen-specific sizing.

## Compatibility

- Existing onboarding route destinations do not change.
- The launch screen still opens onboarding when its full-screen control is activated.
- The login **Send Code** button remains enabled and produces no navigation, request, authentication attempt, or state change.
- Existing decorative launch and onboarding images remain inaccessible to screen readers.
- No runtime permission, authentication, or data behavior is introduced.
