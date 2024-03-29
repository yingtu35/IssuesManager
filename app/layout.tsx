import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";
import BackToTop from "@/app/components/ui/backToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dcard Frontend Challenge",
  description: "This is a frontend challenge for Dcard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors closeButton position="top-center" offset={10} />
        <Header />
        <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
          {children}
        </main>
      <Footer />
      <BackToTop />
      </body>
    </html>
  );
}
