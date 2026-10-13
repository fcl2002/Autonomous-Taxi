# Implementation Plan: Onboarding Location Consent Screen

**Branch**: `004-onboarding-location-consent` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-onboarding-location-consent/spec.md`

## Summary

Connect the existing tracking introduction to a new final onboarding route matching Figma node
`5:2`. Use Expo Router's existing stack with `router.navigate`, one accessible `Pressable` on the
tracking page, a safe-area-aware final screen, and the exact local Figma illustration layers. Keep
the final `Allow Location` treatment static: this increment does not request permission, record
LGPD consent, or navigate to login.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3  
**Primary Dependencies**: Expo SDK 57, Expo Router 57, `expo-status-bar`, `react-native-safe-area-context`  
**Storage**: N/A; no consent, permission, location, or onboarding state is persisted  
**Testing**: Expo lint, `tsc --noEmit`, Expo Doctor, Expo export, then the manual checks in `quickstart.md`  
**Target Platform**: iOS and Android portrait phones supported by Expo SDK 57  
**Project Type**: React Native mobile application  
**Performance Goals**: The complete final page is visible within 300 milliseconds of activation  
**Constraints**: Offline-capable; accessible tracking CTA; decorative illustration is silent;
one Back action returns to tracking; no duplicate final route; final CTA is visual-only; no
location permission, consent persistence, Firebase, backend, MQTT, or hardware access; do not
modify existing asset inclusion or exclusion configuration  
**Scale/Scope**: Modify one route, add one route, and add five exact local illustration layers from
the referenced Figma design

## Constitution Check

*GATE: Passed before Phase 0 research and re-checked after Phase 1 design.*

| Principle or gate | Plan evidence | Result |
|---|---|---|
| I. Safety boundaries | This UI-only feature sends no command and touches no vehicle boundary. | Pass |
| II. Contracts | `contracts/ui-contract.md` defines local routes and presentation behavior; no external contract changes. | Pass |
| III. UI-first slices | The complete visible screen uses bundled assets before any permission or consent logic is introduced. | Pass |
| IV. Secure/minimal data | The feature neither requests nor stores consent, permission, personal data, or location. | Pass |
| V. Observable/testable/simple | Existing router, safe-area, status-bar, image, text, and pressable patterns are reused; no package or abstraction is added. | Pass |
| Touched-component checks | Lint, TypeScript, Expo Doctor, and export are required before handoff. | Pass |
| Deferred acceptance | Device, screen-reader, timing, offline installed-build, and reviewer matrices remain tracked until the onboarding-to-login flow exists. | Pass with tracked exception |

The post-design re-check found no boundary adapter, persistent data, external integration, or
non-trivial custom state. The five illustration files reflect five separate visible Figma layers,
not speculative decomposition. No constitution violation requires complexity justification.

## Project Structure

### Documentation (this feature)

```text
specs/004-onboarding-location-consent/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- tasks.md                 # Generated later by speckit-tasks
```

### Source Code (repository root)

```text
app/
|-- assets/images/
|   |-- onboarding-location-background.png
|   |-- onboarding-location-person.png
|   |-- onboarding-location-globe-ring.png
|   |-- onboarding-location-globe.png
|   `-- onboarding-location-pin.png
`-- src/app/
    |-- _layout.tsx                      # existing root Stack; unchanged
    |-- onboarding-tracking.tsx          # make the existing CTA actionable
    `-- onboarding-location.tsx          # add the final onboarding page
```

**Structure Decision**: Keep Expo Router's existing flat file-based routes. Layer the supplied
Figma exports in one local illustration stage because the design stores them as separate visible
siblings. Do not add a carousel, shared onboarding abstraction, navigation store, location module,
or any `.gitignore` change.

## Complexity Tracking

No constitution violations.
