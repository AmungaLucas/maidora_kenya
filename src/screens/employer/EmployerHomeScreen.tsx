/**
 * Employer Home — PRD §27. Composed of the spec's component blocks:
 * header w/ wallet chip, verification banner, post-job CTA, quick actions,
 * applicants preview (always free), boost disclosure, safety card, listings,
 * how-hiring mini-map, honesty footer.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Icon, { type IconName } from '../../components/ui/Icon';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import BrandMark from '../../components/brand/BrandMark';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import { CONVERSATIONS } from '../../data/samples';
import type { MainTabNav } from '../../navigation/types';

export default function EmployerHomeScreen({ navigation }: { navigation: MainTabNav<'Home'> }) {
  const { firstName } = useAppState();
  const who = firstName || 'there';
  const applicants = CONVERSATIONS.filter((c) => c.inbox === 'applicants');

  const quick: Array<{ icon: IconName; label: string; go: () => void }> = [
    { icon: 'search', label: 'Find help', go: () => navigation.navigate('Maids') },
    { icon: 'chat', label: 'Chats', go: () => navigation.navigate('Inbox') },
    { icon: 'wallet', label: 'Wallet', go: () => navigation.navigate('Wallet') },
    { icon: 'shield', label: 'Verify', go: () => navigation.navigate('Kyc') },
  ];

  return (
    <Screen>
      {/* 1 · header: brand + wallet chip + avatar */}
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

      {/* 2 · greeting */}
      <Text style={styles.greet}>Habari, {who}</Text>
      <Text style={styles.greetSub}>Your household, handled.</Text>

      {/* 3 · verification banner — free, always */}
      <Card bg={colors.brand} bordered={false} style={styles.verifyCard}>
        <View style={styles.verifyRow}>
          <Icon name="shield" size={26} color={colors.brandSoft} />
          <View style={{ flex: 1 }}>
            <Text style={styles.verifyTitle}>Your identity isn't verified yet</Text>
            <Text style={styles.verifyBody}>
              Verification is free — and it's how trust is earned here. Never sold.
            </Text>
          </View>
        </View>
        <Button label="Verify now — free" small variant="gold" onPress={() => navigation.navigate('Kyc')} style={{ marginTop: 12 }} />
      </Card>

      {/* 4 · post a job CTA */}
      <Pressable onPress={() => navigation.navigate('PostJob')} style={styles.postCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.postTitle}>Need help at home?</Text>
          <Text style={styles.postBody}>Post a job — applicants come to you, and chatting with them is free, forever.</Text>
        </View>
        <View style={styles.plusRing}>
          <Icon name="plus" size={20} color={colors.goldDark} strokeWidth={2.2} />
        </View>
      </Pressable>

      {/* 5 · quick actions */}
      <View style={styles.quickRow}>
        {quick.map((q) => (
          <Pressable key={q.label} style={styles.quickTile} onPress={q.go}>
            <Icon name={q.icon} size={20} color={colors.brand} />
            <Text style={styles.quickTxt}>{q.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 6 · applicants preview — always free */}
      <SectionHeader title="New applicants" />
      {applicants.length === 0 ? (
        <EmptyState
          icon="users"
          title="No applicants yet"
          body="Post a job and applications land here. Chatting with applicants is always free and unlimited."
        />
      ) : (
        <Card style={{ marginTop: 8, paddingVertical: 6 }}>
          {applicants.slice(0, 2).map((a) => (
            <Pressable
              key={a.id}
              onPress={() => navigation.navigate('Conversation', { conversationId: a.id, inbox: 'applicants' })}
              style={styles.appRow}
            >
              <View style={styles.appAvatar}>
                <Text style={styles.appAvatarTxt}>{a.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.appName}>{a.name}</Text>
                  <Badge label="Free chat" tone="verified" />
                </View>
                <Text style={styles.appSnip} numberOfLines={1}>{a.context}</Text>
              </View>
              <Icon name="chevronRight" size={18} color={colors.brandSoft} />
            </Pressable>
          ))}
        </Card>
      )}

      {/* 7 · boost disclosure — honest, every time */}
      <Card style={[styles.boost, { marginTop: 14 }]}>
        <View style={styles.boostRow}>
          <Icon name="bolt" size={20} color={colors.goldDark} />
          <Text style={styles.boostTitle}>Boost a listing — KSh 100 · 72 hours</Text>
        </View>
        <Text style={styles.boostBody}>
          Boosted jobs sit at the top of search for 72 hours. One-time payment via
          M-Pesa. No auto-renew, no subscription, disclosed every single time.
        </Text>
      </Card>

      {/* 8 · your listings */}
      <SectionHeader title="Your listings" actionLabel="Post a job" onAction={() => navigation.navigate('PostJob')} />
      <EmptyState
        icon="doc"
        title="No listings yet"
        body="Your job posts and their applicants will live here."
        actionLabel="Post your first job"
        onAction={() => navigation.navigate('PostJob')}
      />

      {/* 9 · safety card */}
      <Card style={styles.safety}>
        <View style={styles.boostRow}>
          <Icon name="lock" size={18} color={colors.brand} />
          <Text style={styles.safetyTitle}>Stay safe on Maidora</Text>
        </View>
        <Text style={styles.boostBody}>
          Meet in person before hiring. Pay through Maidora — we never ask for your
          M-Pesa PIN outside the app, and no one legitimate ever will.
        </Text>
      </Card>

      {/* 10 · footer honesty note */}
      <Text style={styles.foot}>
        Prices are always shown before you pay. No hidden fees. Ever.
      </Text>
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
  verifyCard: { marginTop: 16, padding: 16 },
  verifyRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  verifyTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 14 },
  verifyBody: {
    color: 'rgba(247,243,233,0.78)',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(214,166,79,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(214,166,79,0.5)',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },
  postTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 15 },
  postBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  plusRing: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
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
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  appAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brandSoftLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appAvatarTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 15 },
  appName: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13.5 },
  appSnip: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5, marginTop: 2 },
  boost: {},
  boostRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  boostTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13 },
  boostBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 7,
  },
  safety: { marginTop: 14 },
  safetyTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13 },
  foot: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    textAlign: 'center',
    marginTop: 18,
    letterSpacing: 0.3,
  },
});
