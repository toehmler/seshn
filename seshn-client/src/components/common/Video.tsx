import { useAppDispatch, useVideoPlayer } from '@/hooks';
import { setCurrentlyPlayingId } from '@/redux';
import { AssetURI } from '@/types';
import { Center } from 'native-base';
import VideoPlayer, { VideoProperties } from 'react-native-video';

interface Props extends VideoProperties {
  source: AssetURI;
  width: number | string;
  height: number | string;
  id: string;
  paused?: boolean;
  thumbnail?: boolean;
  onLoad?: () => void;
  styleProps?: object;
}

export const Video = ({
  source,
  width,
  height,
  id,
  paused = false,
  thumbnail = false,
  onLoad = () => null,
  styleProps = {},
  ...rest
}: Props) => {
  const dispatch = useAppDispatch();

  const { currentlyPlayingId } = useVideoPlayer();

  return (
    <Center w={width} h={height}>
      <VideoPlayer
        source={source}
        style={{ width: '100%', height: '100%', ...styleProps }}
        paused={currentlyPlayingId !== id || thumbnail || paused}
        onLoad={onLoad}
        resizeMode="cover"
        ignoreSilentSwitch="ignore"
        pictureInPicture
        controls={!thumbnail}
        onPlaybackRateChange={({ playbackRate }) =>
          dispatch(setCurrentlyPlayingId(playbackRate > 0 ? id : undefined))
        }
        preferredForwardBufferDuration={500}
        onError={(error) => console.warn(error)}
        {...rest}
      />
    </Center>
  );
};
