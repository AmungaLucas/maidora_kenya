/** Onboarding 7/9 — Profile basics (name + county + area), role-aware. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Field from '../../components/ui/Field';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import type { OnboardingNav } from '../../navigation/types';

const COUNTIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Uasin Gishu'];

export default function ProfileBasicsScreen({ navigation }: { navigation: OnboardingNav<'ProfileBasics'> }) {
  const { role, firstName, county, area, setBasics } = useAppState();
  const [name, setName] = useState(firstName);
  const [pick, setPick] = useState(county);
  const [area_, setArea] = useState(area);

  const valid = name.trim().length >= 2 && pick !== '' && area_.trim().length >= 2;

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>Tell us a bit about you</Text>
      <Text style={styles.body}>
        {role === 'employer'
          ? 'This is how house help will see you when you post a job.'
          : 'This is how households will see you when you apply.'}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Field
          label={role === 'employer' ? 'Your name' : 'Your full name'}
          value={name}
          onChangeText={setName}
          placeholder={role === 'employer' ? 'e.g. Lucas' : 'e.g. Mary Wanjiru'}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>County</Text>
      <View style={styles.chips}>
        {COUNTIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setPick(c)}
            style={[styles.chip, pick === c && styles.chipOn]}
          >
            <Text style={[styles.chipTxt, pick === c && styles.chipTxtOn]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: 6 }}>
        <Field
          label="Area / estate"
          value={area_}
          onChangeText={setArea}
          placeholder="e.g. Kilimani"
        />
      </View>

      <View style={{ flex: 1 }} />
      <Button
        label="Continue"
        disabled={!valid}
        onPress={() => {
          setBasics({ firstName: name.trim().split(' ')[0], county: pick, area: area_.trim() });
          navigation.navigate('Notifications');
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 6 },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  label: {
    fontSize: 12.5,
    color: colors.brand,
    fontFamily: fonts.semiBold,
    marginBottom: 7,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
});
