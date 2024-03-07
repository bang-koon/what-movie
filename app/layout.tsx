import "./globals.css";
import styles from "./main.module.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./_components/nav";
import Provider from "./_components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "what movie",
  description: "what movie am I gonna watch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className={styles.layout}>
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
