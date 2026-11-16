// The app's stops.ts is the single source of truth; the backend only checks ids against it.
// shortcut: relative import into vazy-app works only from this repo checkout; generate a stops.json if the backend is deployed alone.
import { STOP_DEFS } from "../../vazy-app/src/constants/stops.ts";

export const STOP_IDS = new Set(STOP_DEFS.map((stop) => stop.id));
