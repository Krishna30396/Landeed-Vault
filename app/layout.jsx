import './globals.css';
import { Bricolage_Grotesque, Public_Sans, JetBrains_Mono } from 'next/font/google';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Halfway — a fair meeting point',
  description:
    'Two locations in. One fair meeting point out. Find the halfway point between two people along real roads, snapped to a real town, with places to meet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
