import { SPORT_COLORS } from '@/constants';
import { Sport } from '@/types';
import { Badge } from 'native-base';

interface Props {
  sport: Sport;
}

export const SportBadge = ({ sport }: Props) => {
  return (
    <Badge
      bg={`${SPORT_COLORS[sport]}.500`}
      variant="subtle"
      _text={{ color: 'white', fontSize: 15 }}
      borderRadius={8}
      size="2xl"
    >
      {sport}
    </Badge>
  );
};
