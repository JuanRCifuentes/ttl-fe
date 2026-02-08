"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  name: string;
  title: string;
  description: string;
  brand: string;
  madeIn: string;
  reference: string;
  sku: string;
  images: ProductImage[];
};

const ProductContext = createContext<Product | null>(null);

export function ProductProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
