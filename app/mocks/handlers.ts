import { http, HttpResponse } from "msw";
import type { Product } from "../context/ProductContext";
import type { Certification } from "../hooks/useCertifications";
import type { MaterialInnovation } from "../hooks/useMaterialInnovation";
import type { GarmentCare } from "../hooks/useGarmentCare";
import type { Composition } from "../hooks/useComposition";
import type { EnvironmentalImpact } from "../hooks/useEnvironmentalImpact";
import type { SocialImpact } from "../hooks/useSocialImpact";
import type { SupplyChain } from "../hooks/useSupplyChain";

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

const materialInnovation: MaterialInnovation = {
  images: [
    { src: IMAGE_URL, alt: "Shiringa tree tapping" },
    { src: IMAGE_URL, alt: "Raw shiringa latex" },
    { src: IMAGE_URL, alt: "Shiringa fabric close-up" },
  ],
  text: "At dawn, when the forest begins to wake, artisans carry out the ancestral practice of drawing latex from the shiringa tree. A careful, measured cut, learned and passed down through generations, releases the \u201cforest milk\u201d in a way that honors the tree, never depletes it. Every drop is both material and story: a trace of knowledge that allows the trees to continue giving, and the communities to thrive in rhythm with the rainforest.\n\nWe then work this latex using our own formula, developed on-site and unique to the region, transforming it into a biotextile that is as resilient as it is alive. Its surface carries the subtle irregularities of the forest itself: each piece is naturally unique in color, because the latex of wild shiringa varies slightly from tree to tree. The result is a material that embodies ancestral wisdom, rigorous research, and a singular character that cannot be replicated elsewhere.",
  linkUrl: "https://www.example.com/shiringa-innovation",
  linkLabel: "Learn more about shiringa",
};

const garmentCare: GarmentCare = {
  images: [
    { src: IMAGE_URL, alt: "Garment care overview" },
    { src: IMAGE_URL, alt: "Washing the jacket" },
    { src: IMAGE_URL, alt: "Jacket maintenance" },
  ],
  sections: [
    {
      title: "Washing Instructions",
      text: "Hand wash only in cold water (max 30 °C) using a mild, pH-neutral detergent. Do not wring or twist the fabric. Gently press out excess water with a clean towel and lay flat to dry away from direct sunlight. Never machine wash, tumble dry or dry clean — the shiringa bio-textile is sensitive to high temperatures and chemical solvents.",
    },
    {
      title: "Maintenance",
      text: "After each use, wipe the surface with a soft damp cloth to remove dust and body oils. Store the jacket on a wide, padded hanger in a cool, ventilated space. Avoid folding for extended periods to prevent permanent creasing. Periodically apply a thin layer of natural beeswax balm to maintain the water-resistant finish and keep the latex supple.",
    },
    {
      title: "Care Repairs",
      text: "Minor surface scratches can be buffed out gently with a soft cotton cloth. For small tears or punctures, apply a shiringa-based repair patch (included with your purchase) following the enclosed instructions. For structural damage or seam separation, contact our repair service — we offer free repairs within the first two years of ownership.",
    },
    {
      title: "Durability Indicators",
      text: "The Amancaes Jacket is designed for a minimum lifespan of 10 years with proper care. The shiringa bio-textile naturally develops a unique patina over time, deepening in character without losing performance. Seams are triple-stitched with waxed organic cotton thread. Hardware is solid brass with an anti-tarnish coating. If any component fails under normal use within 5 years, it will be replaced at no cost.",
    },
  ],
  linkUrl: "https://www.example.com/amancaes-care",
  linkLabel: "Know more about the product",
};

const composition: Composition = {
  materials: [
    {
      name: "Shiringa (Natural Rubber)",
      percentage: 45,
      description:
        "Wild-harvested latex from the Castilla elastica tree in the Peruvian Amazon. Provides the jacket's signature water resistance and flexibility while being fully biodegradable.",
      color: "#2E9E2E",
      main: true,
    },
    {
      name: "Organic Cotton",
      percentage: 30,
      description:
        "GOTS-certified organic cotton grown without synthetic pesticides or fertilisers. Forms the base fabric layer, offering breathability and comfort against the skin.",
      color: "#C85D21",
      main: true,
    },
    {
      name: "Recycled Polyester",
      percentage: 12,
      description:
        "Made from post-consumer PET bottles. Used in the lining for added durability and moisture-wicking properties.",
      color: "#3994C0",
      main: true,
    },
    {
      name: "Alpaca Wool",
      percentage: 8,
      description:
        "Ethically sourced from free-range alpacas in the Peruvian highlands. Provides lightweight insulation and natural temperature regulation.",
      color: "#E9B949",
      main: false,
    },
    {
      name: "Brass Hardware",
      percentage: 3,
      description:
        "Solid brass zippers and buttons with an anti-tarnish coating. Sourced from a family-owned foundry in Lima.",
      color: "#7E7E7E",
      main: false,
    },
    {
      name: "Waxed Cotton Thread",
      percentage: 2,
      description:
        "Organic cotton thread coated in natural beeswax for water resistance. Used in all structural seams with triple-stitch reinforcement.",
      color: "#B1B1B1",
      main: false,
    },
  ],
};

const environmentalImpact: EnvironmentalImpact = {
  indicators: [
    { name: "Water Use", value: "high" },
    { name: "Energy Use", value: "mid" },
    { name: "Chemical Compliant", value: "certified" },
    { name: "Waste During Production", value: "low" },
    { name: "Recyclability", value: "partially recyclable" },
    { name: "CO2 Footprint", value: "low" },
  ],
  postConsumptionPlanUrl: "https://www.example.com/post-consumption",
  certificationsUrl: "certifications",
  learnMoreUrl: "https://www.example.com/environmental-impact",
};

const socialImpact: SocialImpact = {
  images: [
    { src: IMAGE_URL, alt: "Sustainable shiringa extraction" },
    { src: IMAGE_URL, alt: "Community artisan work" },
  ],
  text: "Through the sustainable extraction of shiringa (wild rubber), 240 hectares of Amazon rainforest are preserved. Our non-extractive bioinnovation transforms latex without harming the trees, proving that high-end design can thrive without depleting ecosystems.",
  compliance: [
    { name: "ILO Core Conventions (Forced labor, child labor, discrimination)", status: "compliant" },
    { name: "EU Corporate Sustainability Due Diligence Directive (CSDDD)", status: "compliant" },
    { name: "UK Modern Slavery Act", status: "compliant" },
    { name: "California Transparency in Supply Chains Act", status: "compliant" },
    { name: "German Supply Chain Due Diligence Act (LkSG)", status: "certified" },
    { name: "International Accord for Health and Safety in the Textile and Garment Industry", status: "compliant" },
    { name: "Fair Labor Association (FLA) Code of Conduct", status: "certified" },
    { name: "SA8000 Standard (Social Accountability)", status: "compliant" },
    { name: "SMETA (Sedex Members Ethical Trade Audit)", status: "non-compliant" },
  ],
  linkUrl: "https://www.example.com/social-impact",
  linkLabel: "Learn more about the product",
};

const supplyChain: SupplyChain = {
  completion: 75,
  stages: [
    {
      id: 1,
      name: "Shiringa Harvesting",
      description:
        "Wild shiringa latex is carefully extracted by indigenous artisans in the Peruvian Amazon using traditional tapping methods that preserve the health of each tree.",
      images: [
        { src: IMAGE_URL, alt: "Shiringa tree tapping" },
        { src: IMAGE_URL, alt: "Latex collection" },
      ],
      position: [-3.749, -73.254],
    },
    {
      id: 2,
      name: "Latex Collection & Filtering",
      description:
        "Raw latex is collected from multiple trees, filtered to remove impurities, and stabilised with natural compounds to prevent premature coagulation.",
      images: [],
      position: [-3.784, -73.309],
    },
    {
      id: 3,
      name: "Bio-textile Transformation",
      description:
        "Using a proprietary on-site formula, the filtered latex is transformed into a flexible bio-textile sheet through a slow curing process unique to this region.",
      images: [
        { src: IMAGE_URL, alt: "Bio-textile lab" },
      ],
      position: [-3.731, -73.247],
    },
    {
      id: 4,
      name: "Organic Cotton Farming",
      description:
        "GOTS-certified organic cotton is cultivated in the fertile Cañete Valley on Peru's southern coast, irrigated by Andean snowmelt without synthetic pesticides.",
      images: [
        { src: IMAGE_URL, alt: "Cotton fields in Cañete" },
      ],
      position: [-13.114, -76.289],
    },
    {
      id: 5,
      name: "Cotton Ginning",
      description:
        "Harvested cotton bolls are mechanically separated from seeds and cleaned at a local ginning facility, producing raw fibre bales ready for spinning.",
      images: [],
      position: [-13.092, -76.271],
    },
    {
      id: 6,
      name: "Spinning",
      description:
        "Cotton fibres are spun into high-tenacity yarn at a solar-powered mill in Lima, blending ring-spinning tradition with modern efficiency.",
      images: [
        { src: IMAGE_URL, alt: "Spinning mill" },
      ],
      position: [-12.046, -77.042],
    },
    {
      id: 7,
      name: "Weaving",
      description:
        "The yarn is woven into a dense plain-weave fabric on rapier looms, producing the base cloth that will receive the shiringa lamination.",
      images: [],
      position: [-12.061, -77.036],
    },
    {
      id: 8,
      name: "Natural Dyeing",
      description:
        "Fabric panels are dyed using plant-based pigments — tara pods for warm neutrals, cochineal for accent reds — in a closed-loop water system.",
      images: [
        { src: IMAGE_URL, alt: "Natural dye vats" },
        { src: IMAGE_URL, alt: "Dyed fabric drying" },
      ],
      position: [-12.059, -77.050],
    },
    {
      id: 9,
      name: "Shiringa Lamination",
      description:
        "The woven cotton base is laminated with the shiringa bio-textile under controlled heat and pressure, creating a water-resistant composite unique to each piece.",
      images: [
        { src: IMAGE_URL, alt: "Lamination process" },
      ],
      position: [-12.053, -77.040],
    },
    {
      id: 10,
      name: "Alpaca Fibre Sourcing",
      description:
        "Ethically sheared alpaca fleece is sourced from free-range herds in the Puno highlands, where herders follow ancestral animal-welfare practices.",
      images: [
        { src: IMAGE_URL, alt: "Alpaca herds in Puno" },
      ],
      position: [-15.840, -70.021],
    },
    {
      id: 11,
      name: "Alpaca Yarn Processing",
      description:
        "The raw fleece is washed, carded and spun into a fine-gauge yarn used for the jacket's insulating lining layer.",
      images: [],
      position: [-15.500, -70.135],
    },
    {
      id: 12,
      name: "Recycled Polyester Production",
      description:
        "Post-consumer PET bottles are collected, shredded and extruded into recycled polyester filament at a certified facility in Lima.",
      images: [],
      position: [-12.100, -76.990],
    },
    {
      id: 13,
      name: "Lining Knitting",
      description:
        "Recycled polyester and alpaca yarns are knitted into a lightweight mesh lining that provides moisture-wicking and thermal regulation.",
      images: [],
      position: [-12.070, -77.055],
    },
    {
      id: 14,
      name: "Brass Hardware Casting",
      description:
        "Solid brass zippers, snaps and buttons are cast at a family-owned foundry in Lima, then finished with a non-toxic anti-tarnish coating.",
      images: [
        { src: IMAGE_URL, alt: "Brass hardware foundry" },
      ],
      position: [-12.085, -77.001],
    },
    {
      id: 15,
      name: "Pattern Cutting",
      description:
        "Pattern pieces are digitally nested to minimise fabric waste (achieving <5 % offcut rate), then precision-cut with an automated cutter.",
      images: [],
      position: [-12.119, -77.028],
    },
    {
      id: 16,
      name: "Sewing & Assembly",
      description:
        "Skilled seamstresses assemble each jacket by hand and machine, triple-stitching all structural seams with waxed organic cotton thread.",
      images: [
        { src: IMAGE_URL, alt: "Sewing workshop" },
        { src: IMAGE_URL, alt: "Detail stitching" },
      ],
      position: [-12.122, -77.032],
    },
    {
      id: 17,
      name: "Quality Control",
      description:
        "Every jacket undergoes a 40-point inspection covering seam strength, water resistance, hardware function and overall finish before approval.",
      images: [],
      position: [-12.123, -77.033],
    },
    {
      id: 18,
      name: "Finishing & Pressing",
      description:
        "Approved jackets are steam-pressed, labels are attached, and a protective beeswax finish is applied to the shiringa surface.",
      images: [],
      position: [-12.125, -77.034],
    },
    {
      id: 19,
      name: "Packaging",
      description:
        "Each jacket is folded into a reusable organic cotton garment bag with a shiringa repair patch kit, care card and seed-paper hangtag.",
      images: [
        { src: IMAGE_URL, alt: "Eco packaging" },
      ],
      position: [-12.126, -77.036],
    },
    {
      id: 20,
      name: "Warehousing",
      description:
        "Finished products are stored in a carbon-neutral warehouse in Callao, close to the port, awaiting distribution orders.",
      images: [],
      position: [-12.056, -77.118],
    },
    {
      id: 21,
      name: "Distribution & Retail",
      description:
        "Jackets are shipped via sea freight (lowest-carbon option) to regional distribution hubs and direct-to-consumer channels worldwide.",
      images: [],
      position: [-12.046, -77.135],
    },
  ],
};

export const handlers = [
  http.get("/api/product/:id", () => {
    return HttpResponse.json(product);
  }),
  http.get("/api/product/:id/certifications", () => {
    return HttpResponse.json(certifications);
  }),
  http.get("/api/product/:id/material-innovation", () => {
    return HttpResponse.json(materialInnovation);
  }),
  http.get("/api/product/:id/garment-care", () => {
    return HttpResponse.json(garmentCare);
  }),
  http.get("/api/product/:id/composition", () => {
    return HttpResponse.json(composition);
  }),
  http.get("/api/product/:id/environmental-impact", () => {
    return HttpResponse.json(environmentalImpact);
  }),
  http.get("/api/product/:id/social-impact", () => {
    return HttpResponse.json(socialImpact);
  }),
  http.get("/api/product/:id/supply-chain", () => {
    return HttpResponse.json(supplyChain);
  }),
];
