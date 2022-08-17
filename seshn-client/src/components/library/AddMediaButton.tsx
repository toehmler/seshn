import { Button, useColorModeValue } from 'native-base';
import { Ionicon } from '../common';

interface Props {
  onPress: () => void;
}

export const AddMediaButton = ({ onPress }: Props) => {
  const systemColor = useColorModeValue('darkText', 'lightText');

  return (
    <Button
      leftIcon={<Ionicon name="add" color={systemColor} size="xl" />}
      _pressed={{
        bg: 'primary.500:alpha.20',
      }}
      _text={{
        color: systemColor,
      }}
      onPress={onPress}
      variant="ghost"
      borderRadius="full"
      p={1}
      pr={2}
    >
      Add Sessions
    </Button>
  );
};
