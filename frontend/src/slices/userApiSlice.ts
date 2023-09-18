import { apiSlice } from './apiSlice'

// const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/profile',
                method: 'PUT',
                body: data
            })
        })
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation
} = userApiSlice