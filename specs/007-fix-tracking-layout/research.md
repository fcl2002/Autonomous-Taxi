# Research: Fix Tracking Layout

## Decision 1: Correct containment at the source

**Decision**: Constrain the illustration to the vertical region allocated by the existing flex
layout, then rebalance that region so the visible artwork sits slightly higher while the progress
region remains below it in normal document order.

**Rationale**: The illustration currently derives its height from full screen width. On shorter
portrait screens that height can exceed its flex region and visibly overflow into the following
progress region. Constraining it at the image boundary fixes every supported height without adding
device-specific offsets.

**Alternatives considered**:

- Add a negative translation or absolute position: rejected because it hides the overflow symptom
  and can create new overlap on other screen sizes.
- Add device-height breakpoints: rejected because native flexible sizing can solve the current
  requirement with less code and fewer layout branches.

## Decision 2: Keep the correction local

**Decision**: Change only layout styles in `app/src/app/onboarding-tracking.tsx` and preserve the
existing elements and their reading order.

**Rationale**: No other page shares this exact illustration geometry. A reusable layout component
or new dependency would add configuration without demonstrated reuse.

**Alternatives considered**:

- Create a shared onboarding artwork component: rejected because the onboarding pages use
  different compositions and spacing.
- Modify the PNG to add or remove transparent space: rejected because the approved asset must
  remain unchanged and responsive containment belongs to page layout.

## Decision 3: Use existing validation ownership

**Decision**: Run the repository's TypeScript and lint checks after implementation; the user will
perform the requested visual screen validation on supported portrait sizes.

**Rationale**: The change contains no non-trivial state logic requiring a new automated test, and
the user explicitly owns screen testing. Static checks catch invalid styles and regressions without
introducing preview or screenshot tooling.

**Alternatives considered**:

- Add screenshot testing infrastructure: rejected because none exists and the user requested no
  implementation-agent visual testing.
