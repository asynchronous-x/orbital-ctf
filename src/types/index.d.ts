// Base entity for common fields
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ChallengeFlag
export interface ChallengeFlagBase {
  flag: string;
  points: number;
  challengeId?: string;
}

export interface ChallengeFlag extends ChallengeFlagBase, Partial<BaseEntity> {
  isSolved?: boolean; // For API/UI
}

// ChallengeFile
export interface ChallengeFile extends BaseEntity {
  name: string;
  path: string;
  size: number;
}

// Hint
export interface Hint extends BaseEntity {
  content?: string;
  cost: number;
  challengeId: string;
  isPurchased?: boolean; // For API/UI
}

// UnlockCondition
export interface UnlockCondition {
  id?: string;
  type: 'CHALLENGE_SOLVED' | 'TIME_REMAINDER';
  requiredChallengeId?: string | null;
  timeThresholdSeconds?: number | null;
}

// Challenge
export interface Challenge extends BaseEntity {
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
  link?: string;
  solveExplanation?: string;
  files: ChallengeFile[];
  hints: Hint[];
  unlockConditions: UnlockCondition[];
  isSolved?: boolean; // For API/UI
}

// NewChallenge
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
  link?: string;
  solveExplanation?: string;
  files: ChallengeFile[];
  hints: Hint[];
  unlockConditions?: UnlockCondition[];
}

// Announcement
export interface Announcement extends BaseEntity {
  title: string;
  content: string;
}

// NewAnnouncement
export interface NewAnnouncement {
  title: string;
  content: string;
}

// SiteConfig
export interface SiteConfig {
  id: string;
  siteTitle: string;
  headerText: string;
}

// GameConfig
export interface GameConfig extends Partial<BaseEntity> {
  id?: string;
  startTime: string | Date | null;
  endTime: string | Date | null;
  isActive: boolean;
  hasEndTime?: boolean;
}

// ApiError
export interface ApiError extends Error {
  error: string;
  code?: string;
  meta?: {
    target?: string[];
  };
}

// User
export interface User {
  id: string;
  alias: string;
  name: string;
  isAdmin: boolean;
  teamId: string | null;
  isTeamLeader: boolean;
}

// Team
export interface Team {
  id: string;
  name: string;
  code: string;
  score: number;
  icon?: string;
  color?: string;
  members: User[];
}

export interface LeaderboardTeam {
  id: string;
  name: string;
  score: number;
  icon: string;
  color: string;
}

// CategoryChallenge
export interface CategoryChallenge {
  id: string;
  title: string;
  isSolved: boolean;
  isLocked: boolean;
  points: number;
  category: string;
  solvedBy: { teamId: string; teamColor: string }[];
}

// CategoryResponse
export interface CategoryResponse {
  challenges: CategoryChallenge[];
}

// TeamMember
export interface TeamMember {
  id: string;
  alias: string;
  name: string;
  isTeamLeader: boolean;
}

// LeaderboardTeam
export interface LeaderboardTeam {
  id: string;
  name: string;
  score: number;
}

// LeaderboardResponse
export interface LeaderboardResponse {
  teams: LeaderboardTeam[];
  currentUserTeam: LeaderboardTeam | null;
}

// ActivityLog
export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  team?: LeaderboardTeam;
}

// ScoreboardTeam
export interface ScoreboardTeam {
  id: string;
  name: string;
  color: string;
  icon: string;
  score: number;
}

// PointHistory
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

// Score
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

export interface AdminSubmission {
  id: string;
  flag: string;
  isCorrect: boolean;
  createdAt: string;
  user: {
    id: string;
    alias: string;
  };
  team: {
    id: string;
    name: string;
    color?: string;
    icon?: string;
  };
  challenge: {
    id: string;
    title: string;
  };
}

export interface AdminActivityLog {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  teamId: string | null;
  team?: Team | null;
}

export interface AdminMetrics {
  totalTeams: number;
  totalUsers: number;
  totalChallenges: number;
  totalSubmissions: number;
  totalPossiblePoints: number;
  totalPointsEarned: number;
}

// SubmissionResponse
export interface SubmissionResponse {
  message: string;
  isCorrect: boolean;
  points?: number;
}

// CategoriesResponse
export interface CategoriesResponse {
  categories: string[];
  challengesByCategory: Record<string, Challenge[]>;
}

// SiteConfiguration
export interface SiteConfiguration {
  key: string;
  value: string;
}

// SignUpRequest
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

// SignUpResponse
export interface SignUpResponse {
  user: {
    alias: string;
    password: string;
  };
}

export type Tab =
  | 'challenges'
  | 'users'
  | 'teams'
  | 'submissions'
  | 'announcements'
  | 'activity'
  | 'configuration'
  | 'siteconfig'
  | 'metrics';

export interface RulesResponse {
  siteRules: string;
} 