import { Asset, MediaType } from '@/types';
import { Center, Image } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { ResizeMode } from 'react-native-fast-image';
import { Video } from '../common';

interface Props {
  asset: Asset;
  isActive?: boolean;
  width?: number;
  height?: number;
  thumbnail?: boolean;
  resizeMode?: ResizeMode;
}

export const PostAsset = ({
  asset,
  isActive = false,
  width,
  height,
  thumbnail = false,
  resizeMode = 'cover',
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <Center h="100%">
      {asset.type === MediaType.IMAGE ? (
        <Image
          source={asset.uri}
          w={width || screenWidth}
          h={height || screenWidth}
          alt="image"
          resizeMode={resizeMode}
        />
      ) : (
        <Video
          source={asset.uri}
          width={width || screenWidth}
          height={height || screenWidth}
          paused={!isActive}
          id={asset.id}
          thumbnail={thumbnail}
        />
      )}
    </Center>
  );
};
