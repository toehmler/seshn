import { useAppDispatch, useVideoPlayer } from '@/hooks';
import { pauseVideo } from '@/redux';
import { Asset, MediaType, Post } from '@/types';
import { useScrollToTop } from '@react-navigation/native';
import { Divider, FlatList, IScrollViewProps } from 'native-base';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { Spacer } from '../common';
import { PostContainer } from './PostContainer';

interface Props extends IScrollViewProps {
  posts: Post[];
  header?: JSX.Element;
}

export const PostList = ({ posts, header, ...rest }: Props) => {
  const [outOfViewIds, setOutOfViewIds] = useState<string[]>([]);

  const { currentlyPlayingId } = useVideoPlayer();

  const dispatch = useAppDispatch();

  const handleViewableItemsChanged = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      // get all ids of videos in posts that have left the viewport
      setOutOfViewIds(
        changed
          .filter(({ isViewable }) => !isViewable)
          .map(({ item }) =>
            item.assets
              .filter((asset: Asset) => asset.type === MediaType.VIDEO)
              .map((asset: Asset) => asset.id)
          )
          .flat()
      );
    },
    []
  );

  // pause video when post leaves view
  useEffect(() => {
    if (currentlyPlayingId && outOfViewIds.includes(currentlyPlayingId)) {
      dispatch(pauseVideo());
    }
  }, [currentlyPlayingId, outOfViewIds, dispatch]);

  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      renderItem={({ item }) => <PostContainer post={item} />}
      data={posts}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Divider mb={5} />}
      ListHeaderComponent={header}
      ListFooterComponent={() => <Spacer size={5} />}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      onViewableItemsChanged={handleViewableItemsChanged}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
};
