import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';

// Define types for neural network animation
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

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
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tim Russell</Link>
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/things">Things</Link></li>
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
              <p style={{ margin: 0, fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Tim Russell</p>
            </div>
            <div>
              <Link href="/rss.xml" style={{ color: 'var(--muted)' }}>
                RSS
              </Link>
            </div>
          </div>
        </footer>
        {/* Neural Network Background */}
        <NeuralNetworkBackground />
      </body>
    </html>
  );
}
