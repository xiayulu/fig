// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Job, MutateJobForm } from './types'

// Define a service using a base URL and expected endpoints
export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobList: builder.query<Job[], void>({
      query: () => '/jobs',
      transformResponse: (response: { data: Job[] }) => {
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
            ...result.map(({ _id }) => ({ type: 'Jobs', id: _id } as const)),
            { type: 'Jobs', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'Jobs', id: 'LIST' }]
      },
    }),
    createJob: builder.mutation<any, MutateJobForm>({
      query: (data) => ({
        url: '/jobs',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    updateJob: builder.mutation<any, Partial<Job>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/jobs/${_id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Jobs', id: _id }],
    }),
    deleteJob: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/jobs/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Jobs', id }],
    }),
  }),
})


export const {
  useGetJobListQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobApi