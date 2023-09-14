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
        })
    })
})


export const { useLoginMutation } = userApiSlice