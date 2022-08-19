import { Location } from '@/types';
import { Circle, useColorModeValue, useTheme } from 'native-base';
import { forwardRef, Ref, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps, Marker, Polyline } from 'react-native-maps';

interface Props extends MapViewProps {
  path?: Location[];
  showPath?: boolean;
  pathPressEnabled?: boolean;
  showMarkers?: boolean;
  markerPressEnabled?: boolean;
  children?: React.ReactNode;
}

export const Map = forwardRef(
  (
    {
      path,
      showPath = false,
      pathPressEnabled = true,
      showMarkers = false,
      markerPressEnabled = true,
      children,
      ...rest
    }: Props,
    ref: Ref<MapView>
  ) => {
    const { colors } = useTheme();

    const fitPath = useCallback(
      (animated = true) =>
        // @ts-ignore
        ref?.current?.fitToCoordinates(path, {
          edgePadding: { top: 30, right: 50, bottom: 100, left: 50 },
          animated,
        }),
      [ref, path]
    );

    return (
      <MapView
        ref={ref}
        style={StyleSheet.absoluteFillObject}
        loadingEnabled
        loadingBackgroundColor={useColorModeValue(
          colors.bgLight,
          colors.bgDark
        )}
        {...rest}
      >
        {showPath && path && path.length > 0 && (
          <>
            <Polyline
              coordinates={path}
              strokeColor="red"
              strokeWidth={3}
              tappable
              onPress={() => {
                if (pathPressEnabled) {
                  fitPath();
                }
              }}
            />
            {showMarkers && path?.length > 2 && (
              <>
                <Marker
                  coordinate={path[0]}
                  onPress={() => {
                    if (markerPressEnabled) {
                      fitPath();
                    }
                  }}
                >
                  <Circle
                    bgColor="white"
                    size="5"
                    borderColor="black"
                    borderWidth={1}
                  />
                </Marker>
                <Marker
                  coordinate={path[path.length - 1]}
                  onPress={() => fitPath()}
                >
                  <Circle bgColor="black" size="5">
                    <Circle
                      bgColor="transparent"
                      borderColor="white"
                      borderWidth={1}
                      size="4"
                    />
                  </Circle>
                </Marker>
              </>
            )}
          </>
        )}

        {children}
      </MapView>
    );
  }
);
