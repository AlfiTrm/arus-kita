import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { PwaInstallCapture } from "@/shared/components/PwaInstallCapture";
import { ServiceWorkerRegister } from "@/shared/components/ServiceWorkerRegister";
import "@/shared/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arus Kita",
  description: "Platform ekosistem logistik kebencanaan terpadu",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon/aruskita-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#028090",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <PwaInstallCapture />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
