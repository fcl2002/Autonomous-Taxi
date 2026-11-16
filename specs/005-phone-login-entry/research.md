# Research: Phone Login Entry Screen

## Decision 1: Reuse Expo Router `navigate`

**Decision**: Convert the final onboarding page's visual lower treatment into one accessible
`Pressable` that calls `router.navigate("/login")`.

**Rationale**: `navigate` preserves the onboarding page for one-step Back behavior while reusing or
unwinding to an existing login route instead of intentionally stacking another copy. The existing
root `Stack` already discovers flat routes.

**Alternatives considered**:

- `router.replace`: rejected because it removes the required Back destination.
- `router.push`: rejected because it intentionally appends route instances.
- A navigation guard, route group, or store: rejected because the current router semantics already
  satisfy this local transition.

**Source**: [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/).

## Decision 2: Use native keyboard and phone-input behavior

**Decision**: Build `/login` with the existing `SafeAreaView` and a single native
`KeyboardAvoidingView`. Use a controlled React Native `TextInput` with `inputMode="tel"`,
`autoComplete="tel"`, a clear accessibility label, and a Done return key.

**Rationale**: These installed platform primitives provide the transient field behavior and keep
the form visible around the keyboard. `inputMode="tel"` requests the appropriate keyboard without
constraining future international phone requirements.

**Alternatives considered**:

- Country picker, mask, or phone-parsing library: rejected until phone formats and authentication
  requirements are defined.
- A `ScrollView`: deferred unless small-device and large-text checks demonstrate clipping; the
  current one-field layout does not justify it preemptively.
- Custom keyboard listeners: rejected because `KeyboardAvoidingView` covers the current need.

**Sources**: [React Native KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview)
and [React Native TextInput](https://reactnative.dev/docs/textinput).

## Decision 3: Keep unfinished destinations visibly static

**Decision**: Render Send Code as a styled `View` with text and Sign Up as styled text. Give neither
a press handler, button/link role, Firebase call, navigation destination, or success state.

**Rationale**: The requested increment defines the login entry screen but not OTP delivery,
verification, or sign-up destinations. Static treatments match the design without misleading users
or creating temporary logic that must be removed.

**Alternatives considered**:

- Enabled no-op `Pressable`: rejected because it announces an action that cannot complete.
- Disabled `Pressable`: rejected because it adds semantics and state without a defined enablement
  rule; ordinary text is the same honest UI-first pattern used by the preceding screen.
- Placeholder routes or Firebase setup: rejected as unspecified future work.

**Sources**: [React Native Pressable](https://reactnative.dev/docs/pressable) and
[React Native accessibility](https://reactnative.dev/docs/accessibility).

## Decision 4: Adapt identity without adding an asset

**Decision**: Preserve node `5:63`'s centered product-identity slot but render the established Vazy
text identity. Do not download the Qwiker logo asset or redraw an unapproved Vazy logo.

**Rationale**: The Figma frame is a template whose legacy brand conflicts with the product name.
The launch page already establishes a dependency-free Vazy text treatment, and the user has not
approved a logo.

**Alternatives considered**:

- Shipping the Figma Qwiker mark: rejected because it is the wrong product identity.
- Inventing or tracing a Vazy logo: rejected because logo design is outside this feature.
- Adding another image: rejected because no approved matching asset exists.

## Decision 5: Validate the whole first flow now

**Decision**: Validate launch, all three onboarding pages, the login transition, input/keyboard,
Back behavior, accessibility, offline rendering, and supported portrait sizes as one integrated
flow.

**Rationale**: Login is the agreed endpoint for the first complete flow. Isolated route rendering
would miss the transition and history behavior the user explicitly wants tested.

**Alternatives considered**:

- Login-only manual checks: rejected because they cannot prove the launch-to-login journey.
- A new test framework for two native interactions: rejected because no test framework exists and
  the required device behavior is better covered by the focused integrated matrix at this stage.
