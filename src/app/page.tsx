import { Suspense } from 'react';
import { FirebaseProvider } from './FirebaseProvider';
import { RequestPermissionButton } from './RequestPermissionButton';
import { sendFCMNotification } from './actions/actions';

export default async function Home() {
  const handleSendNotification = async (formData: FormData) => {
    'use server';

    const fcmToken = formData.get('fcmToken') as string;

    if (fcmToken === null) {
      return;
    }

    await sendFCMNotification({
      title: '🎉 새로운 알림이 도착했어요!',
      body: '김주현님께서 회원님을 구독하셨습니다.',
      image:
        'https://velog.velcdn.com/images/sangpok/profile/617ed7e6-c276-402f-b01b-444aae69e053/image.png',
      clickActions: ['안녕', '방가'],
      token: fcmToken,
      // 'd9nIPcZYPWYiqdBzyWlJCj:APA91bEc-rAZhIjlJG6lKvYe0bwkj630Zpujx1UxDNUWuPT8LTesukVNbozvo1W3UJuG638cVfsIuvbLVnJe46o0BWGSE0C27fFDnLEVOlH2NgSlg5bIRsoFor_ILxwZMIkv-mBMZ4rA',
    });
  };

  return (
    <>
      <FirebaseProvider />

      <main className="min-h-dvh flex flex-col items-center justify-center">
        <h1 className="text-3xl">PWA 테스트</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <RequestPermissionButton />
        </Suspense>

        <form>
          <input id="fcmToken" name="fcmToken" />
          <button
            className="py-2 px-4 rounded hover:bg-gray-100 disabled:text-gray-600"
            formAction={handleSendNotification}
          >
            보내자
          </button>
        </form>
      </main>
    </>
  );
}
