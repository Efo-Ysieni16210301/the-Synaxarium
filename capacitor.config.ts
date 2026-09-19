import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ethiosaints',
  appName: 'Feasts of the Saints',
  // Capacitor packages whatever's in `webDir` into the Android app and
  // loads it from disk - this is what makes it work with zero network.
  webDir: 'out', // `next build` with output:'export' writes here
  bundledWebRuntime: false,
};

export default config;
