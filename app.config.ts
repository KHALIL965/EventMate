import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'EventMate',
  slug: 'eventmate',
  scheme: 'eventmate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
  
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
 },
  plugins: ['expo-router']
};

export default config;
