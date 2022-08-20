import { SessionTrackerControls, SessionTrackerMap } from '@/components';
import { getCurrentLocation } from '@/helpers';
import { useAppDispatch, useAppSelector, useInterval } from '@/hooks';
import { updateDuration } from '@/redux';
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

  const { currentSession, tracking, duration } = useAppSelector(
    (state) => state.session
  );

  const dispatch = useAppDispatch();

  useInterval(() => dispatch(updateDuration(10)), tracking ? 10 : null);

  return (
    <>
      <SessionTrackerMap
        initialCoords={initialCoords}
        currentSession={currentSession}
        tracking={tracking}
      />
      <SessionTrackerControls tracking={tracking} duration={duration} />
    </>
  );
};
