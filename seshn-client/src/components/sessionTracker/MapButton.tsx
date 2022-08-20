import { Fab, IFabProps } from 'native-base';
import { Ionicon } from '../common';

interface Props extends IFabProps {
  iconName: string;
}

export const MapButton = ({
  label,
  colorScheme,
  onPress,
  placement,
  iconName,
  ...rest
}: Props) => {
  return (
    <Fab
      label={label}
      colorScheme={colorScheme}
      onPress={onPress}
      placement={placement}
      p={3}
      w={100}
      renderInPortal={false}
      shadow={5}
      icon={<Ionicon name={iconName} />}
      {...rest}
    />
  );
};
