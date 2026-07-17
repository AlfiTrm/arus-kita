import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { PwaInstallCapture } from "@/shared/components/PwaInstallCapture";
import { ServiceWorkerRegister } from "@/shared/components/ServiceWorkerRegister";
import "@/shared/styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PijarNusa",
  description: "Platform ekosistem logistik kebencanaan terpadu",
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
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PwaInstallCapture />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
