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
import { RefObject } from 'react';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapButton } from './MapButton';

interface Props {
  mapRef: RefObject<MapView>;
}

export const SessionControls = ({ mapRef }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const navigation = useNavigation();

  const { tracking, duration, currentSession } = useAppSelector(
    (state) => state.session
  );

  const dispatch = useAppDispatch();

  useInterval(() => dispatch(updateDuration(10)), tracking ? 10 : null);

  const handleReset = useActionSheet([
    {
      text: 'Save Session',
      action: async () => {
        const currentLocation = await getCurrentLocation();
        const region = calculateRegionFromCoordinates(
          currentSession?.path || []
        ) || {
          ...currentLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        navigation.navigate('ReviewMap', { region });
      },
    },
    {
      text: 'Reset without saving',
      action: () => dispatch(resetSession()),
      destructive: true,
    },
  ]);

  const toggleTrackingState = async () => {
    if (tracking) {
      dispatch(stopTracking());
    } else if (duration === 0) {
      const currentLocation = await getCurrentLocation();
      const currentAddress = await mapRef.current?.addressForCoordinate(
        currentLocation
      );
      if (currentAddress) {
        dispatch(
          startTracking({
            startTimestamp: Date.now(),
            location: currentLocation,
            address: currentAddress,
            path: [],
          })
        );
      }
    } else {
      dispatch(resumeTracking());
    }
  };

  return (
    <>
      <Box
        position="absolute"
        bottom={bottom + 5}
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
        colorScheme="blue"
        label="Save / Reset"
        placement="bottom-right"
        onPress={handleReset}
        bottom={bottom}
        disabled={duration === 0}
      />
    </>
  );
};
