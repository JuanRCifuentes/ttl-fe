"use client";

import { useParams } from "next/navigation";
import { ProductProvider } from "../context/ProductContext";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();

  return <ProductProvider id={id}>{children}</ProductProvider>;
}
