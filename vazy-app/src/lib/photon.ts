// Address search on OpenStreetMap data via Photon, built for search-as-you-type.
// shortcut: public Photon, fair use and no SLA; move behind a Firebase function before launch.

export type Place = { id: string; name: string; address: string; lng: number; lat: number };

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_type?: string;
    osm_id?: number;
    name?: string;
    housenumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
  };
};

export function photonUrl(query: string, [lng, lat]: [number, number]) {
  return `https://photon.komoot.io/api/?limit=8&lang=fr&lat=${lat}&lon=${lng}&q=${encodeURIComponent(query)}`;
}

export function toPlace({ geometry, properties: p }: PhotonFeature): Place {
  const street = [p.housenumber, p.street].filter(Boolean).join(" ");
  const cityLine = [p.postcode, p.city].filter(Boolean).join(" ");
  const [lng, lat] = geometry.coordinates;
  return {
    id: `${p.osm_type}${p.osm_id}`,
    name: p.name || street || p.city || "Unnamed place",
    address: [p.name ? street : "", cityLine].filter(Boolean).join(", "),
    lng,
    lat,
  };
}
