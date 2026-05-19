export type User = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
  ts: number;
  speed: number | null;
  accuracy: number;
};

export type BarCheckpoint = {
  id: string;
  name: string | null;
  lat: number;
  lng: number;
  arrived_at: string;
  left_at: string | null;
};

export type Night = {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  title: string | null;
  bac_self_reported: number | null;
  total_distance_m: number;
  duration_seconds: number;
  max_sway_score: number;
  route: GeoPoint[];
  checkpoints: BarCheckpoint[];
  created_at: string;
};

export type Reaction = {
  id: string;
  night_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
};
