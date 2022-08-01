import { Asset, AssetURI, MediaType } from '@/types';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { VESDK } from 'react-native-videoeditorsdk';

export const getAssetsFromDevice = async (
  options?: Options
): Promise<Asset[]> => {
  try {
    const assetsFromDevice = await ImagePicker.openPicker({
      multiple: true,
      maxFiles: 100,
      ...options,
    });

    const assetArray = Array.isArray(assetsFromDevice)
      ? assetsFromDevice
      : [assetsFromDevice];

    const assets = assetArray.map((asset) => ({
      type: asset.mime?.toLowerCase().startsWith('video/')
        ? MediaType.VIDEO
        : MediaType.IMAGE,
      uri: { uri: asset.path },
      id: asset?.localIdentifier || asset?.creationDate || asset.path,
    }));
    return assets;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const openVideoEditor = async (videos: AssetURI[]) => {
  try {
    // @ts-ignore
    const result = await VESDK.openEditor(videos, {
      composition: {
        personalVideoClips: false,
        categories: [
          {
            identifier: 'sessions',
            name: 'Sessions',
            items: videos.map((video, index) => ({
              identifier: `${index}`,
              videoURI: video,
            })),
          },
        ],
      },
    });
    console.log(result);
  } catch (e) {
    console.warn(e);
  }
};
