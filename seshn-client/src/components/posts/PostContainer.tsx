import { Post } from '@/types';
import { VStack } from 'native-base';
import { PostAssetContainer } from './PostAssetContainer';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface Props {
  post: Post;
}

export const PostContainer = ({ post }: Props) => {
  return (
    <VStack space={2} pb={1}>
      <PostHeader title={post.title} sports={post.sports} />
      <PostAssetContainer assets={post.assets} />
      <PostFooter numLikes={post.likes} />
    </VStack>
  );
};
