/**
 * Onboarding 6/9 — Consents (PRD: 3 mandatory agreements, including the
 * Kenya Data Protection Act 2019 data-sharing consent). Continue stays
 * disabled until all three are accepted.
 */
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import type { OnboardingNav } from '../../navigation/types';

const CONSENTS = [
  {
    id: 'terms',
    title: 'Terms of Service',
    body: 'The rules of the road — what Maidora does, and what it will never do.',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    body: 'What we collect, why we collect it, and how it stays yours.',
  },
  {
    id: 'data',
    title: 'Data sharing (Kenya DPA 2019)',
    body:
      'Your explicit consent to share your profile and verification status with the people you apply to or chat with. Nothing is shared with anyone else.',
  },
];

export default function ConsentsScreen({ navigation }: { navigation: OnboardingNav<'Consents'> }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const all = CONSENTS.every((c) => done[c.id]);

  const read = (title: string) =>
    Alert.alert(title, 'Full document opens here once content is hosted with the backend.');

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>Your privacy, your choice</Text>
      <Text style={styles.body}>
        Three agreements stand between you and a broken platform. We keep them short
        and we keep them real.
      </Text>

      <View style={{ gap: 12, marginTop: 20 }}>
        {CONSENTS.map((c) => {
          const on = !!done[c.id];
          return (
            <Pressable
              key={c.id}
              onPress={() => setDone((s) => ({ ...s, [c.id]: !s[c.id] }))}
              style={[styles.row, on && styles.rowOn]}
            >
              <View style={[styles.box, on && styles.boxOn]}>
                {on ? <Icon name="check" size={16} color={colors.cream} strokeWidth={2.4} /> : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{c.title}</Text>
                <Text style={styles.rowBody}>{c.body}</Text>
                <Pressable hitSlop={6} onPress={() => read(c.title)}>
                  <Text style={styles.read}>Read the document</Text>
                </Pressable>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flex: 1 }} />
      <Button
        label={all ? 'Agree & continue' : 'Accept all three to continue'}
        disabled={!all}
        onPress={() => navigation.navigate('ProfileBasics')}
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
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
  },
  rowOn: { borderColor: colors.brandSoft },
  box: {
    width: 26,
    height: 26,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  boxOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  rowTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13.5 },
  rowBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
  read: {
    color: colors.goldDark,
    fontFamily: fonts.semiBold,
    fontSize: 11.5,
    marginTop: 6,
  },
});
