import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#212121',
    background_color: '#ffffff',
    icons: [
      {
        src: 'assets/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'assets/icons/icon-filled-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'assets/icons/icon-filled-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    orientation: 'any',
    display: 'standalone',
    start_url: '/',
    dir: 'auto',
    lang: 'ko-KR',
    name: '마음을 준 글, 마중글',
    short_name: '마중글',
    description: '마음을 준 글을 수집해보세요.',
  };
}
