import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Free Referrals Across India – Inspire Reach",
  description: "Cinematic showcase for Inspire Reach referrals across India"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
