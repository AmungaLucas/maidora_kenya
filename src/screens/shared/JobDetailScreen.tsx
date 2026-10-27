/**
 * JobDetail — shared detail page.
 *   from: 'maid'     → sticky [Apply · KSh 50] (paywall: apply)
 *   from: 'employer' → applicants list state instead of apply CTA
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import EmptyState from '../../components/ui/EmptyState';
import { colors, fonts } from '../../theme/theme';
import { JOBS } from '../../data/samples';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

export default function JobDetailScreen({ navigation, route }: Props) {
  const job = JOBS.find((j) => j.id === route.params?.jobId) ?? JOBS[0];
  const asMaid = route.params?.from === 'maid';

  return (
    <Screen>
      <TopBar title="Job" onBack={() => navigation.goBack()} />

      {/* hero */}
      <Card style={{ marginTop: 2 }}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 }}>
          <Text style={styles.employer}>{job.employer}</Text>
          {job.employerVerified ? <Badge label="ID verified" tone="verified" dot /> : <Badge label="Unverified" tone="muted" />}
        </View>
        <View style={styles.facts}>
          <View style={styles.fact}><Icon name="pin" size={14} color={colors.muted} /><Text style={styles.factTxt}>{job.area}</Text></View>
          <View style={styles.fact}><Icon name="briefcase" size={14} color={colors.muted} /><Text style={styles.factTxt}>{job.type} · {job.live}</Text></View>
        </View>
        <Text style={styles.salary}>{job.salary}</Text>
        <Text style={styles.posted}>Posted {job.posted}</Text>
      </Card>

      {/* about */}
      <Card style={{ marginTop: 12 }}>
        <Text style={styles.secTitle}>About this job</Text>
        <Text style={styles.body}>{job.about}</Text>
      </Card>

      {/* employer / applicant block */}
      {asMaid ? (
        <Card style={{ marginTop: 12 }}>
          <Text style={styles.secTitle}>About the employer</Text>
          <Text style={styles.body}>
            Payments run through Maidora's ledger — salary is agreed in-app and never
            handed over in cash shadows. Employers see your profile only when you apply.
          </Text>
        </Card>
      ) : (
        <>
          <Card style={{ marginTop: 12 }}>
            <Text style={styles.secTitle}>Your listing</Text>
            <Text style={styles.body}>
              Applicants appear here the moment they apply — and chatting with them is
              free, forever. Boost this listing for 72 hours at the top of search (KSh 100).
            </Text>
          </Card>
          <EmptyState
            icon="users"
            title="No applicants yet"
            body="Boosting or sharing your listing helps it get seen."
          />
        </>
      )}

      <View style={{ flex: 1, minHeight: 16 }} />

      {/* sticky CTA — maid applies (price up front) / employer boosts */}
      {asMaid ? (
        <View>
          <Button
            label="Apply · KSh 50"
            onPress={() => navigation.navigate('Paywall', { moment: 'apply' })}
          />
          <Text style={styles.ctaNote}>
            The moment you apply, chatting with this employer is free — forever.
          </Text>
        </View>
      ) : (
        <View>
          <Button
            label="Boost this listing · KSh 100"
            variant="gold"
            onPress={() => navigation.navigate('Paywall', { moment: 'subscribe' })}
          />
          <Text style={styles.ctaNote}>
            Boost puts this job at the top of search for 72 hours. One-time, no auto-renew.
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.brand, fontFamily: fonts.bold, fontSize: 18, lineHeight: 25 },
  employer: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 13 },
  facts: { flexDirection: 'row', gap: 14, marginTop: 10, flexWrap: 'wrap' },
  fact: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  factTxt: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5 },
  salary: { color: colors.brand, fontFamily: fonts.bold, fontSize: 16, marginTop: 12 },
  posted: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10.5, marginTop: 3 },
  secTitle: {
    color: colors.goldDark,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  body: { color: colors.ink, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20 },
  ctaNote: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
