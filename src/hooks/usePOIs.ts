import { useQuery } from "@tanstack/react-query";

export interface POIResult {
  name: string;
  type: string;
  category: string;
  lat: number;
  lng: number;
  distance: string;
  distKm: number;
}

const OSM_TAG_TO_CATEGORY: Record<string, { it: string; category: string }> = {
  restaurant: { it: "Ristorante", category: "Ristorazione" },
  cafe: { it: "Caffetteria", category: "Ristorazione" },
  bar: { it: "Bar", category: "Ristorazione" },
  fast_food: { it: "Fast Food", category: "Ristorazione" },
  pharmacy: { it: "Farmacia", category: "Salute" },
  hospital: { it: "Ospedale", category: "Salute" },
  clinic: { it: "Clinica", category: "Salute" },
  doctors: { it: "Medico", category: "Salute" },
  dentist: { it: "Dentista", category: "Salute" },
  school: { it: "Scuola", category: "Istruzione" },
  kindergarten: { it: "Asilo", category: "Istruzione" },
  bank: { it: "Banca", category: "Servizi" },
  atm: { it: "Bancomat", category: "Servizi" },
  post_office: { it: "Ufficio Postale", category: "Servizi" },
  fuel: { it: "Distributore", category: "Servizi" },
  parking: { it: "Parcheggio", category: "Servizi" },
  supermarket: { it: "Supermercato", category: "Shopping" },
  mall: { it: "Centro Commerciale", category: "Shopping" },
  convenience: { it: "Minimarket", category: "Shopping" },
  hotel: { it: "Hotel", category: "Turismo" },
  museum: { it: "Museo", category: "Turismo" },
  attraction: { it: "Attrazione", category: "Turismo" },
  beach: { it: "Spiaggia", category: "Natura" },
  park: { it: "Parco", category: "Natura" },
  garden: { it: "Giardino", category: "Natura" },
  sports_centre: { it: "Centro Sportivo", category: "Sport" },
  swimming_pool: { it: "Piscina", category: "Sport" },
  fitness_centre: { it: "Palestra", category: "Sport" },
  place_of_worship: { it: "Chiesa", category: "Cultura" },
};

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

async function fetchPOIs(lat: number, lng: number): Promise<POIResult[]> {
  const query = `[out:json][timeout:15];(
    node["amenity"~"restaurant|cafe|bar|pharmacy|hospital|clinic|doctors|school|kindergarten|bank|atm|post_office|fuel|parking|place_of_worship"](around:3000,${lat},${lng});
    node["shop"~"supermarket|mall|convenience"](around:3000,${lat},${lng});
    node["tourism"~"hotel|museum|attraction"](around:3000,${lat},${lng});
    node["natural"="beach"](around:5000,${lat},${lng});
    node["leisure"~"park|garden|sports_centre|swimming_pool|fitness_centre"](around:3000,${lat},${lng});
  );out body;`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.status}`);
  }

  const data = await response.json();

  const results: POIResult[] = [];
  const seen = new Set<string>();

  for (const el of data.elements) {
    if (!el.tags || !el.lat || !el.lon) continue;

    const name = el.tags.name || el.tags["name:it"];
    if (!name) continue;

    const key = name.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);

    const osmType =
      el.tags.amenity ||
      el.tags.shop ||
      el.tags.tourism ||
      el.tags.natural ||
      el.tags.leisure;

    const mapping = OSM_TAG_TO_CATEGORY[osmType];
    if (!mapping) continue;

    const dist = getDistance(lat, lng, el.lat, el.lon);

    results.push({
      name,
      type: mapping.it,
      category: mapping.category,
      lat: el.lat,
      lng: el.lon,
      distance: formatDistance(dist),
      distKm: dist,
    });
  }

  return results
    .sort((a, b) => a.distKm - b.distKm)
    .slice(0, 20);
}

export function usePOIs(lat: number | undefined, lng: number | undefined) {
  return useQuery({
    queryKey: ["pois", lat, lng],
    queryFn: () => fetchPOIs(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export const CATEGORY_COLORS: Record<string, string> = {
  Ristorazione: "#e67e22",
  Salute: "#e74c3c",
  Istruzione: "#3498db",
  Servizi: "#95a5a6",
  Shopping: "#9b59b6",
  Turismo: "#1abc9c",
  Natura: "#27ae60",
  Sport: "#f39c12",
  Cultura: "#8e44ad",
};
