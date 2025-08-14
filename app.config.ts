import { ExpoConfig } from '@expo/config';
const config: ExpoConfig = {
  name: 'EventMate',
  slug: 'eventmate',
  scheme: 'eventmate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {},
  assetBundlePatterns: ['**/*'],
  ios: { supportsTablet: true },
 android: {
    package: "com.khalilahmad99999.eventmate", // <-- Add this line here
  },
  plugins: ['expo-router'],
  extra: {
    eas: {
      projectId: '9d789ab9-cfae-41e3-ad89-66ad23708349'
    }
  }
};
export default config;