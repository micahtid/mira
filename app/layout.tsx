import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AccountContextProvider } from "@/providers/AccountProvider";
import AuthRouter from "@/providers/AuthRouter";

import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect With Mira",
  description: "The premier youth volunteer platform. Whether you're an organization looking for prospective volunteers or an individual looking to gain experience, Mira is your perfect platform.",
  keywords: ["Mira", "Volunteer", "Youth", "Organization", "Student", "Experience", "Prospective", "Prospect"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccountContextProvider>
          <AuthRouter>
            {children}
            <ModalProvider />
            <ToasterProvider />
          </AuthRouter>
        </AccountContextProvider>
      </body>
    </html>
  );
}
