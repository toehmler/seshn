import { MainLayout, PostGallery } from '@/components';
import { BaseStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<BaseStackParamList, 'Post'> {}

export const PostScreen = ({ navigation, route }: Props) => {
  const { assets, initialIndex } = route.params;

  const [activeSlideIndex, setActiveSlideIndex] = useState(initialIndex);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${activeSlideIndex + 1} of ${assets.length}`,
    });
  }, [activeSlideIndex, navigation, assets.length]);

  const { top } = useSafeAreaInsets();

  return (
    <MainLayout backgroundColor="black" marginTop={-top}>
      <PostGallery
        assets={assets}
        initialIndex={initialIndex}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
    </MainLayout>
  );
};
