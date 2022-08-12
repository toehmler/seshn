import { Ionicon, MainLayout, PostCarousel, Spacer } from '@/components';
import { BaseStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { HStack, IconButton, StatusBar, Text } from 'native-base';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<BaseStackParamList, 'Post'> {}

export const PostScreen = ({ navigation, route }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    route.params.initialIndex
  );

  const { left } = useSafeAreaInsets();

  return (
    <MainLayout backgroundColor="black" centered={false} safeAreaTop>
      <StatusBar barStyle="light-content" />
      <HStack alignItems="center" justifyContent="center">
        <IconButton
          icon={<Ionicon name="close" color="lightText" size="xl" />}
          borderRadius="full"
          _pressed={{
            bg: 'gray.200:alpha.50',
          }}
          onPress={() => navigation.goBack()}
          accessibilityLabel="close"
          position="absolute"
          left={left}
          ml={2}
          p={1}
        />
        <Text color="lightText" fontWeight="bold" fontSize={18}>
          {activeSlideIndex + 1} of {route.params.assets.length}
        </Text>
      </HStack>
      <Spacer size={20} />
      <PostCarousel
        assets={route.params.assets}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
    </MainLayout>
  );
};
