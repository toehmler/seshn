import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from './HeaderButton';

export const CloseButton = () => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="close"
      onPress={() => navigation.goBack()}
      accessibilityLabel="close"
    />
  );
};
