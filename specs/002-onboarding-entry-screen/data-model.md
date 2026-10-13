# Data Model: Onboarding Entry Screen

## Domain Data

This feature introduces no persisted entity, user record, remote payload, or vehicle state. All
content is bundled presentation data and remains available offline.

## Transient Presentation State

### App Screen

| Value | Meaning | Allowed transition |
|-------|---------|--------------------|
| `splash` | The Vazy splash composition is visible as one activation target. | `splash` -> `onboarding` after the first activation |
| `onboarding` | The first onboarding page is visible. | No onward transition in this feature |

Validation rules:

- `splash` is the initial route for this feature.
- Only the first activation may initiate replacement navigation.
- The transition replaces `splash`; it does not add a second copy to navigation history.
- No state is persisted between app sessions.

### Onboarding Presentation

| Field | Rule |
|-------|------|
| Heading | Non-empty provisional text |
| Supporting copy | Non-empty provisional text |
| Illustration | Local decorative export of Figma node `5:206` |
| Status badge | Local decorative export of Figma node `5:384`, overlaid in its design position |
| Progress | Three visual positions; position one is active |
| CTA label | Non-empty provisional text; no action in this feature |

There are no relationships to Firebase, backend events, MQTT messages, ride records, or vehicle
missions.
