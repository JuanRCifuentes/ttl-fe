import { http, HttpResponse } from "msw";
import type { Product } from "../context/ProductContext";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply";

const product: Product = {
  name: "Amancaes",
  title: "Not just a jacket...\n" + "Story behind Amancaes",
  description: "The Amancaes Jacket takes its name from the amancay flower, an emblematic bloom of Quechua origin that flourishes on the mist-fed hillsides (lomas) along Peru’s central coast, and also grows as a wild flower across the Patagonian landscapes. The name carries with it a sense of resilience and ephemerality: the flower appears only in certain seasons, painting the arid hills with sudden bursts of yellow. Like the flower, this jacket symbolizes both rarity and strength.",
  images: [
    { src: IMAGE_URL, alt: "Product image 1" },
    { src: IMAGE_URL, alt: "Product image 2" },
    { src: IMAGE_URL, alt: "Product image 3" },
    { src: IMAGE_URL, alt: "Product image 4" },
    { src: IMAGE_URL, alt: "Product image 5" },
  ],
};

export const handlers = [
  http.get("/api/product/:id", () => {
    return HttpResponse.json(product);
  }),
];
