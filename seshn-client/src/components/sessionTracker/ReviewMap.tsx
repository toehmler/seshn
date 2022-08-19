import { Location } from '@/types';
import { RefObject, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Map } from '@/components';

interface Props {
  mapRef: RefObject<MapView>;
  path: Location[];
}

export const ReviewMap = ({ mapRef, path }: Props) => {
  useEffect(() => {
    mapRef.current?.fitToCoordinates(path, {
      edgePadding: { top: 30, right: 50, bottom: 100, left: 50 },
      animated: false,
    });
  }, [mapRef, path]);

  return (
    <Map
      ref={mapRef}
      showsUserLocation={false}
      followsUserLocation={false}
      showPath
      path={path}
      showMarkers
    />
  );
};
