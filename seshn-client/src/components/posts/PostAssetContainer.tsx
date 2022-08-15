import { Asset } from '@/types';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { PostAsset } from './PostAsset';

interface Props {
  assets: Asset[];
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
}

export const PostAssetContainer = ({
  assets,
  activeSlideIndex,
  setActiveSlideIndex,
}: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Carousel
      height={width}
      width={width}
      data={assets}
      renderItem={({ item }) => (
        <PostAsset
          asset={item}
          isActive={assets[activeSlideIndex].id === item.id}
        />
      )}
      onSnapToItem={setActiveSlideIndex}
      loop
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
    />
    // <FlatList
    //   data={assets}
    //   numColumns={2}
    //   renderItem={({ item }) => (
    //     <AssetLibraryPreview
    //       width={width / 2}
    //       height={width / 2}
    //       source={item.uri}
    //       type={item.type}
    //       id={item.id}
    //     />
    //   )}
    //   keyExtractor={(item) => item.id}
    // />
  );
};
