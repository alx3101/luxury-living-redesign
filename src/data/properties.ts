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
    description: "Situato nel centro di Lignano Sabbiadoro, a ridosso della zona pedonale dello shopping e a pochi passi dalla spiaggia. Edificio moderno dal design contemporaneo sviluppato su 6 piani con soli 5 appartamenti, uno per piano, che garantiscono privacy e comodità. Impianti di ultima generazione e altissima efficienza energetica. L'unità al quinto piano comprende: zona giorno open-space con cucina a vista, terrazza, disimpegno, camera matrimoniale, bagno di servizio, camera padronale con bagno en-suite e cabina armadio, e seconda terrazza. Inclusi garage, posto auto e accesso al solarium al sesto piano.",
    shortDescription: "Attico di lusso nel cuore di Lignano Sabbiadoro, edificio moderno con soli 5 appartamenti e solarium esclusivo.",
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
    features: ["Ascensore", "Box Auto", "Climatizzazione", "Finiture di Pregio", "Posto Auto", "Riscaldamento Autonomo", "Solarium"],
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
    description: "Appartamento completamente ristrutturato con luminosa zona living con cucina open-plan, ideale per ricevere ospiti. La residenza offre due terrazze per il relax all'aperto. L'edificio è situato all'interno del complesso residenziale Villaggio Lido del Sole, immerso in aree verdi curate. Nuovo e pronto da abitare, con occupazione immediata. Secondo piano, classe energetica D.",
    shortDescription: "Appartamento ristrutturato a Bibione nel Villaggio Lido del Sole, con due terrazze e piscina condominiale.",
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
    features: ["Climatizzazione", "Giardino Condominiale", "Piscina Condominiale", "Posto Auto Coperto", "Bagno Finestrato", "Due Terrazze", "Cucina Open-Plan", "Arredato"],
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
    description: "Situato a 150 metri dalla spiaggia, questo appartamento di nuova costruzione offre tecnologie di comfort moderno. Il layout comprende una luminosa zona giorno con cucina open-plan, terrazza abitabile, due camere da letto e due bagni. Infissi in alluminio di alta qualità, riscaldamento/raffrescamento a pompa di calore, isolamento termico di ultima generazione e finiture di pregio. Ideale come residenza estiva o abitazione principale, in una zona tranquilla di Sabbiadoro vicino a servizi e spiaggia. Classe energetica A4.",
    shortDescription: "Trilocale di nuova costruzione a 150 metri dal mare, finiture di pregio e classe energetica A4.",
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
    features: ["Ascensore", "Finiture di Pregio", "Giardino", "Posto Auto", "Riscaldamento Autonomo", "Infissi in Alluminio", "Pompa di Calore", "Isolamento Termico"],
    year: 2026,
  },
  {
    id: "4",
    title: "Elegante Trilocale Palazzo Admiral",
    slug: "elegante-trilocale-palazzo-admiral",
    price: 720000,
    priceFormatted: "€720.000",
    type: "Residenziale",
    category: "Appartamenti",
    contract: "Vendita",
    description: "Elegante unità in un edificio situato nel cuore di Lignano Sabbiadoro, a pochi passi dal centro e dal mare. Vista mozzafiato sul porto turistico. Splendidamente arredato e pronto da abitare. Il layout comprende: ingresso accogliente, luminosa zona giorno con cucina open-plan che accede a una spaziosa terrazza, due camere matrimoniali, due bagni finestrati. Dotato di caratteristiche di accessibilità per persone a mobilità ridotta. Quarto piano, classe energetica A.",
    shortDescription: "Trilocale arredato al Palazzo Admiral con vista porto, due camere e terrazza panoramica.",
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
    features: ["Arredato", "Ascensore", "Climatizzazione", "Posto Auto", "Riscaldamento", "Vista Porto"],
    year: 2011,
  },
  {
    id: "5",
    title: "Splendida Villa Laguna Verde",
    slug: "splendida-villa-laguna-verde",
    price: 600000,
    priceFormatted: "€600.000",
    type: "Residenziale",
    category: "Villa",
    contract: "Vendita",
    description: "Splendida villa a schiera di testa, nuova costruzione che combina modernità e comfort. Si sviluppa su tre livelli: piano terra con ingresso che conduce a un'ampia zona giorno open-space con cucina a vista, perfetta per accogliere amici e famiglia. Il piano terra include lavanderia e patio, giardino privato per il relax. Il primo piano ospita la zona notte con tre spaziose camere da letto, due bagni moderni e due terrazze. Il secondo piano offre un solarium per godersi il sole in totale privacy. Il complesso include una piscina completamente interrata, con il livello dell'acqua alla stessa altezza dei percorsi pedonali, utilizzabile da tutti i residenti del condominio. Classe energetica A4.",
    shortDescription: "Villa di nuova costruzione su tre livelli con giardino privato, solarium e piscina condominiale.",
    image: prop5,
    images: [prop5, prop1, prop4],
    sqm: 161,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    location: "Lignano Sabbiadoro",
    address: "Laguna Verde 17, Lignano Sabbiadoro, UD",
    lat: 45.6850,
    lng: 13.1200,
    features: ["Riscaldamento a Pavimento", "Pompa di Calore", "Climatizzazione Canalizzata", "Fotovoltaico 1.5 kW", "Giardino Privato", "Lavanderia", "Finiture di Pregio", "Due Terrazze", "Solarium", "Piscina Condominiale", "Posto Auto"],
    year: 2025,
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
    description: "Un pezzo unico: esclusivo appartamento fronte mare al quinto e ultimo piano. Ampia terrazza esposta a sud, ideale per il relax durante tutta la giornata, con vista mare. Il layout comprende: ingresso accogliente, spaziosa zona giorno con cucina open-plan, grande vetrata che si apre direttamente sulla terrazza fronte mare, due camere da letto, un bagno finestrato, garage con accesso diretto sottostante. Situato vicino alla Terrazza a Mare e Piazza Fontana, nelle zone più prestigiose di Lignano, con accesso pedonale ai principali servizi. Ideale sia come investimento che come residenza vacanziera. Classe energetica C.",
    shortDescription: "Attico esclusivo fronte mare con terrazza panoramica esposta a sud e vista mare mozzafiato.",
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
    features: ["Ascensore", "Box Auto", "Climatizzazione", "Riscaldamento Autonomo", "Vista Mare"],
    year: 2006,
  },
];
