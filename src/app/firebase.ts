'use client';

import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { initFirebaseWorker } from './firebaseWorker';
import { verifyNotificationPermission } from './notificationPermissionUtil';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const initFirebaseApp = async () => {
  const firebaseApps = getApps();

  /** 최초 Firebase App instance 생성 */
  if (firebaseApps.length === 0) {
    initializeApp(firebaseConfig);
  }

  /** 서비스 워커 초기화 */
  await initFirebaseWorker();

  /** 알림 권한 설정 */
  return await verifyNotificationPermission();
};
