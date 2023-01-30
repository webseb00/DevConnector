import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../supabaseClient'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Education', 'Experience', 'Socials', 'Post'],
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
      },
      providesTags: ['Socials']
    }),
    fetchUsers: build.query({
      queryFn: async () => {
        const users = await supabase
          .from('profiles')
          .select()

        return { data: users }
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
    }),
    addSocialLinks: build.mutation({
      queryFn: async payload => {
        const { userId, youtube, twitter, instagram, github, linkedin } = payload
        // firstly, checky if the socials table already exists in DB
        const { data, error } = await supabase
          .from('socials')
          .select()
          .eq('user_id', userId)
        
          if(data.length) {
            const data = await supabase
              .from('socials')
              .update({ user_id: userId, youtube, twitter, instagram, github, linkedin })
              .eq('user_id', userId)
            
            return data
          } else {
            const data = await supabase
              .from('socials')
              .insert({ user_id: userId, youtube, twitter, instagram, github, linkedin })
              .select()

            return data
          }
      },
      invalidatesTags: ['Socials']
    }),
    fetchPosts: build.query({
      queryFn: async () => {
        const posts = await supabase
          .from('post')
          .select()

        return posts
      },
      providesTags: ['Post']
    }),
    addPost: build.mutation({
      queryFn: async payload => {
        const data = await supabase
          .from('post')
          .insert(payload)

        return data
      },
      invalidatesTags: ['Post']
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
  useRemoveExperienceItemMutation,
  useFetchUsersQuery,
  useAddSocialLinksMutation,
  useFetchPostsQuery,
  useAddPostMutation
} = supabaseApi