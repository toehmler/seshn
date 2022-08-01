import { useAppSelector } from './useAppSelector';

export const useVideoPlayer = () =>
  useAppSelector((state) => state.videoPlayer);
