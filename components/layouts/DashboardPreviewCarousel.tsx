import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import overview from "@/public/assets/overview.jpg";
import transaction from "@/public/assets/transaction.jpg";
import categories from "@/public/assets/categories.jpg";
const slides = [
  { src: overview, alt: "Overview dashboard preview" },
  { src: transaction, alt: "Transactions preview" },
  { src: categories, alt: "Categories preview" },
];

export function DashboardPreviewCarousel() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="preview-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-7 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <h2
              id="preview-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              See your money clearly.
            </h2>
            <p className="mt-3 text-white/90 text-lg">
              Track income/expenses, categorize transactions, and get a quick
              overview—without noise.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3 items-center ">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                <p className="text-white/80 text-base">
                  Fast add: income or expense in seconds
                </p>
              </li>
              <li className="flex gap-3 items-center ">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                <p className="text-white/80 text-base">
                  Categories + filters for clean reporting
                </p>
              </li>
              <li className="flex gap-3 items-center ">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                <p className="text-white/80 text-base">
                  Secure sessions + protected dashboard routes
                </p>
              </li>
            </ul>
          </div>
          {/* Right: carousel */}
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-background/60 shadow-xl backdrop-blur">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {slides.map((s, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-3 h-9 w-9 border-border/60 bg-background/70 backdrop-blur" />
              <CarouselNext className="right-3 h-9 w-9 border-border/60 bg-background/70 backdrop-blur" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
