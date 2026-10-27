/** Account — identity, verification status, settings, DPA-2019 data rights, sign out. */
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon, { type IconName } from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import type { MainTabNav } from '../../navigation/types';

export default function AccountScreen({ navigation }: { navigation: MainTabNav<'Account'> }) {
  const { firstName, phone, role, county, signOut } = useAppState();
  const who = firstName || 'Maidora user';
  const isMaid = role === 'maid';

  const rows: Array<{ icon: IconName; label: string; go?: () => void }> = [
    { icon: 'wallet', label: 'Wallet', go: () => navigation.navigate('Wallet') },
    ...(isMaid
      ? [{ icon: 'person' as IconName, label: 'My profile', go: () => navigation.navigate('Account') }]
      : []),
    { icon: 'bell', label: 'Notifications', go: () => Alert.alert('Notifications', 'System settings open here in the production build.') },
    { icon: 'doc', label: 'Terms of Service', go: () => Alert.alert('Terms of Service', 'Full document opens once content is hosted.') },
    { icon: 'shield', label: 'Privacy Policy', go: () => Alert.alert('Privacy Policy', 'Full document opens once content is hosted.') },
    { icon: 'lock', label: 'Data sharing (Kenya DPA 2019)', go: () => Alert.alert('Data sharing', 'Your explicit consents and what is shared with whom — fully listed here.') },
  ];

  const confirmSignOut = () =>
    Alert.alert('Sign out', 'You can sign back in anytime with your phone number.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);

  return (
    <Screen>
      <Text style={styles.head}>Account</Text>

      {/* identity */}
      <Card style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{who[0]?.toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{who}</Text>
            <Text style={styles.phone}>{phone || '+254 7•• ••• •••'} · {county || 'Kenya'}</Text>
          </View>
          <Badge label={isMaid ? 'House help' : 'Employer'} tone="soft" />
        </View>
      </Card>

      {/* verification status */}
      <Card bg={colors.brand} bordered={false} style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Icon name="shield" size={26} color={colors.brandSoft} />
          <View style={{ flex: 1 }}>
            <Text style={styles.verifyTitle}>Not verified yet</Text>
            <Text style={styles.verifyBody}>
              Verification is free and earned — never sold. The only paid option is the
              optional 72-hour expedited review.
            </Text>
          </View>
        </View>
        <Button label="Verify now — free" small variant="gold" onPress={() => navigation.navigate('Kyc')} style={{ marginTop: 12, alignSelf: 'flex-start' }} />
      </Card>

      {/* rows */}
      <Card style={{ marginTop: 12, paddingVertical: 6 }}>
        {rows.map((r, i) => (
          <Pressable
            key={r.label}
            onPress={r.go}
            style={[styles.row, i > 0 && styles.rowLine]}
          >
            <Icon name={r.icon} size={18} color={colors.brand} />
            <Text style={styles.rowTxt}>{r.label}</Text>
            <Icon name="chevronRight" size={17} color={colors.brandSoft} />
          </Pressable>
        ))}
      </Card>

      <Button label="Sign out" variant="danger" onPress={confirmSignOut} style={{ marginTop: 16 }} />

      <Text style={styles.foot}>
        Maidora Kenya · v0.1.0 screens preview{'\n'}
        Verification is earned, never sold.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 4 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 20 },
  name: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 15.5 },
  phone: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, marginTop: 2 },
  verifyTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 14 },
  verifyBody: {
    color: 'rgba(247,243,233,0.78)',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 4 },
  rowLine: { borderTopWidth: 1, borderTopColor: colors.line },
  rowTxt: { flex: 1, color: colors.brand, fontFamily: fonts.medium, fontSize: 13 },
  foot: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 18,
  },
});
