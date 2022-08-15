import { Asset, MediaType } from '@/types';
import { useWindowDimensions } from 'react-native';
import { LightboxImage, Video } from '../common';

interface Props {
  asset: Asset;
  isActive: boolean;
}

export const PostAsset = ({ asset, isActive }: Props) => {
  const { width } = useWindowDimensions();

  return asset.type === MediaType.IMAGE ? (
    <LightboxImage source={asset.uri} imageStyle={{ width, height: width }} />
  ) : (
    <Video
      source={asset.uri}
      width={width}
      height={width}
      paused={!isActive}
      id={asset.id}
    />
  );
};
