import { Toaster } from "@/src/features/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HeaderWrapper from "../features/components/chat/header-wrapper";
import "./globals.css";
import { SocketProvider } from "../hooks/use-socket";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BTalky",
  description: "A real-time chat app built with Next.js and Socket.IO",
  icons: {
    icon: "/favicon.ico",
  },
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
        <HeaderWrapper />
        <SocketProvider>
          {children}
        </SocketProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
