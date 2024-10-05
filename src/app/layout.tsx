import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tractian - Tree View",
  description: "Tree View Application that shows companies Assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
