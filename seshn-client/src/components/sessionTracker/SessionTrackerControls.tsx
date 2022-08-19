import { formatTimeSinceStart, getCurrentLocation } from '@/helpers';
import { useActionSheet, useAppDispatch } from '@/hooks';
import {
  resetSession,
  resumeTracking,
  startTracking,
  stopTracking,
} from '@/redux';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapButton } from './MapButton';

interface Props {
  tracking: boolean;
  duration: number;
}

export const SessionTrackerControls = ({ tracking, duration }: Props) => {
  const { bottom, top } = useSafeAreaInsets();

  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const handleReset = useActionSheet(
    [
      {
        text: 'Reset Session',
        action: () => dispatch(resetSession()),
        destructive: true,
      },
    ],
    {
      title: 'Are you sure you want to reset your session?',
      message: "The current session won't be saved.",
    }
  );

  const handleSave = async () => {
    dispatch(stopTracking());
    navigation.navigate('ReviewMap');
  };

  const toggleTrackingState = async () => {
    if (tracking) {
      dispatch(stopTracking());
    } else if (duration === 0) {
      const currentLocation = await getCurrentLocation();
      dispatch(
        startTracking({
          startTimestamp: Date.now(),
          location: currentLocation,
          path: [],
        })
      );
    } else {
      dispatch(resumeTracking());
    }
  };

  return (
    <>
      <Box
        position="absolute"
        top={top}
        alignSelf="center"
        bgColor="black"
        px={2}
        py={1}
        borderRadius={12}
      >
        <Text
          color="white"
          fontSize={17}
          style={{ fontVariant: ['tabular-nums'] }}
        >
          {formatTimeSinceStart(duration)}
        </Text>
      </Box>
      <MapButton
        colorScheme={tracking ? 'red' : 'green'}
        label={tracking ? 'Stop' : duration > 0 ? 'Resume' : 'Start'}
        placement="bottom-right"
        onPress={toggleTrackingState}
        bottom={bottom}
        iconName={tracking ? 'stop' : 'play'}
      />
      <MapButton
        colorScheme="primary"
        label="Save"
        onPress={handleSave}
        alignSelf="flex-end"
        right={width / 2 - 50}
        bottom={bottom}
        disabled={duration === 0}
        iconName="save"
      />
      <MapButton
        colorScheme="red"
        label="Reset"
        placement="bottom-left"
        onPress={handleReset}
        bottom={bottom}
        disabled={duration === 0}
        iconName="trash"
      />
    </>
  );
};
