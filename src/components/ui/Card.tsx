/** Card — white surface with hairline border (the app's base container). */
import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../../theme/theme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bg?: string;
  bordered?: boolean;
};

export default function Card({ children, style, bg = colors.card, bordered = true }: CardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bg }, bordered && styles.border, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 16 },
  border: { borderWidth: 1, borderColor: colors.line },
});
