import { now } from '@/helpers';
import { Location } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SessionState {
  tracking?: boolean;
  startTimestamp?: number;
  duration: 0;
  path: Location[];
}

const initialState: SessionState = {
  tracking: false,
  startTimestamp: undefined,
  duration: 0,
  path: [],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startTracking: (state: SessionState) => {
      state.tracking = true;
      state.startTimestamp = Date.now();
    },
    stopTracking: (state: SessionState) => {
      state.tracking = false;
    },
    addPathPoint: (state: SessionState, action: PayloadAction<Location>) => {
      state.path.push(action.payload);
    },
    updateDuration: (state: SessionState, action: PayloadAction<number>) => {
      if (state.tracking) {
        state.duration += action.payload;
      }
    },
    resetSession: (state: SessionState) => {
      state.tracking = false;
      state.startTimestamp = undefined;
      state.duration = 0;
      state.path = [];
    },
  },
});

export const {
  startTracking,
  stopTracking,
  addPathPoint,
  updateDuration,
  resetSession,
} = sessionSlice.actions;
