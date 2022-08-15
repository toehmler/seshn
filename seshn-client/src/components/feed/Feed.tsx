import { Post } from '@/types';
import { PostList } from '../posts';

interface Props {
  posts: Post[];
}

export const Feed = ({ posts }: Props) => {
  return <PostList posts={posts} pt={5} />;
};
