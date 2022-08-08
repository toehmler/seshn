import { formatTimeSinceStart, now } from '@/helpers';
import { useInterval } from '@/hooks';
import { Box, Fab, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  setTracking: (val: boolean) => void;
}

export const SessionControls = ({ setTracking }: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  const [delay, setDelay] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useInterval(() => setTime((t) => t + (delay || 0)), delay);

  useEffect(() => {
    setTracking(!!delay);
  }, [delay]);

  const calculateSessionDuration = (start: number) => {
    return formatTimeSinceStart(start);
  };

  return (
    <>
      <Box
        position="absolute"
        bottom={bottom}
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
          {calculateSessionDuration(time)}
        </Text>
      </Box>

      <Fab
        renderInPortal={false}
        colorScheme={delay ? 'red' : 'green'}
        label={delay ? 'Stop Session' : 'Start Session'}
        shadow={5}
        placement="top-right"
        top={top}
        onPress={() => {
          if (delay) {
            setDelay(null);
          } else {
            setTime(0);
            setDelay(10);
          }
        }}
      />
    </>
  );
};
