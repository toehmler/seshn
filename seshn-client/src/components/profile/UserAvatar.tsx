import { User } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Center, Image, Pressable, Skeleton } from 'native-base';

interface Props {
  user?: User;
  size?: number | string;
  circle?: boolean;
}

export const UserAvatar = ({ user, size = 40, circle = false }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        if (user) {
          navigation.navigate('Profile', { userId: user.id });
        }
      }}
    >
      <Skeleton
        isLoaded={!!user}
        w={circle ? size : '100%'}
        h={size}
        startColor="gray.500"
        rounded={circle ? 'full' : 0}
      >
        {circle ? (
          <Avatar
            size={size}
            source={user?.profilePic}
            bg="gray.500"
            shadow={2}
            _text={{ fontSize: size }}
          >
            {user?.name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </Avatar>
        ) : (
          <Image
            source={user?.profilePic}
            h={size}
            w="100%"
            alt={user?.name}
            ignoreFallback
            fallbackElement={
              <Center h={size} w="100%" rounded="lg" _text={{ fontSize: size }}>
                {user?.name}
              </Center>
            }
          />
        )}
      </Skeleton>
    </Pressable>
  );
};
