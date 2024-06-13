'use client';

import { verifyNotificationPermission } from './notificationPermissionUtil';
import { useMounted } from './useMounted';

export const RequestPermissionButton = () => {
  const isMounted = useMounted();

  if (!isMounted) {
    return <p>Loading...</p>;
  }

  const hasNotificationPermission = window.Notification.permission === 'granted';

  return (
    <div>
      {hasNotificationPermission ? (
        <p>알림 권한이 허용되었습니다.</p>
      ) : (
        <button
          className="py-2 px-4 rounded hover:bg-gray-100"
          onClick={verifyNotificationPermission}
        >
          알림 허용하기
        </button>
      )}
    </div>
  );
};
