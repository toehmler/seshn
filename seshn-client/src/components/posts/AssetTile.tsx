import { Asset } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Pressable, useColorModeValue } from 'native-base';
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
    >
      <PostAsset asset={asset} height={height} width={width} />
      {additionalAssets > 0 && (
        <MoreImagesOverlay
          height={height}
          width={width}
          number={additionalAssets}
        />
      )}
    </Pressable>
  );
};
