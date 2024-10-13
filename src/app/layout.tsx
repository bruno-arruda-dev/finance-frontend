import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header.tsx';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Finance frontend',
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
