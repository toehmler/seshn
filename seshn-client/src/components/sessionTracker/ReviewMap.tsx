import { Location } from '@/types';
import { Circle } from 'native-base';
import { RefObject } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

interface Props {
  mapRef: RefObject<MapView>;
  region: Region;
  path: Location[];
}

export const ReviewMap = ({ mapRef, region, path }: Props) => {
  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      initialRegion={region}
      showsUserLocation={false}
      followsUserLocation={false}
      loadingEnabled
    >
      <Polyline coordinates={path} strokeColor="red" strokeWidth={3} />
      <Marker coordinate={path[0]}>
        <Circle bgColor="white" size="5" borderColor="black" borderWidth={1} />
      </Marker>
      <Marker coordinate={path[path.length - 1]}>
        <Circle bgColor="black" size="5">
          <Circle
            bgColor="transparent"
            borderColor="white"
            borderWidth={1}
            size="4"
          />
        </Circle>
      </Marker>
    </MapView>
  );
};
