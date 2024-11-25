import Providers from "./_component/Provider";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";
import LoginForm from "./_component/LoginForm";
import Head from "next/head";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Steam Vote",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body className={`${noto.className} antialiased`}>
        <Providers>
          <Container maxWidth="lg">
            <LoginForm />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
