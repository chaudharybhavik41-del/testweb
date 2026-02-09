import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mechanical Manufacturing Toolkit",
  description: "Public manufacturing tools, knowledge resources, and premium BOM workflows."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
