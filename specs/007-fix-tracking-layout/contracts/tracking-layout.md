# UI Contract: Tracking Onboarding Layout

## Visual order

- The heading and supporting copy appear first.
- The complete tracking illustration appears next and is horizontally centered.
- The complete three-position progress indicator appears below the illustration with visible
  separation; their visible boundaries never intersect.
- The existing continuation action remains below the progress indicator.

## Responsive behavior

- On supported small, reference, and large portrait phone sizes, the illustration remains
  contained in its allocated region and scales down when vertical space is limited.
- Flexible spacing may shrink or grow, but content order, safe-area clearance, and full visibility
  are preserved.

## Compatibility

- The current illustration, progress assets, copy, accessibility exclusions, and button remain
  unchanged.
- The continuation action still opens the existing location onboarding route.
- No permission, persistence, network, Firebase, backend, MQTT, or vehicle behavior is introduced.
