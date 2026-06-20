import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Periodic Table",
  description: "Explore the elements with electron shell visualization and reactivity indicators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <h1 className="text-xl font-bold text-slate-900">
              Interactive Periodic Table
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any element for details · Electron shell visualization · Reactivity indicator
            </p>
          </div>
        </header>
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
