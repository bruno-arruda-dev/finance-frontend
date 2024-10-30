import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header.tsx';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

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
        <ConfigProvider locale={ptBR}>
          <Header />
          {children}
          <ToastContainer />
        </ConfigProvider>
      </body>
    </html>
  );
}
