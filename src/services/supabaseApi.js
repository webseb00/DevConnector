import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
// import { supabase } from '../supabaseClient'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    signUp: build.query({
      queryFn: (data) => {
        console.log(data)
      }
    })
  })
})


export const { useSignUpQuery } = supabaseApi