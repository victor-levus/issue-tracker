import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "./auth/AuthProvider";
import ReactQueryClientProvider from "./QueryClientProvider";

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
        <ReactQueryClientProvider>
          <AuthProvider>
            <Theme
              accentColor="ruby"
              grayColor="olive"
              radius="small"
              scaling="110%"
            >
              <NavBar />
              <main className="px-4 mb-5">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
