import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004/',
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;

      // If we have a token set in state, let's assume that we should be passing it.
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Post', 'Profile'],
  // enpoints are defined and injected in their respective files
  endpoints: () => ({}),
});
