import { ReviewMap, ReviewMapControls } from '@/components';
import { useAppSelector } from '@/hooks';
import { SessionTrackerStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useRef } from 'react';
import MapView from 'react-native-maps';

interface Props
  extends StackScreenProps<SessionTrackerStackParamList, 'ReviewMap'> {}

export const ReviewMapScreen = ({ route }: Props) => {
  const { region } = route.params;

  const { currentSession } = useAppSelector((state) => state.session);

  const mapRef = useRef<MapView>(null);

  return (
    <>
      <ReviewMap
        mapRef={mapRef}
        region={region}
        path={currentSession?.path || []}
      />
      {currentSession && (
        <ReviewMapControls mapRef={mapRef} session={currentSession} />
      )}
    </>
  );
};
