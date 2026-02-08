"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductImage } from "../context/ProductContext";

export type GarmentCareSection = {
  title: string;
  text: string;
};

export type GarmentCare = {
  images: ProductImage[];
  sections: GarmentCareSection[];
  linkUrl: string;
  linkLabel: string;
};

export function useGarmentCare() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<GarmentCare | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}/garment-care`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [id]);

  return data;
}
