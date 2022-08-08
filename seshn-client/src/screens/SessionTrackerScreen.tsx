import { Map, SessionControls } from '@/components';
import { useState } from 'react';

export const SessionTrackerScreen = () => {
  const [tracking, setTracking] = useState(false);

  return (
    <>
      <Map tracking={tracking} />
      <SessionControls setTracking={setTracking} />
    </>
  );
};
