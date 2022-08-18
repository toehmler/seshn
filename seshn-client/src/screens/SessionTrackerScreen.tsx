import { SessionControls, SessionTrackerMap } from '@/components';
import { getCurrentLocation } from '@/helpers';
import { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';

export const SessionTrackerScreen = () => {
  const mapRef = useRef<MapView>(null);

  const [initialCoords, setInitialCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  // get the user's current location on mount
  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      setInitialCoords(loc);
    })();
  }, []);

  return (
    <>
      <SessionTrackerMap mapRef={mapRef} initialCoords={initialCoords} />
      <SessionControls mapRef={mapRef} />
    </>
  );
};
