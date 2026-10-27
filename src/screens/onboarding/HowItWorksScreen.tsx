/** Onboarding 2/9 — How it works. Three steps + the honesty promise. */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Icon, { type IconName } from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import type { OnboardingNav } from '../../navigation/types';

const STEPS: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'doc',
    title: '1 · Tell us what you need',
    body: 'Post a job, or build a profile that shows who you are and what you do best.',
  },
  {
    icon: 'shield',
    title: '2 · Meet verified people',
    body: 'ID checks, real references, earned badges. No paid shortcuts — ever.',
  },
  {
    icon: 'chat',
    title: '3 · Chat, hire, pay safely',
    body: 'Talk in the app, agree on terms, and move money only through M-Pesa in Maidora.',
  },
];

export default function HowItWorksScreen({ navigation }: { navigation: OnboardingNav<'HowItWorks'> }) {
  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>How Maidora works</Text>
      <Text style={styles.sub}>Three steps. Nothing hidden.</Text>

      <View style={{ gap: 12, marginTop: 18 }}>
        {STEPS.map((s) => (
          <Card key={s.title} style={styles.step}>
            <View style={styles.ring}>
              <Icon name={s.icon} size={22} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepBody}>{s.body}</Text>
            </View>
          </Card>
        ))}
      </View>

      <Card bg={colors.brand} bordered={false} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Icon name="shield" size={26} color={colors.brandSoft} />
          <View style={{ flex: 1 }}>
            <Text style={styles.promiseTitle}>Verification is earned, never sold.</Text>
            <Text style={styles.promiseBody}>
              No badge, tick or trust mark on Maidora can be bought. That's the promise
              this whole platform is built on.
            </Text>
          </View>
        </View>
      </Card>

      <View style={{ flex: 1 }} />
      <Button label="Continue" onPress={() => navigation.navigate('Phone')} style={{ marginTop: 18 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 6 },
  sub: {
    color: colors.goldDark,
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  step: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  ring: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 14 },
  stepBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 3,
  },
  promiseTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 13.5 },
  promiseBody: {
    color: 'rgba(247,243,233,0.78)',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
});
