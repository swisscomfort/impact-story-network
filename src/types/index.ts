export type StoryCategory = 
  | 'Heimkommen'
  | 'Gestrandet'
  | 'Peinlicher Fehler'
  | 'Letztes Geld falsch eingesetzt'
  | 'Kleine Alltagspanne'
  | 'Spontane Wendung'
  | 'Mini-Mission';

export type StoryStatus = 'open' | 'turning' | 'good_end' | 'paused';

export interface CommentReaction {
  id: string;
  author: string;
  avatar?: string;
  roleTag?: 'Tippgeber' | 'Zweifler' | 'Retter' | 'Creator' | 'Community';
  text: string;
  timestamp: string;
  likes: number;
  isHelpfulAdvice?: boolean;
}

export interface StoryUpdate {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  proofImageUrl?: string;
  isGoodEnd?: boolean;
}

export interface MicroDonation {
  id: string;
  supporterName: string;
  amount: number;
  currency: 'CHF' | 'EUR';
  timestamp: string;
  note?: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  authorReputation: number;
  city: string;
  country: 'CH' | 'DE' | 'AT';
  category: StoryCategory;
  situation: string;
  problem: string;
  mission: string;
  targetAmount: number;
  currentAmount: number;
  currency: 'CHF' | 'EUR';
  purposeTag: string; // e.g., 'SBB Ticket', 'Fahrradschlauch', 'Notfall-Ladekabel'
  status: StoryStatus;
  createdAt: string;
  comments: CommentReaction[];
  updates: StoryUpdate[];
  donations: MicroDonation[];
  goodEndSummary?: string;
  views: number;
  reactionsCount: number;
}

export interface UserStats {
  storiesChanged: number;
  missionsSolved: number;
  totalMicroImpact: number;
  reputationPoints: number;
  badge: string;
}
