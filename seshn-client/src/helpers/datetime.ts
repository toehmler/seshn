import { compareDesc, format, parse } from 'date-fns';
import { Post } from '@/types';

export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const READABLE_FORMAT = 'MMM d, yyyy';

export const getPostDate = (post: Post): Date => {
  return parse(post.date, DATETIME_FORMAT, new Date());
};

export const sortPostsByRecent = (posts: Post[]): Post[] => {
  return posts.sort((a, b) => {
    return compareDesc(getPostDate(a), getPostDate(b));
  });
};

export const formatTimestamp = (timestamp: number): string => {
  return format(new Date(timestamp), DATETIME_FORMAT);
};

const pad = (num: number, size = 2): string => {
  return num.toString().padStart(size, '0');
};

export const formatTimeSinceStart = (duration: number): string => {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
};

export const formatPostDate = (date: string) => {
  return format(parse(date, DATETIME_FORMAT, new Date()), READABLE_FORMAT);
};
