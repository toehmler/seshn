import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from '../common';

export const SearchButton = () => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="search"
      onPress={() => navigation.navigate('Search')}
      accessibilityLabel="search"
    />
  );
};
