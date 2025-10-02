import type { Metadata } from "next";
import {
  Cinzel,
  Josefin_Sans,
  Playfair_Display,
  Tenor_Sans,
  Cormorant_Garamond,
  Forum,
} from "next/font/google";
import "./globals.css";
import Navbar from "components/navbar";
import Footer from "components/Footer";

// 🎬 Font Imports
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "What To Watch Next",
  description:
    "A cinematic guide with a royal touch – discover trending movies and shows, beautifully presented with elegance and timeless style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${josefin.variable} ${playfair.variable} ${tenor.variable} ${cormorant.variable} ${forum.variable} antialiased`}
      >
        <div className="">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
