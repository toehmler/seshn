import { Asset, MediaType } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Divider, FlatList, useColorModeValue } from 'native-base';
import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { AssetTile } from './AssetTile';
import { SingleAssetPost } from './SingleAssetPost';

interface Props {
  assets: Asset[];
}

/*
  calculates the number of columns for a post
  based on the presence of a video and the total number of assets
*/
const getNumColumns = (numAssets: number, hasVideo: boolean) => {
  switch (numAssets) {
    case 1:
      return 1;
    case 2:
      return hasVideo ? 1 : 2;
    case 3:
      return 2;
    default:
      return hasVideo ? 3 : 2;
  }
};

/*
  calculates dimensions and borderWidths for a tile
  based on the presence of a video and the total number of assets
*/
const getTileProps = (
  numAssets: number,
  hasVideo: boolean,
  screenWidth: number,
  index: number
) => {
  switch (numAssets) {
    case 1:
      return { height: screenWidth, width: screenWidth };
    case 2:
      return {
        height: hasVideo ? screenWidth / 2 : screenWidth,
        width: hasVideo ? screenWidth : screenWidth / 2,
        borderLeftWidth: !hasVideo && index === 1 ? 2 : 0,
        borderRightWidth: !hasVideo && index === 0 ? 2 : 0,
      };
    case 3:
      return {
        height: screenWidth / 2,
        width: index === 2 ? screenWidth : screenWidth / 2,
        borderLeftWidth: index === 1 ? 2 : 0,
        borderRightWidth: index === 0 ? 2 : 0,
        borderBottomWidth: hasVideo ? 0 : [0, 1].includes(index) ? 4 : 0,
      };
    default:
      return {
        height: hasVideo ? screenWidth / 3 : screenWidth / 2,
        width: hasVideo ? screenWidth / 3 : screenWidth / 2,
        borderLeftWidth: (hasVideo ? [1, 2] : [1, 3]).includes(index) ? 2 : 0,
        borderRightWidth: (hasVideo ? [0, 1] : [0, 2]).includes(index) ? 2 : 0,
        borderBottomWidth: hasVideo ? 0 : [0, 1].includes(index) ? 4 : 0,
      };
  }
};

export const PostAssetContainer = ({ assets }: Props) => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const backgroundColor = useColorModeValue('bgLight', 'bgDark');

  const video = assets.find(({ type }) => type === MediaType.VIDEO);
  const hasVideo = !!video;

  const imageAssets = assets.filter(({ type }) => type === MediaType.IMAGE);

  const rearrangedAssets = hasVideo ? [video, ...imageAssets] : assets;

  // always include full-width video at top of post if one exists
  const PostVideo = useCallback(
    () =>
      hasVideo ? (
        <AssetTile
          asset={rearrangedAssets[0]}
          index={0}
          allAssets={rearrangedAssets}
          height={hasVideo ? width / 2 : width}
          width={hasVideo ? width : width / 2}
          borderBottomWidth={8}
        />
      ) : null,
    [hasVideo, width, navigation] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return assets.length === 1 ? (
    <SingleAssetPost asset={assets[0]} />
  ) : (
    <FlatList
      data={imageAssets.slice(0, hasVideo ? 3 : 4)}
      keyExtractor={(item) => item.id}
      numColumns={getNumColumns(assets.length, hasVideo)}
      ItemSeparatorComponent={() => (
        <Divider thickness={2} bg={backgroundColor} />
      )}
      renderItem={({ item, index }) => (
        <AssetTile
          asset={item}
          index={hasVideo ? index + 1 : index}
          allAssets={rearrangedAssets}
          {...getTileProps(assets.length, hasVideo, width, index)}
          additionalAssets={
            assets.length > 4 && index === (hasVideo ? 2 : 3)
              ? rearrangedAssets.length - 3
              : 0
          }
        />
      )}
      ListHeaderComponent={PostVideo}
    />
  );
};
