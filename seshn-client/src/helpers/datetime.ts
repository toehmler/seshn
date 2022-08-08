import { compareDesc, parse } from 'date-fns';
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

export const now = (): number => {
  return Date.now();
};

export const formatTimeSinceStart = (duration: number): string => {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours.toString().padStart(2, '0')}:${(minutes % 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
};
