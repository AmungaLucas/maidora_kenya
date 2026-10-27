/**
 * RootNavigator — Splash gate → Onboarding (signed out) OR Main + stack screens.
 * Still plain React Navigation native-stack. Still no expo-router.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppState } from '../state/AppStateContext';
import SplashScreen from '../screens/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import MaidProfileScreen from '../screens/employer/MaidProfileScreen';
import PostJobScreen from '../screens/employer/PostJobScreen';
import ConversationScreen from '../screens/shared/ConversationScreen';
import JobDetailScreen from '../screens/shared/JobDetailScreen';
import KycScreen from '../screens/shared/KycScreen';
import PaywallScreen from '../screens/shared/PaywallScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { signedIn } = useAppState();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F7F3E9' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      {!signedIn ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="MaidProfile"
            component={MaidProfileScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Conversation"
            component={ConversationScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
          <Stack.Screen name="Kyc" component={KycScreen} />
          <Stack.Screen
            name="PostJob"
            component={PostJobScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Paywall"
            component={PaywallScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
