import { AddMediaButton, Library, MainLayout } from '@/components';
import { useLayoutEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigation';
import { getAssetsFromDevice } from '@/helpers';
import { Asset, MediaType } from '@/types';

const videos = [
  require('@/assets/videos/video-1.mp4'),
  require('@/assets/videos/video-2.mp4'),
  require('@/assets/videos/video-3.mp4'),
  require('@/assets/videos/video-4.mp4'),
];

const images = [
  require('@/assets/images/image-1.jpg'),
  require('@/assets/images/image-2.jpg'),
  require('@/assets/images/image-3.jpg'),
  require('@/assets/images/image-4.jpg'),
];

interface Props extends BottomTabScreenProps<TabParamList, 'Library'> {}

export const LibraryScreen = ({ navigation }: Props) => {
  const [assets, setAssets] = useState<Asset[]>(
    images
      .map((img) => ({ type: MediaType.IMAGE, uri: img, id: `image-${img}` }))
      .concat(
        videos.map((video) => ({
          type: MediaType.VIDEO,
          uri: video,
          id: `video-${video}`,
        }))
      )
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddMediaButton
          onPress={async () => {
            const newAssets = await getAssetsFromDevice();
            setAssets(assets.concat(newAssets));
          }}
        />
      ),
    });
  }, [navigation, assets]);

  return (
    <MainLayout>
      <Library assets={assets} />
    </MainLayout>
  );
};
