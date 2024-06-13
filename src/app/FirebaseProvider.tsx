'use client';

import { useEffect, useState } from 'react';
import { initFirebaseApp } from './firebase';

export const FirebaseProvider = () => {
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    initFirebaseApp().then((token) => {
      if (token) {
        setFcmToken(token);
      }
    });
  }, []);

  return <>{fcmToken}</>;
};
