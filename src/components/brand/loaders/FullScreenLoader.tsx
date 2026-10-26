import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import BrandLoader from './BrandLoader';
import { colors, fonts } from '../../../theme/theme';

type FullScreenLoaderProps = {
  visible: boolean;
  label?: string;
  /** 'dark' = deep green veil (default, locked full-screen look) · 'light' = cream veil */
  theme?: 'dark' | 'light';
};

/**
 * Full-screen transition overlay — locked to the Radar 03 loader.
 * Renders above everything (Modal) with a soft fade.
 */
export default function FullScreenLoader({
  visible,
  label,
  theme = 'dark',
}: FullScreenLoaderProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 220 });
  }, [visible]);

  const veil = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const veilColor =
    theme === 'dark' ? 'rgba(33,78,59,0.96)' : 'rgba(247,243,233,0.96)';

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.fill, { backgroundColor: veilColor }, veil]}>
        <BrandLoader
          variant="radar"
          size={120}
          color={theme === 'dark' ? colors.brandSoftLight : colors.brandSoft}
          track={theme === 'dark' ? 'rgba(247,243,233,0.16)' : colors.loaderTrack}
        />
        {label ? (
          <Text
            style={[
              styles.label,
              { color: theme === 'dark' ? colors.cream : colors.brand },
            ]}
          >
            {label}
          </Text>
        ) : null}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.medium,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
