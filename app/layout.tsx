import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XASİL Browser",
  description: "Turkish-themed mobile web browser interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
