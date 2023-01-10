import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../supabaseClient'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchUserProfile: build.query({
      queryFn: async (userId) => {
        const user = await supabase
          .from('profiles')
          .select()
          .eq('id', userId)

        return { data: user }
      }
    }),
    fetchUserSocials: build.query({
      queryFn: async (userId) => {
        const user = await supabase
          .from('socials')
          .select()
          .eq('user_id', userId)

        return { data: user }
      }
    })
  })
})


export const { useFetchUserProfileQuery, useFetchUserSocialsQuery } = supabaseApi