---

description: "Implementation tasks for shared themed entry-flow components"
---

# Tasks: Shared Themed Entry-Flow Components

**Input**: Design documents from `/specs/006-shared-themed-components/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/themed-components.md, quickstart.md

**Tests**: No automated test task is added because this presentation refactor contains no non-trivial state logic and the project has no configured test runner. Static checks and the integrated launch-to-login flow are required.

**Organization**: One user story covers the complete shared presentation refactor.

## Phase 1: Setup

**Purpose**: Protect the current in-progress UI work before refactoring it.

- [X] T001 Review and preserve existing copy, registered fonts, route behavior, and uncommitted user edits across `app/src/app/_layout.tsx`, `app/src/app/index.tsx`, `app/src/app/onboarding.tsx`, `app/src/app/onboarding-tracking.tsx`, `app/src/app/onboarding-location.tsx`, `app/src/app/login.tsx`, `app/src/constants/theme.ts`, and `app/src/components/themed-button.tsx`

---

## Phase 2: Foundational Components

**Purpose**: Establish the two shared primitives required by every entry-flow screen.

**CRITICAL**: Complete this phase before migrating the routes.

- [X] T002 Align the existing fixed-light Vazy font and color tokens needed by brand, heading, body, link, and primary-action roles while preserving registered font names in `app/src/constants/theme.ts`
- [X] T003 [P] Implement `ThemedText` with native text props, fixed-light entry-flow variants, configured fonts/colors, nested-text support, and caller style overrides in `app/src/components/themed-text.tsx`
- [X] T004 [P] Complete the existing `ThemedButton` with native pressable props, accessible button semantics, optional press handling for the enabled no-op login state, configured primary styling, and caller container/label style overrides in `app/src/components/themed-button.tsx`

**Checkpoint**: Shared text and primary-action contracts are available with no new dependency, hook, or runtime theme layer.

---

## Phase 3: User Story 1 - Consistent entry-flow presentation (Priority: P1)

**Goal**: Use the shared fixed-light Vazy typography and primary action across launch, onboarding, and login while preserving the complete flow and its current limitations.

**Independent Test**: Navigate launch -> onboarding -> tracking -> location -> login and confirm the same copy, artwork, form behavior, progress indicators, accessibility, layout, and destinations remain; activating **Send Code** must remain an enabled no-op.

### Implementation for User Story 1

- [X] T005 [P] [US1] Replace launch brand typography with `ThemedText` while preserving the full-screen press target, accessibility label, artwork, and `/onboarding` destination in `app/src/app/index.tsx`
- [X] T006 [P] [US1] Replace duplicated text and primary-action presentation with `ThemedText` and `ThemedButton`, retaining only page layout styles in `app/src/app/onboarding.tsx`
- [X] T007 [P] [US1] Replace duplicated text and primary-action presentation with `ThemedText` and `ThemedButton`, retaining only page layout styles in `app/src/app/onboarding-tracking.tsx`
- [X] T008 [P] [US1] Replace duplicated text and primary-action presentation with `ThemedText` and `ThemedButton`, retaining only page layout styles and the existing UI-only location limitation comment in `app/src/app/onboarding-location.tsx`
- [X] T009 [P] [US1] Replace brand, heading, guidance, sign-up prompt/link, and primary-action presentation with `ThemedText` and `ThemedButton`; preserve the phone input and render **Send Code** enabled with no press handler in `app/src/app/login.tsx`

**Checkpoint**: All five entry-flow screens use shared presentation and remain testable within the real navigation flow.

---

## Phase 4: Polish & Cross-Cutting Validation

**Purpose**: Prove the refactor preserved the current application.

- [X] T010 Run `npx tsc --noEmit` and `npx expo lint` from `app/`, fixing only errors introduced in the touched source files
- [X] T011 Execute the narrow and reference-size integrated flow in `specs/006-shared-themed-components/quickstart.md`, including the enabled no-op **Send Code** behavior, text fitting, artwork/form placement, accessibility, and unchanged route destinations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational Components (Phase 2)**: T002 follows T001; T003 and T004 can run in parallel after T002.
- **User Story 1 (Phase 3)**: T005-T009 depend on T003 and T004 and can then run in parallel because they touch different route files.
- **Validation (Phase 4)**: T010 follows all source edits; T011 follows T010.

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on the shared components from Phase 2; there are no other stories.

### Parallel Opportunities

```text
After T002:
  T003 app/src/components/themed-text.tsx
  T004 app/src/components/themed-button.tsx

After T003 and T004:
  T005 app/src/app/index.tsx
  T006 app/src/app/onboarding.tsx
  T007 app/src/app/onboarding-tracking.tsx
  T008 app/src/app/onboarding-location.tsx
  T009 app/src/app/login.tsx
```

---

## Implementation Strategy

### Complete Slice

1. Preserve current user edits and configured fonts.
2. Add only the two demonstrated shared primitives.
3. Migrate the five entry-flow screens.
4. Run static checks and validate the real launch-to-login flow.

The feature is intentionally one complete UI slice rather than an artificial MVP split.

## Notes

- Do not modify artwork assets, including `app/assets/images/onboarding-tracking.png`.
- Do not add runtime dark-mode behavior, a theme provider, a theme hook, a styling library, permission logic, Firebase logic, authentication logic, or new navigation.
- Keep **Send Code** enabled and no-op exactly as clarified; its logic belongs to a later feature.
- Preserve unrelated dirty work and the user's revised onboarding copy.
