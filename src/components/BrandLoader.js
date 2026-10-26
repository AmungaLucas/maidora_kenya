
import React, { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg";

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import colors from "../theme/colors";

/* =========================================================
   MAIDORA BRAND PALETTE
========================================================= */

const GREEN = colors.brandSoft;       // #7BC08B
const LIGHT_GREEN = "#B7E2C1";
const TRACK = colors.loaderTrack;     // #E5EBE5

/* =========================================================
   SVG GEOMETRY
   All circular layers use the same 200 x 200 viewBox.
========================================================= */

const VB = 200;
const CX = VB / 2;
const CY = VB / 2;

const R_OUTER = 86;
const R_INNER = 70;

const STROKE_MAIN = 5.5;
const STROKE_THIN = 3.4;
const STROKE_TRACK = 1.2;

const C_OUTER = 2 * Math.PI * R_OUTER;
const C_INNER = 2 * Math.PI * R_INNER;

const arc = (circumference, fraction) =>
  `${(circumference * fraction).toFixed(2)} ${circumference.toFixed(2)}`;

const MARK_FRACTION = 0.44;

/* =========================================================
   UNIQUE SVG GRADIENT IDS

   Prevents ID collisions when multiple loaders are rendered.
========================================================= */

let uid = 0;

const useUid = (prefix) =>
  useMemo(() => `${prefix}-${++uid}`, [prefix]);

/* =========================================================
   MAIDORA BRAND MARK

   Your original SVG logo paths are preserved.
========================================================= */

function BrandMark({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 720 680">
      <Path
        d="M70 400C70 361.34 101.34 330 140 330H150C188.66 330 220 361.34 220 400V670H70V400Z"
        fill={GREEN}
        opacity={0.24}
      />

      <G
        fill="none"
        stroke={GREEN}
        strokeWidth={24}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M330.229 600H517.913C556.573 600 587.913 568.66 587.913 530V364.12" />

        <Path d="M587.913 364.12V257.53C587.913 235.765 577.788 215.238 560.518 201.99L339.07 32.1148C314.286 13.1029 279.905 12.8124 254.803 31.4026L38.3393 191.716C20.5136 204.918 10 225.787 10 247.969V530C10 568.66 41.3401 600 80 600H212.234C227.745 600 242.817 594.848 255.083 585.353L521.958 378.767C534.224 369.272 549.296 364.12 564.807 364.12H587.913Z" />

        <Path d="M587.913 364.12H710" />
      </G>
    </Svg>
  );
}

/* =========================================================
   SHARED ROTATING RING

   Used by TwinArcs, Comet, and Sweep variants.
========================================================= */

function RotatingRing({
  size,
  duration,
  reverse = false,
  children,
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(reverse ? -360 : 360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [duration, reverse, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.absoluteRing,
        {
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* =========================================================
   SOFT HALO GLOW

   A gentle pulsing glow behind the logo.
========================================================= */

function HaloGlow({ size }) {
  const id = useUid("halo");
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, {
        duration: 2400,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + 0.45 * pulse.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.absoluteRing,
        {
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
    >
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${VB} ${VB}`}
      >
        <Defs>
          <RadialGradient
            id={id}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <Stop
              offset="0%"
              stopColor={GREEN}
              stopOpacity={0.13}
            />

            <Stop
              offset="55%"
              stopColor={GREEN}
              stopOpacity={0.05}
            />

            <Stop
              offset="100%"
              stopColor={GREEN}
              stopOpacity={0}
            />
          </RadialGradient>
        </Defs>

        <Circle
          cx={CX}
          cy={CY}
          r={72}
          fill={`url(#${id})`}
        />
      </Svg>
    </Animated.View>
  );
}

/* =========================================================
   VARIANT 01: TWIN ARCS

   Two arcs rotate in opposite directions.
========================================================= */

function TwinArcs({ size }) {
  return (
    <>
      {/* Outer rotating arc */}
      <RotatingRing size={size} duration={1800}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${VB} ${VB}`}
        >
          <Circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={TRACK}
            strokeWidth={STROKE_TRACK}
          />

          <Circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={GREEN}
            strokeWidth={STROKE_MAIN}
            strokeLinecap="round"
            strokeDasharray={arc(C_OUTER, 0.24)}
          />
        </Svg>
      </RotatingRing>

      {/* Inner arc rotates in reverse */}
      <RotatingRing
        size={size}
        duration={2900}
        reverse
      >
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${VB} ${VB}`}
        >
          <Circle
            cx={CX}
            cy={CY}
            r={R_INNER}
            fill="none"
            stroke={LIGHT_GREEN}
            strokeWidth={STROKE_THIN}
            strokeLinecap="round"
            strokeDasharray={arc(C_INNER, 0.18)}
            strokeDashoffset={C_INNER * 0.5}
          />
        </Svg>
      </RotatingRing>
    </>
  );
}

/* =========================================================
   VARIANT 02: COMET

   Multiple overlapping arcs create a fading comet tail.
========================================================= */

const COMET_LAYERS = [
  { fraction: 0.34, opacity: 0.10 },
  { fraction: 0.23, opacity: 0.18 },
  { fraction: 0.14, opacity: 0.32 },
  { fraction: 0.08, opacity: 0.55 },
  { fraction: 0.03, opacity: 0.95 },
];

function Comet({ size }) {
  return (
    <RotatingRing
      size={size}
      duration={1700}
      reverse
    >
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${VB} ${VB}`}
      >
        <Circle
          cx={CX}
          cy={CY}
          r={R_OUTER}
          fill="none"
          stroke={TRACK}
          strokeWidth={STROKE_TRACK}
        />

        {COMET_LAYERS.map((layer, index) => (
          <Circle
            key={index}
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={GREEN}
            strokeWidth={STROKE_MAIN}
            strokeLinecap="round"
            strokeOpacity={layer.opacity}
            strokeDasharray={arc(
              C_OUTER,
              layer.fraction
            )}
          />
        ))}

        <Circle
          cx={CX + R_OUTER}
          cy={CY}
          r={STROKE_MAIN * 0.9}
          fill={GREEN}
        />
      </Svg>
    </RotatingRing>
  );
}

/* =========================================================
   VARIANT 03: RADAR PULSE

   Expanding rings fade out and repeat.
========================================================= */

function RadarPulse({
  ringSize,
  offset,
  delay,
  duration = 2400,
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;

    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.out(Easing.quad),
        }),
        -1,
        false
      )
    );
  }, [delay, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const progressValue = progress.value;

    return {
      opacity: 0.85 * (1 - progressValue),

      transform: [
        {
          scale: 0.28 + 0.72 * progressValue,
        },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: offset,
          top: offset,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: Math.max(1.5, ringSize * 0.02),
          borderColor: GREEN,
        },
        animatedStyle,
      ]}
    />
  );
}

function Radar({ size }) {
  const ringSize = (size * R_OUTER * 2) / VB;
  const offset = (size - ringSize) / 2;

  return (
    <>
      {[0, 800, 1600].map((delay) => (
        <RadarPulse
          key={delay}
          ringSize={ringSize}
          offset={offset}
          delay={delay}
        />
      ))}

      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${VB} ${VB}`}
        style={styles.absolutePosition}
      >
        <Circle
          cx={CX}
          cy={CY}
          r={R_OUTER}
          fill="none"
          stroke={TRACK}
          strokeWidth={STROKE_TRACK}
        />
      </Svg>
    </>
  );
}

/* =========================================================
   VARIANT 07: SWEEP

   Gradient rings rotate in opposite directions.
========================================================= */

function Sweep({ size }) {
  const outerId = useUid("sweep-out");
  const innerId = useUid("sweep-in");

  return (
    <>
      {/* Outer gradient sweep */}
      <RotatingRing
        size={size}
        duration={1900}
      >
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${VB} ${VB}`}
        >
          <Defs>
            <LinearGradient
              id={outerId}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <Stop
                offset="0%"
                stopColor={GREEN}
                stopOpacity={0}
              />

              <Stop
                offset="55%"
                stopColor={GREEN}
                stopOpacity={0.45}
              />

              <Stop
                offset="100%"
                stopColor={GREEN}
                stopOpacity={1}
              />
            </LinearGradient>
          </Defs>

          <Circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={TRACK}
            strokeWidth={STROKE_TRACK}
          />

          <Circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={`url(#${outerId})`}
            strokeWidth={STROKE_MAIN}
            strokeLinecap="round"
          />

          <Circle
            cx={CX + R_OUTER}
            cy={CY}
            r={STROKE_MAIN * 0.75}
            fill={GREEN}
          />
        </Svg>
      </RotatingRing>

      {/* Inner reverse gradient sweep */}
      <RotatingRing
        size={size}
        duration={3000}
        reverse
      >
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${VB} ${VB}`}
        >
          <Defs>
            <LinearGradient
              id={innerId}
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <Stop
                offset="0%"
                stopColor={LIGHT_GREEN}
                stopOpacity={0}
              />

              <Stop
                offset="100%"
                stopColor={LIGHT_GREEN}
                stopOpacity={0.9}
              />
            </LinearGradient>
          </Defs>

          <Circle
            cx={CX}
            cy={CY}
            r={R_INNER}
            fill="none"
            stroke={`url(#${innerId})`}
            strokeWidth={STROKE_THIN}
            strokeLinecap="round"
          />
        </Svg>
      </RotatingRing>
    </>
  );
}

/* =========================================================
   MAIN COMPONENT

   Props:
   - variant: "01", "02", "03", or "07"
   - size: loader dimensions in React Native layout units
   - fullScreen: center loader across the available screen
   - backgroundColor: full-screen background
   - showMark: show or hide the central Maidora logo
========================================================= */

export default function BrandLoader({
  variant = "01",
  size = 120,
  fullScreen = false,
  backgroundColor = colors.white,
  showMark = true,
}) {
  const markSize = size * MARK_FRACTION;

  const loader = (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[
        styles.loader,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {/* Soft pulsing glow */}
      <HaloGlow size={size} />

      {/* Select animation variant */}
      {variant === "01" && (
        <TwinArcs size={size} />
      )}

      {variant === "02" && (
        <Comet size={size} />
      )}

      {variant === "03" && (
        <Radar size={size} />
      )}

      {variant === "07" && (
        <Sweep size={size} />
      )}

      {/* Optional center brand mark */}
      {showMark && (
        <View
          pointerEvents="none"
          style={[
            styles.brandMarkContainer,
            {
              width: markSize,
              height: markSize,
            },
          ]}
        >
          <BrandMark size={markSize} />
        </View>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreen,
          { backgroundColor },
        ]}
      >
        {loader}
      </View>
    );
  }

  return loader;
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  loader: {
    alignItems: "center",
    justifyContent: "center",
  },

  absoluteRing: {
    position: "absolute",
  },

  absolutePosition: {
    position: "absolute",
  },

  brandMarkContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  fullScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
