import { formatPostDate } from '@/helpers';
import { User } from '@/types';
import { HStack, Heading } from 'native-base';
import { UserAvatar } from '../profile';

interface Props {
  user: User;
  date: string;
}

export const PostHeader = ({ user, date }: Props) => {
  return (
    <HStack justifyContent="space-between" alignItems="flex-end" px={2}>
      <UserAvatar user={user} circle size="12" />
      <Heading size="md">{formatPostDate(date)}</Heading>
    </HStack>
  );
};
