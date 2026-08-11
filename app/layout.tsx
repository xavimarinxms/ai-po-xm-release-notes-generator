import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Release Notes Generator — by Xavi Marín',
  description: 'Transform sprint changes into polished release notes for 3 audiences simultaneously: end users, technical teams, and executives.',
  authors: [{ name: 'Xavi Marín', url: 'https://xavimarin.net' }],
  metadataBase: new URL('https://release-notes.xavimarin.net'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen antialiased">{children}</body>
    </html>
  );
}
