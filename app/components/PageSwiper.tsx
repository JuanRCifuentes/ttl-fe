"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { pages, pagePath } from "../pages";

export default function PageSwiper({
  initialSlide = 0,
}: {
  initialSlide?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialSlide,
    watchDrag: (_emblaApi, event) => {
      const target = event.target as HTMLElement;
      // Ignore drags from inside nested carousels
      if (target.closest("[data-nested-carousel]")) return false;
      return true;
    },
  });

  const syncRoute = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const page = pages[index] ?? pages[0];
    const nextPath = pagePath(id, page);
    if (pathname !== nextPath) {
      router.push(nextPath, { scroll: false });
    }
  }, [emblaApi, pathname, router, id]);

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
