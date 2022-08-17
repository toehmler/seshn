import { Asset, MediaType } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Circle, Pressable, useColorModeValue } from 'native-base';
import { Ionicon } from '../common';
import { MoreImagesOverlay } from './MoreImagesOverlay';
import { PostAsset } from './PostAsset';

interface Props {
  asset: Asset;
  index: number;
  allAssets: Asset[];
  width: number;
  height: number;
  additionalAssets?: number;
  borderRightWidth?: number;
  borderLeftWidth?: number;
  borderBottomWidth?: number;
  borderTopWidth?: number;
}

export const AssetTile = ({
  asset,
  index,
  allAssets,
  width,
  height,
  additionalAssets = 0,
  borderRightWidth = 0,
  borderLeftWidth = 0,
  borderBottomWidth = 0,
}: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      h={height}
      w={width}
      onPress={() =>
        navigation.navigate('Post', {
          assets: allAssets,
          initialIndex: index,
        })
      }
      borderTopWidth={0}
      borderBottomWidth={borderBottomWidth}
      borderLeftWidth={borderLeftWidth}
      borderRightWidth={borderRightWidth}
      borderColor={useColorModeValue('bgLight', 'bgDark')}
      justifyContent="center"
      alignItems="center"
    >
      <PostAsset asset={asset} height={height} width={width} thumbnail />
      {additionalAssets > 0 && (
        <MoreImagesOverlay
          height={height}
          width={width}
          number={additionalAssets}
        />
      )}
      {asset.type === MediaType.VIDEO && (
        <Circle position="absolute" bg="black:alpha.80" size="56px" pl="1">
          <Ionicon name="play" color="white" size="3xl" />
        </Circle>
      )}
    </Pressable>
  );
};
