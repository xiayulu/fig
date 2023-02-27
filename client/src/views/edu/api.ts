// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Edu, CreateForm } from './types'

// Define a service using a base URL and expected endpoints
export const eduApi = createApi({
  reducerPath: 'eduApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  tagTypes: ['Edus'],
  endpoints: (builder) => ({
    getEduList: builder.query<Edu[], void>({
      query: () => '/edus',
      transformResponse: (response: { data: Edu[] }) => {
        return response.data;
      },
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) => {
        // is result available?
        return result
          ? // successful query
          [
            ...result.map(({ _id }) => ({ type: 'Edus', id: _id } as const)),
            { type: 'Edus', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'Edus', id: 'LIST' }]
      },
    }),
    createEdu: builder.mutation<any, CreateForm>({
      query: (data) => ({
        url: '/edus',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Edus', id: 'LIST' }],
    }),
    updateEdu: builder.mutation<any, Partial<Edu>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/edus/${_id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Edus', id: _id }],
    }),
    deleteEdu: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/edus/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Edus', id }],
    }),
  }),
})


export const {
  useGetEduListQuery,
  useCreateEduMutation,
  useDeleteEduMutation,
  useUpdateEduMutation,
} = eduApi