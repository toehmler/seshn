import { useBoolean } from '@/hooks';
import { AssetURI, MediaType } from '@/types';
import {
  Center,
  Pressable,
  Spinner,
  useColorModeValue,
  useTheme,
} from 'native-base';
import { LightboxImage, Video } from '../common';

interface Props {
  source: AssetURI;
  selected?: boolean;
  toggleSelected?: () => void;
  width: number | string;
  height: number | string;
  type: MediaType;
  id: string;
}

export const AssetLibraryPreview = ({
  source,
  selected = false,
  toggleSelected = () => null,
  width,
  height,
  type,
  id,
}: Props) => {
  const [loading, setLoading] = useBoolean(true);

  const { colors } = useTheme();

  const unselectedBorderColor = useColorModeValue('white', 'black');

  const borderColor = selected ? colors.primary[500] : unselectedBorderColor;
  const borderWidth = selected ? 4 : 1;

  return (
    <Center>
      {type === 'image' ? (
        <>
          <LightboxImage
            onLongPressOriginImage={toggleSelected}
            disabled={selected}
            source={source}
            imageStyle={{
              borderColor,
              borderWidth,
              width,
              height,
            }}
            onLoad={setLoading.off}
          />
          {selected ? (
            // we can't detect onPress on a disabled LightboxImage, so we overlay a transparent Pressable when selected
            // hopefully this doesn't cause any issues...
            <Pressable
              onPress={toggleSelected}
              onLongPress={toggleSelected}
              w="100%"
              h="100%"
              bgColor="transparent"
              position="absolute"
            />
          ) : null}
        </>
      ) : (
        <Pressable
          w={width}
          h={height}
          onPress={() => {
            if (selected) {
              toggleSelected();
            }
          }}
          onLongPress={toggleSelected}
        >
          <Video
            thumbnail={selected}
            source={source}
            width={width}
            height={height}
            onLoad={setLoading.off}
            styleProps={{
              borderWidth,
              borderColor,
            }}
            id={id}
            fullscreen
          />
        </Pressable>
      )}
      {loading ? (
        <Spinner size="lg" color="gray.500" position="absolute" />
      ) : null}
    </Center>
  );
};
