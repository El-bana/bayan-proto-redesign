import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-space-mono' });

export const metadata: Metadata = {
  title: "Saigent UI Demo",
  description: "B2B SaaS Interactive Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} antialiased bg-gray-50`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
