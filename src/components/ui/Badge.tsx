/** Badge — small status pill (verified / gold / soft / muted / danger). */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../theme/theme';

type Tone = 'verified' | 'gold' | 'soft' | 'muted' | 'danger';

const MAP: Record<Tone, { bg: string; fg: string }> = {
  verified: { bg: 'rgba(123,192,139,0.18)', fg: colors.brand },
  gold: { bg: 'rgba(214,166,79,0.20)', fg: colors.goldDark },
  soft: { bg: 'rgba(33,78,59,0.08)', fg: colors.brand },
  muted: { bg: 'rgba(94,127,111,0.14)', fg: colors.muted },
  danger: { bg: 'rgba(179,64,47,0.14)', fg: '#B3402F' },
};

type BadgeProps = { label: string; tone?: Tone; dot?: boolean };

export default function Badge({ label, tone = 'soft', dot = false }: BadgeProps) {
  const c = MAP[tone];
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: c.fg }]} /> : null}
      <Text style={[styles.txt, { color: c.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  dot: { width: 5, height: 5, borderRadius: 3 },
  txt: { fontSize: 10.5, fontFamily: fonts.semiBold, letterSpacing: 0.3 },
});
