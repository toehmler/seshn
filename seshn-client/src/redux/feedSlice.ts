import { Sport } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FeedState {
  showOnlyLikedPosts: boolean;
  sportFilter?: Sport;
}

const initialState: FeedState = {
  showOnlyLikedPosts: false,
  sportFilter: undefined,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    changeShowOnlyLikedPosts: (
      state: FeedState,
      action: PayloadAction<boolean>
    ) => {
      state.showOnlyLikedPosts = action.payload;
    },
    changeSportFilter: (
      state: FeedState,
      action: PayloadAction<Sport | undefined>
    ) => {
      state.sportFilter = action.payload;
    },
  },
});

export const { changeShowOnlyLikedPosts, changeSportFilter } =
  feedSlice.actions;
