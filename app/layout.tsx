import type { Metadata } from "next";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import CopyrightYear from "@/components/CopyrightYear";

export const metadata: Metadata = {
  title: {
    default: process.env.siteTitle || 'Tim Russell',
    template: `%s | ${process.env.siteTitle || 'Tim Russell'}`,
  },
  description: process.env.siteDescription || "Tim Russell's Personal Website",
  openGraph: {
    title: process.env.siteTitle || 'Tim Russell',
    description: process.env.siteDescription || "Tim Russell's Personal Website",
    url: process.env.siteUrl || 'https://timdpr.com/',
    siteName: process.env.siteTitle || 'Tim Russell',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header style={{ height: 'var(--header-height)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tim Russell</a>
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
                <li><a href="/">Home</a></li>
                <li><a href="/things">Things</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ 
          height: 'var(--footer-height)', 
          background: 'var(--background)', 
          marginTop: '2rem',
          borderTop: '1px solid var(--border)'
        }}>
          <div className="container" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '100%',
            fontSize: '0.8rem',
            color: 'var(--muted)'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>&copy; <CopyrightYear /> Tim Russell</p>
            </div>
            <div>
              <a href="/rss.xml" style={{ color: 'var(--muted)' }}>
                RSS
              </a>
            </div>
          </div>
        </footer>
        {/* Neural Network Background */}
        <BackgroundWrapper />
      </body>
    </html>
  );
}
