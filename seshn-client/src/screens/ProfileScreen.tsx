import { MainLayout, Profile } from '@/components';
import { POSTS } from '@/constants';
import { sortPostsByRecent } from '@/helpers';
import { Sport } from '@/types';

export const ProfileScreen = () => {
  const user = {
    id: '0',
    name: 'John Doe',
    sports: [Sport.CLIMBING, Sport.SNOWBOARDING, Sport.RUNNING, Sport.SURFING],
    profilePic: require('@/assets/images/profile-pic.jpg'),
  };

  const posts = sortPostsByRecent(POSTS);

  return (
    <MainLayout>
      <Profile user={user} posts={posts} />
    </MainLayout>
  );
};
