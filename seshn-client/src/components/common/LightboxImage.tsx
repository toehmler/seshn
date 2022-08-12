import { useBoolean } from '@/hooks';
import { StatusBar } from 'native-base';
import { LegacyRef, useRef } from 'react';
import { StyleProp } from 'react-native';
import {
  FastImageProps,
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';
import ImageModal, { ImageDetail } from 'react-native-image-modal';
import { OnMove, OnTap } from 'react-native-image-modal/dist/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderButton } from './HeaderButton';

interface ImageModalProps extends FastImageProps {
  isRTL?: boolean;
  renderToHardwareTextureAndroid?: boolean;
  isTranslucent?: boolean;
  swipeToDismiss?: boolean;
  imageBackgroundColor?: string;
  overlayBackgroundColor?: string;
  hideCloseButton?: boolean;
  modalRef?: LegacyRef<ImageDetail>;
  disabled?: boolean;
  modalImageStyle?: ImageStyle;
  modalImageResizeMode?: ResizeMode;
  onLongPressOriginImage?: () => void;
  renderHeader?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  renderFooter?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  onTap?: (eventParams: OnTap) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onOpen?: () => void;
  didOpen?: () => void;
  onMove?: (position: OnMove) => void;
  responderRelease?: (vx?: number, scale?: number) => void;
  willClose?: () => void;
  onClose?: () => void;
}

interface Props extends ImageModalProps {
  source: Source | number;
  resizeMode?: ResizeMode;
  activeResizeMode?: ResizeMode;
  imageStyle?: StyleProp<ImageStyle>;
}

export const LightboxImage = ({
  source,
  resizeMode = 'cover',
  activeResizeMode = 'contain',
  onOpen = () => null,
  willClose = () => null,
  imageStyle = {},
  ...rest
}: Props) => {
  const [isActive, setIsActive] = useBoolean();

  const { top } = useSafeAreaInsets();

  return (
    <>
      {isActive && <StatusBar hidden={isActive} />}
      <ImageModal
        onOpen={() => {
          setIsActive.on();
          onOpen();
        }}
        willClose={() => {
          setIsActive.off();
          willClose();
        }}
        resizeMode={resizeMode}
        modalImageResizeMode={activeResizeMode}
        style={imageStyle}
        source={source}
        renderHeader={(onClose) => (
          <HeaderButton
            name="close"
            color="white"
            onPress={onClose}
            mt={top}
            alignSelf="flex-start"
            ml={2}
          />
        )}
        {...rest}
      />
    </>
  );
};
