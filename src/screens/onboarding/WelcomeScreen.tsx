/** Onboarding 1/9 — Welcome. Brand lockup + value line + Get started. */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import BrandLockup from '../../components/brand/BrandLockup';
import { colors, fonts } from '../../theme/theme';
import type { OnboardingNav } from '../../navigation/types';

export default function WelcomeScreen({ navigation }: { navigation: OnboardingNav<'Welcome'> }) {
  return (
    <Screen scroll={false} padded>
      <View style={styles.hero}>
        <BrandLockup markSize={110} wordSize={30} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.head}>Trusted help for your home.{'\n'}Honest work for you.</Text>
        <Text style={styles.body}>
          Maidora connects Kenyan households with verified house help — and helps
          house help find real, fair work. Every verification is earned, never sold.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Get started" onPress={() => navigation.navigate('HowItWorks')} />
        <Text style={styles.terms}>
          By continuing you'll agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  copy: { alignItems: 'center' },
  head: {
    color: colors.brand,
    fontFamily: fonts.bold,
    fontSize: 21,
    textAlign: 'center',
    lineHeight: 30,
  },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  footer: { gap: 12, paddingBottom: 10 },
  terms: {
    color: colors.muted,
    fontSize: 10.5,
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 15,
  },
});
