# Research: Sign Up Screen

## Decision 1: Adapt the reference to existing Vazy primitives

**Decision**: Reuse the text-based Vazy identity, `ThemedText`, `ThemedButton`, colors, fonts, and
rounded native-input treatment already used by login. Do not download the Qwiker logo from Figma.

**Rationale**: The Figma file is a layout reference containing unapproved template branding. The
current app already has the approved brand name and matching presentation primitives.

**Alternatives considered**:

- Ship the Qwiker asset: rejected because it is not Vazy branding.
- Create a new Vazy logo: rejected because no logo has been approved and the existing text identity
  already covers this screen.

## Decision 2: Keep form state transient and local

**Decision**: Use one controlled native text input for each of full name, email, and phone, backed
by page-local values. The primary signup action receives no handler in this UI-only phase.

**Rationale**: Controlled inputs provide visible editing behavior while guaranteeing that no value
leaves page memory. `ThemedButton` already supports an enabled no-op action.

**Alternatives considered**:

- Add a form library or validation schema: rejected because validation and submission are outside
  the current scope.
- Store a shared signup draft: rejected because no cross-screen persistence is required.

## Decision 3: Use stack-aware navigation without duplicate history

**Decision**: Navigate from login to `/signup`; use replacement navigation from signup to `/login`
for the explicit **Sign In** link while preserving native Back from signup.

**Rationale**: Expo Router's stack navigation preserves the expected Back behavior, while replacing
signup for the explicit return avoids a login-signup-login history loop. This is supported by the
Expo SDK 57 Router navigation API already installed in the project.

**Alternatives considered**:

- Push login again from signup: rejected because it duplicates login in the route history.
- Add a custom authentication navigator: rejected because the existing flat stack already provides
  the required behavior.

## Decision 4: Keep validation integrated and user-owned

**Decision**: Run TypeScript and lint after implementation; the user validates visual fidelity,
keyboard behavior, accessibility, and navigation through the complete entry flow.

**Rationale**: The feature adds no non-trivial state logic or boundary adapter that warrants new
test infrastructure, and the user explicitly owns screen testing.

**Alternatives considered**:

- Add screenshot or form-test infrastructure: rejected because none exists and it exceeds this
  UI-only slice.
