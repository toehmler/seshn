import { HStack, IconButton, Text } from 'native-base';
import { triggerHaptics } from '@/helpers';
import { useBoolean } from '@/hooks';
import { Ionicon } from '../common';

interface Props {
  numLikes: number;
}

export const PostFooter = ({ numLikes }: Props) => {
  const [liked, setLiked] = useBoolean();

  const handleLike = () => {
    setLiked.toggle();
    triggerHaptics('selection');
  };

  return (
    <HStack justifyContent="space-between" alignItems="center" px={5} h={8}>
      <HStack alignItems="center">
        <IconButton
          icon={
            <Ionicon
              name={`heart${!liked ? '-outline' : ''}`}
              size="2xl"
              color="primary.500"
            />
          }
          onPress={handleLike}
          borderRadius="full"
          bgColor="transparent"
          accessibilityLabel={liked ? 'Post has been liked' : 'Like post'}
        />
        <Text>{numLikes}</Text>
      </HStack>
      <IconButton
        icon={<Ionicon name="chatbox-outline" size="2xl" color="gray.500" />}
        onPress={() => null}
        borderRadius="full"
        bgColor="transparent"
        accessibilityLabel="comment"
      />
    </HStack>
  );
};
