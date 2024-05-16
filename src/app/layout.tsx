import "./globals.css";

import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import Layout from "@/layouts";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("flex flex-col min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}