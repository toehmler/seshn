import { formatTimeSinceStart, getCurrentLocation } from '@/helpers';
import {
  useActionSheet,
  useAppDispatch,
  useAppSelector,
  useInterval,
} from '@/hooks';
import {
  addSession,
  resetSession,
  resumeTracking,
  startTracking,
  stopTracking,
  toggleShowUser,
  updateDuration,
} from '@/redux';
import { InProgressSession } from '@/types';
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

  const { tracking, duration, currentSession, startTimestamp, showUser } =
    useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();

  useInterval(() => dispatch(updateDuration(10)), tracking ? 10 : null);

  const saveSession = async (partialSession: InProgressSession) => {
    const snapshot = await mapRef.current?.takeSnapshot({});
    dispatch(
      addSession({
        ...partialSession,
        timestamp: startTimestamp || Date.now(),
        id: `${startTimestamp}`,
        userId: '0',
        assets: [],
        mapUri: snapshot,
      })
    );
  };

  const handleReset = useActionSheet(
    [
      {
        text: 'Save and reset',
        action: async () => {
          dispatch(toggleShowUser());
          if (currentSession) {
            await saveSession(currentSession);
          }
          dispatch(toggleShowUser());
          dispatch(resetSession());
        },
      },
      {
        text: 'Reset without saving',
        action: () => dispatch(resetSession()),
        destructive: true,
      },
    ],
    {
      title: 'Are you sure you want to reset your session?',
      message: "The current session won't be saved",
    }
  );

  const toggleTrackingState = async () => {
    const currentLocation = await getCurrentLocation();
    const currentAddress = await mapRef.current?.addressForCoordinate(
      currentLocation
    );
    if (tracking) {
      dispatch(stopTracking());
    } else if (duration === 0 && currentAddress) {
      dispatch(
        startTracking({
          location: currentLocation,
          address: currentAddress,
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
        label="Reset"
        placement="bottom-right"
        onPress={handleReset}
        bottom={bottom}
        disabled={duration === 0}
      />
    </>
  );
};
