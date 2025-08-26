import { baseApi } from "../../api/baseApi";

const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            })
        }),
        getUserData: builder.query({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'GET',

            })
        }),
        updateUserProfile: builder.mutation({
            query: (formData: FormData) => ({
                url: `/users`,
                method: "PATCH",
                body: formData,
            }),
        }),


    }),
})

export const { useLoginMutation, useGetUserDataQuery, useUpdateUserProfileMutation } = loginApi;