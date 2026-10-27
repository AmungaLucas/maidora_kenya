/**
 * KYC — 8-step identity verification (PRD §32). Free. The ONLY paid option
 * is the expedited 72-hour review (KSh 150). Step labels marked DRAFT until
 * the exact §32 sequence is re-checked against the full spec.
 */
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

// DRAFT step labels — align with PRD §32 exact sequence before backend work.
const STEPS = [
  'Choose your ID type',
  'Photograph ID — front',
  'Photograph ID — back',
  'Take a matching selfie',
  'Confirm your full legal name',
  'Confirm phone ownership',
  'Add physical address',
  'Review & submit',
];

type Props = NativeStackScreenProps<RootStackParamList, 'Kyc'>;

export default function KycScreen({ navigation }: Props) {
  const [done, setDone] = useState(0);
  const pct = Math.round((done / STEPS.length) * 100);

  const next = () => {
    if (done >= STEPS.length) return;
    const n = done + 1;
    setDone(n);
    if (n === STEPS.length) {
      Alert.alert(
        'Submitted',
        "Review usually takes 24–48 hours. You'll get an email the moment your badge is earned.",
      );
    }
  };

  return (
    <Screen>
      <TopBar title="Verify your identity" onBack={() => navigation.goBack()} />

      <View style={styles.progressRow}>
        <Text style={styles.progressTxt}>Step {Math.min(done + 1, STEPS.length)} of {STEPS.length}</Text>
        <Text style={styles.progressPct}>{pct}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>

      <Card style={{ marginTop: 14, paddingVertical: 6 }}>
        {STEPS.map((s, i) => (
          <View key={s} style={[styles.stepRow, i > 0 && styles.stepLine]}>
            <View style={[styles.stepDot, i < done && styles.stepDotDone]}>
              {i < done ? (
                <Icon name="check" size={12} color={colors.cream} strokeWidth={2.6} />
              ) : (
                <Text style={styles.stepNum}>{i + 1}</Text>
              )}
            </View>
            <Text style={[styles.stepTxt, i < done && { color: colors.muted }]}>{s}</Text>
          </View>
        ))}
      </Card>

      {/* expedited option */}
      <Card style={[styles.urgent, { marginTop: 12 }]}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Icon name="bolt" size={18} color={colors.goldDark} />
          <Text style={styles.urgentTitle}>In a hurry? Expedited review — KSh 150 · 72 hours</Text>
        </View>
        <Text style={styles.urgentBody}>
          Optional. Standard verification stays free — this only moves your place in
          the queue. Price shown again before payment.
        </Text>
        <Button
          label="Choose expedited review"
          small
          variant="outline"
          onPress={() => navigation.navigate('Paywall', { moment: 'kycUrgent' })}
          style={{ marginTop: 10, alignSelf: 'flex-start' }}
        />
      </Card>

      <View style={{ flex: 1, minHeight: 14 }} />

      <Button
        label={done === 0 ? 'Start verification' : done >= STEPS.length ? 'Submitted — awaiting review' : 'Continue'}
        disabled={done >= STEPS.length}
        onPress={next}
      />
      <Text style={styles.foot}>
        Verification is always free. The only paid option is the optional expedited review.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  progressTxt: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  progressPct: { color: colors.goldDark, fontFamily: fonts.semiBold, fontSize: 12.5 },
  track: { height: 8, borderRadius: 4, backgroundColor: colors.loaderTrack, marginTop: 8 },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.brandSoft },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 4,
  },
  stepLine: { borderTopWidth: 1, borderTopColor: colors.line },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.cream,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotDone: { backgroundColor: colors.brand, borderColor: colors.brand },
  stepNum: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 11 },
  stepTxt: { flex: 1, color: colors.brand, fontFamily: fonts.medium, fontSize: 13 },
  urgent: {},
  urgentTitle: { flex: 1, color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5, lineHeight: 18 },
  urgentBody: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 7,
  },
  foot: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 15,
  },
});
