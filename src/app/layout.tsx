import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liquid Restaking | @samdevrel",
  description: "Restake ETH with EigenLayer and ether.fi to earn additional rewards.",
  keywords: ["liquid restaking", "EigenLayer", "ether.fi", "restaking", "AVS", "validated services"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
