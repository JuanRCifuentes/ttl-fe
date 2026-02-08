"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { usePathname, useRouter } from "next/navigation";
import { pages } from "../pages";

export default function PageSwiper({
  initialSlide = 0,
}: {
  initialSlide?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialSlide,
    watchDrag: true,
  });

  const syncRoute = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const nextPath = pages[index]?.path ?? pages[0].path;
    if (pathname !== nextPath) {
      router.push(nextPath, { scroll: false });
    }
  }, [emblaApi, pathname, router]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", syncRoute);
    return () => {
      emblaApi.off("select", syncRoute);
    };
  }, [emblaApi, syncRoute]);

  return (
    <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {pages.map((page) => (
            <div key={page.slug} className="min-w-0 flex-[0_0_100%]">
              <page.content />
            </div>
          ))}
        </div>
    </div>
  );
}
