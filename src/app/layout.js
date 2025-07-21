import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextWrapper from "@/context/ContextWrapper"; // Adjust path as needed

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Custom Auth Next.js",
  description:
    "Built a full-stack app with Next.js and Node.js featuring custom JWT-based authentication, OTP email verification, password reset flow, and logging with Winston & Morgan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap your children with the ContextWrapper */}
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
