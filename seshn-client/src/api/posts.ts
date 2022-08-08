import { Post } from '@/types';
import { apiSlice } from './apiSlice';

const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => 'post/all',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Post' as const, id }))
          : ['Post'],
    }),
    getPostsById: builder.query<Post[], string>({
      query: (profileId) => `post/profile/${profileId}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    addPost: builder.mutation<Post, Post>({
      query: (body) => ({
        url: 'post/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostsByIdQuery, useAddPostMutation } =
  postsApi;
