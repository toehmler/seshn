import { User } from '@/types';
import { Box, HStack, Heading, Skeleton, VStack } from 'native-base';
import { SportBadge } from '../common';
import { UserAvatar } from './UserAvatar';

interface Props {
  user?: User;
}

export const ProfileInfo = ({ user }: Props) => {
  return (
    <VStack alignItems="center" space={5} pb={10}>
      <UserAvatar user={user} />
      <Skeleton isLoaded={!!user} startColor="gray.500" rounded="full">
        <Heading size="xl">{user?.name}</Heading>
      </Skeleton>
      <Skeleton startColor="gray.500" rounded="full" isLoaded={!!user}>
        <HStack flexWrap="wrap" w="4/5">
          {user?.sports.map((sport) => (
            <Box key={sport} m={1}>
              <SportBadge sport={sport} />
            </Box>
          ))}
        </HStack>
      </Skeleton>
    </VStack>
  );
};
