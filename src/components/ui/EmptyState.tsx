/** EmptyState — line icon + title + body + optional action (honest empty states). */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import Button from './Button';
import Icon, { type IconName } from './Icon';
import { colors, fonts } from '../../theme/theme';

type Props = {
  icon: IconName;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ icon, title, body, actionLabel, onAction }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.ring}>
        <Icon name={icon} size={26} color={colors.brandSoft} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel ? (
        <Button label={actionLabel} onPress={onAction} small style={styles.btn} />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', paddingVertical: 26, paddingHorizontal: 20 },
  ring: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    color: colors.brand,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    textAlign: 'center',
  },
  body: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 19,
  },
  btn: { marginTop: 14 },
});
