export interface HistoryEra {
  id: string;
  year: string;
  badge: string;
  title: string;
  parodyHeadline: string;
  description: string;
  memeQuote: string;
  authorQuote: string;
  severityLevel: 'Hilarious' | 'Tragedy' | 'Drama' | 'Absurd' | 'Legendary';
  reactions: {
    facepalm: number;
    skull: number;
    laugh: number;
  };
  keyEvents: string[];
}

export interface MemeFeature {
  id: string;
  iconName: string;
  title: string;
  parodyTitle: string;
  description: string;
  memeTag: string;
  userSufferingScore: string;
  realWorldImpact: string;
}

export interface StartMenuItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  parodyDesc: string;
  actionType: 'alert' | 'bsod' | 'sound' | 'link' | 'soundboard';
  badge?: string;
}

export interface SpecRequirement {
  component: string;
  officialSpec: string;
  winbaseSpec: string;
  memeReason: string;
  isPassing: boolean;
}
