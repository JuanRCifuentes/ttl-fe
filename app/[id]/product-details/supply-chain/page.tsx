"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DetailPageLayout from "@/app/components/DetailPageLayout";
import ImageCarousel from "@/app/components/ImageCarousel";
import { useSupplyChain, type SupplyChainStage } from "@/app/hooks/useSupplyChain";

const SupplyChainMap = dynamic(
  () => import("@/app/components/SupplyChainMap"),
  { ssr: false },
);

export default function SupplyChainPage() {
  const supplyChain = useSupplyChain();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalStage, setModalStage] = useState<SupplyChainStage | null>(null);
  const timelineRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  if (!supplyChain) return null;

  const { stages } = supplyChain;

  function handleStageSelect(id: number) {
    setSelectedId(id);
    const el = timelineRefs.current.get(id);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function handleStageOpen(id: number) {
    const stage = stages.find((s) => s.id === id);
    if (stage) {
      setSelectedId(id);
      setModalStage(stage);
    }
  }

  return (
    <DetailPageLayout title="Supply Chain" wide>
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left: map */}
        <div className="flex-1 min-w-0">
          <div className="h-64 sm:h-80 lg:h-[32rem] rounded-2xl overflow-hidden">
            <SupplyChainMap
              stages={stages}
              selectedStageId={selectedId}
              onStageSelect={handleStageOpen}
            />
          </div>
        </div>

        {/* Right: vertical timeline */}
        <div className="hidden lg:block w-72 shrink-0 h-[32rem] overflow-y-auto">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {stages.map((stage, i) => {
                const isSelected = stage.id === selectedId;
                return (
                  <li
                    key={stage.id}
                    ref={(el) => {
                      if (el) timelineRefs.current.set(stage.id, el);
                    }}
                  >
                    <div className="relative pb-8">
                      {i !== stages.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200 dark:bg-neutral-700"
                        />
                      )}
                      <button
                        onClick={() => handleStageOpen(stage.id)}
                        onMouseEnter={() => handleStageSelect(stage.id)}
                        className="relative flex space-x-3 w-full text-left cursor-pointer group"
                      >
                        <div>
                          <span
                            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white dark:ring-neutral-900 transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600"
                            }`}
                          >
                            {stage.id}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col pt-0.5">
                          <p
                            className={`text-sm font-semibold transition-colors ${
                              isSelected
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            }`}
                          >
                            {stage.name}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                            {stage.description}
                          </p>
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mobile: compact timeline below map */}
        <div className="mt-6 lg:hidden">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {stages.map((stage, i) => {
                const isSelected = stage.id === selectedId;
                return (
                  <li key={stage.id}>
                    <div className="relative pb-8">
                      {i !== stages.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200 dark:bg-neutral-700"
                        />
                      )}
                      <button
                        onClick={() => handleStageOpen(stage.id)}
                        className="relative flex space-x-3 w-full text-left cursor-pointer group"
                      >
                        <div>
                          <span
                            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white dark:ring-neutral-900 transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                            }`}
                          >
                            {stage.id}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col pt-0.5">
                          <p
                            className={`text-sm font-semibold ${
                              isSelected
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-neutral-900 dark:text-white"
                            }`}
                          >
                            {stage.name}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                            {stage.description}
                          </p>
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Stage detail modal */}
      <Dialog
        open={modalStage !== null}
        onClose={() => setModalStage(null)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-900/50 transition-opacity duration-200 data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-800 shadow-xl transition duration-200 data-closed:scale-95 data-closed:opacity-0"
          >
            {modalStage && (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 mb-1">
                      Stage {modalStage.id}
                    </p>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {modalStage.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalStage(null)}
                    className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <XMarkIcon className="size-5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {modalStage.description}
                </p>

                {/* Images */}
                {modalStage.images.length > 0 && (
                  <ImageCarousel images={modalStage.images} />
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </DetailPageLayout>
  );
}
