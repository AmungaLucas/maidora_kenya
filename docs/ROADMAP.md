# Maidora Kenya — Build Roadmap & Work Schedule

v1.1 · 2026-10-28 (EAT) · Repo: `AmungaLucas/maidora_kenya` (main) · App: Expo SDK 58 / RN 0.88 / TypeScript

> v1.1 changelog: the full screens scaffold landed on `main` (commit 6719e85, built in a parallel session) while this roadmap was being written. Phase 1 status updated from "next up" to "shipped + close-out", and the schedule was rebalanced.

---

## 0. Source of truth — what we actually have

| Piece | Status |
|---|---|
| PRD v3.0 §1–§34 | Received and distilled into this plan (architecture, ledger, chat, onboarding, Employer surfaces, pricing, paywalls) |
| PRD Part L heading | Received: `# PART L — DATA MODEL, SERVICES, BUILD, METRICS` |
| PRD Part L body (§35 → end) | **Not received.** Every dependent item below is tagged `[PART-L]` and is provisional until it arrives |
| Document's true final sentence | **Unverified** — cannot be quoted honestly until the full text is pasted |
| Screens scaffold (Phase 1) | **Shipped** — commit 6719e85 "Maidora screens — full PRD scaffold on React Navigation" (landed from a parallel session); re-based onto main and verified `tsc --noEmit` clean on 2026-10-28 |

Standing action: paste the full PRD into `docs/PRD.md` (one-time) so every future session builds from the repo copy instead of scrolling chat history. Until then, long-form spec text (exact 11 Home components, exact 9-screen spine copy, consent wording) gets re-pasted per phase.

## 1. Locked decisions (do not re-litigate)

| Decision | Choice |
|---|---|
| Navigation | React Navigation 7 (`@react-navigation/native-stack`). **expo-router / react-router are forbidden** |
| Backend | User's shared hosting, Node ≥ 18. No localhost backend, ever |
| Email | Nodemailer — OTP: 6-digit, 5-minute TTL, abuse lockout |
| Payments | M-Pesa Daraja STK Push + public HTTPS callback |
| Realtime | None (shared hosting, no WebSocket) — chat polls HTTP every 3–5 s |
| Auth | Argon2id hashing · 30-day session tokens |
| Secrets | Server-side `.env` only. Never in repo, never in chat |
| RN 0.88 style rule | No `absoluteFillObject` — explicit `position/left/top/right/bottom` absolute positioning |
| Brand | `#214E3B` green / `#7BC08B` soft / `#F7F3E9` cream / `#D6A64F` gold · Splash H07 Ping Letters · Loaders: General 01 TwinArcs, Button + Full-screen 03 Radar |
| App identity | scheme `maidora` · package/bundle `ke.maidora.app` · Poppins via @expo-google-fonts |

## 2. Commercial constants (from PRD §1–§34)

| SKU | KSh | Notes |
|---|---|---|
| Application | 50 | Maid applies to a job |
| Subscription | 99 | Bundle of 5 applications |
| Outreach chat | 50 | Employer-initiated chat; caps 1 / 5 / 10 |
| Contact unlock | 100 | Reveal phone/contact details |
| Boost | 100 | 72 h visibility boost |
| Urgent KYC | 150 | 72 h expedited review lane |
| Verification | FREE | Earned via KYC — never sold |

Ledger rule: every money movement is an append-only ledger entry; balances are derived, never mutated.

## 3. Phase plan

### Phase 1 — Screens + React Navigation — SHIPPED (6719e85), close-out remaining
Shipped and verified (`tsc --noEmit` clean, 2026-10-28): 3-layer typed navigation (RootStack → 9-screen OnboardingStack spine → role-aware MainTab), employer surfaces (EmployerHome, Maids, MaidProfile, PostJob), maid surfaces (MaidHome, FindJobs, MaidProfileEditor), shared surfaces (Inbox with applicants/outreach channels, Conversation, JobDetail, Kyc, Paywall with `PaywallMoment` enum matching PRD pricing, Wallet, Account), 8-component UI kit, `AppStateContext` (signedIn / role), sample data in `src/data/samples.ts`. Pure React Navigation — no expo-router anywhere.

Actual file layout as shipped:

```
src/screens/
  onboarding/   Welcome · HowItWorks · Phone · Otp · RoleSelect · Consents · ProfileBasics · Notifications · AllSet  (9/9)
  employer/     EmployerHome · Maids · MaidProfile · PostJob
  maid/         MaidHome · FindJobs · MaidProfileEditor
  shared/       Inbox (applicants/outreach) · Conversation · JobDetail · Kyc · Paywall · Wallet · Account
src/components/ui/   Badge · Button · Card · EmptyState · Field · Icon · Screen · SectionHeader
src/state/           AppStateContext (signedIn / role)
src/data/            samples.ts (mock data — becomes the API seam in Phase 2)
```

Remaining close-out:

| # | Task | Detail |
|---|---|---|
| 1.8 | Runtime smoke | `bun install && bunx expo start` in Expo Go — confirm splash → onboarding spine → both role tabs → Paywall/KYC modals; brand loaders appear on async surfaces |
| 1.9 | Spec-fidelity pass | Once PRD copy lands in `docs/PRD.md`, diff screens against §27–§29 (11 Home components, dual-button rule on MaidProfile, consent wording incl. DPA 2019, OTP copy) and fix gaps |
| 1.10 | API seam | Introduce a typed API client module and route `samples.ts` reads through it, so the Phase 2 backend plugs in without screen rewrites |

DoD: every screen reachable via typed navigation · `tsc --noEmit` clean · no expo-router imports anywhere · brand loaders wired · RN 0.88 positioning rule respected.

### Phase 2 — Backend core on shared hosting
| # | Task | Detail |
|---|---|---|
| 2.1 | Provisioning | cPanel "Setup Node.js App", API subdomain, first SSH login → **change SSH password immediately** |
| 2.2 | API skeleton | Node 18+, minimal framework, `/health`, structured logging, `.env` loader, HTTPS behind hosting proxy |
| 2.3 | Database `[PART-L]` | Provisional schema: users, roles, profiles, jobs, applications, conversations, messages, ledger_entries, payments, otp_codes, sessions, kyc_submissions, consents, references, boosts — finalized when Part L arrives |
| 2.4 | Auth | OTP request → Nodemailer email → verify (5-min TTL, lockout), Argon2id fallback hash, 30-day session tokens with rotation |
| 2.5 | Ledger core | Append-only entries; every SKU posts balanced entries; integrity checks; derived balances |

### Phase 3 — M-Pesa payments
| # | Task | Detail |
|---|---|---|
| 3.1 | Daraja integration | STK Push service + `/mpesa/callback` (public HTTPS, idempotent, validates source) |
| 3.2 | SKU wiring | Each paywall moment posts ledger entries on successful callback; failed/reversed handling |
| 3.3 | Receipts | Nodemailer receipts; reconciliation job (cron) |

### Phase 4 — Chat over HTTP polling
| # | Task | Detail |
|---|---|---|
| 4.1 | Two-inbox endpoints | Applicants free/unlimited; Outreach caps 1/5/10 enforced server-side |
| 4.2 | Freeze window | 30-day freeze; maid-speaks-first re-opens free |
| 4.3 | Client integration | 3–5 s adaptive polling, optimistic send, offline queue |

### Phase 5 — Trust & verification
| # | Task | Detail |
|---|---|---|
| 5.1 | KYC review | Admin console, statuses, 72 h SLA + urgent lane |
| 5.2 | Earned verification | "Verification is earned, never sold" — badge logic enforced server-side |
| 5.3 | References | Post-engagement reference flow per spec |

### Phase 6 — Hardening, metrics, launch
| # | Task | Detail |
|---|---|---|
| 6.1 | Anti-abuse | OTP lockout, rate limits, audit log |
| 6.2 | Metrics `[PART-L]` | Instrument per Part L METRICS definitions |
| 6.3 | Launch | Production build (Play Store, `ke.maidora.app`), UAT checklist, soft launch |

## 4. Week-by-week schedule

| Week | Dates (2026) | Focus | Ships | Depends on |
|---|---|---|---|---|
| W1 | Oct 28 – Nov 3 | Phase 1 close-out (1.8–1.10) + Phase 2 start (2.1–2.2) | Smoke-tested scaffold on Expo Go; hosting skeleton live | SSH creds (for 2.1) |
| W2 | Nov 4 – Nov 10 | Phase 2.1–2.4 — hosting + auth | Live API, OTP working | SSH creds, SMTP creds |
| W3 | Nov 11 – Nov 17 | Phase 2.5 + Phase 3 — ledger + payments | STK Push live in sandbox | Daraja creds, Part L (schema) |
| W4 | Nov 18 – Nov 24 | Phase 4 — chat E2E | Polling chat shipped | W3 |
| W5 | Nov 25 – Dec 1 | Phase 5 — trust & verification | KYC + badges live | W2 |
| W6 | Dec 2 – Dec 8 | Phase 6 — hardening + launch kit | Soft-launch ready build | Part L (metrics) |

Cadence: 3–4 working sessions per week; one numbered sub-phase per session; each session ends with `tsc` gate → commit → push → worklog entry.

## 5. Inputs needed from you (blockers)

| # | Item | Unblocks | Needed by |
|---|---|---|---|
| 1 | PRD Part L body: §35 → the very last sentence | Final DB schema, services, build & metrics | Before W3 (now is better) |
| 2 | Full PRD pasted into `docs/PRD.md` (or §27–§30 verbatim per phase) | Pixel-accurate screen copy in Phase 1 | Start of W1 |
| 3 | SSH credentials (change password after first login) | Phase 2 | W2 |
| 4 | Nodemailer SMTP credentials | OTP (Phase 2.4) | W2 |
| 5 | M-Pesa Daraja consumer key/secret + passkey (sandbox first) | Phase 3 | W3 |
| 6 | Revoke both exposed GitHub PATs; issue a fresh fine-grained token (repo-scoped, short expiry) | Future pushes | Before next push — the current one may already be dead |

## 6. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Shared hosting: no long-running processes | Polling architecture, stateless API, cron for reconciliation |
| Daraja callback needs live public HTTPS | Point callback at hosting domain from day one; sandbox → production checklist |
| OTP emails land in spam | SPF/DKIM/DMARC on sending domain; resend rules per §29 |
| Spec drift before Part L arrives | `[PART-L]` tags; DB schema stays provisional until then |
| Credential exposure in chat | Rotate PAT now; all server secrets only in hosting `.env` |

## 7. Immediate next actions

1. **You:** paste Part L (§35 → the document's true end) — I quote the final sentence to close the reading task.
2. **You (optional, ideal):** paste the full PRD once for `docs/PRD.md`.
3. **Me (on your go):** Phase 1 close-out — runtime smoke checklist, typed API seam, spec-fidelity pass once PRD text lands in `docs/PRD.md`.
4. **You:** revoke both exposed PATs; send one fresh fine-grained token.
5. **When ready:** SSH + SMTP + Daraja credentials (they go straight into the server `.env`, never the repo).

## 8. Working agreement

- One sub-phase per working session; nothing merges without the `tsc --noEmit` clean gate.
- Every session appends to `/home/z/my-project/worklog.md` (Task ID protocol) and ends with a commit + push.
- Honest-spec rule: if a detail is not in the received PRD text, it is marked as a proposal in code review chat — never presented as PRD verbatim.
