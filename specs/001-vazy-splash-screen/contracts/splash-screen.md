# UI Contract: Vazy Splash Screen

## Entry

- The route is the application's index route and is shown after a cold launch.
- It accepts no route parameters, user input, remote data, or persisted state.

## Visible output

- A light full-screen background.
- The text `Vazy` as the only product name, centered in the brand region.
- The approved passenger-and-taxi illustration anchored in the lower region.
- Native status and home-indicator areas remain unobstructed.
- No header, button, link, loading indicator, or other apparent control.

## Responsive behavior

- Portrait iOS and Android phones are supported.
- The brand remains legible on small, reference-sized, and large phones.
- The illustration preserves its aspect ratio, remains anchored to the bottom region, and does not
  overlap the brand or required safe areas.
- Landscape, tablet, desktop, and web layouts are outside this contract.

## Accessibility

- Assistive technology encounters one meaningful label: `Vazy`.
- The illustration is decorative and is excluded from accessibility focus.
- Increased text size does not clip, wrap, or hide the product name.

## Availability and performance

- All visible resources are bundled locally; rendering requires no network access.
- The complete branded route is visible within one second in preview/production acceptance builds.

## Exclusions

- No logo design, authentication, Firebase, backend, MQTT, or vehicle behavior.
- No automatic dismissal timer or destination route.
