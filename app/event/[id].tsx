import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { Storage } from '../../src/storage/local';
import { getDeepLink } from '../../src/services/deepLinks';
import { scheduleNotification, cancelNotification } from '../../src/services/notifications';

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [rsvp, setRsvp] = useState(false);
  const [notifId, setNotifId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const events = (await Storage.getItem<any[]>('events')) || [];
      const found = events.find(e => e.id === id);
      setEvent(found);

      const plan = (await Storage.getItem<string[]>('myPlan')) || [];
      setRsvp(plan.includes(id as string));
    })();
  }, []);

  if (!event) return <Text>Loading...</Text>;

  const toggleRsvp = async () => {
    let plan = (await Storage.getItem<string[]>('myPlan')) || [];
    if (rsvp) {
      plan = plan.filter(pid => pid !== event.id);
      if (notifId) await cancelNotification(notifId);
    } else {
      plan.push(event.id);
      const newId = await scheduleNotification(event);
      if (newId) setNotifId(newId);
    }
    await Storage.setItem('myPlan', plan);
    setRsvp(!rsvp);
  };

  return (
    <View style={{ padding: 10 }}>
      {event.imageUrl && <Image source={{ uri: event.imageUrl }} style={{ height: 200, borderRadius: 8 }} />}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{event.title}</Text>
      <Text>{event.description}</Text>
      {event.latitude && event.longitude ? (
        <MapView
          style={{ height: 200, marginTop: 10 }}
          initialRegion={{
            latitude: event.latitude,
            longitude: event.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker coordinate={{ latitude: event.latitude, longitude: event.longitude }} />
        </MapView>
      ) : (
        <Text>No coordinates available</Text>
      )}
      <Button title={rsvp ? "Remove from My Plan" : "RSVP"} onPress={toggleRsvp} />
      <Button title="Share" onPress={() => Share.share({ message: getDeepLink(event.id) })} />
    </View>
  );
}
