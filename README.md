# Maidora Kenya 🇰🇪

Kenya's trusted househelp marketplace — mobile app (Expo / React Native).

> The original JS starter (App.js / BrandLoader.js / colors.js) is preserved on
> the [`legacy/starter`](https://github.com/AmungaLucas/maidora_kenya/tree/legacy/starter)
> branch. This branch (`main`) is the current, type-checked codebase.

This first build ships the **brand foundation**: the animated splash, the locked
loader system, and a simple Home screen, wired with **React Navigation**
(native-stack) — no expo-router, no react-router.

## Structure

```
maidora-kenya/
├── index.ts                        ← registerRootComponent (plain entry, no expo-router)
├── App.tsx                         ← Poppins load + native-splash handoff + NavigationContainer
├── app.json                        ← brand icon / splash / adaptiveIcon wired (ke.maidora.app)
└── src/
    ├── theme/theme.ts              ← palette · Poppins · splash themes
    ├── navigation/RootNavigator.tsx ← Splash → Home (replace + fade)
    ├── components/brand/
    │   ├── BrandMark.tsx           ← exact 720×680 logo paths
    │   ├── BrandLockup.tsx         ← mark + MAIDORA + tagline
    │   └── loaders/
    │       ├── BrandLoader.tsx     ← 01 TwinArcs · 02 Comet · 03 Radar · 07 Sweep
    │       ├── LoadingButton.tsx   ← idle → Radar → "Booked!"
    │       └── FullScreenLoader.tsx ← Radar veil (dark/light)
    └── screens/
        ├── SplashScreen.tsx        ← H07 Ping Letters (Reanimated)
        └── HomeScreen.tsx          ← search (TwinArcs) · book (Radar) · overlay (Radar)
```

## Loader mapping (locked)

| Context     | Loader           |
|-------------|------------------|
| General     | 01 TwinArcs      |
| Buttons     | 03 Radar         |
| Full-screen | 03 Radar         |
| Splash      | H07 Ping Letters |

## Splash flow

1. Native splash (cream + static mark) holds while Poppins loads.
2. `Splash` route plays the H07 timeline: radar rings ping at 0 / 200 / 950 ms →
   mark drops (50 ms) → M-A-I-D-O-R-A springs in 350–650 ms → tagline at 950 ms.
3. At ~2.6 s it `replace`s to `Home` — back never returns to the splash.

## Run it

```bash
bun install
bunx expo start          # scan the QR with Expo Go (Android/iOS)
```

Type-check / doctor:

```bash
bunx tsc --noEmit
bunx expo-doctor
```

> Reanimated 4 + New Architecture: no manual babel plugin needed.

## Roadmap

- [ ] Tabs (Home / Bookings / Profile) once the PRD lands
- [ ] Real search + booking API behind the loader states
- [ ] Auth (phone number / M-Pesa-friendly flows)
- [ ] EAS build profiles (dev / preview / production)
