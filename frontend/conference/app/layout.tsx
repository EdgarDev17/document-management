import "./globals.css";
import React from "react";
import Navbar from "./components/ui/navbar";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "x",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-50")}>
        <Navbar />
        <div className="w-11/12 sm:container mx-auto py-5">{children}</div>
        <Toaster richColors position={"top-center"} />
      </body>
    </html>
  );
}
