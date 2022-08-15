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
