"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductImage } from "../context/ProductContext";

export type MaterialInnovation = {
  images: ProductImage[];
  text: string;
  linkUrl: string;
  linkLabel: string;
};

export function useMaterialInnovation() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<MaterialInnovation | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}/material-innovation`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [id]);

  return data;
}
