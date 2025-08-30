import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import UserProvider from "./context/UserProvider";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/me/`

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Next app created by Vineet.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access')?.value
  console.log(token)
  let user = null;

  if (token) {
    try {
      // ⚡ Option A: decode token directly (faster, no fetch)
      // user = decodeJwt(token)
      const res = await fetch(baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
        // cache: "no-store",
      });

      if (res.ok) {
        user = await res.json();
      }
    } catch (err) {
      console.log("Failed to fetch user: ", err)
    }
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <UserProvider initialUser={user}>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
