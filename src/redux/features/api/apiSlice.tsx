import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://location:5000' }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`,
    }),
    singleProduct: builder.query({
        query: (id) => `/products/${id}`
    })
  }),
})

export const {useGetProductQuery, useSingleProductQuery} = api