import { Asset, MediaType } from '@/types';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { PostAsset } from './PostAsset';
import Gallery, { GalleryRef } from 'react-native-awesome-gallery';
import { useNavigation } from '@react-navigation/native';

interface Props {
  assets: Asset[];
  initialIndex: number;
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
}

export const PostGallery = ({
  assets,
  initialIndex,
  activeSlideIndex,
  setActiveSlideIndex,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const ref = useRef<GalleryRef>(null);

  useEffect(() => {
    ref?.current?.reset(true);
  }, [activeSlideIndex]);

  const navigation = useNavigation();

  return (
    <Gallery
      ref={ref}
      style={{ width, height }}
      data={assets}
      initialIndex={initialIndex}
      pinchEnabled={assets[activeSlideIndex].type === MediaType.IMAGE}
      renderItem={({ item }) => (
        <PostAsset
          asset={item}
          isActive={assets[activeSlideIndex].id === item.id}
          resizeMode="contain"
        />
      )}
      onIndexChange={setActiveSlideIndex}
      loop={false}
      onSwipeToClose={() => navigation.goBack()}
    />
  );
};
