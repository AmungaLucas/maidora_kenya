/** Onboarding 5/9 — Role select. Two paths, one tap each. */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import type { OnboardingNav } from '../../navigation/types';

export default function RoleSelectScreen({ navigation }: { navigation: OnboardingNav<'RoleSelect'> }) {
  const { setRole } = useAppState();

  const pick = (role: 'employer' | 'maid') => {
    setRole(role);
    navigation.navigate('Consents');
  };

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>How will you use Maidora?</Text>
      <Text style={styles.body}>Your experience is built around your role.</Text>

      <View style={{ gap: 14, marginTop: 22 }}>
        <Pressable
          onPress={() => pick('employer')}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
        >
          <View style={[styles.ring, { backgroundColor: 'rgba(214,166,79,0.18)' }]}>
            <Icon name="home" size={26} color={colors.goldDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>I need help at home</Text>
            <Text style={styles.cardBody}>
              Hire trusted house help. Post jobs, chat free with applicants, unlock contacts.
            </Text>
          </View>
          <Icon name="chevronRight" size={20} color={colors.brandSoft} />
        </Pressable>

        <Pressable
          onPress={() => pick('maid')}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
        >
          <View style={[styles.ring, { backgroundColor: 'rgba(123,192,139,0.2)' }]}>
            <Icon name="briefcase" size={26} color={colors.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>I'm looking for work</Text>
            <Text style={styles.cardBody}>
              Find jobs near you, show verified experience, and get paid fairly.
            </Text>
          </View>
          <Icon name="chevronRight" size={20} color={colors.brandSoft} />
        </Pressable>
      </View>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
  },
  ring: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 15 },
  cardBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
});
