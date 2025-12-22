import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative lg:pt-25 py-20 text-center "
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden xl:block">
        <div className="absolute bottom-9/12 left-16 lg:left-26 rounded-xl bg-white/70 dark:bg-muted-foreground/70 px-4 py-2 text-sm backdrop-blur">
          +23% savings
        </div>
        <div className="absolute bottom-4/12 right-16 lg:right-26-48 rounded-xl bg-white/70 dark:bg-muted-foreground/70 px-4 py-2 text-sm backdrop-blur">
          124 transactions
        </div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4">
        <h1
          id="hero-heading"
          className="text-3xl font-bold mb-4 text-white lg:text-4xl"
        >
          Take Control of Your Finances with Ease
        </h1>
        <p className="text-lg lg:text-xl mb-18 text-white/80">
          Your all-in-one dashboard to track expenses, manage budgets, and gain
          insights effortlessly.
        </p>
        <Button
          variant="ghost"
          className="text-lg text-white hover:bg-white/70"
          aria-label="Get started with the financial dashboard"
          asChild
          size="lg"
        >
          <Link href="/register">
            Get Started <ChevronRight className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
