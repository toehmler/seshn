import { MainLayout, PostCarousel } from '@/components';
import { BaseStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';

interface Props extends StackScreenProps<BaseStackParamList, 'Post'> {}

export const PostScreen = ({ navigation, route }: Props) => {
  const { assets, initialIndex } = route.params;

  const [activeSlideIndex, setActiveSlideIndex] = useState(initialIndex);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text fontWeight="bold" fontSize={18} alignSelf="flex-end" mr={4}>
          {activeSlideIndex + 1} of {assets.length}
        </Text>
      ),
    });
  }, [activeSlideIndex, navigation, assets.length]);

  return (
    <MainLayout centered={false} safeAreaTop>
      <PostCarousel
        assets={assets}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
    </MainLayout>
  );
};
