import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://egp.kpfu.ru/user-api/' }),
  endpoints: (builder) => ({
    recoverPassword: builder.mutation({
      query: (email) => ({
        url: `recover-password?email=${email}`,
        method: 'POST',

      }),
    }),
  }),
});

export const { useRecoverPasswordMutation } = api;