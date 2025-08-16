import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const font = Urbanist({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Diet app",
  description: "Diet app for creating diet for your clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
