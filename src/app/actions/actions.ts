'use server';

import admin, { ServiceAccount } from 'firebase-admin';
import { NotificationData } from '../types/notification';
import { Message } from 'firebase-admin/messaging';

const serviceAccount: ServiceAccount = {
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
};

export const sendFCMNotification = async (data: NotificationData & { token: string }) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const { token, ...rest } = data;

  const message: Message = {
    data: { ...rest, clickActions: JSON.stringify(rest.clickActions) },
    token: token,
  };

  try {
    const { failureCount, responses } = await admin.app().messaging().sendEach([message]);

    if (failureCount > 0) {
      responses.map(({ success, error }) => {
        if (!success) {
          console.error(error);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};
