import { Fab, IFabProps } from 'native-base';

interface Props extends IFabProps {}

export const MapButton = ({
  label,
  colorScheme,
  onPress,
  placement,
  ...rest
}: Props) => {
  return (
    <Fab
      label={label}
      colorScheme={colorScheme}
      onPress={onPress}
      placement={placement}
      p={3}
      w={110}
      renderInPortal={false}
      shadow={5}
      {...rest}
    />
  );
};
