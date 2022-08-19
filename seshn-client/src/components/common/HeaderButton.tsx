import { IIconButtonProps, IconButton, useColorModeValue } from 'native-base';
import { Ionicon } from './Ionicon';

interface Props extends IIconButtonProps {
  name: string;
  color?: string;
  onPress?: () => void;
}

export const HeaderButton = ({
  name,
  color,
  onPress = () => null,
  ...rest
}: Props) => {
  const systemColor = useColorModeValue('black', 'white');

  return (
    <IconButton
      icon={<Ionicon name={name} color={color || systemColor} size="xl" />}
      borderRadius="full"
      _pressed={{
        bg: `${color || systemColor}:alpha.20`,
      }}
      onPress={onPress}
      {...rest}
    />
  );
};
