import { Sport } from '@/types';
import { HStack, Heading } from 'native-base';
import { SportBadge } from '../common';

interface Props {
  title: string;
  sports: Sport[];
}

export const PostHeader = ({ title, sports }: Props) => {
  return (
    <HStack justifyContent="space-between" px={5} alignItems="center">
      <Heading>{title}</Heading>
      <HStack space={3}>
        {sports.map((sport) => (
          <SportBadge key={sport} sport={sport} />
        ))}
      </HStack>
    </HStack>
  );
};
