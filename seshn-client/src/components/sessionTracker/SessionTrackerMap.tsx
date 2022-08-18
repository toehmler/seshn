import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPathPoint } from '@/redux';
import { Location } from '@/types';
import { useColorModeValue, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

interface Props {
  initialCoords: Location;
}

export const SessionTrackerMap = ({ initialCoords }: Props) => {
  const { currentSession, tracking } = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
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
      loadingEnabled
      loadingBackgroundColor={useColorModeValue(colors.bgLight, colors.bgDark)}
      onUserLocationChange={({ nativeEvent }) => {
        if (tracking && nativeEvent?.coordinate) {
          const { latitude, longitude } = nativeEvent.coordinate;
          dispatch(addPathPoint({ latitude, longitude }));
        }
      }}
    >
      <Polyline
        coordinates={currentSession?.path || []}
        strokeColor="red"
        strokeWidth={3}
      />
    </MapView>
  );
};
