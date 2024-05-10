import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AppNavbar from "./appNavbar";
import MicFooter from "./micFooter";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider className="w-full">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="max-w-screen-lg h-screen flex flex-col  items-center justify-between">
          <AppNavbar />
          <div>{children}</div>
          <MicFooter/>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
