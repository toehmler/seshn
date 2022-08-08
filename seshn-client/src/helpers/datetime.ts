import {
  compareDesc,
  format,
  formatDuration,
  formatISO,
  intervalToDuration,
  parse,
  parseISO,
} from 'date-fns';
import { Post } from '@/types';

export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const getPostDate = (post: Post): Date => {
  return parse(post.date, DATETIME_FORMAT, new Date());
};

export const sortPostsByRecent = (posts: Post[]): Post[] => {
  return posts.sort((a, b) => {
    return compareDesc(getPostDate(a), getPostDate(b));
  });
};

export const STOPWATCH_FORMAT = 'HH:mm:ss';

export const now = (): number => {
  return Date.now();
};

export const formatTimeSinceStart = (start: number): string => {
  const duration = start;
  const minutes = `${Math.floor(duration / 60000)}`.padStart(2, '0');
  const seconds = `${Math.floor(duration / 1000) % 60}`.padStart(2, '0');
  const milliseconds = `${Math.floor(duration / 10) % 100}`.padStart(2, '0');

  return `${minutes}:${seconds}.${milliseconds}`;
};
