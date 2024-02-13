import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';


const inter = localFont({src:'./YANDERE.ttf'});

export const metadata: Metadata = {
  title: "Valentine-Proposal",
  description: "Valentine joke be mine <3 ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-lvw h-lvh ${inter.className}`} >{children}</body>
    </html>
  );
}
