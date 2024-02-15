import ClientThemeWrapper from "@/app/context/ClientThemeWrapper";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { Imprima, Inter } from "next/font/google";

import Footer from "@/app/components/Footer";
import Index from "@/app/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const imprima = Imprima({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "notek",
  description: "tarayıcınızdaki güvenli not alma uygulamanız",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr-TR">
      <body className={`${imprima.className}`}>
        <ThemeProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
