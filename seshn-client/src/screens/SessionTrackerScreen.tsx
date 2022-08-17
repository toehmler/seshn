import { Map, SessionControls } from '@/components';
import { useRef } from 'react';
import MapView from 'react-native-maps';

export const SessionTrackerScreen = () => {
  const mapRef = useRef<MapView>(null);

  return (
    <>
      <Map mapRef={mapRef} />
      <SessionControls mapRef={mapRef} />
    </>
  );
};
