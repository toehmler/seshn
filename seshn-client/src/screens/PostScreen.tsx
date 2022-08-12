import { MainLayout, PostCarousel } from '@/components';
import { BaseStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';

interface Props extends StackScreenProps<BaseStackParamList, 'Post'> {}

export const PostScreen = ({ navigation, route }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    route.params.initialIndex
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text fontWeight="bold" fontSize={18} alignSelf="flex-end" mr={4}>
          {activeSlideIndex + 1} of {route.params.assets.length}
        </Text>
      ),
    });
  }, [activeSlideIndex]);

  return (
    <MainLayout centered={false} safeAreaTop>
      <PostCarousel
        assets={route.params.assets}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
    </MainLayout>
  );
};
