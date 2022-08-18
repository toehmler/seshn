import { SessionControls, SessionTrackerMap } from '@/components';
import { getCurrentLocation } from '@/helpers';
import { useEffect, useState } from 'react';

export const SessionTrackerScreen = () => {
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
      <SessionTrackerMap initialCoords={initialCoords} />
      <SessionControls />
    </>
  );
};
