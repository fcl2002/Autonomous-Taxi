// Trips along the fixed one-way circuit (src/constants/circuit.ts). Pure: no network, no React Native.
import type { LngLat, Stop } from "@/constants/circuit";

export type Trip = { coordinates: LngLat[]; distance: number; stops: number };

// Equirectangular distance in meters, accurate enough at campus scale.
function meters([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) {
  const toRad = Math.PI / 180;
  const x = (lng2 - lng1) * toRad * Math.cos(((lat1 + lat2) / 2) * toRad);
  const y = (lat2 - lat1) * toRad;
  return Math.hypot(x, y) * 6371000;
}

export function nearestStop(stops: Stop[], from: LngLat) {
  let best = 0;
  stops.forEach((stop, i) => {
    if (meters(from, stop.lngLat) < meters(from, stops[best].lngLat)) best = i;
  });
  return { index: best, distance: Math.round(meters(from, stops[best].lngLat)) };
}

// Legs from `from` up to `to`, wrapping last -> first since the circuit is one-way.
export function tripPath(stops: Stop[], from: number, to: number): Trip {
  const count = (to - from + stops.length) % stops.length;
  const coordinates: LngLat[] = [];
  let distance = 0;
  for (let k = 0; k < count; k++) {
    const leg = stops[(from + k) % stops.length];
    coordinates.push(...(k === 0 ? leg.path : leg.path.slice(1)));
    distance += leg.distance;
  }
  return { coordinates, distance, stops: count };
}

// [west, south, east, north], the order MapLibre's fitBounds expects.
export function bounds(coordinates: LngLat[]): [number, number, number, number] {
  const lngs = coordinates.map(([lng]) => lng);
  const lats = coordinates.map(([, lat]) => lat);
  return [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];
}

// "3 stops · 213 m"
export function summary({ stops, distance }: Trip) {
  return `${stops} ${stops === 1 ? "stop" : "stops"} · ${distance} m`;
}
