import { Inter, Imprima } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ClientThemeWrapper from "@/app/context/ClientThemeWrapper";

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
      <body className={imprima.className}>
        <ThemeProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
