import { DashboardPreviewCarousel } from "@/components/layouts/DashboardPreviewCarousel";
import { Features } from "@/components/layouts/Features";
import Hero from "@/components/layouts/Hero";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export default async function Home() {
  const session = await getSession();
  const currentYear = new Date().getUTCFullYear();

  // If there's an active session, redirect on the server
  if (session) {
    redirect("/dashboard");
  }
  // flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black
  return (
    <main className="space-bg min-h-screen">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 mb-5">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg font-semibold">
            <CreditCard />
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Finance Dashboard
          </span>
        </div>
        <Button
          asChild
          variant="ghost"
          className="bg-white/10 text-white hover:bg-white/20"
        >
          <Link href="/login">Log in</Link>
        </Button>
      </div>
      <Hero />
      <DashboardPreviewCarousel />
      <Features />
      <footer className="bg-black/80 text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/70">
            ©{" "}
            <time suppressHydrationWarning dateTime={String(currentYear)}>
              {currentYear}
            </time>{" "}
            Finance Dashboard
          </p>
          <p className="text-white/60">Built for clarity, control, and calm.</p>
        </div>
      </footer>
    </main>
  );
}
