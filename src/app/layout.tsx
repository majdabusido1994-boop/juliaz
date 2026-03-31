import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

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
    <html lang="en">
      <body className="antialiased bg-white text-purple-950" style={{ fontFamily: "var(--font-body)" }}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
