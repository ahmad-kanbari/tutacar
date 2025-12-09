import * as admin from 'firebase-admin';

// Singleton initialization
if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

export async function sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
    if (!admin.apps.length) {
        console.log('[MOCK] Sending Push Notification:', { token, title, body });
        return true;
    }

    try {
        await admin.messaging().send({
            token,
            notification: {
                title,
                body,
            },
            data,
        });
        return true;
    } catch (error) {
        console.error('Error sending push notification:', error);
        return false;
    }
}
