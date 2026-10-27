/**
 * Onboarding 4/9 — OTP (PRD rules: 6 digits, 5-minute expiry, resend
 * cooldown, lockout after repeated failures). Demo build: any 6 digits
 * verify after the radar loader — real checks land with the backend.
 */
import React, { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import { colors, fonts } from '../../theme/theme';
import type { OnboardingNav } from '../../navigation/types';

const EXPIRY = 5 * 60; // seconds
const RESEND_COOLDOWN = 30; // seconds
const MAX_ATTEMPTS = 5;

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = `${total % 60}`.padStart(2, '0');
  return `${m}:${s}`;
}

export default function OtpScreen({ navigation, route }: { navigation: OnboardingNav<'Otp'>; route: { params?: { phone?: string } } }) {
  const sentTo = route.params?.phone ?? 'your phone';
  const [code, setCode] = useState('');
  const [left, setLeft] = useState(EXPIRY);
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((v) => (v > 0 ? v - 1 : 0));
      setResendIn((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const verify = () => {
    if (code.length !== 6 || checking || locked) return;
    setChecking(true);
    later(() => {
      setChecking(false);
      navigation.navigate('RoleSelect');
    }, 1400);
  };

  const resend = () => {
    if (resendIn > 0) return;
    setResendIn(RESEND_COOLDOWN);
    setLeft(EXPIRY);
    Alert.alert('Code sent', `A fresh 6-digit code is on its way to ${sentTo}.`);
  };

  const fail = () => {
    const n = attempts + 1;
    setAttempts(n);
    setCode('');
    if (n >= MAX_ATTEMPTS) setLocked(true);
    else Alert.alert('Wrong code', `That code didn't match. ${MAX_ATTEMPTS - n} attempts left.`);
  };

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>Enter the 6-digit code</Text>
      <Text style={styles.body}>
        Sent to <Text style={styles.strong}>{sentTo}</Text>. It expires in{' '}
        <Text style={left > 0 ? styles.strong : styles.expired}>{fmt(left)}</Text>.
      </Text>

      <Pressable onPress={() => inputRef.current?.focus()} style={styles.boxes}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={[styles.box, code.length === i && styles.boxActive]}>
            <Text style={styles.boxTxt}>{code[i] ?? ''}</Text>
          </View>
        ))}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, 6))}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          style={styles.hidden}
        />
      </Pressable>

      {locked ? (
        <Text style={styles.locked}>
          Too many attempts. For your security this number is locked for a while —
          try again later or request a fresh code.
        </Text>
      ) : (
        <Pressable hitSlop={8} onPress={resend}>
          <Text style={[styles.resend, resendIn > 0 && { color: colors.muted }]}>
            {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
          </Text>
        </Pressable>
      )}

      <View style={{ flex: 1 }} />
      <Button
        label="Verify"
        loading={checking}
        loadingLabel="Checking…"
        disabled={code.length !== 6 || locked}
        onPress={verify}
      />
      <Pressable hitSlop={8} onPress={fail}>
        <Text style={styles.demo}>Demo build — wrong codes can be simulated here.</Text>
      </Pressable>
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
  strong: { color: colors.brand, fontFamily: fonts.semiBold },
  expired: { color: '#B3402F', fontFamily: fonts.semiBold },
  boxes: { flexDirection: 'row', gap: 8, marginTop: 26 },
  box: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: { borderColor: colors.brandSoft },
  boxTxt: { color: colors.brand, fontFamily: fonts.bold, fontSize: 20 },
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  resend: {
    color: colors.brand,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    marginTop: 16,
  },
  locked: {
    color: '#B3402F',
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
  demo: {
    color: colors.muted,
    fontSize: 10,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: 10,
  },
});
