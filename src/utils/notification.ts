// Conditional import of Notifee – use a mock when running Jest tests
let notifee: any;
let AndroidImportance: any;

if (process.env.JEST_WORKER_ID) {
  // Jest environment – provide a lightweight mock implementation
  notifee = {
    requestPermission: async () => true,
    createChannel: async () => 'default',
    displayNotification: async () => {},
  };
  AndroidImportance = { HIGH: 4 };
} else {
  // Real runtime – import the actual native module
  const notifeeModule = require('@notifee/react-native');
  // The library exports a default instance and named enums
  notifee = notifeeModule.default ?? notifeeModule;
  AndroidImportance = notifeeModule.AndroidImportance;
}


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