/**
 * Maid Home — profile completion (never blocks applying, PRD §33),
 * free verification nudge, wallet chip, new jobs preview, honest pricing.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon, { type IconName } from '../../components/ui/Icon';
import SectionHeader from '../../components/ui/SectionHeader';
import BrandMark from '../../components/brand/BrandMark';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import { JOBS } from '../../data/samples';
import type { MainTabNav } from '../../navigation/types';

const COMPLETION = 60; // demo value — real % comes from the profile API

export default function MaidHomeScreen({ navigation }: { navigation: MainTabNav<'Home'> }) {
  const { firstName } = useAppState();
  const who = firstName || 'there';

  const quick: Array<{ icon: IconName; label: string; go: () => void }> = [
    { icon: 'briefcase', label: 'Find work', go: () => navigation.navigate('Jobs') },
    { icon: 'chat', label: 'Chats', go: () => navigation.navigate('Inbox') },
    { icon: 'wallet', label: 'Wallet', go: () => navigation.navigate('Wallet') },
    { icon: 'shield', label: 'Verify', go: () => navigation.navigate('Kyc') },
  ];

  return (
    <Screen>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <BrandMark size={30} ink={colors.brandSoft} accent={colors.gold} />
          <Text style={styles.word}>MAIDORA</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Wallet')} style={styles.walletChip}>
          <Icon name="wallet" size={15} color={colors.goldDark} />
          <Text style={styles.walletTxt}>KSh 0.00</Text>
        </Pressable>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>{who[0]?.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.greet}>Habari, {who}</Text>
      <Text style={styles.greetSub}>Fair work, found safely.</Text>

      {/* profile completion — never a gate (PRD §33) */}
      <Card style={{ marginTop: 16 }}>
        <View style={styles.completionRow}>
          <Text style={styles.completionTitle}>Profile strength</Text>
          <Text style={styles.completionPct}>{COMPLETION}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${COMPLETION}%` }]} />
        </View>
        <Text style={styles.completionBody}>
          A stronger profile gets you noticed faster — but it never blocks you from
          applying. That's a Maidora promise.
        </Text>
        <Button label="Complete my profile" small variant="outline" onPress={() => navigation.navigate('Account')} style={{ marginTop: 12, alignSelf: 'flex-start' }} />
      </Card>

      {/* verification — free */}
      <Card bg={colors.brand} bordered={false} style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Icon name="shield" size={26} color={colors.brandSoft} />
          <View style={{ flex: 1 }}>
            <Text style={styles.verifyTitle}>Get verified — free</Text>
            <Text style={styles.verifyBody}>
              The ID-verified badge is earned through real checks, never bought. It's
              the strongest signal a household can see.
            </Text>
          </View>
        </View>
        <Button label="Start verification — free" small variant="gold" onPress={() => navigation.navigate('Kyc')} style={{ marginTop: 12, alignSelf: 'flex-start' }} />
      </Card>

      {/* quick actions */}
      <View style={styles.quickRow}>
        {quick.map((q) => (
          <Pressable key={q.label} style={styles.quickTile} onPress={q.go}>
            <Icon name={q.icon} size={20} color={colors.brand} />
            <Text style={styles.quickTxt}>{q.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* new jobs preview */}
      <SectionHeader title="New jobs near you" actionLabel="See all" onAction={() => navigation.navigate('Jobs')} />
      <View style={{ gap: 12, marginTop: 8 }}>
        {JOBS.slice(0, 2).map((j) => (
          <Card key={j.id} style={{ padding: 14 }}>
            <Pressable onPress={() => navigation.navigate('JobDetail', { jobId: j.id, from: 'maid' })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.jobTitle} numberOfLines={1}>{j.title}</Text>
                {j.employerVerified ? <Badge label="Verified" tone="verified" dot /> : null}
              </View>
              <Text style={styles.jobMeta}>{j.area} · {j.salary} · {j.live}</Text>
              <Text style={styles.jobPosted}>Posted {j.posted}</Text>
            </Pressable>
          </Card>
        ))}
      </View>

      {/* honest pricing */}
      <Card style={styles.priceNote}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Icon name="bolt" size={16} color={colors.goldDark} />
          <Text style={styles.priceTxt}>Next application: KSh 50 — always shown before you pay.</Text>
        </View>
      </Card>

      <Text style={styles.foot}>Prices are always shown before you pay. No hidden fees. Ever.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  word: { color: colors.brand, fontFamily: fonts.bold, fontSize: 13, letterSpacing: 3.4 },
  walletChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  walletTxt: { color: colors.goldDark, fontFamily: fonts.semiBold, fontSize: 12 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 14 },
  greet: { color: colors.brand, fontFamily: fonts.bold, fontSize: 25, marginTop: 14 },
  greetSub: {
    color: colors.goldDark,
    fontFamily: fonts.medium,
    fontSize: 10.5,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: -4,
  },
  completionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  completionTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 14 },
  completionPct: { color: colors.goldDark, fontFamily: fonts.bold, fontSize: 15 },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.loaderTrack,
    marginTop: 10,
  },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.brandSoft },
  completionBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 10,
  },
  verifyTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 14 },
  verifyBody: {
    color: 'rgba(247,243,233,0.78)',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  quickTile: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  quickTxt: { color: colors.brand, fontFamily: fonts.medium, fontSize: 11 },
  jobTitle: { flex: 1, color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13.5 },
  jobMeta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5, marginTop: 4 },
  jobPosted: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10.5, marginTop: 2 },
  priceNote: { marginTop: 14 },
  priceTxt: { flex: 1, color: colors.goldDark, fontFamily: fonts.medium, fontSize: 12, lineHeight: 17 },
  foot: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    textAlign: 'center',
    marginTop: 14,
    letterSpacing: 0.3,
  },
});
