import { AddMediaButton, Library, MainLayout } from '@/components';
import { useLayoutEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigation';
import { getAssetsFromDevice } from '@/helpers';
import { Asset } from '@/types';
import { useAppSelector } from '@/hooks';

interface Props extends BottomTabScreenProps<TabParamList, 'Library'> {}

export const LibraryScreen = ({ navigation }: Props) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddMediaButton
          onPress={async () => {
            const newAssets = await getAssetsFromDevice();
            setAssets(assets.concat(newAssets));
          }}
        />
      ),
    });
  }, [navigation, assets]);

  const { sessions } = useAppSelector((state) => state.library);

  return (
    <MainLayout>
      <Library sessions={sessions} />
    </MainLayout>
  );
};
