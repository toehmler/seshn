import { Fab } from 'native-base';
import { Ionicon } from '../common';

interface Props {
  onPress: () => void;
}

export const NewPostButton = ({ onPress }: Props) => {
  return (
    <Fab
      onPress={onPress}
      icon={<Ionicon name="add" size="2xl" />}
      accessibilityLabel="new post"
      renderInPortal={false}
      shadow={9}
    />
  );
};
