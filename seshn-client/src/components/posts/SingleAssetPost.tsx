import { Asset, MediaType } from '@/types';
import { useWindowDimensions } from 'react-native';
import { Video } from '../common';
import { AssetTile } from './AssetTile';

interface Props {
  asset: Asset;
}

export const SingleAssetPost = ({ asset }: Props) => {
  const { width } = useWindowDimensions();

  return asset.type === MediaType.IMAGE ? (
    <AssetTile
      height={width}
      width={width}
      asset={asset}
      allAssets={[asset]}
      index={0}
    />
  ) : (
    <Video
      source={asset.uri}
      width={width}
      height={width}
      paused
      id={asset.id}
    />
  );
};
