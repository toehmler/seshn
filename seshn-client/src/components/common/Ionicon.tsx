import { IIconProps, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Ionicon = (props: IIconProps) => {
  return <Icon as={Ionicons} {...props} />;
};
