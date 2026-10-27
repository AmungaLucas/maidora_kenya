/** Post a job — modal form shell. Pricing shown before publishing (backend pending). */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import LoadingButton from '../../components/brand/loaders/LoadingButton';
import Field from '../../components/ui/Field';
import { colors, fonts } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PostJob'>;
const TYPES = ['Househelp', 'Nanny', 'Cleaner', 'Caregiver'];
const LIVE = ['Live-in', 'Live-out'];

export default function PostJobScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Househelp');
  const [live, setLive] = useState('Live-out');
  const [area, setArea] = useState('');
  const [salary, setSalary] = useState('');
  const [about, setAbout] = useState('');
  const [posting, setPosting] = useState(false);
  const [done, setDone] = useState(false);

  const valid = title.trim().length >= 4 && area.trim().length >= 2 && about.trim().length >= 10;

  const post = () => {
    if (!valid || posting || done) return;
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setDone(true);
      setTimeout(() => navigation.goBack(), 900);
    }, 1400);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <TopBar title="Post a job" />
        <Text style={styles.body}>
          Describe the help you need. Applicants apply — and you chat with them free, forever.
        </Text>

        <View style={{ marginTop: 16 }}>
          <Field label="Job title" value={title} onChangeText={setTitle} placeholder="e.g. Full-time house help — Kilimani" />
        </View>

        <Text style={styles.label}>Type of help</Text>
        <View style={styles.chips}>
          {TYPES.map((t) => (
            <Pressable key={t} onPress={() => setType(t)} style={[styles.chip, type === t && styles.chipOn]}>
              <Text style={[styles.chipTxt, type === t && styles.chipTxtOn]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Arrangement</Text>
        <View style={styles.chips}>
          {LIVE.map((t) => (
            <Pressable key={t} onPress={() => setLive(t)} style={[styles.chip, live === t && styles.chipOn]}>
              <Text style={[styles.chipTxt, live === t && styles.chipTxtOn]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: 6 }}>
          <Field label="Area / estate" value={area} onChangeText={setArea} placeholder="e.g. Kilimani" />
          <Field label="Salary (monthly or daily)" value={salary} onChangeText={setSalary} placeholder="e.g. KSh 12,000 / month" keyboardType="numbers-and-punctuation" />
          <Field
            label="About the role"
            value={about}
            onChangeText={setAbout}
            placeholder="Duties, hours, your household…"
            multiline
            style={{ height: 96, textAlignVertical: 'top', paddingTop: 14 }}
          />
        </View>

      <View style={{ flex: 1 }} />
      <LoadingButton
        label="Post job"
        loading={posting}
        success={done}
        loadingLabel="Posting…"
        successLabel="Posted!"
        disabled={!valid}
        onPress={post}
      />
      <Text style={styles.note}>You'll always see the price before anything is published.</Text>
    </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  label: { fontSize: 12.5, color: colors.brand, fontFamily: fonts.semiBold, marginBottom: 7, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipTxt: { color: colors.brand, fontFamily: fonts.medium, fontSize: 12.5 },
  chipTxtOn: { color: colors.cream },
  note: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    textAlign: 'center',
    marginTop: 10,
  },
});
