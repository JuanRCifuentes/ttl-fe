"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import DetailPageLayout from "@/app/components/DetailPageLayout";
import ImageCarousel from "@/app/components/ImageCarousel";
import { useSupplyChain } from "@/app/hooks/useSupplyChain";

const SupplyChainMap = dynamic(
  () => import("@/app/components/SupplyChainMap"),
  { ssr: false },
);

export default function SupplyChainPage() {
  const supplyChain = useSupplyChain();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  // Sync embla scroll → selected stage
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // When selected index changes externally (map/timeline click), scroll embla
  const scrollTo = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  if (!supplyChain) return null;

  const { stages } = supplyChain;
  const selectedId = stages[selectedIndex]?.id ?? null;

  function handleStageSelect(id: number) {
    const idx = stages.findIndex((s) => s.id === id);
    if (idx >= 0) scrollTo(idx);
  }

  return (
    <DetailPageLayout title="Supply Chain">
      {/* Map + vertical timeline */}
      <div className="flex gap-3 mb-6 h-64 sm:h-96">
        {/* Vertical timeline rail — scrolls within map height */}
        <div className="hidden sm:flex flex-col items-center shrink-0 overflow-y-auto py-1 scrollbar-thin">
          {stages.map((stage, i) => {
            const isSelected = stage.id === selectedId;
            return (
              <div key={stage.id} className="flex flex-col items-center">
                {i > 0 && (
                  <div className="w-px h-1.5 bg-neutral-300 dark:bg-neutral-600" />
                )}
                <button
                  onClick={() => handleStageSelect(stage.id)}
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-500 text-white scale-110"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {stage.id}
                </button>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden">
          <SupplyChainMap
            stages={stages}
            selectedStageId={selectedId}
            onStageSelect={handleStageSelect}
          />
        </div>
      </div>

      {/* Card swiper */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {stages.map((stage) => {
            const isSelected = stage.id === selectedId;
            return (
              <div
                key={stage.id}
                className="min-w-0 grow-0 shrink-0 basis-[85%] sm:basis-[60%]"
              >
                <div
                  onClick={() => handleStageSelect(stage.id)}
                  className={`rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5 cursor-pointer transition-shadow h-full ${
                    isSelected
                      ? "ring-2 ring-blue-500 dark:ring-blue-400"
                      : "hover:ring-1 hover:ring-neutral-300 dark:hover:ring-neutral-600"
                  }`}
                >
                  <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 mb-1">
                    Stage {stage.id}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    {stage.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {stage.description}
                  </p>

                  {stage.images.length > 0 && (
                    <ImageCarousel images={stage.images} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DetailPageLayout>
  );
}
