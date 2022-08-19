import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from './HeaderButton';

interface Props {
  color?: string;
}

export const GoBackButton = ({ color }: Props) => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="chevron-back"
      onPress={() => navigation.goBack()}
      accessibilityLabel="go back"
      color={color}
    />
  );
};
