import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildiT | Digital Experiences That Define The Future",
  description:
    "BuildiT is a premium digital innovation startup creating websites, SaaS platforms, AI integrations, automation systems, mobile apps, and future-ready brand experiences.",
  keywords: [
    "BuildiT",
    "website development",
    "SaaS development",
    "UI UX design",
    "AI integrations",
    "automation solutions",
    "digital innovation"
  ],
  authors: [{ name: "BuildiT" }],
  openGraph: {
    title: "BuildiT | Digital Experiences That Define The Future",
    description:
      "Premium digital solutions, cinematic interfaces, scalable products, and future-ready technology for ambitious startups.",
    type: "website",
    siteName: "BuildiT"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
