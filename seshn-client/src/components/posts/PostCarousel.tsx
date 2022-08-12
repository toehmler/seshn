import { Asset } from '@/types';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { PostAsset } from './PostAsset';

interface Props {
  assets: Asset[];
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
}

export const PostCarousel = ({
  assets,
  activeSlideIndex,
  setActiveSlideIndex,
}: Props) => {
  const { width } = useWindowDimensions();

  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref?.current?.scrollTo({ index: activeSlideIndex });
  }, [activeSlideIndex]);

  return (
    <Carousel
      ref={ref}
      height={width}
      width={width}
      data={assets}
      renderItem={({ item }) => (
        <PostAsset
          asset={item}
          isActive={assets[activeSlideIndex].id === item.id}
          resizeMode="contain"
          zoomable
        />
      )}
      onSnapToItem={setActiveSlideIndex}
      loop={false}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
    />
  );
};
