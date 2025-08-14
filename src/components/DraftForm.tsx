import React, { useState } from "react";
import { View, TextInput, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import saveDraft from local storage utility
import {Storage} from "../../src/storage/local";

export default function DraftForm({ draft, onSave }: { draft?: any; onSave: (draft: any) => void }) {
  const [title, setTitle] = useState(draft?.title || "");
  const [startAt, setStartAt] = useState(draft?.startAt || "");
  const [endAt, setEndAt] = useState(draft?.endAt || "");
  const [latitude, setLatitude] = useState(String(draft?.latitude || ""));
  const [longitude, setLongitude] = useState(String(draft?.longitude || ""));
  const [venueName, setVenueName] = useState(draft?.venueName || "");
  const [description, setDescription] = useState(draft?.description || "");
  const [imageUrl, setImageUrl] = useState(draft?.imageUrl || "");


  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!res.canceled) setImageUrl(res.assets[0].uri);
  };

  const validate = () => {
    if (!title || !startAt || !endAt || !latitude || !longitude) {
      Alert.alert("Validation", "Please fill all required fields");
      return false;
    }
    if (new Date(endAt) <= new Date(startAt)) {
      Alert.alert("Validation", "End date must be after start date");
      return false;
    }
    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      Alert.alert("Validation", "Coordinates must be numbers");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
  if (!validate()) return;
  const newDraft = {
    id: draft?.id || `draft-${Date.now()}`,
    title,
    startAt,
    endAt,
    latitude: Number(latitude),
    longitude: Number(longitude),
    venueName,
    description,
    imageUrl,
  };
  onSave(newDraft); // optimistic update
  try {
    await Storage.setItem('draft', newDraft); // Save draft to local storage
  } catch (e) {
    // handle error
  }
};
  return (
    <View style={styles.container}>
      <TextInput placeholder="Title*" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="StartAt*" value={startAt} onChangeText={setStartAt} style={styles.input} />
      <TextInput placeholder="EndAt*" value={endAt} onChangeText={setEndAt} style={styles.input} />
      <TextInput placeholder="Latitude*" value={latitude} onChangeText={setLatitude} style={styles.input} />
      <TextInput placeholder="Longitude*" value={longitude} onChangeText={setLongitude} style={styles.input} />
      <TextInput placeholder="Venue Name" value={venueName} onChangeText={setVenueName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      {imageUrl ? <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} /> : null}
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Save Draft" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
});
