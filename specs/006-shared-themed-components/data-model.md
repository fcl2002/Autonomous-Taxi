# Data Model: Shared Themed Onboarding Components

This feature introduces no persisted or domain data entities.

The only structured values are local UI variants:

- **Text role**: identifies a shared typography treatment such as brand, heading, body copy, link, or action label.
- **Button state**: native interactive state supplied by the caller; the login **Send Code** control is enabled with no handler during this UI-only phase.
- **Theme token**: an existing named font or color used by the shared components.

No state transitions cross an application, Firebase, backend, or hardware boundary.
