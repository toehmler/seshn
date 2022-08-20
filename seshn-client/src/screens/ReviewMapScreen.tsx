import { ReviewMap, ReviewMapControls } from '@/components';
import { useAppSelector } from '@/hooks';
import { useRef } from 'react';
import MapView from 'react-native-maps';

export const ReviewMapScreen = () => {
  const { currentSession } = useAppSelector((state) => state.session);

  const mapRef = useRef<MapView>(null);

  return (
    <>
      <ReviewMap mapRef={mapRef} path={currentSession?.path || []} />
      {currentSession && (
        <ReviewMapControls mapRef={mapRef} session={currentSession} />
      )}
    </>
  );
};
