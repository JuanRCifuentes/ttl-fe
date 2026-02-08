"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function DetailPageLayout({
  title,
  children,
  wide = false,
}: {
  title: string;
  children?: React.ReactNode;
  wide?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </button>
      </div>

      <div className={`px-4 sm:px-6 lg:px-8 py-6 mx-auto w-full ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          {title}
        </h2>

        {children}
      </div>

      <div className="flex-1" />
    </div>
  );
}
