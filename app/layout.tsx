import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpeakPortrait - AI-Powered Speaking Portrait Generator',
  description: 'Transform your photos into speaking portraits with AI. Upload an image and text or audio to create amazing talking videos.',
  keywords: 'AI, speaking portrait, video generation, talking photos, artificial intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}