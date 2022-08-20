import { Ionicon, Map } from '@/components';
import { BaseStackParamList } from '@/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'native-base';
import { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MapScreen = ({
  route,
  navigation,
}: StackScreenProps<BaseStackParamList, 'Map'>) => {
  const { path } = route.params;

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    mapRef.current?.fitToCoordinates(path, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: false,
    });
  }, [mapRef, path]);

  const { top } = useSafeAreaInsets();

  return (
    <>
      <Map ref={mapRef} path={path} showPath showMarkers />
      <IconButton
        icon={<Ionicon name="close" size="xl" />}
        borderRadius="full"
        onPress={() => navigation.goBack()}
        position="absolute"
        top={top}
        left={5}
        size={10}
        variant="solid"
        colorScheme="coolGray"
      />
    </>
  );
};
