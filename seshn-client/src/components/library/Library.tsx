import { openVideoEditor, triggerHaptics } from '@/helpers';
import { Asset, MediaType } from '@/types';
import { FlatList } from 'native-base';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { AssetLibraryPreview } from './AssetLibraryPreview';
import { NewPostButton } from './NewPostButton';

interface Props {
  assets: Asset[];
}

export const Library = ({ assets }: Props) => {
  const [selected, setSelected] = useState<Asset[]>([]);

  const { width } = useWindowDimensions();

  const select = (item: Asset) => {
    if (selected.some(({ id }) => id === item.id)) {
      setSelected(selected.filter(({ id }) => id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
    triggerHaptics('selection');
  };

  return (
    <>
      <FlatList
        data={assets}
        numColumns={2}
        renderItem={({ item }) => (
          <AssetLibraryPreview
            width={width / 2}
            height={width / 2}
            source={item.uri}
            type={item.type}
            id={item.id}
            selected={selected.some(({ id }) => id === item.id)}
            toggleSelected={() => select(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {selected.length > 0 && (
        <NewPostButton
          onPress={() =>
            openVideoEditor(
              selected
                .filter(({ type }) => type === MediaType.VIDEO)
                .map(({ uri }) => uri)
            )
          }
        />
      )}
    </>
  );
};
