import { MainLayout, SearchBar } from '@/components';
import { FeedStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useLayoutEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

interface Props extends StackScreenProps<FeedStackParamList, 'Search'> {}

export const SearchScreen = ({ navigation }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          w={width - 80}
          ml={-5}
        />
      ),
    });
  }, [navigation, searchTerm, setSearchTerm, width]);

  return <MainLayout centered={false} contentWidth="90%" />;
};
