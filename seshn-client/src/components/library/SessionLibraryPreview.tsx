import { formatTimestamp } from '@/helpers';
import { Session } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { HStack, Heading, Text, VStack } from 'native-base';
import { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { Map } from '../common';

interface Props {
  session: Session;
}

export const SessionLibraryPreview = ({ session }: Props) => {
  const navigation = useNavigation();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (session.path) {
      mapRef?.current?.fitToCoordinates(session.path, {
        edgePadding: { top: 20, right: 20, bottom: 20, left: 20 },
        animated: false,
      });
    }
  }, [session.path, mapRef]);

  return (
    <HStack w="100%" space={4}>
      {session.map && (
        <Map
          cacheEnabled
          ref={mapRef}
          style={{ height: 150, width: 150 }}
          onPress={() =>
            navigation.navigate('Map', { path: session.map?.path })
          }
          path={session.map?.path}
          showPath
          showMarkers
          pathPressEnabled={false}
          markerPressEnabled={false}
        />
      )}
      <VStack justifyContent="space-evenly" flex={1} pr={2}>
        <Heading>
          {session.address?.locality}, {session.address?.administrativeArea}
        </Heading>
        <Text>{formatTimestamp(session.startTimestamp)}</Text>
      </VStack>
    </HStack>
  );
};
