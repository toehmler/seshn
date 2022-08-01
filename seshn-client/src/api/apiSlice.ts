import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// @ts-ignore
import { API_BASE_URL } from '@env';
import { User } from '@/types';

type UsersResponse = User[];

interface FakerApiResponse {
  code: number;
  data?: UsersResponse;
  status: string;
  total: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, number>({
      query: (quantity) =>
        `/custom?_quantity=${quantity}&name=name&id=uuid&avatar=image`,
      transformResponse: (response: FakerApiResponse) => response?.data || [], // TODO: remove this line when we get real data
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
