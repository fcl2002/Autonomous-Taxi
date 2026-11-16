// The circuit's stops, in travel order (one-way, the last stop leads back to the first).
//
// - `name`: what the user sees. Edit freely, no rebuild needed.
// - `id`: what the backend stores. NEVER change or reuse one once rides reference it.
// - `lngLat` or order changed? Re-run `node scripts/build-circuit.mjs` to rebuild the paths.
export type LngLat = [number, number];

export type StopDef = { id: string; name: string; lngLat: LngLat };

export const STOP_DEFS: StopDef[] = [
  { id: "nw-corner", name: "Stop 1", lngLat: [2.3578988, 48.847436] },
  { id: "central-crossing", name: "Stop 2", lngLat: [2.3584192, 48.8470936] },
  { id: "quai-saint-bernard", name: "Stop 3", lngLat: [2.3590039, 48.847496] },
  { id: "rue-cuvier", name: "Stop 4", lngLat: [2.3594867, 48.8469206] },
  { id: "cell-dynamics", name: "Stop 5", lngLat: [2.3591219, 48.846497] },
  { id: "espace-langues", name: "Stop 6", lngLat: [2.3586284, 48.8462817] },
  { id: "atrium-cafe", name: "Stop 7", lngLat: [2.3582403, 48.8464854] },
  { id: "west-path", name: "Stop 8", lngLat: [2.3578559, 48.8467724] },
  { id: "faculte", name: "Stop 9", lngLat: [2.3573781, 48.8471016] },
];
