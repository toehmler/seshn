import { HeaderButton } from '../common';

interface Props {
  onPress: () => void;
}

export const FeedOptionsButton = ({ onPress }: Props) => {
  return (
    <HeaderButton
      name="options-outline"
      onPress={onPress}
      accessibilityLabel="feed options"
    />
  );
};
