import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker App",
  description: "App for tracking issues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme
          accentColor="violet"
          grayColor="olive"
          radius="small"
          scaling="110%"
        >
          <NavBar />
          <main className="px-4 mb-5">{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
