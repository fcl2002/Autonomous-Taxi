# Graph Report - Autonomous-Taxi  (2026-11-18)

## Corpus Check
- 151 files · ~100,056 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 25 file(s) not represented in the graph (top: .ttf 19, (none) 6)

## Summary
- 1224 nodes · 1281 edges · 98 communities (90 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dcbe0064`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vazy-app/package.json
- Implementation Plan: Ride Map Screen
- Execution Steps
- Implementation Plan: Vazy Splash Screen
- ThemedText
- speckit-analyze/SKILL.md
- Implementation Plan: Phone Login Entry Screen
- speckit-plan/SKILL.md
- speckit-specify/SKILL.md
- speckit-tasks/SKILL.md
- vazy-app/tsconfig.json
- speckit-checklist/SKILL.md
- speckit-clarify/SKILL.md
- speckit-implement/SKILL.md
- Implementation Plan: Sign Up Screen
- Tasks: [FEATURE NAME]
- speckit-constitution/SKILL.md
- Implementation Plan: Onboarding Entry Screen
- speckit-taskstoissues/SKILL.md
- Implementation Plan: Onboarding Tracking Screen
- Vazy
- AGENTS.md
- Implementation Plan: Onboarding Location Consent Screen
- Implementation Plan: Shared Themed Entry-Flow Components
- dependencies
- Implementation Plan: Fix Tracking Layout
- expo
- Tasks: Onboarding Entry Screen
- Tasks: Onboarding Tracking Screen
- Tasks: Onboarding Location Consent Screen
- Tasks: Phone Login Entry Screen
- common.ps1
- Tasks: Vazy Splash Screen
- Tasks: Sign Up Screen
- Tasks: Ride Map Screen
- UI Contract: Onboarding Tracking Screen
- UI Contract: Onboarding Location Consent Screen
- Tasks: Fix Tracking Layout
- Feature Specification: [FEATURE NAME]
- Tasks: Shared Themed Entry-Flow Components
- Build list
- Core Principles
- .claude/skills/speckit-analyze/SKILL.md
- Implementation Plan: [FEATURE]
- UI Contract: Phone Login Entry Screen
- UI Contract: Vazy Splash Screen
- Research: Vazy Splash Screen
- Quickstart: Validate the Onboarding Entry Screen
- Research: Onboarding Entry Screen
- Research: Onboarding Location Consent Screen
- map.tsx
- Quickstart: Validate the Vazy Splash Screen
- UI Contract: Splash to First Onboarding Page
- Research: Onboarding Tracking Screen
- Research: Phone Login Entry Screen
- Research: Ride Map Screen
- How to Run the Current Version
- create-new-feature.ps1
- Data Model: Onboarding Entry Screen
- Quickstart: Phone Login Entry Screen
- UI Contract: Sign Up Screen
- UI Contract: Ride Map Screen
- vazy-app/AGENTS.md
- [CHECKLIST TYPE] Checklist: [FEATURE NAME]
- Data Model: Vazy Splash Screen
- Data Model: Phone Login Entry Screen
- UI Contract: Themed Components
- Quickstart: Validate Shared Themed Onboarding Components
- Execution Steps
- UI Contract: Tracking Onboarding Layout
- Quickstart: Validate Tracking Layout Fix
- Research: Fix Tracking Layout
- Quickstart: Validate Sign Up Screen
- Quickstart: Validate Ride Map Screen
- Data Model: Onboarding Tracking Screen
- Data Model: Onboarding Location Consent Screen
- Data Model: Sign Up Screen
- Data Model: Ride Map Screen
- 006-shared-themed-components/data-model.md
- 007-fix-tracking-layout/data-model.md
- backend/package.json
- compilerOptions
- .claude/skills/speckit-plan/SKILL.md
- .claude/skills/speckit-specify/SKILL.md
- .claude/skills/speckit-tasks/SKILL.md
- .claude/skills/speckit-checklist/SKILL.md
- .claude/skills/speckit-clarify/SKILL.md
- .claude/skills/speckit-implement/SKILL.md
- .claude/skills/speckit-constitution/SKILL.md
- .claude/skills/speckit-taskstoissues/SKILL.md
- Implementation Plan: Signed-Out Onboarding
- Research: Signed-Out Onboarding
- Research: Shared Themed Entry-Flow Components
- Data Model: Signed-Out Onboarding

## God Nodes (most connected - your core abstractions)
1. `ThemedText()` - 24 edges
2. `ThemedButton()` - 21 edges
3. `Tasks: [FEATURE NAME]` - 13 edges
4. `expo` - 12 edges
5. `Tasks: Onboarding Entry Screen` - 12 edges
6. `react-native` - 11 edges
7. `Tasks: Onboarding Tracking Screen` - 11 edges
8. `Tasks: Onboarding Location Consent Screen` - 11 edges
9. `Tasks: Phone Login Entry Screen` - 10 edges
10. `Tasks: Sign Up Screen` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Decision 3: Reuse the installed image renderer` --references--> `ThemedText()`  [INFERRED]
  specs/009-ride-map-screen/research.md → vazy-app/src/components/themed-text.tsx
- `Decision 2: Keep form state transient and local` --references--> `ThemedButton()`  [INFERRED]
  specs/008-sign-up-screen/research.md → vazy-app/src/components/themed-button.tsx
- `Decision 1: Share only repeated text and button presentation` --references--> `ThemedButton()`  [INFERRED]
  specs/006-shared-themed-components/research.md → vazy-app/src/components/themed-button.tsx
- `Implementation for User Story 1` --references--> `ThemedButton()`  [INFERRED]
  specs/006-shared-themed-components/tasks.md → vazy-app/src/components/themed-button.tsx
- `Phase 2: Foundational Components` --references--> `ThemedButton()`  [INFERRED]
  specs/006-shared-themed-components/tasks.md → vazy-app/src/components/themed-button.tsx

## Import Cycles
- None detected.

## Communities (98 total, 8 thin omitted)

### Community 0 - "vazy-app/package.json"
Cohesion: 0.04
Nodes (44): eslint, eslint-config-expo, expo, expo-build-properties, expo-constants, expo-dev-client, expo-device, expo-font (+36 more)

### Community 1 - "Implementation Plan: Ride Map Screen"
Cohesion: 0.07
Nodes (26): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Ride Map Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+18 more)

### Community 2 - "Execution Steps"
Cohesion: 0.12
Nodes (15): 1. Initialize Convergence Context, 2. Load Artifacts (Progressive Disclosure), 3. Build the Intent Inventory, 4. Assess the Codebase and Classify Findings, 5. Assign Severity, 6. Present the In-Session Findings Summary, 7. Append Convergence Tasks (or report converged), 8. Provide Next Actions (Handoff) (+7 more)

### Community 3 - "Implementation Plan: Vazy Splash Screen"
Cohesion: 0.07
Nodes (25): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Vazy Splash Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+17 more)

### Community 4 - "ThemedText"
Cohesion: 0.08
Nodes (45): expo-router, expo-status-bar, firebase, react, react-native, react-native-safe-area-context, Decision 1: Share only repeated text and button presentation, Implementation for User Story 1 (+37 more)

### Community 5 - "speckit-analyze/SKILL.md"
Cohesion: 0.08
Nodes (25): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+17 more)

### Community 6 - "Implementation Plan: Phone Login Entry Screen"
Cohesion: 0.07
Nodes (25): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Phone Login Entry Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+17 more)

### Community 7 - "speckit-plan/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, Key rules, Mandatory Post-Execution Hooks, Outline, Phase 0: Outline & Research, Phase 1: Design & Contracts, Phases (+2 more)

### Community 8 - "speckit-specify/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, For AI Generation, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, Quick Guidelines, Section Requirements (+2 more)

### Community 9 - "speckit-tasks/SKILL.md"
Cohesion: 0.18
Nodes (10): Checklist Format (REQUIRED), Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Phase Structure, Pre-Execution Checks, Task Generation Rules (+2 more)

### Community 10 - "vazy-app/tsconfig.json"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, paths, strict, exclude, extends, include (+2 more)

### Community 11 - "speckit-checklist/SKILL.md"
Cohesion: 0.25
Nodes (7): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", Example Checklist Types & Sample Items, Execution Steps, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 12 - "speckit-clarify/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 13 - "speckit-implement/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 14 - "Implementation Plan: Sign Up Screen"
Cohesion: 0.07
Nodes (25): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Sign Up Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+17 more)

### Community 15 - "Tasks: [FEATURE NAME]"
Cohesion: 0.07
Nodes (26): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery, MVP First (User Story 1 Only) (+18 more)

### Community 16 - "speckit-constitution/SKILL.md"
Cohesion: 0.33
Nodes (5): Outline, Post-Execution Checks, Pre-Execution Checks, Scope Guard, User Input

### Community 17 - "Implementation Plan: Onboarding Entry Screen"
Cohesion: 0.07
Nodes (24): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Onboarding Entry Screen, Constitution Check, Documentation (this feature), Implementation Plan: Onboarding Entry Screen (+16 more)

### Community 18 - "speckit-taskstoissues/SKILL.md"
Cohesion: 0.40
Nodes (4): Outline, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 19 - "Implementation Plan: Onboarding Tracking Screen"
Cohesion: 0.07
Nodes (24): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Onboarding Tracking Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+16 more)

### Community 20 - "Vazy"
Cohesion: 0.50
Nodes (3): Documentation, Overview, Vazy

### Community 22 - "Implementation Plan: Onboarding Location Consent Screen"
Cohesion: 0.07
Nodes (24): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Onboarding Location Consent Screen, Complexity Tracking, Constitution Check, Documentation (this feature) (+16 more)

### Community 23 - "Implementation Plan: Shared Themed Entry-Flow Components"
Cohesion: 0.07
Nodes (24): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Shared Themed Onboarding Components, Complexity Tracking, Constitution Check, Documentation (this feature) (+16 more)

### Community 24 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, expo, expo-build-properties, expo-constants, expo-dev-client, expo-device, expo-font, expo-glass-effect (+21 more)

### Community 25 - "Implementation Plan: Fix Tracking Layout"
Cohesion: 0.08
Nodes (23): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Fix Tracking Layout, Complexity Tracking, Constitution Check, Documentation (this feature) (+15 more)

### Community 26 - "expo"
Cohesion: 0.10
Nodes (20): package, permissions, predictiveBackGestureEnabled, reactCompiler, typedRoutes, expo, android, experiments (+12 more)

### Community 27 - "Tasks: Onboarding Entry Screen"
Cohesion: 0.11
Nodes (18): Dependencies & Execution Order, Dependency Graph, Format: `[ID] [P?] [Story] Description`, Implementation Strategy, Incremental Delivery, MVP First, Notes, Parallel Example: User Story 2 (+10 more)

### Community 28 - "Tasks: Onboarding Tracking Screen"
Cohesion: 0.11
Nodes (18): Complete This Screen Increment, Dependencies and Execution Order, First Independently Testable Slice, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation Strategy, Notes (+10 more)

### Community 29 - "Tasks: Onboarding Location Consent Screen"
Cohesion: 0.11
Nodes (18): Complete Screen, Dependencies & Execution Order, First Increment: Navigation, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation Strategy, Notes (+10 more)

### Community 30 - "Tasks: Phone Login Entry Screen"
Cohesion: 0.11
Nodes (17): Complete Login Entry, Dependencies & Execution Order, Flow Connection, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation Strategy, Notes (+9 more)

### Community 31 - "common.ps1"
Cohesion: 0.23
Nodes (13): Find-SpecifyRoot(), Format-SpecKitCommand(), Get-CurrentBranch(), Get-FeaturePathsEnv(), Get-InvokeSeparator(), Get-NormalizedPriority(), Get-Python3Command(), Get-RepoRoot() (+5 more)

### Community 32 - "Tasks: Vazy Splash Screen"
Cohesion: 0.12
Nodes (15): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation, Implementation Strategy, MVP first, Parallel Example, Phase 1: Setup, Phase 2: Foundational (+7 more)

### Community 33 - "Tasks: Sign Up Screen"
Cohesion: 0.12
Nodes (15): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation, Implementation, Implementation Strategy, Notes, Parallel Example, Phase 1: Setup and Foundation (+7 more)

### Community 34 - "Tasks: Ride Map Screen"
Cohesion: 0.12
Nodes (15): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation, Implementation, Implementation, Implementation Strategy, Notes, Parallel Example (+7 more)

### Community 35 - "UI Contract: Onboarding Tracking Screen"
Cohesion: 0.14
Nodes (12): Accessibility contract, Back transition, Failure behavior, Forward transition, Route contract, Tracking-page rendering contract, UI Contract: Onboarding Tracking Screen, Increment checks (+4 more)

### Community 36 - "UI Contract: Onboarding Location Consent Screen"
Cohesion: 0.14
Nodes (12): Accessibility contract, Back transition, Failure behavior, Final-page rendering contract, Forward transition, Route contract, UI Contract: Onboarding Location Consent Screen, Increment checks (+4 more)

### Community 37 - "Tasks: Fix Tracking Layout"
Cohesion: 0.14
Nodes (13): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation, Implementation Strategy, Notes, Parallel Opportunities, Phase 1: Setup, Phase 2: Foundational (+5 more)

### Community 38 - "Feature Specification: [FEATURE NAME]"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 39 - "Tasks: Shared Themed Entry-Flow Components"
Cohesion: 0.17
Nodes (11): Complete Slice, Dependencies & Execution Order, Implementation Strategy, Notes, Parallel Opportunities, Phase 1: Setup, Phase 3: User Story 1 - Consistent entry-flow presentation (Priority: P1), Phase 4: Polish & Cross-Cutting Validation (+3 more)

### Community 40 - "Build list"
Cohesion: 0.08
Nodes (24): 0. Contracts (`v1`), before any code, 1. Firebase project, 2. Authentication, 3. Firestore data model, 4. Security Rules (test allowed and denied cases in the emulator), 5. Backend service (ride orchestrator), 6. MQTT, 7. Checks (the smallest set that catches regressions) (+16 more)

### Community 41 - "Core Principles"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 42 - ".claude/skills/speckit-analyze/SKILL.md"
Cohesion: 0.08
Nodes (25): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+17 more)

### Community 43 - "Implementation Plan: [FEATURE]"
Cohesion: 0.22
Nodes (8): Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root), Summary, Technical Context

### Community 44 - "UI Contract: Phone Login Entry Screen"
Cohesion: 0.22
Nodes (8): Back transition, Failure behavior, Forward transition, Input contract, Login rendering contract, Route contract, Static-treatment contract, UI Contract: Phone Login Entry Screen

### Community 45 - "UI Contract: Vazy Splash Screen"
Cohesion: 0.25
Nodes (7): Accessibility, Availability and performance, Entry, Exclusions, Responsive behavior, UI Contract: Vazy Splash Screen, Visible output

### Community 46 - "Research: Vazy Splash Screen"
Cohesion: 0.25
Nodes (7): Decision 1: Use the index route for the complete design, Decision 2: Bundle one raster illustration locally, Decision 3: Use existing layout primitives and system typography, Decision 4: Preserve native system UI and accessibility, Decision 5: Do not add a test framework for a static layout, Decision 6: Remove invalid template asset references without creating branding, Research: Vazy Splash Screen

### Community 47 - "Quickstart: Validate the Onboarding Entry Screen"
Cohesion: 0.25
Nodes (7): Offline Validation, P1: Splash-to-Onboarding Transition, P2: Onboarding Presentation, Prerequisites, Quickstart: Validate the Onboarding Entry Screen, Run the App, Static Validation

### Community 48 - "Research: Onboarding Entry Screen"
Cohesion: 0.25
Nodes (7): Figma Assets, Provisional Copy and Call-to-Action, Research: Onboarding Entry Screen, Responsive Composition, Route Transition, Splash Interaction and Accessibility, Verification

### Community 49 - "Research: Onboarding Location Consent Screen"
Cohesion: 0.25
Nodes (7): Decision 1: Reuse Expo Router `navigate`, Decision 2: Preserve each supplied illustration layer, Decision 3: Keep permission and LGPD logic absent, Decision 4: Follow existing native accessibility patterns, Decision 5: Keep the final screen standalone, Decision 6: Stage final acceptance with the complete first flow, Research: Onboarding Location Consent Screen

### Community 50 - "map.tsx"
Cohesion: 0.11
Nodes (20): STOP_IDS, legs, stops, CIRCUIT, MapScreen(), ORIGIN, styles, LEGS (+12 more)

### Community 51 - "Quickstart: Validate the Vazy Splash Screen"
Cohesion: 0.29
Nodes (6): Acceptance matrix, Implementation validation: 2026-10-06, Prerequisites, Quickstart: Validate the Vazy Splash Screen, Run the screen, Static checks

### Community 52 - "UI Contract: Splash to First Onboarding Page"
Cohesion: 0.29
Nodes (6): Layout Contract, Offline and Failure Contract, Onboarding Presentation Contract, Route Contract, Splash Activation Contract, UI Contract: Splash to First Onboarding Page

### Community 53 - "Research: Onboarding Tracking Screen"
Cohesion: 0.29
Nodes (6): Decision 1: Use Expo Router `navigate`, Decision 2: Preserve native accessibility semantics, Decision 3: Add only the unique illustration, Decision 4: Keep the second screen standalone, Decision 5: Stage acceptance with the complete first flow, Research: Onboarding Tracking Screen

### Community 54 - "Research: Phone Login Entry Screen"
Cohesion: 0.29
Nodes (6): Decision 1: Reuse Expo Router `navigate`, Decision 2: Use native keyboard and phone-input behavior, Decision 3: Keep unfinished destinations visibly static, Decision 4: Adapt identity without adding an asset, Decision 5: Validate the whole first flow now, Research: Phone Login Entry Screen

### Community 55 - "Research: Ride Map Screen"
Cohesion: 0.29
Nodes (6): Decision 1: Build a static composition, not a map integration, Decision 2: Bundle every visible design asset locally, Decision 3: Reuse the installed image renderer, Decision 4: Connect signup without pretending authentication succeeded, Decision 5: Keep screen testing user-owned, Research: Ride Map Screen

### Community 56 - "How to Run the Current Version"
Cohesion: 0.33
Nodes (5): 1. Clone the repository, 1. Instal dependencies, 2. Building the project, 3. Running, How to Run the Current Version

### Community 58 - "Data Model: Onboarding Entry Screen"
Cohesion: 0.33
Nodes (5): App Screen, Data Model: Onboarding Entry Screen, Domain Data, Onboarding Presentation, Transient Presentation State

### Community 59 - "Quickstart: Phone Login Entry Screen"
Cohesion: 0.33
Nodes (5): Integrated flow validation, Prerequisites, Quickstart: Phone Login Entry Screen, Required test matrix, Static validation

### Community 60 - "UI Contract: Sign Up Screen"
Cohesion: 0.33
Nodes (5): Deferred behavior, Input contract, Presentation contract, Route contract, UI Contract: Sign Up Screen

### Community 61 - "UI Contract: Ride Map Screen"
Cohesion: 0.33
Nodes (5): Deferred behavior, Map contract, Route contract, Sheet contract, UI Contract: Ride Map Screen

### Community 62 - "vazy-app/AGENTS.md"
Cohesion: 0.33
Nodes (5): Building with EAS, Commands, Expo has changed — do not trust your training data, Navigation & Routing, Rules

### Community 63 - "[CHECKLIST TYPE] Checklist: [FEATURE NAME]"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 64 - "Data Model: Vazy Splash Screen"
Cohesion: 0.40
Nodes (4): Data Model: Vazy Splash Screen, Display inputs, Domain entities, State transitions

### Community 65 - "Data Model: Phone Login Entry Screen"
Cohesion: 0.40
Nodes (4): Data Model: Phone Login Entry Screen, Phone Login Draft, Presentation values, Transient navigation state

### Community 66 - "UI Contract: Themed Components"
Cohesion: 0.40
Nodes (4): Compatibility, ThemedButton, ThemedText, UI Contract: Themed Components

### Community 67 - "Quickstart: Validate Shared Themed Onboarding Components"
Cohesion: 0.40
Nodes (4): Integrated flow validation, Prerequisites, Quickstart: Validate Shared Themed Onboarding Components, Static validation

### Community 68 - "Execution Steps"
Cohesion: 0.12
Nodes (15): 1. Initialize Convergence Context, 2. Load Artifacts (Progressive Disclosure), 3. Build the Intent Inventory, 4. Assess the Codebase and Classify Findings, 5. Assign Severity, 6. Present the In-Session Findings Summary, 7. Append Convergence Tasks (or report converged), 8. Provide Next Actions (Handoff) (+7 more)

### Community 69 - "UI Contract: Tracking Onboarding Layout"
Cohesion: 0.40
Nodes (4): Compatibility, Responsive behavior, UI Contract: Tracking Onboarding Layout, Visual order

### Community 70 - "Quickstart: Validate Tracking Layout Fix"
Cohesion: 0.40
Nodes (4): Prerequisites, Quickstart: Validate Tracking Layout Fix, Static validation, User-run screen validation

### Community 71 - "Research: Fix Tracking Layout"
Cohesion: 0.40
Nodes (4): Decision 1: Correct containment at the source, Decision 2: Keep the correction local, Decision 3: Use existing validation ownership, Research: Fix Tracking Layout

### Community 72 - "Quickstart: Validate Sign Up Screen"
Cohesion: 0.40
Nodes (4): Prerequisites, Quickstart: Validate Sign Up Screen, Static validation, User-run integrated validation

### Community 73 - "Quickstart: Validate Ride Map Screen"
Cohesion: 0.40
Nodes (4): Prerequisites, Quickstart: Validate Ride Map Screen, Static validation, User-run integrated validation

### Community 74 - "Data Model: Onboarding Tracking Screen"
Cohesion: 0.50
Nodes (3): Data Model: Onboarding Tracking Screen, Presentation values, Transient navigation state

### Community 75 - "Data Model: Onboarding Location Consent Screen"
Cohesion: 0.50
Nodes (3): Data Model: Onboarding Location Consent Screen, Presentation values, Transient navigation state

### Community 76 - "Data Model: Sign Up Screen"
Cohesion: 0.50
Nodes (3): Data Model: Sign Up Screen, Lifecycle, Sign-Up Draft

### Community 77 - "Data Model: Ride Map Screen"
Cohesion: 0.50
Nodes (3): Data Model: Ride Map Screen, State transitions, Static Map Preview

### Community 84 - "backend/package.json"
Cohesion: 0.14
Nodes (13): devDependencies, @types/node, typescript, engines, node, typescript, name, private (+5 more)

### Community 85 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, module, noEmit, strict, target, types (+1 more)

### Community 86 - ".claude/skills/speckit-plan/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, Key rules, Mandatory Post-Execution Hooks, Outline, Phase 0: Outline & Research, Phase 1: Design & Contracts, Phases (+2 more)

### Community 87 - ".claude/skills/speckit-specify/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, For AI Generation, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, Quick Guidelines, Section Requirements (+2 more)

### Community 88 - ".claude/skills/speckit-tasks/SKILL.md"
Cohesion: 0.18
Nodes (10): Checklist Format (REQUIRED), Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Phase Structure, Pre-Execution Checks, Task Generation Rules (+2 more)

### Community 89 - ".claude/skills/speckit-checklist/SKILL.md"
Cohesion: 0.25
Nodes (7): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", Example Checklist Types & Sample Items, Execution Steps, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 90 - ".claude/skills/speckit-clarify/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 91 - ".claude/skills/speckit-implement/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 92 - ".claude/skills/speckit-constitution/SKILL.md"
Cohesion: 0.33
Nodes (5): Outline, Post-Execution Checks, Pre-Execution Checks, Scope Guard, User Input

### Community 93 - ".claude/skills/speckit-taskstoissues/SKILL.md"
Cohesion: 0.40
Nodes (4): Outline, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 94 - "Implementation Plan: Signed-Out Onboarding"
Cohesion: 0.05
Nodes (32): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Signed-Out Onboarding, Failure behaviour, Guarantees, Navigation Contract: Signed-Out Onboarding (v1) (+24 more)

### Community 95 - "Research: Signed-Out Onboarding"
Cohesion: 0.33
Nodes (5): R1. How routes are gated by session, R2. Knowing the session at launch without flashing a screen, R3. Navigation after login and sign-up, R4. Logout and invalidation, Research: Signed-Out Onboarding

### Community 96 - "Research: Shared Themed Entry-Flow Components"
Cohesion: 0.40
Nodes (4): Decision 2: Reuse React Native props directly, Decision 3: Keep the current theme synchronous and local, Decision 4: Validate the real flow, Research: Shared Themed Entry-Flow Components

### Community 97 - "Data Model: Signed-Out Onboarding"
Cohesion: 0.50
Nodes (3): Data Model: Signed-Out Onboarding, Passenger session (in memory, in the root layout), Transitions

## Knowledge Gaps
- **804 isolated node(s):** `name`, `private`, `type`, `node`, `start` (+799 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 869 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemedText()` connect `ThemedText` to `map.tsx`, `Research: Ride Map Screen`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `ThemedText()` (e.g. with `Decision 1: Share only repeated text and button presentation` and `Implementation for User Story 1`) actually correct?**
  _`ThemedText()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _804 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `vazy-app/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `vazy-app/package.json`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `ThemedButton()` (e.g. with `Decision 1: Share only repeated text and button presentation` and `Implementation for User Story 1`) actually correct?**
  _`ThemedButton()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Should `Implementation Plan: Ride Map Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._