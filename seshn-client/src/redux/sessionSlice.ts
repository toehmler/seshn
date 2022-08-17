import { InProgressSession, Location } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SessionState {
  tracking?: boolean;
  startTimestamp?: number;
  duration: 0;
  currentSession?: InProgressSession;
  showUser?: boolean;
}

const initialState: SessionState = {
  tracking: false,
  startTimestamp: undefined,
  duration: 0,
  currentSession: undefined,
  showUser: true,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startTracking: (
      state: SessionState,
      action: PayloadAction<InProgressSession>
    ) => {
      state.tracking = true;
      state.startTimestamp = Date.now();
      state.currentSession = action.payload;
    },
    resumeTracking: (state: SessionState) => {
      state.tracking = true;
    },
    stopTracking: (state: SessionState) => {
      state.tracking = false;
    },
    addPathPoint: (state: SessionState, action: PayloadAction<Location>) => {
      state.currentSession?.path.push(action.payload);
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
      state.currentSession = undefined;
    },
    toggleShowUser: (state: SessionState) => {
      state.showUser = !state.showUser;
    },
  },
});

export const {
  startTracking,
  stopTracking,
  resumeTracking,
  addPathPoint,
  updateDuration,
  resetSession,
  toggleShowUser,
} = sessionSlice.actions;
