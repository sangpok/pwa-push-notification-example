import { getMessaging, getToken } from 'firebase/messaging';

export const verifyNotificationPermission = async () => {
  const messaging = getMessaging();

  /**
   * getToken()은 알림 권한이 없으면 권한 요청을 합니다.
   * 성공 시 토큰을 반환하고, 내부적으로 서비스 워커 설치 및 Push 구독을 진행합니다.
   * 거부 및 취소 시 에러를 반환합니다.
   */
  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
    });

    return fcmToken;

    // localStorage.setItem('FCM_TOKEN', fcmToken);
  } catch (error) {
    /** 권한 관련 에러 체크 */
    if (Notification.permission !== 'granted') {
      // return localStorage.removeItem('FCM_TOKEN');
      console.log('알림 권한 요청 거절 당함 ㅜㅜ');
      return;
    }

    /** 다른 오류 */
    console.error(error);

    return;
  }
};
