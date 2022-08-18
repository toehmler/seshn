import { MapButton } from '@/components';
import { useAppDispatch } from '@/hooks';
import { addSession, resetSession } from '@/redux';
import { InProgressSession } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { RefObject } from 'react';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  mapRef: RefObject<MapView>;
  session: InProgressSession;
}

export const ReviewMapControls = ({ mapRef, session }: Props) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const { bottom } = useSafeAreaInsets();

  const saveSession = async (currSession: InProgressSession) => {
    const snapshot = await mapRef.current?.takeSnapshot({});
    dispatch(
      addSession({
        ...currSession,
        id: `${currSession.startTimestamp}`,
        userId: '0',
        assets: [],
        mapUri: snapshot,
      })
    );
  };

  return (
    <>
      <MapButton
        colorScheme="green"
        label="Save Session"
        placement="bottom-right"
        onPress={async () => {
          if (session) {
            await saveSession(session);
          }
          dispatch(resetSession());
          navigation.goBack();
        }}
        bottom={bottom}
      />
      <MapButton
        colorScheme="red"
        label="Cancel"
        placement="bottom-left"
        onPress={() => navigation.goBack()}
        bottom={bottom}
      />
    </>
  );
};
