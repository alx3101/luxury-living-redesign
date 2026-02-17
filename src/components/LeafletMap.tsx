import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/data/properties";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function createSvgIcon(color: string, size: number = 28) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.4}" viewBox="0 0 24 34">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 22 12 22s12-13 12-22C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="12" cy="11" r="4.5" fill="white" opacity="0.9"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, size * 1.4],
    iconAnchor: [size / 2, size * 1.4],
    popupAnchor: [0, -size * 1.2],
  });
}

const goldIcon = createSvgIcon("hsl(38, 45%, 55%)", 30);
const goldSmallIcon = createSvgIcon("hsl(38, 45%, 55%)", 24);

const poiCategoryColors: Record<string, string> = {
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

function getPoiColor(type: string): string {
  for (const [category, color] of Object.entries(poiCategoryColors)) {
    if (type.toLowerCase().includes(category.toLowerCase())) return color;
  }
  return "#3498db";
}

export interface POI {
  name: string;
  type: string;
  lat: number;
  lng: number;
  distance?: string;
  category?: string;
}

interface Props {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  singleMarker?: boolean;
  pois?: POI[];
  onPropertyClick?: (slug: string) => void;
  flyTo?: [number, number] | null;
}

export default function LeafletMap({
  properties,
  center = [45.685, 13.13],
  zoom = 12,
  className = "h-full w-full",
  singleMarker = false,
  pois = [],
  onPropertyClick,
  flyTo,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(center, zoom);

    // Add zoom control to top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Light elegant tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !flyTo) return;
    map.flyTo(flyTo, 16, { duration: 1.2 });
  }, [flyTo]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Property markers
    properties.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: singleMarker ? goldIcon : goldSmallIcon }).addTo(map);

      if (!singleMarker) {
        const popupContent = `
          <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; min-width: 220px; padding: 4px;">
            <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100px; object-fit: cover; margin-bottom: 10px;" />
            <p style="font-weight: 600; margin: 0 0 4px; font-size: 15px; color: #1a2332;">${p.title}</p>
            <p style="color: hsl(38, 45%, 55%); font-weight: 700; margin: 0 0 6px; font-size: 16px;">${p.priceFormatted}</p>
            <div style="color: #888; font-size: 11px; margin-bottom: 8px;">${p.sqm}m² · ${p.bedrooms} camere · ${p.bathrooms} bagni</div>
            <a href="/immobile/${p.slug}" style="display: inline-block; color: hsl(38, 45%, 55%); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Dettagli →</a>
          </div>
        `;
        marker.bindPopup(popupContent, { maxWidth: 280 });
      }
    });

    // POI markers
    pois.forEach((poi) => {
      const color = poi.category ? (poiCategoryColors[poi.category] || getPoiColor(poi.type)) : getPoiColor(poi.type);
      const icon = createSvgIcon(color, 20);
      const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 2px;">
          <p style="font-weight: 600; margin: 0 0 3px; color: #1a2332;">${poi.name}</p>
          <p style="color: ${color}; margin: 0; font-size: 11px; font-weight: 500;">${poi.type}${poi.distance ? ` · ${poi.distance}` : ""}</p>
        </div>
      `, { maxWidth: 250 });
    });

    // Fit bounds if multiple markers
    if (!singleMarker && properties.length > 1) {
      const allCoords: [number, number][] = [
        ...properties.map((p): [number, number] => [p.lat, p.lng]),
      ];
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [properties, singleMarker, pois]);

  return <div ref={mapRef} className={className} />;
}
