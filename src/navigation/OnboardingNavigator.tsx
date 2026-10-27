/**
 * OnboardingNavigator — the PRD 9-screen spine (~75 seconds):
 * Welcome → HowItWorks → Phone → OTP → RoleSelect → Consents → Basics →
 * Notifications → AllSet. No back-jumping across role boundaries.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import HowItWorksScreen from '../screens/onboarding/HowItWorksScreen';
import PhoneScreen from '../screens/onboarding/PhoneScreen';
import OtpScreen from '../screens/onboarding/OtpScreen';
import RoleSelectScreen from '../screens/onboarding/RoleSelectScreen';
import ConsentsScreen from '../screens/onboarding/ConsentsScreen';
import ProfileBasicsScreen from '../screens/onboarding/ProfileBasicsScreen';
import NotificationsScreen from '../screens/onboarding/NotificationsScreen';
import AllSetScreen from '../screens/onboarding/AllSetScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F7F3E9' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Consents" component={ConsentsScreen} />
      <Stack.Screen name="ProfileBasics" component={ProfileBasicsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="AllSet" component={AllSetScreen} />
    </Stack.Navigator>
  );
}
