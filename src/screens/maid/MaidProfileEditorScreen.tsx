/**
 * Maid Profile editor — sections with completion state. Completion is a
 * strength signal, never a gate (PRD §33). References follow the PRD norm:
 * at least 2, each with a name + relationship note, marked verified once checked.
 */
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import { colors, fonts } from '../../theme/theme';

const SECTIONS = [
  { key: 'about', title: 'About you', value: 'Not written yet' },
  { key: 'experience', title: 'Experience', value: 'Add years & roles' },
  { key: 'services', title: 'Services offered', value: 'Househelp · Cleaning' },
  { key: 'photos', title: 'Photos', value: 'No photos yet' },
];

const REFERENCES = [
  { name: 'Anne K., Kilimani', note: 'Househelp, 2021–2024', verified: true },
];

export default function MaidProfileEditorScreen() {
  const edit = (title: string) =>
    Alert.alert(title, 'Editing opens here — profile fields sync with the backend once live.');

  return (
    <Screen>
      <TopBar title="My profile" />

      <Card style={{ alignItems: 'center' }}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>M</Text>
        </View>
        <Text style={styles.name}>Mary Wanjiku</Text>
        <View style={{ flexDirection: 'row', gap: 7, marginTop: 8 }}>
          <Badge label="60% complete" tone="gold" />
          <Badge label="Not verified yet" tone="muted" />
        </View>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.note}>
          A complete profile gets you noticed faster — but it never blocks you from
          applying. That's a Maidora promise.
        </Text>
      </Card>

      {/* sections */}
      <Card style={{ marginTop: 12, paddingVertical: 6 }}>
        {SECTIONS.map((s, i) => (
          <Pressable
            key={s.key}
            onPress={() => edit(s.title)}
            style={[styles.row, i > 0 && styles.rowLine]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{s.title}</Text>
              <Text style={styles.rowValue}>{s.value}</Text>
            </View>
            <Icon name="chevronRight" size={18} color={colors.brandSoft} />
          </Pressable>
        ))}
      </Card>

      {/* references — PRD §34 norms */}
      <Card style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.secTitle}>References</Text>
          <Pressable hitSlop={8} onPress={() => edit('Add reference')}>
            <Text style={styles.add}>+ Add</Text>
          </Pressable>
        </View>
        {REFERENCES.map((r) => (
          <View key={r.name} style={styles.refRow}>
            <Icon name="check" size={15} color={colors.brand} strokeWidth={2.2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.refName}>{r.name}</Text>
              <Text style={styles.refNote}>{r.note}</Text>
            </View>
            <Badge label="Verified" tone="verified" />
          </View>
        ))}
        <Text style={styles.refHint}>
          Two references with real contacts build real trust. We verify them — that's
          how the badge is earned.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brandSoftLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.ink, fontFamily: fonts.bold, fontSize: 24 },
  name: { color: colors.brand, fontFamily: fonts.bold, fontSize: 18, marginTop: 8 },
  note: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 4 },
  rowLine: { borderTopWidth: 1, borderTopColor: colors.line },
  rowTitle: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13.5 },
  rowValue: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11.5, marginTop: 2 },
  secTitle: {
    color: colors.goldDark,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  add: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  refRow: { flexDirection: 'row', gap: 9, marginTop: 12, alignItems: 'center' },
  refName: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5 },
  refNote: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, marginTop: 1 },
  refHint: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
    marginTop: 12,
  },
});
