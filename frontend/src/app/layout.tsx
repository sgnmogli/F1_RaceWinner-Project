import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeProvider as TeamThemeProvider } from "../context/ThemeContext";

const titillium = Titillium_Web({ 
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "F1 Prediction Engine 2026",
  description: "Professional Full-Stack Formula 1 Telemetry and Race Forecasting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", titillium.variable)}>
      <body className="antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TeamThemeProvider>
            {children}
          </TeamThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
