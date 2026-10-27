/**
 * Conversation — one thread, three honest states (PRD §29):
 *   active   — normal chat (applicants = free forever; outreach shows attribution)
 *   frozen   — 30 days of silence; the MAID's next message reopens it, free
 *   closed   — ended; reconnecting means a new (paid) outreach chat
 * Demo build: messages are local-only; polling/API arrive with the backend.
 */
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Screen, { TopBar } from '../../components/ui/Screen';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import { colors, fonts } from '../../theme/theme';
import { CONVERSATIONS } from '../../data/samples';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

type Msg = { id: number; from: 'me' | 'them'; text: string; time: string };

const SEED: Msg[] = [
  { id: 1, from: 'them', text: 'Hello! I saw your job and I would love to help.', time: '09:20' },
  { id: 2, from: 'me', text: 'Habari! Tell me a bit about your experience.', time: '09:22' },
  { id: 3, from: 'them', text: 'Six years with families in Kilimani. References verified.', time: '09:24' },
];

export default function ConversationScreen({ navigation, route }: Props) {
  const conv =
    CONVERSATIONS.find((c) => c.id === route.params.conversationId) ?? CONVERSATIONS[0];
  const status = conv.status;
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = () => {
    const text = draft.trim();
    if (!text || sending || status !== 'active') return;
    setSending(true);
    timers.current.push(
      setTimeout(() => {
        setMsgs((m) => [
          ...m,
          { id: m.length + 1, from: 'me', text, time: 'now' },
        ]);
        setDraft('');
        setSending(false);
      }, 700),
    );
  };

  const banner = () => {
    if (status === 'frozen') {
      return (
        <View style={[styles.banner, styles.bannerGold]}>
          <Icon name="lock" size={16} color={colors.goldDark} />
          <Text style={[styles.bannerTxt, { color: colors.goldDark }]}>
            This chat froze after 30 days of silence. When {conv.name.split(' ')[0]} sends
            the next message, it reopens — free.
          </Text>
        </View>
      );
    }
    if (status === 'closed') {
      return (
        <View style={[styles.banner, styles.bannerGray]}>
          <Icon name="close" size={16} color={colors.muted} />
          <Text style={[styles.bannerTxt, { color: colors.muted }]}>
            This conversation is closed. To reconnect, start a new outreach chat —
            it uses one credit, and the price is shown first.
          </Text>
        </View>
      );
    }
    if (route.params.inbox === 'outreach') {
      return (
        <View style={[styles.banner, styles.bannerGreen]}>
          <Icon name="check" size={16} color={colors.brand} strokeWidth={2.2} />
          <Text style={[styles.bannerTxt, { color: colors.brand }]}>
            You reached out first — that's why this chat exists. Replies are always
            free for {conv.name.split(' ')[0]}.
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.banner, styles.bannerGreen]}>
        <Icon name="users" size={16} color={colors.brand} />
        <Text style={[styles.bannerTxt, { color: colors.brand }]}>
          Connected through your job post — free for both of you, forever. · {conv.context}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.cream }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen scroll={false} padded>
        <TopBar
          title={conv.name}
          right={
            <View style={{ width: 40, alignItems: 'center' }}>
              {status === 'active' ? (
                <Badge label="Active" tone="verified" dot />
              ) : status === 'frozen' ? (
                <Badge label="Frozen" tone="gold" />
              ) : (
                <Badge label="Closed" tone="muted" />
              )}
            </View>
          }
        />

        {banner()}

        {/* messages */}
        <View style={{ flex: 1, justifyContent: 'flex-end', gap: 8, paddingVertical: 14 }}>
          {msgs.map((m) => (
            <View
              key={m.id}
              style={[styles.bubble, m.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}
            >
              <Text style={[styles.bubbleTxt, m.from === 'me' && { color: colors.cream }]}>
                {m.text}
              </Text>
              <Text style={[styles.bubbleTime, m.from === 'me' && { color: 'rgba(247,243,233,0.6)' }]}>
                {m.time}
              </Text>
            </View>
          ))}
        </View>

        {/* composer / state CTA */}
        {status === 'active' ? (
          <View style={styles.composer}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Write a message…"
              placeholderTextColor={colors.muted}
              multiline
              style={styles.input}
            />
            <Pressable
              onPress={send}
              disabled={!draft.trim() || sending}
              style={[styles.send, (!draft.trim() || sending) && { opacity: 0.5 }]}
            >
              <Icon name="send" size={18} color={colors.cream} />
            </Pressable>
          </View>
        ) : status === 'frozen' ? (
          <Button label="Waiting for her message — nothing to pay" variant="ghost" disabled style={{ marginTop: 4 }} />
        ) : (
          <Button
            label="Start a new outreach chat"
            onPress={() => navigation.navigate('Paywall', { moment: 'chat' })}
            style={{ marginTop: 4 }}
          />
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bannerGreen: { backgroundColor: 'rgba(123,192,139,0.18)' },
  bannerGold: { backgroundColor: 'rgba(214,166,79,0.16)' },
  bannerGray: { backgroundColor: 'rgba(94,127,111,0.14)' },
  bannerTxt: { flex: 1, fontFamily: fonts.medium, fontSize: 11, lineHeight: 16 },
  bubble: { maxWidth: '82%', borderRadius: 16, paddingVertical: 9, paddingHorizontal: 13 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: colors.brand, borderBottomRightRadius: 5 },
  bubbleThem: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderBottomLeftRadius: 5,
  },
  bubbleTxt: { color: colors.ink, fontFamily: fonts.regular, fontSize: 13, lineHeight: 19 },
  bubbleTime: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingLeft: 18,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 4,
  },
  input: {
    flex: 1,
    color: colors.ink,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    maxHeight: 90,
    paddingVertical: 10,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
