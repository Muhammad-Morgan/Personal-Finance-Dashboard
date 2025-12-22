import LinksDropdown from "../atoms/LinksDropdown";
import { ThemeToggle } from "../atoms/ThemeToggles";
import LogoutButton from "../atoms/LogoutButton";
import Link from "next/link";
import HorizontalLinks from "./HorizontalLinks";
import { getSession, deleteSession } from "@/lib/session";

const Navbar = async () => {
  const isAuth: boolean = (await getSession()) ? true : false;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-muted/50 backdrop-blur-md supports-backdrop-filter:bg-muted/30 py-4 sm:px-16 lg:px-24 px-4 shadow-sm">
      <section className="w-full max-w-275 flex items-center justify-between mx-auto">
        <div className="hidden lg:block">
          <Link href="/dashboard">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-semibold">
              F.B
            </span>
          </Link>
        </div>
        <div>
          <LinksDropdown />
        </div>
        <HorizontalLinks />
        <div className="flex item-center gap-x-4">
          <ThemeToggle />
          {isAuth && <LogoutButton deleteSession={deleteSession} />}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
