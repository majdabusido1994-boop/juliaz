import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Julia Josefiina Taivalmäki — Movement, Presence & Energy",
  description:
    "Yoga teacher, somatic movement facilitator, and Reiki Master. Supporting nervous system regulation, awareness, and a deeper connection to your body.",
  keywords: [
    "yoga",
    "reiki",
    "somatic movement",
    "healing",
    "wellness",
    "retreats",
    "Julia Taivalmäki",
  ],
  openGraph: {
    title: "Julia Josefiina Taivalmäki — Movement, Presence & Energy",
    description:
      "Yoga teacher, somatic movement facilitator, and Reiki Master working at the intersection of movement, presence, and energy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-body text-text-primary bg-background antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
