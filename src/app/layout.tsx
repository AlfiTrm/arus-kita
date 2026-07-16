import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { ServiceWorkerRegister } from "@/shared/components/ServiceWorkerRegister";
import "@/shared/styles/globals.css";

const PWA_INSTALL_CAPTURE_SCRIPT = `
  window.__pwaDeferredPrompt = null;
  window.__pwaInstalled = false;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    window.__pwaDeferredPrompt = e;
    window.dispatchEvent(new Event("pwa-installable"));
  });
  window.addEventListener("appinstalled", function () {
    window.__pwaInstalled = true;
    window.__pwaDeferredPrompt = null;
    window.dispatchEvent(new Event("pwa-installed"));
  });
`;

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
        <Script id="pwa-install-capture" strategy="beforeInteractive">
          {PWA_INSTALL_CAPTURE_SCRIPT}
        </Script>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
