export interface UserProfile {
  firstName: string;
  lastName: string;
  createdAt: string;
  age: number;
  weight: number;
  height: number;
  profilePicture: string;
}

export interface UserStatistics {
  totalDistance: string;
  totalSessions: number;
  totalDuration: number;
}

export interface UserInfo {
  profile: UserProfile;
  statistics: UserStatistics;
}
