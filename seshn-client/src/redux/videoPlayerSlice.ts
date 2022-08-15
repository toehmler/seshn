import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface VideoPlayerState {
  currentlyPlayingId?: string;
}

const initialState: VideoPlayerState = {
  currentlyPlayingId: undefined,
};

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    setCurrentlyPlayingId: (
      state: VideoPlayerState,
      action: PayloadAction<string | undefined>
    ) => {
      state.currentlyPlayingId = action.payload;
    },
    pauseVideo: (state: VideoPlayerState) => {
      state.currentlyPlayingId = undefined;
    },
  },
});

export const { setCurrentlyPlayingId, pauseVideo } = videoPlayerSlice.actions;
