
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Denco Food Mart | Everyday Foodstuff Made Simple",
  description:
    "Shop everyday Nigerian foodstuff and convenient food bundles at Denco Food Mart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
