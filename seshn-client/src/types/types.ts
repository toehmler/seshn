import { Address } from 'react-native-maps';

export enum Sport {
  SKIING = 'Skiing',
  SNOWBOARDING = 'Snowboarding',
  SURFING = 'Surfing',
  CYCLING = 'Cycling',
  CLIMBING = 'Climbing',
  RUNNING = 'Running',
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface User {
  id: string;
  name: string;
  profilePic: string;
  sports: Sport[];
}

export type AssetURI = number | { uri: string };

export interface Asset {
  id: string;
  type: MediaType;
  uri: AssetURI;
  alt?: string;
}

export interface Post {
  id: string;
  userId: string;
  assets: Asset[];
  location?: string;
  date: string;
  title: string;
  sports: Sport[];
  likes: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface InProgressSession {
  startTimestamp: number;
  location: Location;
  address: Address;
  path: Location[];
}

export interface Session extends InProgressSession {
  id: string;
  userId: string;
  assets: Asset[];
  mapUri?: string;
}
