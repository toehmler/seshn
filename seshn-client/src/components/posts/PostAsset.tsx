import { Asset, MediaType } from '@/types';
import { useWindowDimensions } from 'react-native';
import { LightboxImage, Video } from '../common';

interface Props {
  asset: Asset;
  isActive: boolean;
  width?: number;
  height?: number;
  thumbnail?: boolean;
}

export const PostAsset = ({
  asset,
  isActive,
  width,
  height,
  thumbnail = false,
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  return asset.type === MediaType.IMAGE ? (
    <LightboxImage
      source={asset.uri}
      imageStyle={{
        width: width || screenWidth,
        height: height || screenWidth,
      }}
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
  );
};
