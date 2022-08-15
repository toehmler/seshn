import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AccessToken = string | undefined;

interface AuthState {
  accessToken?: AccessToken;
}

const initialState: AuthState = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state: AuthState, action: PayloadAction<AccessToken>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
