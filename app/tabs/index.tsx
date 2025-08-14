import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import EventCard from '../../src/components/EventCard';
import { Storage } from '../../src/storage/local';
import initialEvents from '../../assets/data/events.json';

export default function AllEvents() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let stored = await Storage.getItem<any[]>('events');
      if (!stored) {
        await Storage.setItem('events', initialEvents);
        stored = initialEvents;
      }
      setEvents(stored);
    })();
  }, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      {events.map(ev => <EventCard key={ev.id} event={ev} />)}
    </ScrollView>
  );
}
