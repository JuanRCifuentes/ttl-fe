export default function ProductDetailsContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex-1 flex items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-700 dark:text-primary-300">Product Details</h2>
          <p className="text-neutral-500 dark:text-neutral-400">View product information.</p>
        </div>
      </div>
      <p className="pb-8 text-sm text-secondary-500 dark:text-secondary-400">← Swipe for home</p>
    </div>
  );
}
