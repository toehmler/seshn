import {
  calculateRegionFromCoordinates,
  formatTimeSinceStart,
  getCurrentLocation,
} from '@/helpers';
import {
  useActionSheet,
  useAppDispatch,
  useAppSelector,
  useInterval,
} from '@/hooks';
import {
  resetSession,
  resumeTracking,
  startTracking,
  stopTracking,
  updateDuration,
} from '@/redux';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapButton } from './MapButton';

export const SessionControls = () => {
  const { bottom, top } = useSafeAreaInsets();

  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const { tracking, duration, currentSession } = useAppSelector(
    (state) => state.session
  );

  const dispatch = useAppDispatch();

  useInterval(() => dispatch(updateDuration(10)), tracking ? 10 : null);

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
    const currentLocation = await getCurrentLocation();
    const region = calculateRegionFromCoordinates(
      currentSession?.path || []
    ) || {
      ...currentLocation,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    navigation.navigate('ReviewMap', { region });
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
        label={
          tracking ? 'Stop Session' : duration > 0 ? 'Resume' : 'Start Session'
        }
        placement="bottom-left"
        onPress={toggleTrackingState}
        bottom={bottom}
      />
      <MapButton
        colorScheme="primary"
        label="Save Session"
        onPress={handleSave}
        alignSelf="flex-end"
        right={width / 2 - 55}
        bottom={bottom}
        disabled={duration === 0}
      />
      <MapButton
        colorScheme="red"
        label="Reset"
        placement="bottom-right"
        onPress={handleReset}
        bottom={bottom}
        disabled={duration === 0}
      />
    </>
  );
};
