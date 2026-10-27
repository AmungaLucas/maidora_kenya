/**
 * Onboarding 9/9 — All set. Completing here flips `signedIn`, so the root
 * navigator swaps Onboarding → Main (role-aware tabs) automatically.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import BrandMark from '../../components/brand/BrandMark';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';

export default function AllSetScreen() {
  const { firstName, role, county, completeOnboarding } = useAppState();
  const who = firstName || 'friend';

  return (
    <Screen scroll={false} padded>
      <View style={styles.hero}>
        <View style={styles.markRing}>
          <BrandMark size={92} ink={colors.brandSoft} pillar={colors.brandSoft} accent={colors.gold} />
        </View>
        <Text style={styles.head}>You're all set, {who}!</Text>
        <View style={styles.badges}>
          <Badge label={role === 'employer' ? 'Employer account' : 'House help account'} tone="soft" />
          {county ? <Badge label={county} tone="gold" /> : null}
        </View>
        <Text style={styles.body}>
          {role === 'employer'
            ? 'Post your first job and applicants will come to you — chatting with them is free, forever.'
            : 'Build your profile and start applying. Verification is free — earned, never sold.'}
        </Text>
      </View>

      <Button label="Enter Maidora" onPress={completeOnboarding} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  markRing: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, textAlign: 'center' },
  badges: { flexDirection: 'row', gap: 8 },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 14,
  },
});
