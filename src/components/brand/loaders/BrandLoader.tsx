import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../../theme/theme';

/**
 * Maidora brand loaders — web-mirror geometry (viewBox 200x200, r=86 / r=70).
 *  01 twinArcs : two dashed arcs racing in opposite directions (general loader)
 *  02 comet    : five-layer comet tail chasing a gold head
 *  03 radar    : three pulse rings radiating outward (buttons + full-screen)
 *  07 sweep    : counter-rotating sweep arcs with a gold comet head
 *
 * Drop-in compatible with the existing BrandLoader.tsx — same variants,
 * same radii, same durations as the approved web previews.
 */
export type LoaderVariant = 'twinArcs' | 'comet' | 'radar' | 'sweep';

type BrandLoaderProps = {
  variant?: LoaderVariant;
  /** rendered width/height in px */
  size?: number;
  color?: string;
  soft?: string;
  gold?: string;
  track?: string;
};

const VB = 200;
const C86 = 2 * Math.PI * 86; // 540.35
const C70 = 2 * Math.PI * 70; // 439.82
const dash = (c: number, frac: number) => `${c * frac} ${c * (1 - frac)}`;

export default function BrandLoader({
  variant = 'radar',
  size = 96,
  color = colors.brandSoft,
  soft = colors.brandSoftLight,
  gold = colors.gold,
  track = colors.loaderTrack,
}: BrandLoaderProps) {
  switch (variant) {
    case 'twinArcs':
      return <TwinArcs size={size} color={color} soft={soft} />;
    case 'comet':
      return <Comet size={size} color={color} gold={gold} track={track} />;
    case 'sweep':
      return <Sweep size={size} color={color} soft={soft} gold={gold} track={track} />;
    case 'radar':
    default:
      return <Radar size={size} color={color} track={track} />;
  }
}

/* ---------- helpers ---------- */
function useRotation(duration: number, reverse = false) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withRepeat(
      withTiming(reverse ? -360 : 360, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [duration, reverse]);
  return useAnimatedStyle(() => ({ transform: [{ rotate: `${v.value}deg` }] }));
}

function Ring({
  r,
  stroke,
  strokeWidth,
  dashArray,
  dashOffset,
  opacity,
}: {
  r: number;
  stroke: string;
  strokeWidth: number;
  dashArray?: string;
  dashOffset?: number;
  opacity?: number;
}) {
  return (
    <Circle
      cx={VB / 2}
      cy={VB / 2}
      r={r}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
      opacity={opacity}
    />
  );
}

/* ---------- 01 · TwinArcs ---------- */
function TwinArcs({ size, color, soft }: { size: number; color: string; soft: string }) {
  const outer = useRotation(1050);
  const inner = useRotation(1600, true);
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Animated.View style={[styles.fill, outer]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
          <Ring r={86} stroke={color} strokeWidth={5.5} dashArray={dash(C86, 0.24)} />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.fill, inner]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
          <Ring
            r={70}
            stroke={soft}
            strokeWidth={3.4}
            dashArray={dash(C70, 0.18)}
            dashOffset={C70 * 0.5}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

/* ---------- 02 · Comet ---------- */
const COMET_LAYERS: Array<[number, number]> = [
  [0.34, 0.1],
  [0.23, 0.18],
  [0.14, 0.32],
  [0.08, 0.55],
  [0.03, 0.95],
];
function Comet({ size, color, gold, track }: { size: number; color: string; gold: string; track: string }) {
  const spin = useRotation(850, true);
  return (
    <Animated.View style={[styles.box, { width: size, height: size }, spin]}>
      <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
        <Ring r={86} stroke={track} strokeWidth={1.2} />
        {COMET_LAYERS.map(([f, o], i) => (
          <Ring key={i} r={86} stroke={color} strokeWidth={5.5} dashArray={dash(C86, f)} opacity={o} />
        ))}
        <Circle cx={186} cy={100} r={5} fill={gold} />
      </Svg>
    </Animated.View>
  );
}

/* ---------- 03 · Radar ---------- */
function RadarRing({
  index,
  boxSize,
  color,
}: {
  index: number;
  boxSize: number;
  color: string;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      index * 220,
      withRepeat(
        withTiming(1, { duration: 1050, easing: Easing.bezier(0.2, 0.7, 0.3, 1) }),
        -1,
        false
      )
    );
  }, [index]);
  const st = useAnimatedStyle(() => {
    const scale = 0.24 + p.value * (1.42 - 0.24);
    const opacity = p.value < 0.1 ? p.value / 0.1 * 0.9 : 0.9 * (1 - (p.value - 0.1) / 0.9);
    return { transform: [{ scale }], opacity };
  });
  const s = boxSize * 0.92;
  return (
    <Animated.View
      style={[
        styles.ring,
        { width: s, height: s, borderRadius: s / 2, borderColor: color },
        st,
      ]}
    />
  );
}
function Radar({ size, color, track }: { size: number; color: string; track: string }) {
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
        <Ring r={97} stroke={track} strokeWidth={1.5} />
      </Svg>
      {[0, 1, 2].map((i) => (
        <RadarRing key={i} index={i} boxSize={size} color={color} />
      ))}
    </View>
  );
}

/* ---------- 07 · Sweep ---------- */
function Sweep({
  size,
  color,
  soft,
  gold,
  track,
}: {
  size: number;
  color: string;
  soft: string;
  gold: string;
  track: string;
}) {
  const s1 = useRotation(800);
  const s2 = useRotation(1500, true);
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`} style={StyleSheet.absoluteFill}>
        <Ring r={86} stroke={track} strokeWidth={1.4} />
      </Svg>
      <Animated.View style={[styles.fill, s1]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
          <Ring r={86} stroke={color} strokeWidth={5.5} dashArray={dash(C86, 0.42)} />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.fill, s2]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
          <Ring r={70} stroke={soft} strokeWidth={3.4} dashArray={dash(C70, 0.45)} />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.fill, s1]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
          <Circle cx={100} cy={14} r={5} fill={gold} />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center' },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
  },
});
