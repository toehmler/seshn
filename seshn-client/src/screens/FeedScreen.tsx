import { Feed, FeedOptions, FeedOptionsButton, MainLayout } from '@/components';
import { POSTS } from '@/constants';
import { sortPostsByRecent } from '@/helpers';
import { useFeedOptions } from '@/hooks';
import { FeedStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useDisclose } from 'native-base';
import { useLayoutEffect } from 'react';

interface Props extends StackScreenProps<FeedStackParamList, 'FeedHome'> {}

export const FeedScreen = ({ navigation }: Props) => {
  const { sportFilter } = useFeedOptions();

  const posts = sortPostsByRecent(
    sportFilter
      ? POSTS.filter(({ sports }) => sports.includes(sportFilter))
      : POSTS
  );

  const { isOpen, onOpen, onClose } = useDisclose(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <FeedOptionsButton onPress={onOpen} />,
    });
  }, [navigation, onOpen]);

  return (
    <MainLayout>
      <Feed posts={posts} />
      <FeedOptions isOpen={isOpen} close={onClose} />
    </MainLayout>
  );
};
