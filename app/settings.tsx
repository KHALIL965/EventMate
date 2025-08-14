import React from 'react';
import { View, Button } from 'react-native';
import { registerBackgroundTask } from '../src/services/backgroundRefresh';

export default function Settings() {
  return (
    <View style={{ padding: 10 }}>
      <Button title="Check for Updates Now" onPress={registerBackgroundTask} />
    </View>
  );
}
