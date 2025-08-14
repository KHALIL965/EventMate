import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Storage } from '../storage/local';
import eventsUpdates from '../../assets/data/events_updates.json';

const TASK_NAME = 'background-refresh';

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const localEvents = (await Storage.getItem<any[]>('events')) || [];
    let updated = false;
    for (const update of eventsUpdates) {
      const idx = localEvents.findIndex(e => e.id === update.id);
      if (idx > -1 && new Date(update.updatedAt) > new Date(localEvents[idx].updatedAt)) {
        localEvents[idx] = { ...update, updated: true };
        updated = true;
      }
    }
    if (updated) await Storage.setItem('events', localEvents);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundTask = async () => {
  await BackgroundFetch.registerTaskAsync(TASK_NAME, { minimumInterval: 60 * 60 });
};
