import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Object storage benchmark: S3, R2, Railway, Backblaze B2, Neon, Bunny, Appwrite, Convex, Upstash",
  description:
    "Nine object storage providers measured through one SDK from six locations: uploads, downloads, first bytes, cold starts, listing, failures, and monthly cost.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The page is a dark plate by design, so the dark tokens always apply.
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} dark h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
