/** Maid FindJobs — job feed with filter chips; applying leads to the KSh 50 paywall. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import { JOBS } from '../../data/samples';
import type { MainTabNav } from '../../navigation/types';

const TYPES = ['All', 'Househelp', 'Nanny', 'Cleaner'];

export default function FindJobsScreen({ navigation }: { navigation: MainTabNav<'Jobs'> }) {
  const [type, setType] = useState('All');
  const list = type === 'All' ? JOBS : JOBS.filter((j) => j.type === type);

  return (
    <Screen>
      <Text style={styles.head}>Find work</Text>
      <Text style={styles.body}>Jobs from verified households near you.</Text>

      <Pressable style={styles.search} onPress={() => undefined}>
        <Icon name="search" size={18} color={colors.muted} />
        <Text style={styles.searchTxt}>Title, area or county…</Text>
      </Pressable>

      <View style={styles.chips}>
        {TYPES.map((t) => (
          <Pressable key={t} onPress={() => setType(t)} style={[styles.chip, type === t && styles.chipOn]}>
            <Text style={[styles.chipTxt, type === t && styles.chipTxtOn]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: 12 }}>
        {list.map((j) => (
          <Card key={j.id} style={{ padding: 16 }}>
            <Pressable onPress={() => navigation.navigate('JobDetail', { jobId: j.id, from: 'maid' })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {j.title}
                </Text>
              </View>
              <Text style={styles.meta}>{j.area} · {j.live}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <Text style={styles.salary}>{j.salary}</Text>
                {j.employerVerified ? <Badge label="ID verified" tone="verified" dot /> : null}
                <View style={{ flex: 1 }} />
                <Text style={styles.posted}>{j.posted}</Text>
              </View>
            </Pressable>
          </Card>
        ))}
        {list.length === 0 ? (
          <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={styles.title}>No {type} jobs right now</Text>
            <Text style={styles.meta}>Check back soon — new jobs land daily.</Text>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 4 },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 14,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 48,
  },
  searchTxt: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, marginBottom: 12 },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipTxt: { color: colors.brand, fontFamily: fonts.medium, fontSize: 12 },
  chipTxtOn: { color: colors.cream },
  title: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 14.5 },
  meta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, marginTop: 4 },
  salary: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  posted: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10.5 },
});
