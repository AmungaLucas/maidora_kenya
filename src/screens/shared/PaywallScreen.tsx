/**
 * Paywall — every paid moment, honestly priced (PRD §34 order):
 * verify (FREE) → subscribe (plans 1/5/10, standard 5 = KSh 99) → PAYG.
 * Always: price up front, M-Pesa STK, no auto-renew, no stored PINs.
 */
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import FullScreenLoader from '../../components/brand/loaders/FullScreenLoader';
import { colors, fonts } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PaywallMoment, RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

type Copy = {
  icon: 'shield' | 'bolt' | 'chat' | 'phone' | 'briefcase' | 'lock';
  title: string;
  price: string;
  body: string;
  cta: string;
};

const COPY: Record<PaywallMoment, Copy> = {
  verify: {
    icon: 'shield',
    title: 'Verification is free',
    price: 'KSh 0',
    body: "The ID-verified badge is earned through real checks — never bought. That's what makes it worth showing.",
    cta: 'Continue — free',
  },
  subscribe: {
    icon: 'bolt',
    title: 'Outreach plan',
    price: 'KSh 99 · 5 chats',
    body: 'For when you make the first move. Applicants who apply to your jobs are always free. One-time purchase — no subscription, no auto-renew.',
    cta: 'Buy 5-chat plan · KSh 99',
  },
  chat: {
    icon: 'chat',
    title: 'Pay as you go',
    price: 'KSh 50 / chat',
    body: 'Start one outreach chat without a plan. Her replies are always free — and the chat never expires while active.',
    cta: 'Start chat · KSh 50',
  },
  contact: {
    icon: 'phone',
    title: 'Unlock contact',
    price: 'KSh 100',
    body: "Reveal this maid's phone number — one-time, for this profile only. Chatting in-app stays available either way.",
    cta: 'Unlock · KSh 100',
  },
  apply: {
    icon: 'briefcase',
    title: 'Apply to this job',
    price: 'KSh 50',
    body: 'One application, this job. The moment you apply, chatting with the employer is free — forever.',
    cta: 'Apply · KSh 50',
  },
  kycUrgent: {
    icon: 'lock',
    title: 'Expedited review',
    price: 'KSh 150 · 72h',
    body: 'Move your verification to the front of the queue. Standard review stays free and usually takes 24–48 hours.',
    cta: 'Expedite · KSh 150',
  },
};

export default function PaywallScreen({ navigation, route }: Props) {
  const moment: PaywallMoment = route.params?.moment ?? 'subscribe';
  const c = COPY[moment];
  const [paying, setPaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pay = () => {
    if (paying) return;
    if (moment === 'verify') {
      navigation.replace('Kyc');
      return;
    }
    setPaying(true);
    timers.current.push(
      setTimeout(() => {
        setPaying(false);
        Alert.alert(
          'Demo build',
          "The real M-Pesa STK push fires here once the backend is live. You'd approve it with your PIN — which Maidora never sees.",
        );
        navigation.goBack();
      }, 1600),
    );
  };

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />

      <View style={styles.hero}>
        <View style={styles.iconRing}>
          <Icon name={c.icon} size={26} color={colors.brand} />
        </View>
        <Text style={styles.title}>{c.title}</Text>
        <Text style={styles.price}>{c.price}</Text>
      </View>

      <Card style={{ marginTop: 16 }}>
        <Text style={styles.body}>{c.body}</Text>
      </Card>

      {moment === 'subscribe' ? (
        <View style={styles.tiers}>
          {['1 chat', '5 chats', '10 chats'].map((t, i) => (
            <View key={t} style={[styles.tier, i === 1 && styles.tierOn]}>
              <Text style={[styles.tierTxt, i === 1 && styles.tierTxtOn]}>{t}</Text>
              {i === 1 ? <Text style={styles.tierTag}>Standard</Text> : null}
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ flex: 1, minHeight: 18 }} />

      <Button label={c.cta} onPress={pay} />
      <Pressable hitSlop={8} onPress={() => navigation.goBack()}>
        <Text style={styles.cancel}>Not now</Text>
      </Pressable>

      <View style={styles.terms}>
        <Icon name="shield" size={14} color={colors.brand} />
        <Text style={styles.termsTxt}>
          You'll get an M-Pesa STK push and approve with your PIN. Maidora never sees
          your PIN. The price above is the full price.
        </Text>
      </View>

      <FullScreenLoader visible={paying} label="Triggering STK push" theme="dark" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: 8 },
  iconRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.brand, fontFamily: fonts.bold, fontSize: 20, marginTop: 12 },
  price: { color: colors.goldDark, fontFamily: fonts.semiBold, fontSize: 15, marginTop: 4 },
  body: { color: colors.ink, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20 },
  tiers: { flexDirection: 'row', gap: 10, marginTop: 12 },
  tier: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  tierOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  tierTxt: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13 },
  tierTxtOn: { color: colors.cream },
  tierTag: {
    color: colors.gold,
    fontFamily: fonts.medium,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  cancel: {
    color: colors.muted,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
  },
  terms: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 6,
  },
  termsTxt: {
    flex: 1,
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
  },
});
