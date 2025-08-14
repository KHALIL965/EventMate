import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { formatDate, formatTime } from '../utils/date';
import { useRouter } from 'expo-router';

export default function EventCard({ event }: { event: any }){
  const router = useRouter();
  return (
    <Pressable style={styles.card} onPress={() => router.push(`/event/${event.id}`)}>
      {event.imageUrl ? <Image source={{ uri: event.imageUrl }} style={styles.image} /> : null}
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>
          {formatDate(event.startAt)} • {formatTime(event.startAt)}
        </Text>
        {event.updated && <Text style={styles.updated}>Updated</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff', elevation: 2 },
  image: { height: 150, width: '100%' },
  content: { padding: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: '#555' },
  updated: { color: 'red', fontSize: 12, marginTop: 4 }
});
