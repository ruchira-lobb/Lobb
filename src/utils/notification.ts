import notifee, { AndroidImportance } from '@notifee/react-native';

export async function showWelcomeNotification() {
    // Request permission (important for Android 13+ and iOS)
    await notifee.requestPermission();

    // Create Android channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });

    // Display notification
    await notifee.displayNotification({
        title: 'Hello User! 👋',
        body: 'Welcome to the Food App',
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
        },
    });
}