import * as Linking from 'expo-linking';

export const getDeepLink = (eventId: string) => {
  return `eventmate://event/${eventId}`;
};

export const configureDeepLinks = (onEventOpen: (id: string) => void) => {
  Linking.addEventListener('url', ({ url }) => {
    const parsed = Linking.parse(url);
    if (parsed.path?.startsWith('event/')) {
      const id = parsed.path.split('/')[1];
      if (id) onEventOpen(id);
    }
  });
};
