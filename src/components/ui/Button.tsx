/**
 * Button — brand action button (primary / gold / outline / ghost / danger).
 * Async moments keep the locked Radar loader via the `loading` prop.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import BrandLoader from '../brand/loaders/BrandLoader';
import { colors, fonts } from '../../theme/theme';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'danger';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
};

const FG: Record<Variant, string> = {
  primary: colors.cream,
  gold: colors.ink,
  outline: colors.brand,
  ghost: colors.brand,
  danger: colors.cream,
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  loadingLabel = 'Working…',
  small = false,
  style,
}: ButtonProps) {
  const fg = FG[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        small && styles.btnSmall,
        styles[variant],
        { opacity: disabled ? 0.45 : pressed ? 0.88 : 1 },
        style,
      ]}
    >
      {loading ? (
        <View style={styles.row}>
          <BrandLoader
            variant="radar"
            size={small ? 18 : 22}
            color={fg}
            track="transparent"
          />
          <Text style={[styles.label, { color: fg }, small && styles.labelSmall]}>
            {loadingLabel}
          </Text>
        </View>
      ) : (
        <Text style={[styles.label, { color: fg }, small && styles.labelSmall]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  btnSmall: { height: 42, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { fontSize: 15, fontFamily: fonts.semiBold, letterSpacing: 0.3 },
  labelSmall: { fontSize: 13.5 },
  primary: { backgroundColor: colors.brand },
  gold: { backgroundColor: colors.gold },
  outline: { borderWidth: 1.5, borderColor: colors.brand, backgroundColor: 'transparent' },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: '#B3402F' },
});
