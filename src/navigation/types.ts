/**
 * Maidora Kenya — navigation types (React Navigation 7, NO expo-router).
 * Three layers:
 *   RootStack        — Splash gate, Onboarding OR Main, + stack-level screens
 *                      (MaidProfile, Conversation, PostJob, JobDetail, Kyc, Paywall)
 *   OnboardingStack  — the PRD 9-screen spine (~75 seconds)
 *   MainTab          — role-aware bottom tabs (employer vs maid)
 */
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Role = 'employer' | 'maid';

export type InboxChannel = 'applicants' | 'outreach';

/**
 * Paywall moments (PRD §34 order: free verification → subscription → PAYG).
 *  verify    — identity verification (always FREE — earned, never sold)
 *  subscribe — outreach plan (1 / 5 / 10 chats; standard 5 = KSh 99)
 *  chat      — PAYG outreach chat (KSh 50)
 *  contact   — contact unlock (KSh 100, one-time per maid)
 *  apply     — maid applying to a job (KSh 50)
 *  kycUrgent — expedited KYC review (KSh 150, 72 hours)
 */
export type PaywallMoment =
  | 'verify'
  | 'subscribe'
  | 'chat'
  | 'contact'
  | 'apply'
  | 'kycUrgent';

export type OnboardingStackParamList = {
  Welcome: undefined;
  HowItWorks: undefined;
  Phone: undefined;
  Otp: { phone?: string } | undefined;
  RoleSelect: undefined;
  Consents: undefined;
  ProfileBasics: undefined;
  Notifications: undefined;
  AllSet: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Maids: undefined; // employer
  Jobs: undefined; // maid
  Inbox: undefined;
  Wallet: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList> | undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  MaidProfile: { maidId: string } | undefined;
  Conversation: { conversationId: string; inbox: InboxChannel };
  PostJob: undefined;
  JobDetail: { jobId: string; from: Role };
  Kyc: undefined;
  Paywall: { moment: PaywallMoment } | undefined;
};

/** Tab screens get tab + root-stack navigation (to push Paywall, Kyc, …). */
export type MainTabNav<Name extends keyof MainTabParamList = keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, Name>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'];

/** Nested onboarding screens push nothing outside their stack. */
export type OnboardingNav<Name extends keyof OnboardingStackParamList = keyof OnboardingStackParamList> =
  NativeStackScreenProps<OnboardingStackParamList, Name>['navigation'];
