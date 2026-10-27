/**
 * Maid Profile — PRD §28 signature rule: TWO buttons, never merged.
 *   [Chat with Mary W.]      — starts/opens an outreach chat (plan or PAYG)
 *   [Unlock contact · KSh 100] — one-time contact reveal
 * Verification badge is displayed because it was EARNED.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import { MAIDS } from '../../data/samples';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MaidProfile'>;

export default function MaidProfileScreen({ navigation, route }: Props) {
  const maid = MAIDS.find((m) => m.id === route.params?.maidId) ?? MAIDS[0];

  return (
    <Screen>
      <TopBar title="Profile" />

      {/* hero */}
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>{maid.name[0]}</Text>
        </View>
        <Text style={styles.name}>{maid.name}</Text>
        <Text style={styles.meta}>{maid.tag} · {maid.area}</Text>
        <View style={styles.badgeRow}>
          <Badge label="ID verified" tone="verified" dot />
          <Badge label={`${maid.rating} ★ rating`} tone="gold" />
          <Badge label={`${maid.years} yrs experience`} tone="soft" />
        </View>
      </View>

      {/* about */}
      <Card style={{ marginTop: 14 }}>
        <Text style={styles.secTitle}>About</Text>
        <Text style={styles.bodyTxt}>{maid.about}</Text>
      </Card>

      {/* details */}
      <Card style={[styles.detailCard, { marginTop: 12 }]}>
        <View style={styles.detailRow}>
          <Text style={styles.detailK}>Rate</Text>
          <Text style={styles.detailV}>{maid.rate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailK}>Availability</Text>
          <Text style={styles.detailV}>{maid.availability}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailK}>References</Text>
          <Text style={styles.detailV}>{maid.references.length} verified</Text>
        </View>
      </Card>

      {/* references */}
      <Card style={{ marginTop: 12 }}>
        <Text style={styles.secTitle}>References</Text>
        {maid.references.map((r) => (
          <View key={r.name} style={styles.refRow}>
            <Icon name="check" size={15} color={colors.brand} strokeWidth={2.2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.refName}>{r.name}</Text>
              <Text style={styles.refNote}>{r.note}</Text>
            </View>
          </View>
        ))}
      </Card>

      <View style={{ flex: 1, minHeight: 16 }} />

      {/* ── dual CTA — NEVER merged (PRD §28) ── */}
      <View style={styles.ctaBox}>
        <Button
          label={`Chat with ${maid.firstName}`}
          variant="outline"
          onPress={() => navigation.navigate('Conversation', { conversationId: maid.id, inbox: 'outreach' })}
        />
        <Button
          label="Unlock contact · KSh 100"
          variant="primary"
          onPress={() => navigation.navigate('Paywall', { moment: 'contact' })}
          style={{ marginTop: 10 }}
        />
        <Text style={styles.ctaNote}>
          Chatting counts toward your outreach plan · Contact unlock is one-time and
          always shown before you pay.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: 4 },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.brandSoftLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.ink, fontFamily: fonts.bold, fontSize: 28 },
  name: { color: colors.brand, fontFamily: fonts.bold, fontSize: 20, marginTop: 10 },
  meta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12.5, marginTop: 2 },
  badgeRow: { flexDirection: 'row', gap: 7, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' },
  secTitle: {
    color: colors.goldDark,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bodyTxt: { color: colors.ink, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20 },
  detailCard: { gap: 10 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailK: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12.5 },
  detailV: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  refRow: { flexDirection: 'row', gap: 9, marginTop: 8, alignItems: 'flex-start' },
  refName: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  refNote: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5, marginTop: 1 },
  ctaBox: { marginTop: 10 },
  ctaNote: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
