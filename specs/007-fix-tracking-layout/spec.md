# Feature Specification: Fix Tracking Layout

**Feature Branch**: `007-fix-tracking-layout`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Fix the second onboarding page so the centered illustration sits slightly higher and the timeline appears beneath it without overlap."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Separated Artwork and Progress (Priority: P1)

As a passenger viewing the second onboarding page, I can clearly distinguish the tracking
illustration from the onboarding progress indicator.

**Why this priority**: The current overlap obscures the page hierarchy and makes the progress
indicator appear to be part of the illustration.

**Independent Test**: Open the second onboarding page on each supported portrait phone size and
confirm that the illustration is centered, positioned above the progress indicator, and does not
intersect it.

**Acceptance Scenarios**:

1. **Given** the second onboarding page is visible, **When** the layout is displayed, **Then** the
   illustration is horizontally centered in the page's available content area.
2. **Given** the illustration and progress indicator are visible, **When** their positions are
   inspected, **Then** the entire progress indicator appears below the illustration with visible
   space between their boundaries.
3. **Given** the page is displayed on a supported small or large portrait phone, **When** all
   content is visible, **Then** the illustration remains above the progress indicator and neither
   element overlaps the heading, supporting text, call to action, or protected system areas.

### Edge Cases

- Short portrait displays must reduce flexible spacing without allowing the illustration and
  progress indicator to overlap.
- Tall portrait displays must keep the illustration visually associated with the page content
  rather than leaving excessive space above or below it.
- The complete illustration must remain visible without unintended cropping.
- Increased text size must not push the illustration into the progress indicator.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The second onboarding page MUST display the tracking illustration horizontally
  centered within the available content area.
- **FR-002**: The illustration MUST appear slightly higher than its current position, in the upper
  portion of the visual area between the introductory copy and the progress indicator.
- **FR-003**: The complete three-position progress indicator MUST appear below the illustration.
- **FR-004**: The illustration and progress indicator MUST have visible separation and MUST NOT
  share or intersect the same visible area.
- **FR-005**: The corrected content order MUST remain heading, supporting copy, illustration,
  progress indicator, and call to action from top to bottom.
- **FR-006**: The corrected layout MUST avoid overlap and unintended cropping on supported small,
  reference, and large portrait phone displays on both iOS and Android.
- **FR-007**: The fix MUST preserve the existing artwork, text, progress state, call-to-action
  behavior, accessibility behavior, and onboarding navigation.

### Out of Scope

- Changing the illustration asset, onboarding copy, progress design, or call-to-action styling.
- Changing navigation or adding onboarding behavior.
- Redesigning other onboarding pages.
- Supporting tablet, desktop, or landscape layouts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The illustration and progress indicator have zero visible overlap in every tested
  supported portrait layout.
- **SC-002**: The illustration is horizontally centered within the page content area on 100% of
  tested small, reference, and large portrait phone displays.
- **SC-003**: On both iOS and Android test layouts, all five content groups remain visible in the
  required top-to-bottom order without clipping or intrusion into protected system areas.
- **SC-004**: The existing transition into and out of the second onboarding page succeeds in 10 of
  10 consecutive attempts after the layout correction.

## Assumptions

- The reported problem applies to the second onboarding page containing the tracking
  illustration and middle-active progress indicator.
- "A little bit to the top" means moving the illustration toward the introductory copy while
  retaining comfortable visual separation from both the copy and progress indicator.
- The current illustration asset and progress indicator visuals are approved and remain unchanged.
- Portrait phone layouts are the supported scope for this correction.
