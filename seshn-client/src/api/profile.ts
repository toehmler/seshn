import { apiSlice } from './apiSlice';

interface Profile {
  id: string;
  sub: string;
  username: string;
  email: string;
}

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerProfile: builder.query<Profile, void>({
      query: () => 'profile/register',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useRegisterProfileQuery } = profileApi;
