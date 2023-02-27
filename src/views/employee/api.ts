// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Employee, CreateForm } from './types'

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployeeList: builder.query<Employee[], void>({
      query: () => '/employees',
      transformResponse: (response: { data: Employee[] }) => {
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
            ...result.map(({ _id }) => ({ type: 'Employees', id: _id } as const)),
            { type: 'Employees', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'Employees', id: 'LIST' }]
      },
    }),
    createEmployee: builder.mutation<any, CreateForm>({
      query: (data) => ({
        url: '/employees',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
    updateEmployee: builder.mutation<any, Partial<Employee>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/employees/${_id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Employees', id: _id }],
    }),
    deleteEmployee: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/employees/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Employees', id }],
    }),
  }),
})


export const {
  useGetEmployeeListQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi