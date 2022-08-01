import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from '../common';

export const ProfileSettingsButton = () => {
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="settings-outline"
      onPress={() => navigation.navigate('Settings')}
      accessibilityLabel="settings"
    />
  );
};
