import { MapButton } from '@/components';
import { useAppDispatch } from '@/hooks';
import { addSession, resetSession } from '@/redux';
import { InProgressSession } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Alert, HStack, Pressable, Text, useToast } from 'native-base';
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

  const toast = useToast();

  const saveSession = async (currSession: InProgressSession) => {
    try {
      const snapshot = await mapRef.current?.takeSnapshot({});
      const currentAddress = await mapRef.current?.addressForCoordinate(
        currSession.location
      );
      dispatch(
        addSession({
          ...currSession,
          address: currentAddress,
          id: `${currSession.startTimestamp}`,
          userId: '0',
          assets: [],
          mapUri: snapshot,
        })
      );
      toast.show({
        placement: 'top',
        id: 'save-session-success',
        render: () => (
          <Pressable onPress={() => toast.close('save-session-success')}>
            <Alert w="100%" status="success">
              <HStack space={2}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  Session Saved!
                </Text>
              </HStack>
            </Alert>
          </Pressable>
        ),
      });
      dispatch(resetSession());
    } catch (error) {
      console.warn(error);
      toast.show({
        placement: 'top',
        id: 'save-session-error',
        render: () => (
          <Pressable onPress={() => toast.close('save-session-error')}>
            <Alert w="100%" status="error">
              <HStack space={2}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  Error saving session
                </Text>
              </HStack>
            </Alert>
          </Pressable>
        ),
      });
    }
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
