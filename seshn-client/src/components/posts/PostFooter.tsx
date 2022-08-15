import { HStack, IconButton, Text, useColorModeValue } from 'native-base';
import { triggerHaptics } from '@/helpers';
import { useBoolean } from '@/hooks';
import { Ionicon } from '../common';

interface Props {
  activeSlideIndex: number;
  numAssets: number;
  numLikes: number;
}

export const PostFooter = ({
  activeSlideIndex,
  numAssets,
  numLikes,
}: Props) => {
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
      <Text
        fontWeight="bold"
        fontSize={20}
        color={useColorModeValue('coolGray.500', 'coolGray.400')}
      >
        {activeSlideIndex + 1}/{numAssets}
      </Text>
    </HStack>
  );
};
