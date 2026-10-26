/**
 * Maidora Kenya — brand theme
 * Palette + fonts + navigation theme. Single source of truth for every component.
 */
export const colors = {
  brand: '#214E3B',
  brandDeep: '#183728',
  brandSoft: '#7BC08B',
  brandSoftLight: '#B7E2C1', // loader color on dark/brand surfaces
  cream: '#F7F3E9',
  gold: '#D6A64F',
  goldDark: '#9A742D',
  loaderTrack: '#E5EBE5',
  ink: '#12291F',
  muted: '#5E7F6F',
  card: '#FFFFFF',
  line: '#E5EBE5',
} as const;

/** Poppins loaded via @expo-google-fonts/poppins (see App.tsx) */
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

/** Splash variants (light = default) */
export const splashThemes = {
  light: {
    bg: colors.cream,
    word: colors.brand,
    tag: colors.goldDark,
    ring: colors.brandSoft,
  },
  dark: {
    bg: colors.brand,
    word: colors.cream,
    tag: colors.gold,
    ring: colors.brandSoft,
  },
} as const;

export type SplashThemeName = keyof typeof splashThemes;
