/**
 * Maidora Kenya — app entry (React Navigation, no expo-router).
 * 1. Keep the native splash (expo-splash-screen) up while Poppins loads.
 * 2. Hand over to the animated H07 "Ping Letters" splash (SplashScreen route).
 */
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import RootNavigator from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/state/AppStateContext';
import { colors } from './src/theme/theme';

ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand,
    background: colors.cream,
    card: colors.cream,
    text: colors.brand,
    border: colors.line,
    notification: colors.gold,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) ExpoSplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer theme={NavTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
