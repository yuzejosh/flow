import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: "Flow",
  description: "Meeting scheduling website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <UserProvider>
      <head>
        <link rel="icon" href="icon.ico"/>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </UserProvider>
    </html>
  );
}
