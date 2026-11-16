// Run: node scripts/photon.check.mjs (Node 22.18+ strips the TS types).
import assert from "node:assert/strict";
import { toPlace } from "../src/lib/photon.ts";

const at = (properties) => toPlace({ geometry: { coordinates: [2.35, 48.85] }, properties });

// A named place shows its street under the name.
assert.deepEqual(
  at({ osm_type: "N", osm_id: 1, name: "38Riv Jazz Club", housenumber: "38", street: "Rue de Rivoli", postcode: "75004", city: "Paris" }),
  { id: "N1", name: "38Riv Jazz Club", address: "38 Rue de Rivoli, 75004 Paris", lng: 2.35, lat: 48.85 },
);
// A bare address becomes the name; the street isn't repeated below it.
assert.equal(at({ housenumber: "4", street: "Place Jussieu", postcode: "75005", city: "Paris" }).name, "4 Place Jussieu");
assert.equal(at({ housenumber: "4", street: "Place Jussieu", postcode: "75005", city: "Paris" }).address, "75005 Paris");
// Missing fields never produce "undefined" or stray commas.
assert.equal(at({ city: "Paris" }).address, "Paris");
assert.equal(at({}).name, "Unnamed place");

console.log("photon.check: ok");
