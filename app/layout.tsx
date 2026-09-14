import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Agro Limited | Cold Storage Sainipura, Taoru",
  description:
    "Premium cold storage facility for farmers & traders in Sainipura, Taoru, Haryana. Book cold rooms for potatoes, onions, fruits & grains. Government procurement accepted. Call: +91 9728517836",
  keywords: "cold storage, Taoru, Sainipura, potato storage, onion storage, Rahul Agro, Haryana cold storage, FCI HAFED NAFED",
  openGraph: {
    title: "Rahul Agro Limited | Cold Storage Sainipura, Taoru",
    description: "Premium cold storage facility in Haryana. Book online for perishables & grains.",
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
      <body className={`${jakarta.variable} font-jakarta antialiased bg-warm-soil`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
