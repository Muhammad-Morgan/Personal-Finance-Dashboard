"use client";
import { links } from "@/lib/links";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const HorizontalLinks = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex lg:mx-auto gap-4">
      {links.map((link) => {
        const { href, label, icon } = link;
        return (
          <Button
            key={href}
            asChild
            variant={pathname === href ? "secondary" : "link"}
          >
            <Link href={href}>
              {icon}
              <span className="capitalize hidden xl:inline text-sm font-light">
                {label}
              </span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default HorizontalLinks;
