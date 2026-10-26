import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BrandMark from '../components/brand/BrandMark';
import { colors, fonts, splashThemes, SplashThemeName } from '../theme/theme';

/**
 * ============================================================
 *  MAIDORA SPLASH — H07 · "Ping Letters"  (03 Radar × 11 Letter Spring)
 * ============================================================
 *  Timeline (ms, mirrors splash-hybrids.html H07):
 *   0    two radar rings start pinging behind the mark (1.5s loop, +750ms offset)
 *   50   mark drops into place with an overshoot spring (~600ms)
 *   350  M-A-I-D-O-R-A springs up letter by letter (+50ms per letter)
 *   950  tagline fades in
 *   ~2600 navigate -> Home (replace, so back never returns to splash)
 */
type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

type Props = {
  theme?: SplashThemeName;
  /** total time on screen before navigating (ms) */
  duration?: number;
};

const LETTERS = 'MAIDORA'.split('');
const RING = 300;
const SPRING = { damping: 13, stiffness: 190, mass: 0.7 };
const MARK_SPRING = { damping: 12, stiffness: 165, mass: 0.8 };

/* one radar pulse ring, looping */
function PingRing({ delay, color }: { delay: number; color: string }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.bezier(0.2, 0.7, 0.3, 1) }),
        -1,
        false
      )
    );
  }, [delay]);
  const st = useAnimatedStyle(() => {
    const scale = 0.24 + p.value * (1.4 - 0.24);
    const opacity = p.value < 0.08 ? (p.value / 0.08) * 0.8 : 0.8 * (1 - (p.value - 0.08) / 0.92);
    return { transform: [{ scale }], opacity };
  });
  return (
    <Animated.View
      style={[
        styles.ring,
        { borderColor: color },
        st,
      ]}
    />
  );
}

/* one springing letter */
function PingLetter({
  ch,
  delay,
  color,
}: {
  ch: string;
  delay: number;
  color: string;
}) {
  const ty = useSharedValue(44);
  const sc = useSharedValue(0.7);
  const op = useSharedValue(0);

  useEffect(() => {
    ty.value = withDelay(delay, withSpring(0, SPRING));
    sc.value = withDelay(delay, withSpring(1, SPRING));
    op.value = withDelay(delay, withTiming(1, { duration: 120 }));
  }, [delay]);

  const st = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }, { scale: sc.value }],
    opacity: op.value,
  }));

  return (
    <Animated.Text style={[styles.letter, { color }, st]}>
      {ch}
    </Animated.Text>
  );
}

export default function SplashScreen({ theme = 'light', duration = 2600 }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const t = splashThemes[theme];
  const done = useRef(false);

  /* mark drop */
  const mTy = useSharedValue(-52);
  const mSc = useSharedValue(0.92);
  const mOp = useSharedValue(0);
  /* tagline fade */
  const tagOp = useSharedValue(0);

  useEffect(() => {
    mOp.value = withDelay(50, withTiming(1, { duration: 140 }));
    mTy.value = withDelay(50, withSpring(0, MARK_SPRING));
    mSc.value = withDelay(50, withSpring(1, MARK_SPRING));
    tagOp.value = withDelay(950, withTiming(0.93, { duration: 500 }));

    const id = setTimeout(() => {
      if (!done.current) {
        done.current = true;
        navigation.replace('Home');
      }
    }, duration);
    return () => clearTimeout(id);
  }, []);

  const markStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mTy.value }, { scale: mSc.value }],
    opacity: mOp.value,
  }));
  const tagStyle = useAnimatedStyle(() => ({ opacity: tagOp.value }));

  return (
    <View style={[styles.fill, { backgroundColor: t.bg }]}>
      <View style={styles.center}>
        {/* rings + mark */}
        <View style={[styles.ringBox, { width: RING, height: RING }]}>
          <PingRing delay={200} color={t.ring} />
          <PingRing delay={950} color={t.ring} />
          <Animated.View style={[styles.markWrap, markStyle]}>
            <BrandMark size={132} ink={colors.brandSoft} pillar={colors.brandSoft} accent={colors.gold} />
          </Animated.View>
        </View>

        {/* MAIDORA — letter spring */}
        <View style={styles.wordRow}>
          {LETTERS.map((ch, i) => (
            <PingLetter
              key={`${ch}-${i}`}
              ch={ch}
              delay={350 + i * 50}
              color={t.word}
            />
          ))}
        </View>

        {/* tagline */}
        <Animated.Text style={[styles.tag, { color: t.tag }, tagStyle]}>
          Trusted help for your household
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  ring: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 145,
    borderWidth: 2,
  },
  markWrap: {
    width: 132,
    alignItems: 'center',
  },
  wordRow: {
    flexDirection: 'row',
    gap: 8,
  },
  letter: {
    fontSize: 34,
    lineHeight: 40,
    fontFamily: fonts.bold,
  },
  tag: {
    marginTop: 12,
    fontSize: 10.5,
    fontFamily: fonts.medium,
    letterSpacing: 2.9,
    textTransform: 'uppercase',
  },
});
