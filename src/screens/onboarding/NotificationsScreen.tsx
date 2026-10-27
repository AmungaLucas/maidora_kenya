/** Onboarding 8/9 — Notifications (allow now or later — both continue). */
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Icon, { type IconName } from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import type { OnboardingNav } from '../../navigation/types';

const ITEMS: Array<{ icon: IconName; text: string }> = [
  { icon: 'users', text: 'New applicants for your job posts' },
  { icon: 'chat', text: 'Replies in your chats' },
  { icon: 'wallet', text: 'Payment receipts and wallet activity' },
];

export default function NotificationsScreen({ navigation }: { navigation: OnboardingNav<'Notifications'> }) {
  const allow = () => {
    Alert.alert(
      'Notifications',
      'System permission prompt appears here in the production build.'
    );
    navigation.navigate('AllSet');
  };

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>Stay in the loop</Text>
      <Text style={styles.body}>
        Turn notifications on so nothing waits while you're away. You can change this
        anytime in Settings.
      </Text>

      <Card style={{ marginTop: 20, gap: 14 }}>
        {ITEMS.map((it) => (
          <View key={it.text} style={styles.row}>
            <View style={styles.ring}>
              <Icon name={it.icon} size={18} color={colors.brand} />
            </View>
            <Text style={styles.txt}>{it.text}</Text>
          </View>
        ))}
      </Card>

      <View style={{ flex: 1 }} />
      <Button label="Allow notifications" onPress={allow} />
      <Button
        label="Maybe later"
        variant="ghost"
        onPress={() => navigation.navigate('AllSet')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 6 },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ring: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    flex: 1,
    color: colors.ink,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
});
