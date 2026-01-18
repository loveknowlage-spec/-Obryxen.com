
export enum View {
  FEED = 'FEED',
  EXPLORE = 'EXPLORE',
  CREATE = 'CREATE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  PROFILE = 'PROFILE',
  REELS = 'REELS',
  MESSAGES = 'MESSAGES',
  MUSIC = 'MUSIC',
  NICHE_PICKER = 'NICHE_PICKER'
}

export type UserNiche = 'General' | 'Fitness' | 'Business' | 'Developer' | 'Creator' | 'Artist';

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  followers: number;
  following: number;
  posts: number;
  niche: UserNiche;
  nicheData?: Record<string, string>;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isVerified: boolean;
  nicheTag: UserNiche;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  isViewed: boolean;
}
