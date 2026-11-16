# UI Contract: Ride Map Screen

## Route contract

- Activating signup's primary action navigates to `/map` without validating or submitting signup.
- Native Back from `/map` returns to `/signup`.
- Repeated activation does not create duplicate map pages.

## Map contract

- The upper area contains the exact bundled Figma map composition.
- Exactly five decorative taxi markers and one highlighted passenger position are visible.
- The menu treatment is visible and performs no action.
- The map area is exposed to assistive technology as a static ride-area preview; individual
  decorative layers are hidden.

## Sheet contract

- A white sheet with rounded upper corners overlays the bottom map area.
- It contains, in order: `Where do you want to go?`, the example pickup address, a divider, and
  `Search Destination`.
- Pickup and destination icons use bundled Figma assets.
- The destination treatment performs no action.

## Deferred behavior

- No account creation, map SDK, GPS, permission, geocoding, search, route, price, ride request,
  Firebase, backend, MQTT, or vehicle behavior is introduced.
