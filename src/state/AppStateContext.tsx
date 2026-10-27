/**
 * Maidora Kenya — lightweight app state (auth gate + role + profile basics).
 * DEMO BUILD: in-memory only. Session tokens (30-day) and persistence land
 * with the backend on shared hosting.
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Role } from '../navigation/types';

type AppState = {
  signedIn: boolean;
  role: Role;
  firstName: string;
  phone: string;
  county: string;
  area: string;
  consentsAccepted: boolean;
};

type AppActions = {
  setRole: (role: Role) => void;
  setPhone: (phone: string) => void;
  setBasics: (patch: { firstName: string; county: string; area: string }) => void;
  completeOnboarding: () => void;
  signOut: () => void;
};

const INITIAL: AppState = {
  signedIn: false,
  role: 'employer',
  firstName: '',
  phone: '',
  county: '',
  area: '',
  consentsAccepted: false,
};

const Ctx = createContext<AppState & AppActions>({
  ...INITIAL,
  setRole: () => {},
  setPhone: () => {},
  setBasics: () => {},
  completeOnboarding: () => {},
  signOut: () => {},
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(INITIAL);

  const value = useMemo<AppState & AppActions>(
    () => ({
      ...state,
      setRole: (role) => setState((s) => ({ ...s, role })),
      setPhone: (phone) => setState((s) => ({ ...s, phone })),
      setBasics: (patch) => setState((s) => ({ ...s, ...patch })),
      completeOnboarding: () =>
        setState((s) => ({ ...s, signedIn: true, consentsAccepted: true })),
      signOut: () => setState(INITIAL),
    }),
    [state]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  return useContext(Ctx);
}
