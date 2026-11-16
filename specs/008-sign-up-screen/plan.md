# Implementation Plan: Sign Up Screen

**Branch**: `008-sign-up-screen` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/008-sign-up-screen/spec.md`

## Summary

Add a responsive Vazy-branded `/signup` route based on Figma node `5:102`, using three controlled
native inputs and the existing themed text/button components. Make login's existing **Sign Up**
text navigate to the new page and make **Sign In** replace it with login. Keep the primary signup
action enabled but intentionally inert; add no validation, authentication, persistence, dependency,
or design asset.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK 57, Expo Router 57, React Native core components, `expo-status-bar`, `react-native-safe-area-context`

**Storage**: N/A; three form values exist only in component memory

**Testing**: `npx tsc --noEmit`, `npx expo lint`, and user-run integrated entry-flow validation

**Target Platform**: Expo-supported Android and iOS portrait phones

**Project Type**: Mobile application

**Performance Goals**: Sign up becomes fully visible within 300 milliseconds of link activation

**Constraints**: UI-only; fixed-light Vazy branding; keyboard-safe and accessible; no Qwiker asset, validation, account creation, Firebase, network request, storage, new dependency, `.gitignore` change, or implementation-agent screenshot testing

**Scale/Scope**: Add one flat route and modify one existing route

## Constitution Check

*GATE: Passed before Phase 0 and passed again after Phase 1 design.*

- **I. Safety Boundaries**: Pass. The local account UI cannot issue vehicle commands.
- **II. Contracts Define Every Boundary**: Pass. No external boundary is added; `contracts/ui-contract.md` documents local route and transient-input behavior.
- **III. UI First**: Pass. The complete visible signup state is implemented before authentication logic.
- **IV. Secure and Minimal Data Access**: Pass. Personal text stays in memory and is never sent, logged, or persisted.
- **V. Observable, Testable, and Simple**: Pass. Existing themed components, native inputs, and Expo Router are reused without a new abstraction or package.
- **Quality gate**: TypeScript and lint must pass for both touched routes before handoff.

## Project Structure

### Documentation (this feature)

```text
specs/008-sign-up-screen/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/src/
|-- app/
|   |-- login.tsx
|   `-- signup.tsx
|-- components/
|   |-- themed-button.tsx
|   `-- themed-text.tsx
`-- constants/
    `-- theme.ts
```

**Structure Decision**: Keep the new page as one flat Expo Router route beside login. Reuse
`ThemedText`, `ThemedButton`, the current login layout pattern, and local `StyleSheet` styles. Do
not introduce a shared form component until a second form demonstrates identical behavior rather
than merely similar appearance.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
