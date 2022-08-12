import { Asset } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Box, FlatList, Pressable, Text, useColorModeValue } from 'native-base';
import { Dimensions } from 'react-native';
import { PostAsset } from './PostAsset';

interface Props {
  assets: Asset[];
}

const { width: fullWidth } = Dimensions.get('screen');

// need to be careful to account for border widths
const widthAccountingForBorders = fullWidth - 2;
const halfWidth = widthAccountingForBorders / 2;

const getDimensionProps = (numAssets: number, isLastVisibleAsset: boolean) => {
  if (isLastVisibleAsset) {
    return {
      width: fullWidth,
      height: halfWidth,
    };
  } else if (numAssets === 1) {
    return {
      width: fullWidth,
      height: widthAccountingForBorders,
    };
  } else if (numAssets === 2) {
    return {
      width: halfWidth,
      height: widthAccountingForBorders,
    };
  } else {
    return {
      width: halfWidth,
      height: halfWidth,
    };
  }
};

const getBorderProps = (index: number, isFullWidth: boolean) => {
  if (isFullWidth) {
    return {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    };
  } else if (index % 2) {
    return {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 0,
    };
  } else {
    return {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 1,
    };
  }
};

export const PostAssetContainer = ({ assets }: Props) => {
  const borderColor = useColorModeValue('bgLight', 'bgDark');

  const navigation = useNavigation();

  const wideAsset: Asset | null =
    assets.length === 3 ? assets[assets.length - 1] : null;

  const visibleAssets = assets.slice(0, 4);

  const lastVisibleAsset = assets.length > 3 ? assets[3] : null;

  return (
    <FlatList
      data={visibleAssets}
      numColumns={2}
      renderItem={({ item, index }) => (
        <Pressable
          borderColor={borderColor}
          {...getBorderProps(
            index,
            assets.length === 1 || item.id === wideAsset?.id
          )}
          onPress={() =>
            navigation.navigate('Post', { assets, initialIndex: index })
          }
        >
          <PostAsset
            asset={item}
            {...getDimensionProps(assets.length, item.id === wideAsset?.id)}
            thumbnail={item.id === lastVisibleAsset?.id}
          />
          {item.id === lastVisibleAsset?.id && (
            <Box
              w={fullWidth / 2}
              h={fullWidth / 2}
              backgroundColor="black:alpha.50"
              position="absolute"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="lightText" fontSize={24} fontWeight="bold">
                + {assets.length - 3}
              </Text>
            </Box>
          )}
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
