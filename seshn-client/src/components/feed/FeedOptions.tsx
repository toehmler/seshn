import { Actionsheet, Box, IActionsheetProps, VStack } from 'native-base';
import { OptionsRadio } from './OptionsRadio';
import { SportSelector } from './SportSelector';

interface Props extends IActionsheetProps {
  isOpen: boolean;
  close: () => void;
}

export const FeedOptions = ({ isOpen, close }: Props) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={close}>
      <Actionsheet.Content
        _dragIndicator={{ bg: 'primary.500' }}
        _dark={{ borderColor: 'gray.500', borderTopWidth: 1 }}
      >
        <Box pt={5}>
          <VStack space={5} px={4}>
            <OptionsRadio />
            <SportSelector />
          </VStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
