// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Project, CreateForm } from './types'

// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjectList: builder.query<Project[], void>({
      query: () => '/projects',
      transformResponse: (response: { data: Project[] }) => {
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
            ...result.map(({ _id }) => ({ type: 'Projects', id: _id } as const)),
            { type: 'Projects', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'Projects', id: 'LIST' }]
      },
    }),
    createProject: builder.mutation<any, CreateForm>({
      query: (data) => ({
        url: '/projects',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
    updateProject: builder.mutation<any, Partial<Project>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/projects/${_id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Projects', id: _id }],
    }),
    deleteProject: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/projects/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),
  }),
})


export const {
  useGetProjectListQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi