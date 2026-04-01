"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/signup"];
  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }
  return <Header />;
}
