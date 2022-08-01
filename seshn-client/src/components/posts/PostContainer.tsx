import { Post } from '@/types';
import { VStack } from 'native-base';
import { useState } from 'react';
import { PostAssetContainer } from './PostAssetContainer';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface Props {
  post: Post;
}

export const PostContainer = ({ post }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <VStack space={2} pb={1}>
      <PostHeader title={post.title} sports={post.sports} />
      <PostAssetContainer
        assets={post.assets}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
      <PostFooter
        numAssets={post.assets.length}
        activeSlideIndex={activeSlideIndex}
        numLikes={post.likes}
      />
    </VStack>
  );
};
