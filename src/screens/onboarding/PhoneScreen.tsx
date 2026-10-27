/** Onboarding 3/9 — Phone capture (+254, 9 digits). */
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Button from '../../components/ui/Button';
import Field from '../../components/ui/Field';
import { colors, fonts } from '../../theme/theme';
import { useAppState } from '../../state/AppStateContext';
import type { OnboardingNav } from '../../navigation/types';

export default function PhoneScreen({ navigation }: { navigation: OnboardingNav<'Phone'> }) {
  const { setPhone, phone } = useAppState();
  const [value, setValue] = useState(phone);

  const digits = value.replace(/\D/g, '');
  const valid = digits.length === 9 && /^[17]/.test(digits);

  return (
    <Screen>
      <TopBar onBack={() => navigation.goBack()} />
      <Text style={styles.head}>What's your phone number?</Text>
      <Text style={styles.body}>
        We'll text you a 6-digit code to confirm it's really you.
      </Text>

      <View style={{ marginTop: 22 }}>
        <Field
          label="Mobile number"
          prefix="+254"
          keyboardType="phone-pad"
          maxLength={9}
          value={value}
          onChangeText={(t) => setValue(t.replace(/\D/g, ''))}
          placeholder="712 345 678"
          hint="Safaricom, Airtel and Telkom numbers supported."
        />
      </View>

      <View style={{ flex: 1 }} />
      <Button
        label="Send code"
        disabled={!valid}
        onPress={() => {
          setPhone(`+254${digits}`);
          navigation.navigate('Otp', { phone: `+254${digits}` });
        }}
      />
      <Text style={styles.terms}>Standard SMS rates may apply.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 6, lineHeight: 32 },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  terms: {
    color: colors.muted,
    fontSize: 10.5,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: 10,
  },
});
