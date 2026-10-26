import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import BrandMark from '../components/brand/BrandMark';
import BrandLoader from '../components/brand/loaders/BrandLoader';
import LoadingButton from '../components/brand/loaders/LoadingButton';
import FullScreenLoader from '../components/brand/loaders/FullScreenLoader';
import { colors, fonts } from '../theme/theme';

/**
 * Simple Home screen — wires the locked loader mapping into real UI moments:
 *   search loading  -> 01 TwinArcs (general loader)
 *   action buttons  -> 03 Radar    (button loader)
 *   full-screen     -> 03 Radar    (full-screen loader)
 */

type Helper = { name: string; area: string; rating: string; price: string; tag: string };

const HELPERS: Helper[] = [
  { name: 'Grace Wanjiku', area: 'Kilimani, Nairobi', rating: '4.9', price: 'KSh 900/day', tag: 'Househelp' },
  { name: 'Achieng Otieno', area: 'Westlands, Nairobi', rating: '4.8', price: 'KSh 850/day', tag: 'Nanny' },
  { name: 'Halima Yusuf', area: 'Nyali, Mombasa', rating: '4.9', price: 'KSh 950/day', tag: 'Cleaner' },
];

function SkeletonRow() {
  const op = useSharedValue(0.45);
  useEffect(() => {
    op.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, []);
  const st = useAnimatedStyle(() => ({ opacity: op.value }));
  return (
    <View style={styles.skelRow}>
      <Animated.View style={[styles.skelAvatar, st]} />
      <View style={{ flex: 1, gap: 8 }}>
        <Animated.View style={[styles.skelLine, { width: '62%' }, st]} />
        <Animated.View style={[styles.skelLine, { width: '40%' }, st]} />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  /* full-screen radar demo auto-closes */
  useEffect(() => {
    if (!overlay) return;
    const id = setTimeout(() => setOverlay(false), 1800);
    return () => clearTimeout(id);
  }, [overlay]);

  const runSearch = () => {
    if (searching) return;
    setSearching(true);
    setResolved(false);
    later(() => {
      setSearching(false);
      setResolved(true);
    }, 1600);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body} bounces={false}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <BrandMark size={38} ink={colors.brandSoft} accent={colors.gold} />
            <Text style={styles.headerWord}>MAIDORA</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>L</Text>
          </View>
        </View>

        {/* greeting */}
        <Text style={styles.greeting}>Karibu,</Text>
        <Text style={styles.sub}>Trusted help for your household</Text>

        {/* hero search card */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Find trusted househelp near you</Text>
          <View style={styles.searchRow}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={runSearch}
              placeholder="Maids, cleaners, nannies…"
              placeholderTextColor={colors.muted}
              style={styles.input}
              returnKeyType="search"
            />
            <Pressable onPress={runSearch} style={styles.go}>
              {searching ? (
                <BrandLoader variant="twinArcs" size={24} color={colors.brand} soft={colors.gold} track="transparent" />
              ) : (
                <Text style={styles.goTxt}>Go</Text>
              )}
            </Pressable>
          </View>

          {/* loading / results */}
          {searching ? (
            <View style={{ marginTop: 14, gap: 10 }}>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </View>
          ) : resolved ? (
            <View style={{ marginTop: 14 }}>
              {HELPERS.slice(0, 3).map((h) => (
                <View key={h.name} style={styles.miniRow}>
                  <View style={[styles.miniAvatar, { backgroundColor: colors.brandSoftLight }]}>
                    <Text style={styles.miniAvatarTxt}>{h.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.miniName}>{h.name}</Text>
                    <Text style={styles.miniArea}>{h.area}</Text>
                  </View>
                  <Text style={styles.miniPrice}>{h.price}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* quick actions — the locked loaders in action */}
        <View style={styles.actions}>
          <LoadingButton
            label="Book a maid"
            loading={booking}
            success={booked}
            loadingLabel="Booking…"
            successLabel="Booked!"
            onPress={() => {
              setBooking(true);
              later(() => {
                setBooking(false);
                setBooked(true);
              }, 1400);
            }}
            style={{ flex: 1 }}
          />
          <Pressable style={styles.ghostBtn} onPress={() => setOverlay(true)}>
            <Text style={styles.ghostTxt}>Full-screen demo</Text>
          </Pressable>
        </View>

        {/* top househelps */}
        <Text style={styles.section}>Top househelps near you</Text>
        {HELPERS.map((h) => (
          <View key={h.name} style={styles.card}>
            <View style={styles.cardAvatar}>
              <Text style={styles.cardAvatarTxt}>{h.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>{h.name}</Text>
              <Text style={styles.cardArea}>{h.tag} · {h.area}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.cardRating}>{h.rating}</Text>
              <Text style={styles.cardPrice}>{h.price}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.foot}>Maidora Kenya · loaders: TwinArcs general · Radar buttons & full-screen</Text>
      </ScrollView>

      {/* locked full-screen radar */}
      <FullScreenLoader visible={overlay} label="Finding your helper" theme="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  body: { padding: 20, paddingBottom: 40, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerWord: { fontSize: 16, letterSpacing: 4, color: colors.brand, fontFamily: fonts.bold },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center',
  },
  avatarTxt: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 15 },
  greeting: { fontSize: 26, color: colors.brand, fontFamily: fonts.bold, marginTop: 6 },
  sub: { fontSize: 12, color: colors.goldDark, fontFamily: fonts.medium, letterSpacing: 1.6, textTransform: 'uppercase', marginTop: -8 },
  hero: {
    backgroundColor: colors.brand, borderRadius: 24, padding: 18, marginTop: 8,
  },
  heroTitle: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 15, marginBottom: 12 },
  searchRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1, height: 48, borderRadius: 999, backgroundColor: colors.cream,
    paddingHorizontal: 18, fontSize: 13.5, color: colors.brand, fontFamily: fonts.regular,
  },
  go: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  goTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 14 },
  miniRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(247,243,233,0.10)', borderRadius: 14, padding: 10, marginBottom: 8,
  },
  miniAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  miniAvatarTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 13 },
  miniName: { color: colors.cream, fontFamily: fonts.semiBold, fontSize: 13 },
  miniArea: { color: 'rgba(247,243,233,0.7)', fontSize: 11, fontFamily: fonts.regular },
  miniPrice: { color: colors.gold, fontFamily: fonts.semiBold, fontSize: 12 },
  actions: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 4 },
  ghostBtn: {
    height: 52, paddingHorizontal: 18, borderRadius: 999, borderWidth: 1.5,
    borderColor: colors.brand, alignItems: 'center', justifyContent: 'center',
  },
  ghostTxt: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 13 },
  section: {
    fontSize: 15, color: colors.brand, fontFamily: fonts.semiBold, marginTop: 10,
  },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.card, borderRadius: 18, padding: 14,
    borderWidth: 1, borderColor: colors.line,
  },
  cardAvatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: colors.brandSoftLight,
    alignItems: 'center', justifyContent: 'center',
  },
  cardAvatarTxt: { color: colors.ink, fontFamily: fonts.semiBold, fontSize: 17 },
  cardName: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 14.5 },
  cardArea: { color: colors.muted, fontSize: 12, fontFamily: fonts.regular, marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  cardRating: { color: colors.goldDark, fontFamily: fonts.semiBold, fontSize: 13 },
  cardPrice: { color: colors.brand, fontFamily: fonts.semiBold, fontSize: 12.5, marginTop: 2 },
  foot: {
    textAlign: 'center', color: colors.muted, fontSize: 10.5,
    fontFamily: fonts.regular, marginTop: 18, letterSpacing: 0.4,
  },
  skelRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  skelAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(247,243,233,0.22)' },
  skelLine: { height: 10, borderRadius: 5, backgroundColor: 'rgba(247,243,233,0.22)' },
});
