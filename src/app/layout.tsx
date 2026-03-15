import type { Metadata } from "next";
import { EB_Garamond, Mulish } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uncorked — A Premium Wine Gift Experience",
  description:
    "A curated wine gift box featuring Rutherford Ranch wines from Napa Valley. Three bottles. Three stories. One unforgettable experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${mulish.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
