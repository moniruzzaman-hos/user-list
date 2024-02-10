import BaseLayout from "@/components/shared/BaseLayout.jsx/layout";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "User's Site",
  description: "A site for users to see and interact with content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="User List" key="title" />
        <link rel="shortcut icon" href="/user.png" />
      </head>
      <body className={inter.className}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
