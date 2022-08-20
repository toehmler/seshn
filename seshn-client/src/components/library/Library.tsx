import { Session } from '@/types';
import { Divider, FlatList } from 'native-base';
import { SessionLibraryPreview } from './SessionLibraryPreview';

interface Props {
  sessions: Session[];
}

export const Library = ({ sessions }: Props) => {
  return (
    <FlatList
      data={sessions}
      renderItem={({ item }) => (
        <SessionLibraryPreview key={item.id} session={item} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Divider my={2} />}
      width="100%"
    />
  );
};
