/**
 * Chats — PRD §29 dual inbox. Two permanent channels:
 *   Applicants — from your job posts. Free. Forever. Unlimited.
 *   Outreach   — you initiated. Uses credits (plan tiers 1/5/10) or PAYG.
 * Statuses: active / frozen (30-day silence) / closed.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/ui/Screen';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import EmptyState from '../../components/ui/EmptyState';
import { colors, fonts } from '../../theme/theme';
import { CONVERSATIONS } from '../../data/samples';
import type { InboxChannel } from '../../navigation/types';
import type { MainTabNav } from '../../navigation/types';

const STATUS_LABEL = {
  active: null,
  frozen: 'Frozen',
  closed: 'Closed',
} as const;

export default function InboxScreen({ navigation }: { navigation: MainTabNav<'Inbox'> }) {
  const [channel, setChannel] = useState<InboxChannel>('applicants');
  const list = CONVERSATIONS.filter((c) => c.inbox === channel);

  return (
    <Screen>
      <Text style={styles.head}>Chats</Text>

      {/* segmented control */}
      <View style={styles.segment}>
        <Pressable
          onPress={() => setChannel('applicants')}
          style={[styles.segBtn, channel === 'applicants' && styles.segOn]}
        >
          <Text style={[styles.segTxt, channel === 'applicants' && styles.segTxtOn]}>Applicants</Text>
        </Pressable>
        <Pressable
          onPress={() => setChannel('outreach')}
          style={[styles.segBtn, channel === 'outreach' && styles.segOn]}
        >
          <Text style={[styles.segTxt, channel === 'outreach' && styles.segTxtOn]}>Outreach</Text>
        </Pressable>
      </View>

      {/* channel banner */}
      {channel === 'applicants' ? (
        <View style={[styles.banner, styles.bannerGreen]}>
          <Icon name="users" size={16} color={colors.brand} />
          <Text style={[styles.bannerTxt, { color: colors.brand }]}>
            From your job posts — free to chat, forever and unlimited.
          </Text>
        </View>
      ) : (
        <Pressable style={[styles.banner, styles.bannerGold]} onPress={() => navigation.navigate('Paywall', { moment: 'subscribe' })}>
          <Icon name="bolt" size={16} color={colors.goldDark} />
          <Text style={[styles.bannerTxt, { color: colors.goldDark }]}>
            You reached out first — 5 of 5 chats left this month. Tap to see plans.
          </Text>
        </Pressable>
      )}

      {/* conversations */}
      <View style={{ gap: 10, marginTop: 12 }}>
        {list.map((c) => {
          const status = STATUS_LABEL[c.status];
          const dim = c.status !== 'active';
          return (
            <Card key={c.id} style={[{ padding: 14 }, dim && { opacity: 0.75 }]}>
              <Pressable
                onPress={() => navigation.navigate('Conversation', { conversationId: c.id, inbox: c.inbox })}
              >
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarTxt}>{c.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                      <Text style={styles.name}>{c.name}</Text>
                      {status ? <Badge label={status} tone={c.status === 'closed' ? 'muted' : 'gold'} /> : null}
                      {c.unread && !dim ? <View style={styles.unread} /> : null}
                    </View>
                    <Text style={[styles.snip, dim && { color: colors.muted }]} numberOfLines={1}>
                      {c.snippet}
                    </Text>
                    <Text style={styles.context} numberOfLines={1}>{c.context}</Text>
                  </View>
                  <Text style={styles.time}>{c.time}</Text>
                </View>
              </Pressable>
            </Card>
          );
        })}

        {list.length === 0 ? (
          <EmptyState
            icon="chat"
            title={channel === 'applicants' ? 'No applicants yet' : 'No outreach chats yet'}
            body={
              channel === 'applicants'
                ? 'Post a job — applications land here, and every applicant chat is free.'
                : 'When you make the first move, it starts here. Plans: 1, 5 or 10 chats.'
            }
            actionLabel={channel === 'applicants' ? 'Post a job' : 'See outreach plans'}
            onAction={() => {
              if (channel === 'applicants') navigation.navigate('PostJob');
              else navigation.navigate('Paywall', { moment: 'subscribe' });
            }}
          />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { color: colors.brand, fontFamily: fonts.bold, fontSize: 24, marginTop: 4, marginBottom: 12 },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    padding: 4,
  },
  segBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 999 },
  segOn: { backgroundColor: colors.brand },
  segTxt: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 12.5 },
  segTxtOn: { color: colors.cream },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  bannerGreen: { backgroundColor: 'rgba(123,192,139,0.18)' },
  bannerGold: { backgroundColor: 'rgba(214,166,79,0.14)' },
  bannerTxt: { flex: 1, fontFamily: fonts.medium, fontSize: 11.5, lineHeight: 16 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brandSoftLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 17 },
  name: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13.5 },
  snip: { color: colors.ink, fontFamily: fonts.regular, fontSize: 12, marginTop: 3 },
  context: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10.5, marginTop: 2 },
  time: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10.5, alignSelf: 'flex-start' },
  unread: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.gold },
});
