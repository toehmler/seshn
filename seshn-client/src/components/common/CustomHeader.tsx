import {
  Header,
  HeaderOptions,
  getHeaderTitle,
} from '@react-navigation/elements';
import { useColorModeValue, useTheme } from 'native-base';

interface Props {
  options: HeaderOptions;
}

export const CustomHeader = ({ options }: Props) => {
  const { colors } = useTheme();

  return (
    <Header
      title={getHeaderTitle(options, 'Header')}
      headerStyle={{
        backgroundColor: useColorModeValue(colors.bgLight, colors.bgDark),
      }}
      headerTitleStyle={{
        color: useColorModeValue(colors.black, colors.white),
        fontSize: 20,
        fontWeight: 'bold',
      }}
      headerLeftContainerStyle={{
        paddingLeft: 5,
        paddingBottom: 5,
      }}
      headerRightContainerStyle={{
        paddingRight: 5,
        paddingBottom: 5,
      }}
      headerTitleContainerStyle={{
        paddingBottom: 5,
      }}
      {...options}
    />
  );
};
