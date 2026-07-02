import Footer from '../components/footer';
import ThemeToggle from '../components/themeToggle';
import type { Metadata } from "next";
import Navigation from '../components/navigation';
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { headers } from "next/headers";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const NAV_MENU_QUERY = `*[_type == "navigationList"] {navArray[]->}`;

export const metadata: Metadata = {
  title: "Chih-Ho Chou — Software Engineer",
  description: "Senior Software Engineer specializing in high-availability backend services and distributed systems.",
  icons: { icon: '/favicon.svg' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navMenu = await sanityFetch<SanityDocument[]>({ query: NAV_MENU_QUERY });
  const navArray = navMenu?.[0]?.navArray ?? [];

  return (
    <html lang="en">
      <body className={jetbrainsMono.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Side navigation */}
          <Navigation navArray={navArray} />

          {/* Main content area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* Top bar */}
            <div
              style={{
                padding: '10px 24px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-2)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'monospace' }}>~/chihho-dev</span>
              <ThemeToggle />
            </div>

            {/* Page content */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto', background: 'var(--bg)' }}>
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
