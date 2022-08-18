import { Session } from '@/types';
import { FlatList, Image } from 'native-base';
import { useWindowDimensions } from 'react-native';

interface Props {
  sessions: Session[];
}

export const Library = ({ sessions }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      data={sessions}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.mapUri }}
          alt="map"
          width={width}
          height={width}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
