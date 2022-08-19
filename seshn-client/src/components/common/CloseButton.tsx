import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from './HeaderButton';
interface Props {
  color?: string;
}
export const CloseButton = ({ color }: Props) => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="close"
      onPress={() => navigation.goBack()}
      accessibilityLabel="close"
      color={color}
    />
  );
};
