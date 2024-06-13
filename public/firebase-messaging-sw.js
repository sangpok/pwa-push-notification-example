'use strict';

// self.__WB_DISABLE_DEV_LOGS = true;

importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDwCURVjXthIBa2Zcc8r9puYrxg4nV7FOI',
  authDomain: 'meet-writing.firebaseapp.com',
  projectId: 'meet-writing',
  storageBucket: 'meet-writing.appspot.com',
  messagingSenderId: '852885568219',
  appId: '1:852885568219:web:6b43ad5f5505da9ae6aafe',
};

const createNotificationItem = (payload) => {
  const {
    data: { title, body, image, clickAction },
  } = payload;

  const clickActionArray = clickAction ? JSON.parse(clickAction) : [];

  const options = {
    body,
    image,
    tag: 'renotify',
    renotify: true,
    actions: clickActionArray.map(createActionItem),
    // icon: '/firebase-logo.png', // 루트 경로 기준으로 접근
  };

  return { title, options };
};

const createActionItem = (clickAction) => ({
  action: clickAction,
  title: clickAction,
  icon: 'https://velog.velcdn.com/images/sangpok/profile/617ed7e6-c276-402f-b01b-444aae69e053/image.png',
});

const listenBackgroundMessage = () => {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const { title, options } = createNotificationItem(payload);

    return self.registration.showNotification(title, options);
  });
};

const listenNotificationClick = () => {
  self.addEventListener('notificationclick', function (event) {
    console.log('[firebase-messaging-sw.js] Received Notification Click ', event);

    const url = '/';
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });
};

const listenNotificationEvents = () => {
  listenBackgroundMessage();
  listenNotificationClick();
};

const initServiceWorker = async () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const isMessagingSupported = await firebase.messaging.isSupported();

  if (!isMessagingSupported) {
    return console.warn('[firebase-messaging-sw.js] Messaging is not supported.');
  }

  listenNotificationEvents();
};

console.log('[firebase-messaging-sw.js] Loaded Service Worker');

initServiceWorker();
