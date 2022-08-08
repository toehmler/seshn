import { MainLayout } from '@/components';
import { login } from '@/helpers';
import { useAppDispatch } from '@/hooks';
import { setAccessToken } from '@/redux';
import {
  Button,
  Center,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from 'native-base';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setAccessToken('a'));
    // login((accessToken) => {
    //   dispatch(setAccessToken(accessToken));
    //   console.log(accessToken);
    // });
  };

  return (
    <MainLayout>
      <VStack w="90%" maxW="290" space={10}>
        <Center>
          <Heading
            size="lg"
            fontWeight="600"
            color={useColorModeValue('coolGray.800', 'warmGray.50')}
          >
            Welcome to <Text color="primary.500">SESHN</Text>
          </Heading>
        </Center>
        <Button mt={2} colorScheme="primary" onPress={handleLogin}>
          Sign in
        </Button>
      </VStack>
    </MainLayout>
  );
};
