import { Geist, Geist_Mono } from "next/font/google";
import Providers from "../components/providers/providers.jsx"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers>
          {children}
          <footer className="w-full bg-neutral-600 text-neutral-50 flex items-center justify-center py-3">
                <p>Realtyna | Task</p>
          </footer>
      </Providers>
        </body>
    </html>
  );
}
