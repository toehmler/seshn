import { Post, Sport } from '@/types';
import { VStack } from 'native-base';
import { PostAssetContainer } from './PostAssetContainer';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface Props {
  post: Post;
}

export const PostContainer = ({ post }: Props) => {
  const user = {
    id: '0',
    name: 'John Doe',
    sports: [Sport.CLIMBING, Sport.SNOWBOARDING, Sport.RUNNING, Sport.SURFING],
    profilePic: require('@/assets/images/profile-pic.jpg'),
  };

  return (
    <VStack space={2} pb={1}>
      <PostHeader user={user} date={post.date} />
      <PostAssetContainer assets={post.assets} />
      <PostFooter numLikes={post.likes} />
    </VStack>
  );
};
