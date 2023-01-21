import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../supabaseClient'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Education', 'Experience'],
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
    }),
    fetchUserEducation: build.query({
      queryFn: async (userId) => {
        const user = await supabase
          .from('education')
          .select()
          .eq('user_id', userId)

        return { data: user }
      },
      providesTags: ['Education']
    }),
    fetchUserExperience: build.query({
      queryFn: async (userId) => {
        const user = await supabase
          .from('experience')
          .select()
          .eq('user_id', userId)

        return { data: user }
      },
      providesTags: ['Experience']
    }),
    addEducationItem: build.mutation({
      queryFn: async payload => {
        const data = await supabase
          .from('education')
          .insert(payload)

        return data
      },
      invalidatesTags: ['Education']
    }),
    removeEducationItem: build.mutation({
      queryFn: async id => {
        const user = await supabase
          .from('education')
          .delete()
          .eq('id', id)

        return { data: user }
      },
      invalidatesTags: ['Education']
    }),
    addExperienceItem: build.mutation({
      queryFn: async payload => {
        const data = await supabase
          .from('experience')
          .insert(payload)

        return data
      },
      invalidatesTags: ['Experience']
    }),
    removeExperienceItem: build.mutation({
      queryFn: async id => {
        const user = await supabase
          .from('experience')
          .delete()
          .eq('id', id)

        return { data: user }
      },
      invalidatesTags: ['Experience']
    })
  })
})


export const { 
  useFetchUserProfileQuery, 
  useFetchUserSocialsQuery, 
  useFetchUserEducationQuery,
  useFetchUserExperienceQuery,
  useAddEducationItemMutation,
  useRemoveEducationItemMutation,
  useAddExperienceItemMutation,
  useRemoveExperienceItemMutation
} = supabaseApi