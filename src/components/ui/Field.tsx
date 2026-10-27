/** Field — labeled text input on a white pill-card. */
import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fonts } from '../../theme/theme';

type FieldProps = TextInputProps & {
  label: string;
  hint?: string;
  prefix?: string;
};

export default function Field({ label, hint, prefix, style, ...input }: FieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          placeholderTextColor={colors.muted}
          style={[styles.input, style]}
          {...input}
        />
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: {
    fontSize: 12.5,
    color: colors.brand,
    fontFamily: fonts.semiBold,
    marginBottom: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  prefix: {
    color: colors.brand,
    fontFamily: fonts.semiBold,
    fontSize: 14.5,
    marginRight: 8,
  },
  input: { flex: 1, color: colors.ink, fontSize: 14, fontFamily: fonts.regular },
  hint: { fontSize: 11, color: colors.muted, fontFamily: fonts.regular, marginTop: 6 },
});
