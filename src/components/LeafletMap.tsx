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

interface Props {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  singleMarker?: boolean;
}

export default function LeafletMap({
  properties,
  center = [45.685, 13.13],
  zoom = 12,
  className = "h-full w-full",
  singleMarker = false,
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

    properties.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: goldIcon }).addTo(map);

      if (!singleMarker) {
        const popupContent = `
          <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; min-width: 180px;">
            <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-bottom: 6px;" />
            <p style="font-weight: 600; margin: 0 0 2px;">${p.title}</p>
            <p style="color: hsl(38, 45%, 55%); font-weight: 700; margin: 0 0 4px;">${p.priceFormatted}</p>
            <div style="color: #888; font-size: 11px;">${p.sqm}m² · ${p.bedrooms} cam · ${p.bathrooms} bagni</div>
            <a href="/immobile/${p.slug}" style="display: block; margin-top: 6px; color: hsl(38, 45%, 55%); font-size: 12px;">Dettagli →</a>
          </div>
        `;
        marker.bindPopup(popupContent);
      }
    });
  }, [properties, singleMarker]);

  return <div ref={mapRef} className={className} />;
}
