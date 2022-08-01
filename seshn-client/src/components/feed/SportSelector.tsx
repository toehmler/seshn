import { useAppDispatch, useFeedOptions } from '@/hooks';
import { changeSportFilter } from '@/redux';
import { Sport } from '@/types';
import { HStack, Select, Text } from 'native-base';

export const SportSelector = () => {
  const dispatch = useAppDispatch();
  const { sportFilter } = useFeedOptions();

  return (
    <HStack alignItems="center" space={5}>
      <Text fontSize={16}>Filter By Sport:</Text>
      <Select
        w={170}
        selectedValue={sportFilter || 'All'}
        onValueChange={(value) =>
          dispatch(
            changeSportFilter(value === 'All' ? undefined : (value as Sport))
          )
        }
        _actionSheetContent={{
          _dragIndicator: { bg: 'primary.500' },
          _dark: { borderColor: 'gray.500', borderTopWidth: 1 },
        }}
        borderColor="gray.500"
        fontSize={16}
      >
        <Select.Item
          label="All"
          value="All"
          _pressed={{ bg: 'primary.500:alpha.20' }}
        />
        {Object.values(Sport).map((value) => (
          <Select.Item
            label={value}
            value={value}
            key={value}
            _pressed={{ bg: 'primary.500:alpha.20' }}
          />
        ))}
      </Select>
    </HStack>
  );
};
