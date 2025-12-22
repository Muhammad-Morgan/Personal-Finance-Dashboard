import Navbar from "@/components/molecules/Navbar";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      <div className="pt-26 py-16 sm:px-16 lg:px-24 px-4 w-full max-w-275 mx-auto">
        {children}
      </div>
    </main>
  );
}
