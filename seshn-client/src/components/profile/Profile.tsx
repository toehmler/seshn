import { Post, User } from '@/types';
import { PostList } from '../posts';
import { ProfileInfo } from './ProfileInfo';

interface Props {
  user?: User;
  posts: Post[];
}

export const Profile = ({ user, posts }: Props) => {
  return <PostList posts={posts} header={<ProfileInfo user={user} />} />;
};
