import { Asset, MediaType } from '@/types';
import { Image } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { ResizeMode } from 'react-native-fast-image';
import { LightboxImage, Video } from '../common';

interface Props {
  asset: Asset;
  isActive?: boolean;
  width?: number;
  height?: number;
  thumbnail?: boolean;
  resizeMode?: ResizeMode;
  zoomable?: boolean;
}

export const PostAsset = ({
  asset,
  isActive = false,
  width,
  height,
  thumbnail = false,
  resizeMode = 'cover',
  zoomable = false,
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  return asset.type === MediaType.IMAGE ? (
    zoomable ? (
      <LightboxImage
        source={asset.uri}
        imageStyle={{
          width: width || screenWidth,
          height: height || screenWidth,
        }}
      />
    ) : (
      <Image
        source={asset.uri}
        w={width || screenWidth}
        h={height || screenWidth}
        alt="image"
        resizeMode={resizeMode}
      />
    )
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
