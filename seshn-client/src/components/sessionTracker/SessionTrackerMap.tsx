import { useAppDispatch } from '@/hooks';
import { addPathPoint } from '@/redux';
import { InProgressSession, Location } from '@/types';
import { useRef } from 'react';
import MapView from 'react-native-maps';
import { Map } from '@/components';

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

  return (
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
        if (tracking && nativeEvent?.coordinate) {
          const { latitude, longitude } = nativeEvent.coordinate;
          dispatch(addPathPoint({ latitude, longitude }));
        }
      }}
      showPath
      path={currentSession?.path}
      pathPressEnabled={!tracking}
    />
  );
};
