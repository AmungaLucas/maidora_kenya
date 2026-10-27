/**
 * Maidora Kenya — sample data for the screens preview build.
 * TODO(backend): replace every constant here with real API/ledger data.
 */
export type SampleMaid = {
  id: string;
  name: string;
  firstName: string;
  area: string;
  tag: string;
  rating: string;
  rate: string;
  years: string;
  availability: string;
  about: string;
  references: Array<{ name: string; note: string }>;
};

export const MAIDS: SampleMaid[] = [
  {
    id: 'mary-w',
    name: 'Mary Wanjiku',
    firstName: 'Mary W.',
    area: 'Kilimani, Nairobi',
    tag: 'Househelp',
    rating: '4.9',
    rate: 'KSh 900/day',
    years: '6',
    availability: 'Live-out',
    about:
      'Six years caring for busy households in Kilimani and Kileleshwa. I keep kitchens spotless, laundry folded and children happy. References available and verified.',
    references: [
      { name: 'Anne K., Kilimani', note: 'Worked with Mary for 3 years' },
      { name: 'Joseph M., Kileleshwa', note: 'Family cook & househelp, 2022–2024' },
    ],
  },
  {
    id: 'achieng-o',
    name: 'Achieng Otieno',
    firstName: 'Achieng O.',
    area: 'Westlands, Nairobi',
    tag: 'Nanny',
    rating: '4.8',
    rate: 'KSh 850/day',
    years: '4',
    availability: 'Live-in',
    about:
      'Gentle, patient and organised nanny with four years with toddlers and school-run routines. First-aid trained.',
    references: [
      { name: 'Faith N., Spring Valley', note: 'Nanny for our twins, 2 years' },
      { name: 'Peter O., Runda', note: 'Verified previous employer' },
    ],
  },
  {
    id: 'halima-y',
    name: 'Halima Yusuf',
    firstName: 'Halima Y.',
    area: 'Nyali, Mombasa',
    tag: 'Cleaner',
    rating: '4.9',
    rate: 'KSh 950/day',
    years: '5',
    availability: 'Live-out',
    about:
      'Deep-cleaning specialist. Villas and apartments along the coast. Reliable, fast and thorough.',
    references: [
      { name: 'Zawadi H., Nyali', note: 'Weekly cleaning, 2 years' },
      { name: 'Sara A., Bamburi', note: 'Airbnb turnover cleaning' },
    ],
  },
];

export type SampleJob = {
  id: string;
  title: string;
  employer: string;
  employerVerified: boolean;
  area: string;
  salary: string;
  type: string;
  live: string;
  posted: string;
  about: string;
};

export const JOBS: SampleJob[] = [
  {
    id: 'j1',
    title: 'Full-time house help — Kilimani',
    employer: 'Lucas A.',
    employerVerified: true,
    area: 'Kilimani, Nairobi',
    salary: 'KSh 12,000 / month',
    type: 'Househelp',
    live: 'Live-out',
    posted: '2h ago',
    about:
      'Small family of three near Yaya Centre. Cooking, cleaning and laundry. Monday to Saturday, 8am–5pm. Kind, respectful household.',
  },
  {
    id: 'j2',
    title: 'Nanny for twins — Westlands',
    employer: 'Grace N.',
    employerVerified: true,
    area: 'Westlands, Nairobi',
    salary: 'KSh 15,000 / month',
    type: 'Nanny',
    live: 'Live-in',
    posted: '5h ago',
    about:
      'Two-year-old twins need a patient, playful nanny. Own room provided. References required.',
  },
  {
    id: 'j3',
    title: 'Deep cleaning — Nyali villa',
    employer: 'Zawadi H.',
    employerVerified: false,
    area: 'Nyali, Mombasa',
    salary: 'KSh 950 / day',
    type: 'Cleaner',
    live: 'Live-out',
    posted: '1d ago',
    about:
      'Four-bedroom villa, weekly deep clean. All supplies provided. Flexible days.',
  },
];

export type SampleConversation = {
  id: string;
  name: string;
  snippet: string;
  time: string;
  unread: boolean;
  status: 'active' | 'frozen' | 'closed';
  context: string;
};

/** inbox: 'applicants' → came from a job post (free) · 'outreach' → you paid first */
export const CONVERSATIONS: Array<SampleConversation & { inbox: 'applicants' | 'outreach' }> = [
  {
    id: 'c1',
    inbox: 'applicants',
    name: 'Mary Wanjiku',
    snippet: 'Applied to your job — I can start Monday.',
    time: '09:24',
    unread: true,
    status: 'active',
    context: 'Applied to “Full-time house help — Kilimani”',
  },
  {
    id: 'c2',
    inbox: 'applicants',
    name: 'Achieng Otieno',
    snippet: 'Thank you! Sending my references now.',
    time: 'Tue',
    unread: false,
    status: 'active',
    context: 'Applied to “Nanny for twins — Westlands”',
  },
  {
    id: 'c3',
    inbox: 'outreach',
    name: 'Halima Yusuf',
    snippet: 'Yes, Thursdays work well for me.',
    time: 'Mon',
    unread: true,
    status: 'active',
    context: 'You reached out first — replies are free for her',
  },
  {
    id: 'c4',
    inbox: 'outreach',
    name: 'Purity K.',
    snippet: 'Chat frozen — 30 days of silence.',
    time: '12 Jun',
    unread: false,
    status: 'frozen',
    context: 'When she writes next, the chat reopens free',
  },
  {
    id: 'c5',
    inbox: 'outreach',
    name: 'Janet M.',
    snippet: 'Conversation closed.',
    time: '28 May',
    unread: false,
    status: 'closed',
    context: 'Start a new outreach chat to reconnect',
  },
];
