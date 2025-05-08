import { Team, User } from '@/components/admin/types';

export interface SiteConfig {
  id: string;
  siteTitle: string;
  headerText: string;
}

export interface RulesResponse {
  siteRules: string;
}

export interface ChallengeFlag {
  id?: string;
  flag: string;
  points: number;
  challengeId?: string;
  createdAt?: string;
  updatedAt?: string;
  isSolved?: boolean;
}

export interface ChallengeFile {
  id: string;
  name: string;
  path: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hint {
  id: string;
  content: string;
  cost: number;
  challengeId: string;
  createdAt: string;
  updatedAt: string;
  isPurchased?: boolean;
}

export interface UnlockCondition {
  id?: string;
  type: 'CHALLENGE_SOLVED' | 'TIME_REMAINDER';
  requiredChallengeId?: string | null;
  timeThresholdSeconds?: number | null;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  flag?: string;
  flags: ChallengeFlag[];
  multipleFlags: boolean;
  difficulty: string;
  isActive: boolean;
  isLocked: boolean;
  files: ChallengeFile[];
  hints: Hint[];
  unlockConditions: UnlockCondition[];
  createdAt: string;
  updatedAt: string;
  isSolved?: boolean;
}

export interface CategoryChallenge {
  id: string;
  title: string;
  isSolved: boolean;
  isLocked: boolean;
  points: number;
  category: string;
  solvedBy: { teamId: string; teamColor: string }[];
}

export interface CategoryResponse {
  challenges: CategoryChallenge[];
}

export interface TeamMember {
  id: string;
  alias: string;
  name: string;
  isTeamLeader: boolean;
}

export interface LeaderboardTeam {
  id: string;
  name: string;
  score: number;
  icon: string;
  color: string;
}

export interface LeaderboardResponse {
  teams: LeaderboardTeam[];
  currentUserTeam: LeaderboardTeam | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  team?: LeaderboardTeam;
}

export interface GameConfig {
  id?: string;
  startTime: string | Date | null;
  endTime: string | Date | null;
  isActive: boolean;
  hasEndTime?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScoreboardTeam {
  id: string;
  name: string;
  color: string;
  icon: string;
  score: number;
}

export interface PointHistory {
  id: string;
  points: number;
  totalPoints: number;
  reason: string;
  metadata: string | null;
  createdAt: string;
}

export interface PointHistoryResponse {
  items: PointHistory[];
}

export interface Score {
  id: string;
  points: number;
  createdAt: string;
  team: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
}

export interface SubmissionResponse {
  message: string;
  isCorrect: boolean;
  points?: number;
}

export interface NewAnnouncement {
  title: string;
  content: string;
}

export interface CategoriesResponse {
  categories: string[];
  challengesByCategory: Record<string, Challenge[]>;
}

export interface NewChallenge {
  title: string;
  description: string;
  category: string;
  points: number;
  flag?: string;
  flags: ChallengeFlag[];
  multipleFlags: boolean;
  difficulty: string;
  isActive?: boolean;
  isLocked?: boolean;
  files: ChallengeFile[];
  hints: Hint[];
  unlockConditions?: UnlockCondition[];
}

export interface ApiError extends Error {
  message: string;
  code?: string;
  meta?: {
    target?: string[];
  };
}

export interface SiteConfiguration {
  key: string;
  value: string;
}

export interface SignUpRequest {
  name: string;
  alias: string;
  password: string;
  teamOption: 'create' | 'join';
  teamName?: string;
  teamCode?: string;
  teamIcon?: string;
  teamColor?: string;
}

export interface SignUpResponse {
  user: {
    alias: string;
    password: string;
  };
}

// Mock data
const mockSiteConfig: SiteConfig[] = [
  { id: '1', siteTitle: 'Orbital CTF', headerText: '80s retro ui, space-themed, batteries included CTF platform.' }
];

const mockRules: RulesResponse = {
  siteRules: `Following actions are prohibited, unless explicitly told otherwise by event Admins.

### Rule 1 - Cooperation

No cooperation between teams with independent accounts. Sharing of keys or providing revealing hints to other teams is cheating, don't do it.

### Rule 2 - Attacking Scoreboard

No attacking the competition infrastructure. If bugs or vulns are found, please alert the competition organizers immediately.

### Rule 3 - Sabotage

Absolutely no sabotaging of other competing teams, or in any way hindering their independent progress.

### Rule 4 - Bruteforcing

No brute forcing of challenge flag/ keys against the scoring site.

### Rule 5 - Denial Of Service

DoSing the CTF platform or any of the challenges is forbidden.`
};

const mockChallenge: Challenge = {
  id: '1',
  title: 'Breach The Mainframe',
  description: 'Your first task is to breach the corporate mainframe. Look for common vulnerabilities.',
  category: 'Web',
  points: 100,
  flags: [],
  multipleFlags: false,
  difficulty: 'Easy',
  isActive: true,
  isLocked: false,
  files: [{
    id: '1',
    name: 'mainframe_dump.bin',
    path: '/files/mainframe_dump.bin',
    size: 2048,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }],
  hints: [{
    id: '1',
    content: 'Have you tried looking at the HTTP headers?',
    cost: 25,
    challengeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }],
  unlockConditions: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const mockTeam: Team = {
  id: '1',
  name: 'NightCity Hackers',
  color: '#FF0055',
  icon: 'GiCircuitry',
  score: 1000,
  members: [],
  code: 'NIGHT777'
};

const mockLeaderboardResponse: LeaderboardResponse = {
  teams: [
    { id: '1', name: 'NightCity Hackers', score: 1000, icon: 'GiCircuitry', color: '#FF0055' },
    { id: '2', name: 'Digital Ronin', score: 800, icon: 'GiNinjaHead', color: '#00FFB2' },
    { id: '3', name: 'Chrome Dragons', score: 750, icon: 'GiDragonHead', color: '#9700FF' },
    { id: '4', name: 'NetWatch Elite', score: 600, icon: 'GiShield', color: '#00FFB2' }
  ],
  currentUserTeam: { id: '1', name: 'NightCity Hackers', score: 1000, icon: 'GiCircuitry', color: '#FF0055' }
};

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to CyberCTF 2025!',
    content: 'Jack in, hackers! The virtual playground is now open. May the best team win!',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'New Challenge: Ghost in the Machine',
    content: 'A rogue AI has been detected in the network. Can you contain it?',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'System Alert',
    content: 'ICE protocols have been upgraded. Proceed with caution.',
    createdAt: new Date().toISOString()
  }
];

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    type: 'GAME_START',
    description: 'CyberCTF 2025 has begun!',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'CHALLENGE_SOLVED',
    description: 'Team NightCity Hackers breached the mainframe!',
    createdAt: new Date().toISOString(),
    team: { id: '1', name: 'NightCity Hackers', score: 1000, icon: 'GiCircuitry', color: '#FF0055' }
  },
  {
    id: '3',
    type: 'SYSTEM_ALERT',
    description: 'New ICE protocols detected in the network',
    createdAt: new Date().toISOString()
  }
];

const mockGameConfig: GameConfig = {
  id: '1',
  startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
  endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  isActive: true,
  hasEndTime: true
};

const mockScoreboardTeams: ScoreboardTeam[] = [
  {
    id: '1',
    name: 'NightCity Hackers',
    color: '#FF0055',
    icon: 'GiCircuitry',
    score: 1000
  },
  {
    id: '2',
    name: 'Digital Ronin',
    color: '#00FFB2',
    icon: 'GiNinjaHead',
    score: 800
  },
  {
    id: '3',
    name: 'Chrome Dragons',
    color: '#9700FF',
    icon: 'GiDragonHead',
    score: 750
  }
];

const mockPointHistoryTeam1: PointHistoryResponse = {
  items: [
    {
      id: '1',
      points: 0,
      totalPoints: 0,
      reason: 'TEAM_CREATED',
      metadata: JSON.stringify({
        teamName: 'NightCity Hackers',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      points: 100,
      totalPoints: 100,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '1',
        challengeTitle: 'Breach The Mainframe',
        points: 100,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      points: -25,
      totalPoints: 75,
      reason: 'HINT_PURCHASE',
      metadata: JSON.stringify({
        hintId: '1',
        challengeTitle: 'Breach The Mainframe',
        cost: 25
      }),
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      points: 0,
      totalPoints: 75,
      reason: 'FLAG_SUBMISSION',
      metadata: JSON.stringify({
        challengeId: '2',
        challengeTitle: 'Neural Decrypt',
        submittedFlag: 'CTF{WRONG_FLAG}',
        isCorrect: false
      }),
      createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      points: 200,
      totalPoints: 275,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '2',
        challengeTitle: 'Neural Decrypt',
        points: 200,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      points: 100,
      totalPoints: 375,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '3',
        challengeTitle: 'Incident Response 101',
        points: 100,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const mockPointHistoryTeam2: PointHistoryResponse = {
  items: [
    {
      id: '1',
      points: 0,
      totalPoints: 0,
      reason: 'TEAM_CREATED',
      metadata: JSON.stringify({
        teamName: 'Digital Ronin',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      points: 0,
      totalPoints: 0,
      reason: 'FLAG_SUBMISSION',
      metadata: JSON.stringify({
        challengeId: '4',
        challengeTitle: 'Ghost in the Machine',
        submittedFlag: 'CTF{WRONG_FLAG}',
        isCorrect: false
      }),
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      points: -75,
      totalPoints: -75,
      reason: 'HINT_PURCHASE',
      metadata: JSON.stringify({
        hintId: '3',
        challengeTitle: 'Ghost in the Machine',
        cost: 75
      }),
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      points: 200,
      totalPoints: 125,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '4',
        challengeTitle: 'Ghost in the Machine',
        points: 300,
        isPartialSolve: true,
        flagId: 'flag1'
      }),
      createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      points: 0,
      totalPoints: 125,
      reason: 'FLAG_SUBMISSION',
      metadata: JSON.stringify({
        challengeId: '4',
        challengeTitle: 'Ghost in the Machine',
        submittedFlag: 'CTF{WRONG_FLAG}',
        isCorrect: false
      }),
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      points: 100,
      totalPoints: 225,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '3',
        challengeTitle: 'Incident Response 101',
        points: 100,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const mockPointHistoryTeam3: PointHistoryResponse = {
  items: [
    {
      id: '1',
      points: 0,
      totalPoints: 0,
      reason: 'TEAM_CREATED',
      metadata: JSON.stringify({
        teamName: 'Chrome Dragons',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      points: 0,
      totalPoints: 0,
      reason: 'FLAG_SUBMISSION',
      metadata: JSON.stringify({
        challengeId: '5',
        challengeTitle: 'Cyberdeck Override',
        submittedFlag: 'CTF{WRONG_FLAG}',
        isCorrect: false
      }),
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      points: -100,
      totalPoints: -100,
      reason: 'HINT_PURCHASE',
      metadata: JSON.stringify({
        hintId: '4',
        challengeTitle: 'Cyberdeck Override',
        cost: 100
      }),
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      points: 400,
      totalPoints: 300,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '5',
        challengeTitle: 'Cyberdeck Override',
        points: 400,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      points: 0,
      totalPoints: 300,
      reason: 'FLAG_SUBMISSION',
      metadata: JSON.stringify({
        challengeId: '2',
        challengeTitle: 'Neural Decrypt',
        submittedFlag: 'CTF{WRONG_FLAG}',
        isCorrect: false
      }),
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      points: 200,
      totalPoints: 500,
      reason: 'CHALLENGE_SOLVE',
      metadata: JSON.stringify({
        challengeId: '2',
        challengeTitle: 'Neural Decrypt',
        points: 200,
        isPartialSolve: false
      }),
      createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const mockHints: Hint[] = [
  {
    id: '1',
    content: 'Have you tried looking at the HTTP headers?',
    cost: 25,
    challengeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    content: 'The neural pattern uses a custom XOR encryption.',
    cost: 50,
    challengeId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockCategoriesResponse: CategoriesResponse = {
  categories: ['Web', 'Crypto', 'Forensics', 'Reverse Engineering', 'Binary'],
  challengesByCategory: {
    'Web': [{
      ...mockChallenge,
      id: '1',
      title: 'Breach The Mainframe',
      description: 'Your first task is to breach the corporate mainframe. Look for common vulnerabilities.',
      points: 100,
      difficulty: 'Easy',
      files: [{
        id: '1',
        name: 'mainframe_dump.bin',
        path: '/files/mainframe_dump.bin',
        size: 2048,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }],
    'Crypto': [{
      ...mockChallenge,
      id: '2',
      title: 'Neural Decrypt',
      description: 'A mysterious neural pattern has been detected. Can you decrypt the signal?',
      points: 200,
      difficulty: 'Medium',
      files: [{
        id: '2',
        name: 'neural_pattern.enc',
        path: '/files/neural_pattern.enc',
        size: 1024,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }],
    'Forensics': [{
      ...mockChallenge,
      id: '3',
      title: 'Incident Response 101',
      description: 'Something bad has happened. Can you identify the breach?',
      points: 100,
      difficulty: 'Easy',
      files: [{
        id: '3',
        name: 'incident_logs.bin',
        path: '/files/incident_logs.bin',
        size: 4096,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }],
    'Reverse Engineering': [{
      ...mockChallenge,
      id: '4',
      title: 'Ghost in the Machine',
      description: 'An AI has gone rogue. Find the vulnerability in its neural network.',
      points: 300,
      difficulty: 'Hard',
      files: [{
        id: '4',
        name: 'ai_core_memory.dump',
        path: '/files/ai_core_memory.dump',
        size: 8192,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }],
    'Binary': [{
      ...mockChallenge,
      id: '5',
      title: 'Cyberdeck Override',
      description: 'Hack into a high-security cyberdeck. Watch out for ICE protocols.',
      points: 400,
      difficulty: 'Expert',
      files: [{
        id: '5',
        name: 'cyberdeck_firmware.bin',
        path: '/files/cyberdeck_firmware.bin',
        size: 16384,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }]
  }
};

const mockSiteConfigurations: SiteConfiguration[] = [
  { key: 'homepage_title', value: 'Orbital CTF' },
  { key: 'site_title', value: 'Orbital CTF' },
  { key: 'homepage_subtitle', value: '80s retro ui, space-themed, batteries included CTF platform.' }
];

const mockUsers: User[] = [
  {
    id: '1',
    alias: 'zeroCool',
    name: 'Zero Cool',
    isTeamLeader: true,
    isAdmin: true,
    teamId: '1'
  },
  {
    id: '2',
    alias: 'crashOverride',
    name: 'Crash Override',
    isTeamLeader: false,
    isAdmin: false,
    teamId: '1'
  }
];

// Replace all fetch functions with mock data returns
export async function fetchSiteConfig(): Promise<SiteConfig[]> {
  return mockSiteConfig;
}

export async function fetchRules(): Promise<RulesResponse> {
  return mockRules;
}

export async function fetchChallenge(challengeId: string): Promise<Challenge> {
  return { ...mockChallenge, id: challengeId };
}

export async function fetchChallengesByCategory(categoryId: string): Promise<CategoryResponse> {
  return {
    challenges: [
      {
        id: '1',
        title: 'Mock Challenge',
        isSolved: false,
        isLocked: false,
        points: 100,
        category: categoryId,
        solvedBy: []
      }
    ]
  };
}

export async function fetchTeam(teamId: string): Promise<Team> {
  return { ...mockTeam, id: teamId };
}

export async function fetchLeaderboard(): Promise<LeaderboardResponse> {
  return mockLeaderboardResponse;
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  return mockAnnouncements;
}

export async function fetchActivity(): Promise<ActivityLog[]> {
  return mockActivityLogs;
}

export async function fetchGameConfig(): Promise<GameConfig> {
  return mockGameConfig;
}

export async function fetchScoreboardTeams(): Promise<ScoreboardTeam[]> {
  return mockScoreboardTeams;
}

export async function fetchTeamPointHistory(teamId: string, limit: number = 1000): Promise<PointHistoryResponse> {
  // Return different point histories based on team ID
  switch (teamId) {
    case '1': // NightCity Hackers
      return mockPointHistoryTeam1;
    case '2': // Digital Ronin
      return mockPointHistoryTeam2;
    case '3': // Chrome Dragons
      return mockPointHistoryTeam3;
    default:
      return { items: [] };
  }
}

export async function fetchHints(challengeId: string): Promise<Hint[]> {
  return mockHints;
}

export async function purchaseHint(hintId: string): Promise<void> {
  // Mock successful purchase
  return;
}

export async function submitFlag(challengeId: string, flag: string): Promise<SubmissionResponse> {
  return {
    message: 'Mock submission response',
    isCorrect: true,
    points: 100
  };
}

export async function downloadFile(filename: string): Promise<Blob> {
  return new Blob(['Mock file content'], { type: 'text/plain' });
}

export async function createAnnouncement(announcement: NewAnnouncement): Promise<void> {
  // Mock successful creation
  return;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  // Mock successful deletion
  return;
}

export async function fetchCategories(): Promise<CategoriesResponse> {
  return mockCategoriesResponse;
}

export async function createChallenge(challenge: NewChallenge): Promise<Challenge> {
  return {
    ...mockChallenge,
    ...challenge,
    id: 'new-challenge-id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function updateChallenge(challenge: Challenge): Promise<Challenge> {
  return {
    ...challenge,
    updatedAt: new Date().toISOString()
  };
}

export async function uploadFile(file: File): Promise<ChallengeFile> {
  return {
    id: '1',
    name: file.name,
    path: '/mock/path',
    size: file.size,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function deleteFile(filename: string): Promise<void> {
  // Mock successful deletion
  return;
}

export async function fetchAdminChallenges(): Promise<Challenge[]> {
  return [mockChallenge];
}

export async function deleteChallenge(id: string): Promise<void> {
  // Mock successful deletion
  return;
}

export async function exportChallenges(): Promise<Challenge[]> {
  return [mockChallenge];
}

export async function importChallenges(challenges: Challenge[]): Promise<void> {
  // Mock successful import
  return;
}

export async function updateSiteConfig(config: SiteConfig): Promise<void> {
  // Mock successful update
  return;
}

export async function updateGameConfig(config: GameConfig): Promise<GameConfig> {
  return {
    ...config,
    updatedAt: new Date().toISOString()
  };
}

export async function fetchSiteConfigurations(): Promise<SiteConfiguration[]> {
  return mockSiteConfigurations;
}

export async function updateSiteConfiguration(key: string, value: string): Promise<SiteConfiguration> {
  return { key, value };
}

export async function fetchAdminTeams(): Promise<Team[]> {
  return [mockTeam];
}

export async function deleteTeam(id: string): Promise<void> {
  // Mock successful deletion
  return;
}

export async function updateTeam(teamData: Partial<Team>): Promise<Team> {
  return {
    ...mockTeam,
    ...teamData
  };
}

export async function fetchAdminUsers(): Promise<User[]> {
  return mockUsers;
}

export async function deleteAdminUser(id: string): Promise<void> {
  // Mock successful deletion
  return;
}

export async function updateAdminUser(userData: Partial<User>): Promise<User> {
  return {
    ...mockUsers[0],
    ...userData
  };
}

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  return {
    user: {
      alias: data.alias,
      password: data.password
    }
  };
} 