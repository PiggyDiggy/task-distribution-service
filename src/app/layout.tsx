import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";

const inter = Fira_Sans({ subsets: ["cyrillic"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
