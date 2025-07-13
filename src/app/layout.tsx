import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Car Catalog",
  description: "Discover our exclusive collection of premium vehicles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
