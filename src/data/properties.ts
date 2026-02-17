import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";
import prop5 from "@/assets/prop-5.jpg";
import prop6 from "@/assets/prop-6.jpg";

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceFormatted: string;
  type: string;
  category: string;
  contract: "Vendita" | "Affitto";
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  location: string;
  address: string;
  lat: number;
  lng: number;
  features: string[];
  year?: number;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Attico Kalos",
    slug: "attico-kalos",
    price: 760000,
    priceFormatted: "€760.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Nuova splendida costruzione situata nel cuore di Lignano Sabbiadoro, a pochi passi dalla spiaggia. Questo attico di lusso offre finiture di altissimo livello, ampie terrazze panoramiche con vista mare e un design architettonico contemporaneo. Gli spazi interni sono stati progettati per massimizzare la luce naturale e offrire un'esperienza abitativa di classe superiore. Dotato di domotica avanzata, climatizzazione centralizzata e posto auto coperto.",
    shortDescription: "Nuova splendida costruzione situata nel cuore di Lignano...",
    image: prop1,
    images: [prop1, prop3, prop6],
    sqm: 75,
    bedrooms: 2,
    bathrooms: 2,
    garage: 2,
    location: "Lignano Sabbiadoro",
    address: "Lignano Sabbiadoro, UD",
    lat: 45.6912,
    lng: 13.1510,
    features: ["Climatizzazione", "Ascensore", "Posto Auto", "Finiture Di Pregio", "Vista Mare", "Arredato"],
    year: 2025,
  },
  {
    id: "2",
    title: "Appartamento Bibione – Lido del Sole",
    slug: "appartamento-bibione-lido-del-sole",
    price: 300000,
    priceFormatted: "€300.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Scopri questo splendido appartamento completamente ristrutturato nel cuore di Bibione, nel prestigioso Villaggio Lido del Sole. Posizione strategica a pochi passi dalla spiaggia, con ampi spazi luminosi, balcone con vista, cucina moderna e finiture di qualità. Ideale come investimento o come residenza estiva di prestigio.",
    shortDescription: "Splendido appartamento completamente ristrutturato a Bibione...",
    image: prop2,
    images: [prop2, prop1],
    sqm: 68,
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    location: "Bibione",
    address: "Bibione, VE",
    lat: 45.6380,
    lng: 13.0550,
    features: ["Climatizzazione", "Arredato", "Posto Auto", "Riscaldamento Autonomo"],
  },
  {
    id: "3",
    title: "Elegante Trilocale Nuova Realizzazione",
    slug: "elegante-trilocale-sabbiadoro",
    price: 405000,
    priceFormatted: "€405.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Elegante appartamento a 150 metri dal mare, di nuova realizzazione con finiture di pregio. Il trilocale si sviluppa su un unico livello con ampio soggiorno, cucina a vista, due camere matrimoniali e doppi servizi. Terrazzo panoramico vivibile con affaccio mare. Garage e posto auto inclusi. Consegna prevista 2026.",
    shortDescription: "Elegante appartamento a 150 metri dal mare, nuova costruzione...",
    image: prop3,
    images: [prop3, prop1, prop6],
    sqm: 90,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    location: "Lignano Sabbiadoro",
    address: "Lignano Sabbiadoro, UD",
    lat: 45.6890,
    lng: 13.1480,
    features: ["Climatizzazione", "Ascensore", "Finiture Di Pregio", "Posto Auto", "Garage", "Vista Mare"],
    year: 2026,
  },
  {
    id: "4",
    title: "Elegante Trilocale Palazzo Admiral",
    slug: "trilocale-palazzo-admiral",
    price: 720000,
    priceFormatted: "€720.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Scopri un'opportunità unica di vivere in uno dei palazzi più prestigiosi di Lignano. Il Palazzo Admiral offre eleganza senza tempo con finiture in marmo, ampi balconi panoramici e servizi esclusivi. Questo trilocale si distingue per la qualità costruttiva superiore, la posizione fronte mare e l'attenzione ai dettagli architettonici.",
    shortDescription: "Un'opportunità unica nel prestigioso Palazzo Admiral...",
    image: prop4,
    images: [prop4, prop3, prop1],
    sqm: 100,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    location: "Lignano Sabbiadoro",
    address: "Lignano Sabbiadoro, UD",
    lat: 45.6925,
    lng: 13.1530,
    features: ["Climatizzazione", "Ascensore", "Finiture Di Pregio", "Posto Auto", "Pavimenti In Marmo", "Vista Mare", "Lavanderia"],
  },
  {
    id: "5",
    title: "Splendida Villa Laguna Verde",
    slug: "villa-laguna-verde",
    price: 600000,
    priceFormatted: "€600.000",
    type: "Residenziale",
    category: "Villa",
    contract: "Vendita",
    description: "Scopri questa splendida villa immersa nel verde con vista sulla laguna. La proprietà si sviluppa su due livelli con ampio giardino privato, piscina, tre camere da letto e tripli servizi. Finiture di altissima qualità con pavimenti in cotto, travi a vista e caminetto. Posizione tranquilla e riservata, ideale per chi cerca privacy e contatto con la natura.",
    shortDescription: "Splendida villa con vista laguna, giardino e piscina...",
    image: prop5,
    images: [prop5, prop1, prop4],
    sqm: 161,
    bedrooms: 3,
    bathrooms: 3,
    garage: 1,
    location: "Lignano Riviera",
    address: "Lignano Riviera, UD",
    lat: 45.6850,
    lng: 13.1200,
    features: ["Piscina", "Giardino Privato", "Caminetto", "Garage", "Riscaldamento Autonomo", "Climatizzazione"],
  },
  {
    id: "6",
    title: "Attico Frontemare",
    slug: "attico-frontemare",
    price: 1100000,
    priceFormatted: "€1.100.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Proponiamo in vendita un pezzo unico: attico fronte mare con terrazza panoramica a 360 gradi. Vista mozzafiato sull'Adriatico, finiture di lusso, ampi spazi living con cucina gourmet. Due camere da letto, servizio con vasca idromassaggio. La proprietà include un esclusivo posto barca nella marina adiacente. Un'esperienza abitativa senza paragoni.",
    shortDescription: "Attico fronte mare unico con terrazza panoramica 360°...",
    image: prop6,
    images: [prop6, prop3, prop1],
    sqm: 120,
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    location: "Lignano Sabbiadoro",
    address: "Lignano Sabbiadoro, UD",
    lat: 45.6935,
    lng: 13.1560,
    features: ["Vista Mare", "Climatizzazione", "Ascensore", "Finiture Di Pregio", "Posto Auto", "Lavanderia", "Arredato"],
  },
];
