import { http, HttpResponse } from "msw";
import type { Product } from "../context/ProductContext";
import type { Certification } from "../hooks/useCertifications";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply";

const product: Product = {
  name: "Amancaes",
  title: "Not just a jacket...\nStory behind Amancaes",
  description: "The Amancaes Jacket takes its name from the amancay flower, an emblematic bloom of Quechua origin that flourishes on the mist-fed hillsides (lomas) along Peru's central coast, and also grows as a wild flower across the Patagonian landscapes. The name carries with it a sense of resilience and ephemerality: the flower appears only in certain seasons, painting the arid hills with sudden bursts of yellow. Like the flower, this jacket symbolizes both rarity and strength.",
  brand: "SAKE",
  madeIn: "Peru",
  reference: "Referece",
  sku: "125279643854",
  images: [
    { src: IMAGE_URL, alt: "Product image 1" },
    { src: IMAGE_URL, alt: "Product image 2" },
    { src: IMAGE_URL, alt: "Product image 3" },
    { src: IMAGE_URL, alt: "Product image 4" },
    { src: IMAGE_URL, alt: "Product image 5" },
  ],
  details: [
    {
      title: "Supply Chain",
      description: "From fiber to garment",
      image: IMAGE_URL,
      route: "supply-chain",
      completion: 75,
    },
    {
      title: "Composition",
      description: "Learn all about the materials",
      image: IMAGE_URL,
      route: "composition",
    },
    {
      title: "Environmental impact",
      description: "Check the environmental impact of this garment",
      image: IMAGE_URL,
      route: "environmental-impact",
      impact: 25,
    },
    {
      title: "Social impact",
      description: "Working with communities to enhance rural development",
      image: IMAGE_URL,
      route: "social-impact",
    },
    {
      title: "Material innovation",
      description: "Why shiringa is an innovative material",
      image: IMAGE_URL,
      route: "material-innovation",
    },
    {
      title: "Garment care",
      description: "Extend the lifespan of your product",
      image: IMAGE_URL,
      route: "garment-care",
    },
    {
      title: "Certifications",
      description: "Clic here to check all the certifications related to materials, processes and more",
      route: "certifications",
    },
  ],
};

const certifications: Certification[] = [
  {
    name: "GOTS",
    issuer: "Global Organic Textile Standard",
    scope: "Materials",
    description:
      "Certifies that organic fibres are used throughout the entire supply chain, from harvesting to labelling, meeting strict environmental and social criteria.",
    validUntil: "2027-03-15",
    status: "active",
  },
  {
    name: "OEKO-TEX Standard 100",
    issuer: "OEKO-TEX Association",
    scope: "Safety",
    description:
      "Verifies that every component of the product — including threads, buttons and accessories — has been tested for harmful substances and is safe for human use.",
    validUntil: "2026-11-30",
    status: "active",
  },
  {
    name: "Fair Trade Certified",
    issuer: "Fair Trade USA",
    scope: "Social",
    description:
      "Guarantees fair wages, safe working conditions and community development funds for workers involved in production.",
    validUntil: "2026-08-01",
    status: "active",
  },
  {
    name: "Bluesign",
    issuer: "Bluesign Technologies",
    scope: "Environmental",
    description:
      "Ensures responsible use of resources and the lowest possible impact on people and the environment throughout the manufacturing process.",
    validUntil: "2026-12-20",
    status: "active",
  },
  {
    name: "FSC Certified",
    issuer: "Forest Stewardship Council",
    scope: "Materials",
    description:
      "Confirms that wood-derived materials such as viscose and lyocell originate from responsibly managed forests.",
    validUntil: "2025-06-10",
    status: "expired",
  },
  {
    name: "B Corp",
    issuer: "B Lab",
    scope: "Company",
    description:
      "Recognises the brand's commitment to balancing purpose and profit, meeting high standards of social and environmental performance, transparency and accountability.",
    validUntil: "2027-09-01",
    status: "active",
  },
];

export const handlers = [
  http.get("/api/product/:id", () => {
    return HttpResponse.json(product);
  }),
  http.get("/api/product/:id/certifications", () => {
    return HttpResponse.json(certifications);
  }),
];
