/**
 * MainTabNavigator — role-aware bottom tabs.
 *   employer: Home · Maids · Chats · Wallet · Account
 *   maid:     Home · Jobs  · Chats · Wallet · Account
 * Chats/Wallet/Account are shared screens (PRD §29).
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon, { type IconName } from '../components/ui/Icon';
import { useAppState } from '../state/AppStateContext';
import { colors, fonts } from '../theme/theme';
import EmployerHomeScreen from '../screens/employer/EmployerHomeScreen';
import MaidsScreen from '../screens/employer/MaidsScreen';
import MaidHomeScreen from '../screens/maid/MaidHomeScreen';
import FindJobsScreen from '../screens/maid/FindJobsScreen';
import InboxScreen from '../screens/shared/InboxScreen';
import WalletScreen from '../screens/shared/WalletScreen';
import AccountScreen from '../screens/shared/AccountScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICON: Record<keyof MainTabParamList, IconName> = {
  Home: 'home',
  Maids: 'search',
  Jobs: 'briefcase',
  Inbox: 'chat',
  Wallet: 'wallet',
  Account: 'person',
};

const TAB_LABEL: Record<keyof MainTabParamList, string> = {
  Home: 'Home',
  Maids: 'Find help',
  Jobs: 'Find work',
  Inbox: 'Chats',
  Wallet: 'Wallet',
  Account: 'Account',
};

export default function MainTabNavigator() {
  const { role } = useAppState();
  const isEmployer = role !== 'maid';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color, size }) => (
          <Icon name={TAB_ICON[route.name as keyof MainTabParamList]} size={size - 2} color={color} />
        ),
      })}
    >
      {isEmployer ? (
        <>
          <Tab.Screen name="Home" component={EmployerHomeScreen} />
          <Tab.Screen name="Maids" component={MaidsScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={MaidHomeScreen} />
          <Tab.Screen name="Jobs" component={FindJobsScreen} />
        </>
      )}
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.cream,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    height: 84,
    paddingTop: 8,
    paddingBottom: 18,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    letterSpacing: 0.2,
  },
});
