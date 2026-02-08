"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export type CompositionMaterial = {
  name: string;
  percentage: number;
  description: string;
  color: string;
  main: boolean;
};

export type Composition = {
  materials: CompositionMaterial[];
};

export function useComposition() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Composition | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}/composition`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [id]);

  return data;
}
