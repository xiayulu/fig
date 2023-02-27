import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { employeeApi } from '@/views/employee/api';
import { eduApi } from '@/views/edu/api';
import { jobApi } from '@/views/job/api';
import { projectApi } from '@/views/project/api';
import reusmeSlice from "@/views/resume/slice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [employeeApi.reducerPath]: employeeApi.reducer,
    [eduApi.reducerPath]: eduApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    resume: reusmeSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeeApi.middleware)
      .concat(eduApi.middleware)
      .concat(jobApi.middleware)
      .concat(projectApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
