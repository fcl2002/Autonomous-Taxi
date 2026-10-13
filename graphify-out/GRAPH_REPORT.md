# Graph Report - autonomous-taxi  (2026-10-08)

## Corpus Check
- 30 files · ~37,193 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .ttf 4)

## Summary
- 260 nodes · 319 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d598a0b8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- dependencies
- Execution Steps
- expo
- ThemedText
- speckit-analyze/SKILL.md
- speckit-plan/SKILL.md
- speckit-specify/SKILL.md
- speckit-tasks/SKILL.md
- tsconfig.json
- speckit-checklist/SKILL.md
- speckit-clarify/SKILL.md
- speckit-implement/SKILL.md
- scripts
- Welcome to your Expo app 👋
- speckit-constitution/SKILL.md
- app/AGENTS.md
- speckit-taskstoissues/SKILL.md
- Autonomous-Taxi
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `ThemedText()` - 17 edges
2. `ThemedButton()` - 12 edges
3. `expo` - 11 edges
4. `react-native` - 10 edges
5. `react-native-safe-area-context` - 9 edges
6. `expo-router` - 8 edges
7. `expo-status-bar` - 8 edges
8. `scripts` - 7 edges
9. `Execution Steps` - 7 edges
10. `4. Detection Passes (Token-Efficient Analysis)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Index()` --calls--> `ThemedText()`  [EXTRACTED]
  app/src/app/index.tsx → app/src/components/themed-text.tsx
- `Map()` --calls--> `ThemedText()`  [EXTRACTED]
  app/src/app/map.tsx → app/src/components/themed-text.tsx
- `Login()` --calls--> `ThemedButton()`  [EXTRACTED]
  app/src/app/login.tsx → app/src/components/themed-button.tsx
- `Login()` --calls--> `ThemedText()`  [EXTRACTED]
  app/src/app/login.tsx → app/src/components/themed-text.tsx
- `OnboardingLocation()` --calls--> `ThemedButton()`  [EXTRACTED]
  app/src/app/onboarding-location.tsx → app/src/components/themed-button.tsx

## Import Cycles
- None detected.

## Communities (20 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (33): { defineConfig }, expoConfig, devDependencies, eslint, eslint-config-expo, @types/react, typescript, main (+25 more)

### Community 1 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, expo, expo-constants, expo-device, expo-font, expo-glass-effect, expo-image, expo-linking (+16 more)

### Community 2 - "Execution Steps"
Cohesion: 0.12
Nodes (15): 1. Initialize Convergence Context, 2. Load Artifacts (Progressive Disclosure), 3. Build the Intent Inventory, 4. Assess the Codebase and Classify Findings, 5. Assign Severity, 6. Present the In-Session Findings Summary, 7. Append Convergence Tasks (or report converged), 8. Provide Next Actions (Handoff) (+7 more)

### Community 3 - "expo"
Cohesion: 0.12
Nodes (15): predictiveBackGestureEnabled, reactCompiler, typedRoutes, expo, android, experiments, name, orientation (+7 more)

### Community 4 - "ThemedText"
Cohesion: 0.13
Nodes (30): Index(), styles, Login(), styles, Map(), styles, OnboardingLocation(), styles (+22 more)

### Community 5 - "speckit-analyze/SKILL.md"
Cohesion: 0.08
Nodes (25): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+17 more)

### Community 7 - "speckit-plan/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, Key rules, Mandatory Post-Execution Hooks, Outline, Phase 0: Outline & Research, Phase 1: Design & Contracts, Phases (+2 more)

### Community 8 - "speckit-specify/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, For AI Generation, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, Quick Guidelines, Section Requirements (+2 more)

### Community 9 - "speckit-tasks/SKILL.md"
Cohesion: 0.18
Nodes (10): Checklist Format (REQUIRED), Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Phase Structure, Pre-Execution Checks, Task Generation Rules (+2 more)

### Community 10 - "tsconfig.json"
Cohesion: 0.22
Nodes (8): compilerOptions, paths, strict, exclude, extends, include, @/assets/*, expo/tsconfig.base

### Community 11 - "speckit-checklist/SKILL.md"
Cohesion: 0.25
Nodes (7): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", Example Checklist Types & Sample Items, Execution Steps, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 12 - "speckit-clarify/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 13 - "speckit-implement/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 14 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, android, ios, lint, reset-project, start, web

### Community 15 - "Welcome to your Expo app 👋"
Cohesion: 0.29
Nodes (6): Get a fresh project, Get started, Join the community, Learn more, Other setup steps, Welcome to your Expo app 👋

### Community 16 - "speckit-constitution/SKILL.md"
Cohesion: 0.33
Nodes (5): Outline, Post-Execution Checks, Pre-Execution Checks, Scope Guard, User Input

### Community 17 - "app/AGENTS.md"
Cohesion: 0.33
Nodes (5): Building with EAS, Commands, Expo has changed — do not trust your training data, Navigation & Routing, Rules

### Community 18 - "speckit-taskstoissues/SKILL.md"
Cohesion: 0.40
Nodes (4): Outline, Post-Execution Checks, Pre-Execution Checks, User Input

## Knowledge Gaps
- **188 isolated node(s):** `name`, `slug`, `version`, `orientation`, `scheme` (+183 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _188 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05855855855855856 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `ThemedText` to `package.json`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Execution Steps` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._