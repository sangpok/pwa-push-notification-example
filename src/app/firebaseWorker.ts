import { MessagePayload, getMessaging, onMessage } from 'firebase/messaging';

const FCM_SCOPE = 'firebase-cloud-messaging-push-scope' as const;

export const initFirebaseWorker = async () => {
  const firebaseWorker = await getFirebaseWorker();
  const hasNoFirebaseWorker = firebaseWorker === undefined;

  if (hasNoFirebaseWorker) {
    const newFirebaseWorker = await createNewFirewbaseWorker();
    return listenFCMEvent(newFirebaseWorker);
  }

  return listenFCMEvent(firebaseWorker);
};

const getFirebaseWorker = async () => {
  return await navigator.serviceWorker.getRegistration(`${window.location.origin}/${FCM_SCOPE}`);
};

const listenFCMEvent = (firebaseSW: ServiceWorkerRegistration) => {
  const messaging = getMessaging();

  onMessage(messaging, async (payload) => {
    console.log('Foreground Message received. ', payload);

    if (Notification.permission !== 'granted') {
      /**
       * FCM 서버에서 메시지가 왔을 때 알림 권한 요청을 하는 모양새는 부자연스러으므로
       * 무시를 하거나 따로 처리가 필요합니다.
       */
      console.warn('FCM 서버에서 푸시는 받았는데 알림 권한이 없어요.');
      return;
    }

    const { title, options } = createNotificationItem(payload);

    firebaseSW.showNotification(title, options);
  });
};

const createNewFirewbaseWorker = async (): Promise<ServiceWorkerRegistration> => {
  /**
   * FCM은 getToken()을 호출하면 자동으로 firebase-messaging-sw.js를 서비스 워커로 등록합니다.
   * 하지만, 뭔가 이슈가 있는지 서비스 워커가 등록되어있지 않은 최초에 호출하게 되면
   * 활성화된 ServiceWorker를 찾지 못하고 오류를 반환합니다.
   *
   * 때문에 같은 Scope로 먼저 서비스 워커를 등록합니다.
   */
  const newFirebaseSW = await navigator.serviceWorker.register('firebase-messaging-sw.js', {
    scope: FCM_SCOPE,
  });

  return new Promise((resolve) => {
    const handleStateChange = async () => {
      const isActivated = newFirebaseSW.active?.state === 'activated';

      if (isActivated) {
        resolve(newFirebaseSW);
      }
    };

    newFirebaseSW.installing?.addEventListener('statechange', handleStateChange.bind(this));
  });
};

const createNotificationItem = (payload: MessagePayload) => {
  const { data } = payload;
  const { title, body, image, clickActions } = data!;

  const clickActionArray = JSON.parse(clickActions);

  const options: NotificationOptions['data'] = {
    body,
    image,
    tag: 'renotify',
    renotify: true,
    actions: clickActionArray.map(createActionItem),
    // icon: '/firebase-logo.png', // 루트 경로 기준으로 접근
  };

  return { title, options };
};

const createActionItem = (clickAction: string) => ({
  action: clickAction,
  title: clickAction,
  icon: 'https://velog.velcdn.com/images/sangpok/profile/617ed7e6-c276-402f-b01b-444aae69e053/image.png',
});
