import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './firebase';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#212121',
};

export const metadata: Metadata = {
  title: 'PWA Push Notification Demo',
  description: 'PWA 환경에서 Push Notiication 기능을 테스트합니다.',

  applicationName: 'PWA Push Notification Demo',
  appleWebApp: {
    capable: true,
    title: 'PWA Push Notification Demo',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        media:
          'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        url: '/assets/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png',
      },
    ],
  },

  openGraph: {
    type: 'website',
    title: 'PWA Push Notification Demo',
    description: 'PWA 환경에서 Push Notiication 기능을 테스트합니다.',
    siteName: 'PWA App',
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
