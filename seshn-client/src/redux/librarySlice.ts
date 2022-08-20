import { Session } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LibraryState {
  sessions: Session[];
}

const initialState: LibraryState = {
  sessions: [],
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addSession: (state: LibraryState, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
  },
});

export const { addSession } = librarySlice.actions;
