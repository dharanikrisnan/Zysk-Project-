"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <>
      {!hideNav && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNav && <Footer />}
    </>
  );
}
