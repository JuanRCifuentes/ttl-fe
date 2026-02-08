import HomeCarousel from "@/app/components/HomeCarousel";
import { useProduct } from "@/app/context/ProductContext";

export default function HomeContent() {
  const product = useProduct();

  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {product?.name && (
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 pt-6">
          {product.name}
        </h1>
      )}
      <HomeCarousel />
      {product && (
        <div className="text-center px-6">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {product.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {product.description}
          </p>
        </div>
      )}
      <div className="flex-1" />
      <p className="pb-8 text-sm text-secondary-500 dark:text-secondary-400">Swipe for more →</p>
    </div>
  );
}
