"use client";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/site/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
