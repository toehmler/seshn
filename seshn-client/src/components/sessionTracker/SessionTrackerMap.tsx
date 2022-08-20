import { useAppDispatch } from '@/hooks';
import { addPathPoint } from '@/redux';
import { InProgressSession, Location } from '@/types';
import { useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { Ionicon, Map } from '@/components';
import { IconButton, useColorModeValue } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  initialCoords: Location;
  currentSession?: InProgressSession;
  tracking: boolean;
}

export const SessionTrackerMap = ({
  initialCoords,
  currentSession,
  tracking,
}: Props) => {
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapView>(null);

  const [userLocation, setUserLocation] = useState(initialCoords);

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Map
        ref={mapRef}
        region={{
          ...initialCoords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        zoomEnabled={!tracking}
        rotateEnabled={!tracking}
        scrollEnabled={!tracking}
        followsUserLocation={tracking}
        onUserLocationChange={({ nativeEvent }) => {
          if (nativeEvent?.coordinate) {
            const { latitude, longitude } = nativeEvent.coordinate;
            setUserLocation({ latitude, longitude });
            if (tracking) {
              dispatch(addPathPoint({ latitude, longitude }));
            }
          }
        }}
        showPath
        path={currentSession?.path}
        pathPressEnabled={!tracking}
      />
      <IconButton
        icon={
          <Ionicon
            name="locate"
            color={useColorModeValue('primary.500', 'primary.300')}
          />
        }
        size="md"
        position="absolute"
        borderRadius="full"
        bgColor={useColorModeValue('gray.100', 'gray.600')}
        bottom={bottom * 3}
        right={5}
        _pressed={{
          bgColor: useColorModeValue('gray.200', 'gray.500'),
        }}
        onPress={() =>
          mapRef.current?.animateToRegion({
            ...userLocation,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
          })
        }
        shadow={5}
      />
    </>
  );
};
