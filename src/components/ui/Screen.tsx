/**
 * Screen — safe-area page wrapper (cream default) + TopBar with back chevron.
 * Every PRD screen composes from these two.
 */
import React from 'react';
import {
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../theme/theme';
import Icon from './Icon';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  bg?: string;
  contentStyle?: ViewStyle;
};

export default function Screen({
  children,
  scroll = true,
  padded = true,
  bg = colors.cream,
  contentStyle,
}: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[padded && styles.pad, styles.grow, contentStyle]}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.safe, styles.grow, { backgroundColor: bg }, padded && styles.pad]} edges={['top']}>
      {children}
    </SafeAreaView>
  );
}

type TopBarProps = {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function TopBar({ title, onBack, right }: TopBarProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.bar}>
      <Pressable
        hitSlop={12}
        onPress={onBack ?? (() => navigation.goBack())}
        style={styles.back}
      >
        <Icon name="chevronLeft" size={22} color={colors.brand} />
      </Pressable>
      {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : <View />}
      {right ?? <View style={styles.back} />}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  grow: { flexGrow: 1 },
  pad: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 28 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    marginBottom: 6,
  },
  back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.brand,
    fontFamily: fonts.semiBold,
    fontSize: 15.5,
  },
});
