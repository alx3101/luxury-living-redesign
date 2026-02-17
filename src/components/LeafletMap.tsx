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

const goldIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33],
});

export interface POI {
  name: string;
  type: string;
  lat: number;
  lng: number;
  distance?: string;
}

interface Props {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  singleMarker?: boolean;
  pois?: POI[];
  onPropertyClick?: (slug: string) => void;
}

export default function LeafletMap({
  properties,
  center = [45.685, 13.13],
  zoom = 12,
  className = "h-full w-full",
  singleMarker = false,
  pois = [],
  onPropertyClick,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView(center, zoom);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Property markers
    properties.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: goldIcon }).addTo(map);

      if (!singleMarker) {
        const popupContent = `
          <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; min-width: 200px;">
            <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
            <p style="font-weight: 600; margin: 0 0 2px; font-size: 14px;">${p.title}</p>
            <p style="color: hsl(38, 45%, 55%); font-weight: 700; margin: 0 0 4px; font-size: 15px;">${p.priceFormatted}</p>
            <div style="color: #888; font-size: 11px;">${p.sqm}m² · ${p.bedrooms} cam · ${p.bathrooms} bagni</div>
            <a href="/immobile/${p.slug}" style="display: inline-block; margin-top: 8px; color: hsl(38, 45%, 55%); font-size: 12px; font-weight: 500;">Dettagli →</a>
          </div>
        `;
        marker.bindPopup(popupContent);
      }
    });

    // POI markers
    pois.forEach((poi) => {
      const marker = L.marker([poi.lat, poi.lng], { icon: blueIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; font-size: 12px;">
          <p style="font-weight: 600; margin: 0 0 2px;">${poi.name}</p>
          <p style="color: #666; margin: 0; font-size: 11px;">${poi.type}${poi.distance ? ` · ${poi.distance}` : ""}</p>
        </div>
      `);
    });

    // Fit bounds if multiple markers
    if (!singleMarker && properties.length > 1) {
      const allCoords: [number, number][] = [
        ...properties.map((p): [number, number] => [p.lat, p.lng]),
        ...pois.map((p): [number, number] => [p.lat, p.lng]),
      ];
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [properties, singleMarker, pois]);

  return <div ref={mapRef} className={className} />;
}
