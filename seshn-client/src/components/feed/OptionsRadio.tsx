import { useAppDispatch, useFeedOptions } from '@/hooks';
import { changeShowOnlyLikedPosts } from '@/redux';
import { HStack, Radio, Text } from 'native-base';
import { useState } from 'react';

enum FeedRadioValue {
  RECENT = 'Recent',
  LIKED = 'Liked',
}

export const OptionsRadio = () => {
  const { showOnlyLikedPosts } = useFeedOptions();

  const dispatch = useAppDispatch();

  const [radioValue, setRadioValue] = useState(
    showOnlyLikedPosts ? FeedRadioValue.LIKED : FeedRadioValue.RECENT
  );

  const onChange = (value: FeedRadioValue) => {
    setRadioValue(value);
    dispatch(changeShowOnlyLikedPosts(value === FeedRadioValue.LIKED));
  };

  return (
    <HStack space={5}>
      <Text fontSize={16}>Show posts:</Text>
      <Radio.Group
        name="Show posts"
        value={radioValue}
        accessibilityLabel="Show recent or liked posts"
        onChange={(value: string) => onChange(value as FeedRadioValue)}
      >
        {Object.values(FeedRadioValue).map((value) => (
          <Radio value={value} key={value} my={1} colorScheme="primary">
            {value}
          </Radio>
        ))}
      </Radio.Group>
    </HStack>
  );
};
