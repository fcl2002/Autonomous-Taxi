# Contract: Ride `rides/{rideId}` (v1)

- **Producers:**
  - the Vazy app creates rides and cancels them;
  - the backend (`backend/src/index.ts`) moves rides through every other status, including the simulator (`backend/src/simulator.ts`), which the MQTT adapter will replace later.
- **Consumers:** the app's ride listener (`vazy-app/src/lib/rides.ts`) and the backend.
- **Enforced by:** `backend/firestore.rules` (clients) and the `NEXT` table in `backend/src/dispatch.ts` (backend).
- **Correlation id:** `rideId`. It appears in every backend log line and, later, in every MQTT payload.

## Document

| Field | Type | Written by | Rules |
|---|---|---|---|
| `schemaVersion` | number | app (create) | `1` |
| `passengerUid` | string | app (create) | `== request.auth.uid` |
| `originStopId` | string | app (create) | one of the 9 stop ids in `vazy-app/src/constants/stops.ts` |
| `destinationStopId` | string | app (create) | a stop id, `!= originStopId` |
| `status` | string | app: `requested` at create, `queued → cancelled`; backend: all other changes | see the state machine below |
| `createdAt` | timestamp | app (`serverTimestamp()`) | `== request.time` |
| `queuePosition` | number \| null | backend | 1-based while `queued`, otherwise `null` |
| `failureReason` | string | backend | `invalid_stops`, `same_stop`, `active_ride_exists` |
| `updatedAt` | timestamp | backend | server time of the last status change |

At create, the app sends exactly the first 6 fields.

## State machine

```text
requested ─► queued ─► assigned ─► to_pickup ─► at_pickup ─► to_destination ─► completed
    │           │
    │           └─► cancelled   (passenger, only from queued)
    └─► failed                   (backend validation, with failureReason)
```

Terminal statuses are `completed`, `cancelled` and `failed`. A passenger has at most one ride in a non-terminal status. The backend fails any extra one with `active_ride_exists`.

## Dispatch (backend)

One vehicle carries one passenger at a time. When the vehicle is idle, the next ride is chosen as follows:
1. the oldest `queued` ride that has waited more than 10 minutes;
2. otherwise, the ride whose pickup is the fewest stops ahead of the vehicle on the one-way loop, with ties going to the oldest ride.

`queuePosition` is the order in which this rule would serve the rides now.

## `vehicles/{vehicleId}` (backend only; clients have no access)

`{ status: "idle" | "busy", currentStopId, rideId | null }`, with a single vehicle, `vazy-1`.

## Failure behaviour

- **Invalid request:** `failed` with a `failureReason`. The app shows a readable message.
- **Backend down:** rides stay `requested` or `queued` and are processed when it restarts. A ride in progress resumes from its saved status.
- **Duplicate events:** a change not allowed by `NEXT` is ignored and logged.
