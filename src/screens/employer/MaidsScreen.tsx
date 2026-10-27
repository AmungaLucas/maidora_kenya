/**
 * Employer Maids — PRD §28. Search + list with:
 * cold-start guidance (post a job first — applicants chat free),
 * outreach cap note (plan tiers 1/5/10), filter chips, maid cards.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';
import { MAIDS } from '../../data/samples';
import type { MainTabNav } from '../../navigation/types';

const TAGS = ['All', 'Househelp', 'Nanny', 'Cleaner', 'Caregiver'];

export default function MaidsScreen({ navigation }: { navigation: MainTabNav<'Maids'> }) {
  const [tag, setTag] = useState('All');
  const list = tag === 'All' ? MAIDS : MAIDS.filter((m) => m.tag === tag);

  return (
    <Screen>
      <Text style={styles.head}>Find help</Text>
      <Text style={styles.body}>Search verified house help near you.</Text>

      {/* search field (visual — filtering by text lands with the API) */}
      <Pressable style={styles.search} onPress={() => undefined}>
        <Icon name="search" size={18} color={colors.muted} />
        <Text style={styles.searchTxt}>Name, skill or area…</Text>
      </Pressable>

      {/* cold start — PRD §28: guide employers to post first */}
      <Card bg={colors.brand} bordered={false} style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Icon name="users" size={24} color={colors.brandSoft} />
          <View style={{ flex: 1 }}>
            <Text style={styles.coldTitle}>Start with a job post</Text>
            <Text style={styles.coldBody}>
              Applicants reach out to you — and chatting with them is free, forever.
              Outreach chats below are for when you make the first move.
            </Text>
          </View>
        </View>
        <Button label="Post a job" small variant="gold" onPress={() => navigation.navigate('PostJob')} style={{ marginTop: 12 }} />
      </Card>

      {/* outreach cap note */}
      <Pressable style={styles.capRow} onPress={() => navigation.navigate('Paywall', { moment: 'subscribe' })}>
        <Icon name="bolt" size={16} color={colors.goldDark} />
        <Text style={styles.capTxt}>Outreach chats this month: 0 of 5 used</Text>
        <Text style={styles.capLink}>See plans</Text>
      </Pressable>

      {/* filter chips */}
      <View style={styles.chips}>
        {TAGS.map((t) => (
          <Pressable key={t} onPress={() => setTag(t)} style={[styles.chip, tag === t && styles.chipOn]}>
            <Text style={[styles.chipTxt, tag === t && styles.chipTxtOn]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {/* maid cards */}
      <View style={{ gap: 12, marginTop: 4 }}>
        {list.map((m) => (
          <Card key={m.id} style={{ padding: 14 }}>
            <Pressable
              onPress={() => navigation.navigate('MaidProfile', { maidId: m.id })}
              style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
            >
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarTxt}>{m.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                    <Text style={styles.name}>{m.name}</Text>
                    <Badge label="ID verified" tone="verified" dot />
                  </View>
                  <Text style={styles.meta}>{m.tag} · {m.area}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.rating}>{m.rating} ★</Text>
                  <Text style={styles.rate}>{m.rate}</Text>
                </View>
              </View>
            </Pressable>
          </Card>
        ))}
        {list.length === 0 ? (
          <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={styles.name}>No {tag}s here yet</Text>
            <Text style={styles.coldBody}>Widen your search or check back soon.</Text>
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
  coldTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 13.5 },
  coldBody: {
    color: 'rgba(247,243,233,0.78)',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },
  capRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: 'rgba(214,166,79,0.14)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  capTxt: { flex: 1, color: colors.goldDark, fontFamily: fonts.medium, fontSize: 12 },
  capLink: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12 },
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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brandSoftLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 17 },
  name: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 14 },
  meta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5, marginTop: 3 },
  rating: { color: colors.goldDark, fontFamily: fonts.semiBold, fontSize: 12.5 },
  rate: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 11.5, marginTop: 2 },
});
