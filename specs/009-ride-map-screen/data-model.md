# Data Model: Ride Map Screen

## Static Map Preview

A fixed presentation fixture with no live or persisted data.

| Field | Value | Mutability | Source |
|---|---|---|---|
| Nearby taxis | Exactly five fixed markers | None | Bundled design assets |
| Passenger position | One highlighted fixed marker | None | Bundled design assets |
| Pickup address | `Neemuch RD. Gopalbari, Bari Sad` | None | Local display fixture |
| Destination prompt | `Search Destination` | None | Local display fixture |

## State transitions

1. Signup action opens the map preview.
2. The preview displays the same fixed composition on every render.
3. Menu and destination activation cause no transition.
4. Platform Back returns to signup.

No value crosses Firebase, backend, MQTT, hardware, map-provider, location, logging, or persistent
storage boundaries.
