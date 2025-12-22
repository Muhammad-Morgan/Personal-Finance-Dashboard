import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ShieldCheck, Wallet } from "lucide-react";

const features = [
  {
    title: "Track expenses",
    desc: "Log income/expenses fast and keep everything organized.",
    icon: Wallet,
  },
  {
    title: "Insights & charts",
    desc: "See trends over time with clear visuals and breakdowns.",
    icon: BarChart3,
  },
  {
    title: "Secure sessions",
    desc: "Protected routes with server-side session validation.",
    icon: ShieldCheck,
  },
];

export function Features({ className }: { className?: string }) {
  return (
    <section
      className={cn("py-16 sm:py-20", className)}
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl text-white"
          >
            Everything you need, nothing you don’t
          </h2>
          <p className="mt-3 text-pretty text-sm sm:text-base text-white/80">
            Built for quick daily logging and a clean dashboard view.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className={cn(
                "group transition",
                "border-white/85 bg-white/85 backdrop-blur",
                "hover:bg-white/80 duration-200 ease-linear"
              )}
            >
              <CardHeader className="space-y-2">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    "bg-white text-foreground",
                    "group-hover:bg-white/70"
                  )}
                  aria-hidden="true"
                >
                  <f.icon className="h-5 w-5 text-black/90" />
                </div>
                <CardTitle className="text-base text-black/90">
                  {f.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-black/80">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
