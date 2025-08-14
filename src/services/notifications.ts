import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (event: any) => {
  const triggerTime = new Date(new Date(event.startAt).getTime() - 30 * 60 * 1000);
  if (triggerTime.getTime() < Date.now()) return;
  
  await Notifications.requestPermissionsAsync();
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Upcoming Event: ${event.title}`,
      body: `Starts at ${new Date(event.startAt).toLocaleTimeString()}`
    },
    trigger: triggerTime
  });
  return id;
};

export const cancelNotification = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};
