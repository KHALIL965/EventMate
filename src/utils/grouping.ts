export const groupByDay = (events: any[]) => {
  return events.reduce((acc, event) => {
    const day = new Date(event.startAt).toDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(event);
    return acc;
  }, {} as Record<string, any[]>);
};
