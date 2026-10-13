<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Added principles:
  - I. Safety Boundaries Are Non-Negotiable
  - II. Contracts Define Every Boundary
  - III. UI First, Then One Working Slice at a Time
  - IV. Secure and Minimal Data Access
  - V. Observable, Testable, and Simple
- Added sections:
  - Architecture and Technology Constraints
  - Delivery Workflow and Quality Gates
- Removed sections: none
- Follow-up TODOs: none
-->
# Autonomous Taxi Constitution

## Core Principles

### I. Safety Boundaries Are Non-Negotiable
The mobile app and Firebase MUST never command motors or low-level actuators directly. Vehicle
commands MUST follow the defined chain: backend, MQTT broker, Raspberry Pi mission manager, then
STM32 over UART or CAN. The STM32 and Raspberry Pi MUST retain local stop and safe-state behavior
when the app, Firebase, backend, network, or MQTT connection is unavailable. Every test involving
physical motion MUST provide an immediately accessible human stop mechanism. The project MUST be
described and operated as a supervised prototype, not as a production road vehicle.

Rationale: cloud and mobile systems are not deterministic safety controllers; faults must stop at
the boundary before they can create uncontrolled physical motion.

### II. Contracts Define Every Boundary
Each boundary in the architecture MUST have a documented, versioned contract before integration:
Firebase ride and status records, Firebase events, MQTT topics and payloads, and UART or CAN
messages. Contracts MUST define required fields, identifiers, units, timestamps, allowed state
transitions, and failure behavior. Producers MUST validate outgoing data, consumers MUST validate
incoming data, and commands that may be retried MUST be idempotent or carry a deduplication key.
Breaking contract changes require a migration or coordinated version change across affected
components.

Rationale: independently developed app, cloud, navigation, and control layers can interoperate
reliably only through explicit contracts.

### III. UI First, Then One Working Slice at a Time
App work MUST begin with screens and their complete visible states using local fixture data. Each
screen MUST cover loading, empty, success, and failure states where applicable. Firebase logic MUST
then be connected one user flow at a time, replacing fixtures without redesigning unrelated
screens. A flow is complete only when the user action, Firebase data, backend event, and returned
status are demonstrated end to end. Hardware integration MUST NOT be added to a flow before its
app and cloud contract is stable.

Rationale: incremental vertical slices provide usable demonstrations early and isolate integration
failures to one flow.

### IV. Secure and Minimal Data Access
Firebase Authentication and Security Rules MUST enforce least privilege for every non-public
collection. The mobile app MUST use only client-safe Firebase configuration and MUST NOT contain
service credentials, backend secrets, broker credentials, or privileged hardware commands.
Privileged state transitions MUST be validated by the backend. Logs and fixtures MUST NOT contain
secrets or unnecessary personal data. Data retained for demonstrations MUST be the minimum needed
and removable without manual database surgery.

Rationale: a prototype still crosses trust boundaries and must not make insecure behavior part of
the architecture.

### V. Observable, Testable, and Simple
Every ride and mission MUST use a shared correlation identifier across Firebase, backend events,
MQTT messages, and device logs. State transitions and failures MUST be observable without exposing
secrets. Non-trivial state logic and every boundary adapter MUST have the smallest automated check
that detects a regression; hardware-dependent behavior MAY use a simulator or recorded fixture.
Implementations MUST reuse repository patterns, platform features, and installed dependencies
before adding abstractions or packages. Speculative flexibility and unused infrastructure are
prohibited.

Rationale: traceable, focused code is faster to diagnose and safer to evolve during prototype
integration.

## Architecture and Technology Constraints

- The app MUST use React Native with TypeScript and the existing Expo toolchain.
- Firebase is the app-facing store for ride requests and observable status. The backend MUST own
  privileged validation and orchestration; the app MUST NOT use Firebase as a hardware command
  channel.
- Backend-to-vehicle messaging MUST pass through the MQTT broker. Raspberry Pi navigation and
  mission management MUST translate mission commands for the STM32; the STM32 MUST own low-level
  motor, sensor, and encoder control.
- LiDAR processing and navigation decisions belong on the Raspberry Pi unless a documented test
  proves a different boundary is required. Hard real-time actuation belongs on the STM32.
- Network loss, duplicate delivery, delayed status, and component restart MUST be treated as normal
  operating conditions and handled according to the relevant contract.
- New infrastructure or dependencies require a demonstrated current need and an explanation of
  why the existing stack cannot meet it.

## Delivery Workflow and Quality Gates

1. Specify one user-visible flow, its states, and the contracts it crosses.
2. Implement and review the screen with fixture data, including applicable accessibility labels,
   loading, empty, success, and error states.
3. Add the smallest automated checks for non-trivial state logic and boundary validation.
4. Connect Firebase for that flow and verify Security Rules with allowed and denied cases.
5. Integrate the backend and, only when needed, the MQTT and hardware path using the same contract.
6. Demonstrate the happy path plus loss of connectivity, invalid input, duplicate messages, and a
   safe stop where physical motion is involved.

A change MUST pass TypeScript checks and existing lint or test commands for the touched component.
Contract changes MUST identify every affected producer and consumer. Physical tests MUST record the
software versions, hardware configuration, operator, and observed safe-state result. Work that
cannot meet a gate MUST document the exception, risk, owner, and removal condition before merge.

## Governance

This constitution governs all project specifications, plans, tasks, reviews, and implementation
decisions. When another project document conflicts with it, this constitution takes precedence.

Amendments MUST be proposed as a documented change to this file, state the reason and migration
impact, and be approved by the project maintainers before dependent work is merged. Versions follow
semantic versioning: MAJOR for incompatible governance changes or principle removals, MINOR for new
principles or materially expanded obligations, and PATCH for clarifications with no change in
meaning.

Every feature plan and code review MUST verify the relevant principles and quality gates. Reviewers
MUST reject unexplained violations. Approved exceptions MUST be explicit, time-bounded, and tracked
to resolution. The Sync Impact Report at the top is review scratch material and MUST be removed
before committing the amendment.

**Version**: 1.0.0 | **Ratified**: 2026-10-06 | **Last Amended**: 2026-10-06
