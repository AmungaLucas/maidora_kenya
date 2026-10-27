/**
 * Wallet — the ledger is the product's financial spine (PRD).
 * Balance, top-up via M-Pesa STK, and a full price reference so every
 * shilling is itemized before it's ever charged.
 */
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import { colors, fonts } from '../../theme/theme';
import type { MainTabNav } from '../../navigation/types';

const PRICES: Array<[string, string]> = [
  ['Apply to a job', 'KSh 50'],
  ['Outreach chat (pay as you go)', 'KSh 50'],
  ['Contact unlock', 'KSh 100'],
  ['Boost a listing · 72h', 'KSh 100'],
  ['Outreach plan · 5 chats', 'KSh 99'],
  ['Expedited KYC review · 72h', 'KSh 150'],
];

export default function WalletScreen({ navigation }: { navigation: MainTabNav<'Wallet'> }) {
  const topUp = () =>
    Alert.alert(
      'M-Pesa STK push',
      'Enter your phone number and approve the push once the backend is connected. Your PIN is never seen by Maidora.',
    );

  return (
    <Screen>
      <Text style={styles.head}>Wallet</Text>

      {/* balance */}
      <Card bg={colors.brand} bordered={false} style={{ marginTop: 12, paddingVertical: 24, alignItems: 'center' }}>
        <Text style={styles.balLabel}>Available balance</Text>
        <Text style={styles.balance}>KSh 0.00</Text>
        <Button label="Top up with M-Pesa" small variant="gold" onPress={topUp} style={{ marginTop: 14 }} />
      </Card>

      {/* ledger */}
      <SectionHeader title="Recent activity" />
      <EmptyState
        icon="wallet"
        title="Every shilling, itemized"
        body="Top-ups, unlocks, boosts and refunds all appear here — each with its own line item. We never charge without one."
      />

      {/* full price reference — nothing hidden */}
      <SectionHeader title="What things cost" />
      <Card style={{ marginTop: 8, paddingVertical: 6 }}>
        {PRICES.map(([label, price], i) => (
          <View key={label} style={[styles.priceRow, i > 0 && styles.priceLine]}>
            <Text style={styles.priceLabel}>{label}</Text>
            <Text style={styles.priceVal}>{price}</Text>
          </View>
        ))}
      </Card>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 12, paddingHorizontal: 4 }}>
        <Icon name="shield" size={15} color={colors.brand} />
        <Text style={styles.note}>
          No auto-renewals. No hidden fees. Every payment shows its price first and
          lands in this ledger.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 4 },
  balLabel: {
    color: 'rgba(247,243,233,0.72)',
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  balance: { color: colors.cream, fontFamily: fonts.bold, fontSize: 36, marginTop: 6 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 4,
  },
  priceLine: { borderTopWidth: 1, borderTopColor: colors.line },
  priceLabel: { color: colors.ink, fontFamily: fonts.regular, fontSize: 12.5, flex: 1 },
  priceVal: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  note: {
    flex: 1,
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
  },
});
