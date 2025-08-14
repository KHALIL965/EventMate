export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isFuture = (iso: string) => new Date(iso).getTime() > Date.now();
