import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from './HeaderButton';

export const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="chevron-back"
      onPress={() => navigation.goBack()}
      accessibilityLabel="go back"
    />
  );
};
