import type { Metadata } from "next";
import "./globals.css";
import "./spotlight.css";
import "./commands/spotlight.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "ripnet",
  description:
    "Network diagnostics, packet analysis, observability, and authorized load-testing toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="app-main">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
