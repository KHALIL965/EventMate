import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Storage } from '../../src/storage/local';
import { groupByDay } from '../../src/utils/grouping';
import EventCard from '../../src/components/EventCard';

export default function MyPlan() {
  const [plan, setPlan] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const ids = (await Storage.getItem<string[]>('myPlan')) || [];
      const events = (await Storage.getItem<any[]>('events')) || [];
      setPlan(events.filter(e => ids.includes(e.id)));
    })();
  }, []);

  const grouped: Record<string, any[]> = groupByDay(plan);

  return (
    <ScrollView style={{ padding: 10 }}>
      {Object.entries(grouped).map(([day, events]) => (
        <View key={day}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 8 }}>{day}</Text>
          {events.map(ev => <EventCard key={ev.id} event={ev} />)}
        </View>
      ))}
    </ScrollView>
  );
}
