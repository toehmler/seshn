import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {}

const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

// export const {} = settingsSlice.actions;
