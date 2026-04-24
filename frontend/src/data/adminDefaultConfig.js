import logoUrl from '../assets/loginPage/Logo.png';
import { mockVideos, mockFollowingVideos } from './mockData';
import {
  SEARCH_DISCOVERY_SUGGESTIONS,
  SEARCH_HASHTAG_RESULTS,
  SEARCH_LIVE_RESULTS,
  SEARCH_SHOP_RESULTS,
  SEARCH_SOUND_RESULTS,
  SEARCH_TABS,
  SEARCH_TOP_FILTERS,
  SEARCH_USER_RESULTS,
  SEARCH_VIDEO_RESULTS,
  getHashtagDetail,
  SEARCH_TYPEAHEAD_POOL,
} from './searchMockData';
import {
  CREATE_AUDIENCE_OPTIONS,
  CREATE_CANVAS_IMAGE,
  CREATE_EDITOR_ACTIONS,
  CREATE_EDITOR_PRIMARY_TABS,
  CREATE_FILTER_GROUPS,
  CREATE_GALLERY_ITEMS,
  CREATE_HASHTAG_SUGGESTIONS,
  CREATE_LINK_OPTIONS,
  CREATE_LOCATION_CHIPS,
  CREATE_LOCATION_RESULTS,
  CREATE_PREVIEW_TOOLS,
  CREATE_SHARE_TARGETS,
  CREATE_SIDE_TOOLS,
  CREATE_SOUND_LIBRARY,
} from '../modules/user/pages/Create/createMockData';

const REEL_LIBRARY = [...mockVideos, ...mockFollowingVideos];
const DEFAULT_SECTIONS = [
  {
    id: 'foryou',
    label: 'For You',
    reelIds: mockVideos.map((video) => video.id),
  },
  {
    id: 'following',
    label: 'Following',
    reelIds: mockFollowingVideos.map((video) => video.id),
  },
  {
    id: 'trending',
    label: 'Trending',
    reelIds: [mockVideos[0]?.id, mockVideos[2]?.id, mockFollowingVideos[0]?.id].filter(Boolean),
  },
];

const DEFAULT_PROFILES = {
  johnny_dance: {
    id: 'johnny_dance',
    fullName: 'Johnny Dance',
    username: 'johnny_dance',
    followers: '1.5M',
    following: '124',
    likes: '12.8M',
    bio: 'Dancing through life!\nFor business inquiries: DM',
    playlists: ['Dance Moves', 'Vlogs', 'Tutorials'],
    savedReelIds: [mockVideos[0]?.id].filter(Boolean),
    likedReelIds: [mockVideos[1]?.id].filter(Boolean),
  },
  default: {
    id: 'default',
    fullName: 'Jhumroo User',
    username: 'jhumroo_user',
    followers: '673.6K',
    following: '457',
    likes: '17.5M',
    bio: 'welcome!\n22\ncollab: isyottlanxse@gmail.com\nLink: hoo.be/isabellaluaren\nSupporting: Be The Match Tips',
    playlists: ['fall outfits', 'PODCAST', 'amazon storefro'],
    savedReelIds: [],
    likedReelIds: [],
  },
};

const DEFAULT_SUGGESTED_ACCOUNTS = [
  { id: 1, type: 'user', username: 'layton_wi', name: 'Layton Williams', verified: true, subtitle: '264.9K followers' },
  { id: 2, type: 'platform', platform: 'Facebook', name: 'Facebook friends', subtitle: 'Find friends', actionText: 'Find', color: 'bg-[#1877F2]' },
  { id: 3, type: 'user', username: 'charlidame', name: "charli d'amelio", verified: true, subtitle: '150.2M followers' },
  { id: 4, type: 'platform', platform: 'Contacts', name: 'Contacts', subtitle: 'Find friends', actionText: 'Find', color: 'bg-[#FE2C55]' },
  { id: 5, type: 'user', username: 'khaby.lem', name: 'Khabane lame', verified: true, subtitle: '161.4M followers' },
  { id: 6, type: 'user', username: 'bellapoar', name: 'Bella Poarch', verified: true, subtitle: '93M followers' },
  { id: 7, type: 'user', username: 'willsmith', name: 'Will Smith', verified: true, subtitle: '74.2M followers' },
];

const DEFAULT_FOLLOWER_STATS = {
  default: { followers: '673.6K', following: '457' },
  johnny_dance: { followers: '1.5M', following: '124' },
};

const DEFAULT_FOLLOWER_LISTS = {
  following: [
    { username: 'johnny_dance', followers: '1.5M' },
    { username: 'tech_guru', followers: '890K' },
    { username: 'music_vibes', followers: '10M' },
  ],
  followers: [
    { username: 'nature_lover', followers: '2.5M' },
    { username: 'fire_safety', followers: '50K' },
    { username: 'escape_artist', followers: '120K' },
    { username: 'tech_guru', followers: '890K' },
  ],
  suggested: [
    { username: 'beabadobee', followers: '1.7M' },
    { username: 'layton_williams', followers: '264.9K' },
    { username: 'viral_dancer', followers: '5.2M' },
  ],
};

const DEFAULT_ONBOARDING_INTERESTS = [
  {
    category: 'Entertainment & Culture',
    items: ['Trends', 'TV shows', 'Marvel', 'Comedy', 'Trends', 'BTS', 'HBO', 'Naruto'],
  },
  {
    category: 'Home & Family',
    items: ['Motherhood', 'Parenting', 'Weddings', 'Fatherhood', 'Married life', 'Relationships'],
  },
  {
    category: 'Fashion & Beauty',
    items: ['Makeup', 'Nails', 'Sneakers', 'Hydration'],
  },
];

const DEFAULT_COMMENTS = [
  { id: 1, user: 'dancing_queen', text: 'This is absolutely amazing!', time: '2h', likes: 124 },
  { id: 2, user: 'user123_cool', text: 'First! And this is so true', time: '3h', likes: 89 },
  { id: 3, user: 'tech_guru', text: 'How did you edit this?', time: '5h', likes: 45 },
  { id: 4, user: 'travel_lover', text: 'Wow, added to my bucket list', time: '1d', likes: 432 },
  { id: 5, user: 'music_fanatic', text: 'Song name please?!', time: '2d', likes: 12 },
];

const DEFAULT_QUICK_EMOJIS = [
  '\ud83d\ude01',
  '\ud83e\udd70',
  '\ud83d\ude02',
  '\ud83d\ude33',
  '\ud83d\ude09',
  '\ud83d\ude05',
  '\ud83e\udd7a',
];

const DEFAULT_INBOX_CONTACTS = [
  { id: 1, username: 'user884998785164', sub: 'From your contacts' },
  { id: 2, username: 'Chloe_joy', sub: 'People you may know' },
  { id: 3, username: 'mike.tiktok99', sub: 'From your contacts' },
];

const DEFAULT_INBOX_SUGGESTED = [
  { id: 1, username: 'Chloe', sub: 'People you may know' },
  { id: 2, username: 'user884998785164', sub: 'From your contacts' },
  { id: 3, username: 'Jenna_85', sub: 'People you may know' },
];

const DEFAULT_ACTIVITY_GROUPS = [
  {
    group: 'Yesterday',
    items: [
      { id: 1, user: 'OurBootprints', action: 'from your contacts is on Jhumroo as ourbootprints.', time: '1d', type: 'contact' },
    ],
  },
  {
    group: 'This week',
    items: [
      { id: 2, user: 'Jenzp85', action: 'just viewed the video you shared.', time: '3d', type: 'view' },
      { id: 3, user: 'Shushpann London', action: 'from your contacts is on Jhumroo as shushpanick.', time: '4d', type: 'contact' },
    ],
  },
  {
    group: 'This month',
    items: [
      { id: 4, user: 'Chloe', action: 'just viewed the video you shared.', time: '3w', type: 'view' },
      { id: 5, user: 'faith', action: 'from your contacts is on Jhumroo as faithbinghamn.', time: '4w', type: 'contact' },
      { id: 6, user: 'Ellie', action: 'just viewed the video you shared.', time: '4w', type: 'view' },
    ],
  },
  {
    group: 'Previous',
    items: [
      { id: 7, user: 'ellie', action: 'from your contacts is on Jhumroo as fellie748.', time: '4w', type: 'contact' },
    ],
  },
];

const DEFAULT_CHAT_USERS = [
  { username: 'nature_lover', displayName: 'Nature Lover', subtitle: 'Sharing peaceful moments', followers: '673.6K' },
  { username: 'cute_pets', displayName: 'Cute Pets', subtitle: 'Pet clips and daily smiles', followers: '890K' },
  { username: 'tech_guru', displayName: 'Tech Guru', subtitle: 'Editing tips and gadget talk', followers: '890K' },
  { username: 'music_vibes', displayName: 'Music Vibes', subtitle: 'Always online for collabs', followers: '10M' },
  { username: 'fire_safety', displayName: 'Fire Safety', subtitle: 'Community updates and support', followers: '50K' },
  { username: 'Chloe_joy', displayName: 'Chloe Joy', subtitle: 'People you may know', followers: '264.9K' },
  { username: 'Jenna_85', displayName: 'Jenna 85', subtitle: 'People you may know', followers: '120K' },
  { username: 'layton_wi', displayName: 'Layton Williams', subtitle: 'Creative chats welcome', followers: '264.9K' },
  { username: 'charlidame', displayName: "Charli D'Amelio", subtitle: 'Open for quick replies', followers: '150.2M' },
  { username: 'khaby.lem', displayName: 'Khabane Lame', subtitle: 'Seen today', followers: '161.4M' },
  { username: 'bellapoar', displayName: 'Bella Poarch', subtitle: 'Music and lifestyle', followers: '93M' },
  { username: 'willsmith', displayName: 'Will Smith', subtitle: 'Stories and updates', followers: '74.2M' },
  { username: 'ocean_vibes', displayName: 'Ocean Vibes', subtitle: 'Blue moods only', followers: '50K' },
  { username: 'safari_explorer', displayName: 'Safari Explorer', subtitle: 'Travel and wildlife', followers: '120K' },
  { username: 'OurBootprints', displayName: 'OurBootprints', subtitle: 'From your contacts', followers: '1.5M' },
  { username: 'Jenzp85', displayName: 'Jenzp85', subtitle: 'Recently active', followers: '89K' },
  { username: 'user884998785164', displayName: 'user884998785164', subtitle: 'From your contacts', followers: '11K' },
];

const DEFAULT_CHAT_THREADS = [
  {
    username: 'nature_lover',
    unreadCount: 2,
    updatedAt: '2026-03-19T10:40:00.000Z',
    messages: [
      { id: 1, sender: 'them', text: 'Sunrise clips are ready, want them?', createdAt: '2026-03-19T10:28:00.000Z' },
      { id: 2, sender: 'me', text: 'Yes, send me the best ones.', createdAt: '2026-03-19T10:31:00.000Z' },
      { id: 3, sender: 'them', text: 'Uploading now, check in a minute.', createdAt: '2026-03-19T10:40:00.000Z' },
    ],
  },
  {
    username: 'tech_guru',
    unreadCount: 1,
    updatedAt: '2026-03-18T18:12:00.000Z',
    messages: [
      { id: 4, sender: 'them', text: 'That transition looked clean. Need the settings?', createdAt: '2026-03-18T18:12:00.000Z' },
    ],
  },
  {
    username: 'cute_pets',
    unreadCount: 0,
    updatedAt: '2026-03-17T14:05:00.000Z',
    messages: [
      { id: 5, sender: 'them', text: 'We just posted a new puppy clip.', createdAt: '2026-03-17T13:40:00.000Z' },
      { id: 6, sender: 'me', text: 'Looks adorable, I will watch it.', createdAt: '2026-03-17T14:05:00.000Z' },
    ],
  },
  {
    username: 'Chloe_joy',
    unreadCount: 3,
    updatedAt: '2026-03-16T09:15:00.000Z',
    messages: [
      { id: 7, sender: 'them', text: 'Hey, are you free for a quick chat later?', createdAt: '2026-03-16T09:15:00.000Z' },
    ],
  },
];

const DEFAULT_SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'user', label: 'Edit profile', route: '/settings/edit-profile' },
      { icon: 'lock', label: 'Privacy', route: '/settings/privacy' },
      { icon: 'shield', label: 'Security', route: '/settings/security' },
    ],
  },
  {
    title: 'Content & Display',
    items: [
      { icon: 'bell', label: 'Push notifications', route: '/settings/push-notifications' },
      { icon: 'moon', label: 'Dark mode', isToggle: true },
      { icon: 'globe', label: 'Language', route: '/settings/language' },
    ],
  },
  {
    title: 'Support & About',
    items: [
      { icon: 'help', label: 'Help Center', route: '/settings/help-center' },
      { icon: 'logout', label: 'Log out', color: '#FF3B30', isLogout: true },
    ],
  },
];

const DEFAULT_LANGUAGES = [
  'English',
  'Hindi',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Arabic',
  'Russian',
];

const DEFAULT_PUSH_SECTIONS = [
  {
    title: 'Interactions',
    items: [
      { label: 'Likes', default: true },
      { label: 'Comments', default: true },
      { label: 'New followers', default: true },
      { label: 'Mentions & tags', default: true },
    ],
  },
  {
    title: 'Messages',
    items: [
      { label: 'Direct messages', default: true },
      { label: 'Message reactions', default: true },
    ],
  },
  {
    title: 'Recommendations',
    items: [
      { label: 'Suggested accounts', default: false },
      { label: 'Suggested content', default: true },
    ],
  },
];

const DEFAULT_PRIVACY_SECTIONS = [
  {
    title: 'Interactions',
    items: [
      { icon: 'comments', label: 'Comments', value: 'comments', route: '/settings/privacy/comments' },
      { icon: 'mentions', label: 'Mentions and tags', value: 'mentionsTags', route: '/settings/privacy/mentions-tags' },
      { icon: 'messages', label: 'Direct messages', value: 'directMessages', route: '/settings/privacy/direct-messages' },
    ],
  },
  {
    title: 'Safety',
    items: [
      { icon: 'duet', label: 'Duet', value: 'duet', route: '/settings/privacy/duet' },
      { icon: 'stitch', label: 'Stitch', value: 'stitch', route: '/settings/privacy/stitch' },
      { icon: 'downloads', label: 'Downloads', value: 'downloads', route: '/settings/privacy/downloads' },
      { icon: 'blocked', label: 'Blocked accounts', route: '/settings/privacy/blocked-accounts' },
      { icon: 'lock', label: 'Private account', isToggle: true },
    ],
  },
];

const DEFAULT_SECURITY_SECTIONS = [
  {
    title: 'Security Status',
    items: [
      { icon: 'alert', label: 'Security alerts', value: 'securityAlerts', route: '/settings/security/alerts' },
      { icon: 'device', label: 'Your devices', value: 'devices', route: '/settings/security/devices' },
    ],
  },
  {
    title: 'Login Security',
    items: [
      { icon: 'password', label: 'Password', value: 'password', route: '/settings/security/password' },
      { icon: 'twoStep', label: '2-step verification', value: 'twoStep', route: '/settings/security/two-step-verification' },
    ],
  },
];

const DEFAULT_HELP_SECTIONS = [
  {
    title: 'Safety',
    items: [
      { icon: 'safety', label: 'Safety Center', route: '/settings/help-center/safety-center' },
      { icon: 'privacy', label: 'Privacy and Security', route: '/settings/help-center/privacy-security' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'report', label: 'Report a problem', route: '/settings/help-center/report-problem' },
      { icon: 'help', label: 'Help Articles', route: '/settings/help-center/articles' },
    ],
  },
];

const DEFAULT_VERIFICATION_METHODS = ['SMS', 'Email', 'Authenticator app'];

const DEFAULT_AUTH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DEFAULT_AUTH_METHODS = [
  { id: 'phone', label: 'Use phone or email' },
  { id: 'facebook', label: 'Continue with Facebook' },
  { id: 'apple', label: 'Continue with Apple' },
  { id: 'google', label: 'Continue with Google' },
  { id: 'twitter', label: 'Continue with Twitter' },
];

const DEFAULT_HELP_CENTER_DATA = {
  safetyTopics: [
    {
      id: 'safety-1',
      title: 'Avoid scam messages',
      description: 'Learn how to spot suspicious links, fake brand outreach, and phishing attempts.',
      badge: 'Popular',
    },
    {
      id: 'safety-2',
      title: 'Protect your account',
      description: 'Use strong passwords, secure login methods, and review active sessions often.',
      badge: 'Recommended',
    },
    {
      id: 'safety-3',
      title: 'Create a safer space',
      description: 'Manage comments, blocks, filters, and report harmful behavior quickly.',
      badge: 'Safety',
    },
  ],
  privacySecurityFaqs: [
    {
      id: 'faq-1',
      question: 'How do I control who can contact me?',
      answer:
        'Open Privacy settings and update direct messages, comments, mentions, duet, and stitch permissions.',
    },
    {
      id: 'faq-2',
      question: 'What happens when I block someone?',
      answer:
        'Blocked accounts cannot message you, view your profile updates normally, or interact with your content.',
    },
    {
      id: 'faq-3',
      question: 'How do I make my account private?',
      answer:
        'Go to Privacy and use the Private account toggle. This limits who can follow and see your content.',
    },
    {
      id: 'faq-4',
      question: 'How do I secure my login?',
      answer:
        'Use a strong password, review your logged-in devices, and turn on 2-step verification from Security settings.',
    },
  ],
  reportProblemCategories: [
    'Login issue',
    'App crash',
    'Video playback',
    'Chat and messages',
    'Privacy concern',
    'Account warning',
  ],
  helpArticles: [
    {
      slug: 'manage-your-privacy-settings',
      title: 'Manage your privacy settings',
      category: 'Privacy',
      readTime: '3 min read',
      excerpt: 'Learn how to control comments, messages, tags, and downloads on your account.',
      content: [
        'Privacy settings help you decide who can interact with your content and contact you.',
        'You can update comments, mentions and tags, direct messages, duet, stitch, and downloads from the Privacy screen.',
        'If you want tighter control, turn on Private account so new followers must be approved.',
      ],
    },
    {
      slug: 'review-active-devices',
      title: 'Review active devices on your account',
      category: 'Security',
      readTime: '2 min read',
      excerpt: 'Check where your account is signed in and remove devices you do not recognize.',
      content: [
        'Open Security and tap Your devices to see all active sessions.',
        'If you notice an unfamiliar device, remove it and change your password immediately.',
        'For stronger protection, enable 2-step verification after reviewing your sessions.',
      ],
    },
    {
      slug: 'report-a-problem-fast',
      title: 'Report a problem quickly',
      category: 'Support',
      readTime: '4 min read',
      excerpt: 'Use the in-app support flow to share issue details and get the right help faster.',
      content: [
        'Choose the category that best matches your issue before submitting.',
        'Add clear details, what you expected, and what actually happened.',
        'Attaching a screenshot or recording makes troubleshooting much easier.',
      ],
    },
    {
      slug: 'stay-safe-from-scams',
      title: 'Stay safe from scams and impersonation',
      category: 'Safety',
      readTime: '3 min read',
      excerpt: 'Recognize suspicious behavior and protect your account from fake outreach.',
      content: [
        'Never share login codes, passwords, or recovery information with anyone.',
        'Be careful with links that ask you to log in outside official app flows.',
        'Report impersonation and suspicious messages so the safety team can review them.',
      ],
    },
  ],
};

export const getDefaultAdminConfig = () => ({
  branding: {
    appName: 'Jhumroo',
    logo: logoUrl,
    palette: {
      primary: '#fe2c55',
      secondary: '#ff7b93',
      accent: '#ffb4c1',
      ink: '#2a1117',
      surface: '#ffffff',
      muted: '#a16976',
    },
  },
  reels: {
    library: REEL_LIBRARY,
    sections: DEFAULT_SECTIONS,
  },
  users: {
    defaultUserId: 'johnny_dance',
    profiles: DEFAULT_PROFILES,
    followerStats: DEFAULT_FOLLOWER_STATS,
    followerLists: DEFAULT_FOLLOWER_LISTS,
    suggestions: DEFAULT_SUGGESTED_ACCOUNTS,
  },
  createFlow: {
    durations: ['3m', '60s', '15s', 'Now'],
    speeds: ['0.3x', '0.5x', '1x', '2x', '3x'],
    canvasImage: CREATE_CANVAS_IMAGE,
    galleryItems: CREATE_GALLERY_ITEMS,
    filters: CREATE_FILTER_GROUPS,
    sounds: CREATE_SOUND_LIBRARY,
    locations: {
      chips: CREATE_LOCATION_CHIPS,
      results: CREATE_LOCATION_RESULTS,
    },
    hashtagSuggestions: CREATE_HASHTAG_SUGGESTIONS,
    linkOptions: CREATE_LINK_OPTIONS,
    audienceOptions: CREATE_AUDIENCE_OPTIONS,
    shareTargets: CREATE_SHARE_TARGETS,
    sideTools: CREATE_SIDE_TOOLS,
    previewTools: CREATE_PREVIEW_TOOLS,
    editorActions: CREATE_EDITOR_ACTIONS,
    editorPrimaryTabs: CREATE_EDITOR_PRIMARY_TABS,
  },
  search: {
    tabs: SEARCH_TABS,
    topFilters: SEARCH_TOP_FILTERS,
    discoverySuggestions: SEARCH_DISCOVERY_SUGGESTIONS,
    typeaheadPool: SEARCH_TYPEAHEAD_POOL,
    videos: SEARCH_VIDEO_RESULTS,
    users: SEARCH_USER_RESULTS,
    sounds: SEARCH_SOUND_RESULTS,
    shop: SEARCH_SHOP_RESULTS,
    live: SEARCH_LIVE_RESULTS,
    hashtags: SEARCH_HASHTAG_RESULTS,
    hashtagDetails: {
      food: getHashtagDetail('food'),
    },
  },
  onboarding: {
    interests: DEFAULT_ONBOARDING_INTERESTS,
  },
  comments: {
    quickEmojis: DEFAULT_QUICK_EMOJIS,
    seedComments: DEFAULT_COMMENTS,
  },
  inbox: {
    suggestedFriends: DEFAULT_INBOX_SUGGESTED,
    newFollowersContacts: DEFAULT_INBOX_CONTACTS,
    activityGroups: DEFAULT_ACTIVITY_GROUPS,
    chat: {
      users: DEFAULT_CHAT_USERS,
      threads: DEFAULT_CHAT_THREADS,
    },
    galleryItems: [
      'https://picsum.photos/seed/chat-gallery-1/260/360',
      'https://picsum.photos/seed/chat-gallery-2/260/360',
      'https://picsum.photos/seed/chat-gallery-3/260/360',
      'https://picsum.photos/seed/chat-gallery-4/260/360',
      'https://picsum.photos/seed/chat-gallery-5/260/360',
      'https://picsum.photos/seed/chat-gallery-6/260/360',
    ],
    attachmentOptions: [
      { key: 'gallery', label: 'Gallery', hint: 'Open photos', route: 'gallery' },
      { key: 'camera', label: 'Camera', hint: 'Open camera', route: 'camera' },
    ],
  },
  settings: {
    sections: DEFAULT_SETTINGS_SECTIONS,
    languages: DEFAULT_LANGUAGES,
    pushNotifications: DEFAULT_PUSH_SECTIONS,
    privacySections: DEFAULT_PRIVACY_SECTIONS,
    securitySections: DEFAULT_SECURITY_SECTIONS,
    helpCenterSections: DEFAULT_HELP_SECTIONS,
    verificationMethods: DEFAULT_VERIFICATION_METHODS,
  },
  navigation: {
    bottomNav: [
      { path: '/user', label: 'Home', icon: 'home', type: 'link' },
      { path: '/search', label: 'Discover', icon: 'search', type: 'link' },
      { path: '/create', label: 'Create', type: 'create' },
      { path: '/inbox', label: 'Inbox', icon: 'inbox', type: 'link', badge: 12 },
      { path: '/profile', label: 'Profile', icon: 'user', type: 'link' },
    ],
  },
  moderation: {
    reports: [
      { id: 'rep-1', type: 'Spam', status: 'Open', item: 'Video #102', reportedBy: 'user44', createdAt: '2h ago' },
      { id: 'rep-2', type: 'Harassment', status: 'Investigating', item: 'Comment #554', reportedBy: 'lucy_d', createdAt: '1d ago' },
      { id: 'rep-3', type: 'Copyright', status: 'Resolved', item: 'Sound #12', reportedBy: 'studio_85', createdAt: '3d ago' },
    ],
  },
  features: {
    enableTrending: true,
    enableAdminAnalytics: true,
  },
  auth: {
    months: DEFAULT_AUTH_MONTHS,
    methods: DEFAULT_AUTH_METHODS,
  },
  helpCenter: DEFAULT_HELP_CENTER_DATA,
});
