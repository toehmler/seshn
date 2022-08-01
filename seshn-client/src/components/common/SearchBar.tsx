import { IInputProps, Input, useColorModeValue } from 'native-base';
import { Ionicon } from './Ionicon';

interface Props extends IInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm, ...rest }: Props) => {
  return (
    <Input
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
      placeholder="Search people, sport, location..."
      placeholderTextColor={useColorModeValue('gray.500', 'gray.400')}
      variant="filled"
      borderRadius="full"
      px={2}
      size="lg"
      clearButtonMode="always"
      InputLeftElement={
        <Ionicon
          name="search"
          ml={2}
          size={4}
          color={useColorModeValue('gray.600', 'gray.300')}
        />
      }
      autoFocus
      {...rest}
    />
  );
};
