import { formatTimeSinceStart } from '@/helpers';
import {
  useActionSheet,
  useAppDispatch,
  useAppSelector,
  useInterval,
} from '@/hooks';
import {
  resetSession,
  startTracking,
  stopTracking,
  updateDuration,
} from '@/redux';
import { Box, Text } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapButton } from './MapButton';

export const SessionControls = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { tracking, duration } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  useInterval(() => dispatch(updateDuration(10)), tracking ? 10 : null);

  const handleReset = useActionSheet(
    [
      {
        text: 'Save and reset',
        action: () => dispatch(resetSession()),
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
        onPress={() => dispatch((tracking ? stopTracking : startTracking)())}
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
