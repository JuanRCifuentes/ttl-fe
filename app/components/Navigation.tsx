"use client";

import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { pages, pagePath } from "../pages";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  function navigate(path: string) {
    router.push(path, { scroll: false });
    setOpen(false);
  }

  return (
    <header className="bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <div className="shrink-0">
            <span className="text-lg font-bold text-primary-700 dark:text-white">My App</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://data.europa.eu/en/news-events/news/eus-digital-product-passport-advancing-transparency-and-sustainability"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-100 hover:text-primary-800 dark:text-primary-100 dark:hover:bg-primary-600 dark:hover:text-white"
            >
              What&apos;s a DPP?
            </a>
            <button
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-primary-600 hover:bg-primary-100 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-primary-100 dark:hover:bg-primary-600 dark:hover:text-white"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 z-20 bg-neutral-900/25 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
        />

        <DialogPanel
          transition
          className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
        >
          <div className="divide-y divide-neutral-200 rounded-lg bg-white shadow-lg outline outline-neutral-900/5 dark:divide-neutral-700 dark:bg-neutral-800 dark:shadow-none dark:-outline-offset-1 dark:outline-neutral-700">
            <div className="pt-3 pb-2">
              <div className="flex items-center justify-between px-4">
                <span className="text-lg font-bold text-primary-500 dark:text-primary-300">My App</span>
                <div className="-mr-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-500 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary-500 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus-visible:outline-primary-400"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {pages.map((page) => {
                  const fullPath = pagePath(id, page);
                  return (
                  <button
                    key={page.slug}
                    onClick={() => navigate(fullPath)}
                    className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                      pathname === fullPath
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
                    }`}
                  >
                    {page.name}
                  </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
