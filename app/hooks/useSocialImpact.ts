"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductImage } from "../context/ProductContext";

export type ComplianceStatus = "compliant" | "non-compliant" | "certified";

export type ComplianceRegulation = {
  name: string;
  status: ComplianceStatus;
};

export type SocialImpact = {
  images: ProductImage[];
  text: string;
  compliance: ComplianceRegulation[];
  linkUrl: string;
  linkLabel: string;
};

export function useSocialImpact() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SocialImpact | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}/social-impact`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [id]);

  return data;
}
