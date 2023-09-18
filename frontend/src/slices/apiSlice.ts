import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
    
    prepareHeaders(headers, { getState }: { getState: any }) {
        console.log('user', getState());
        const userInfoData = getState()?.auth.userInfo;
        if (userInfoData?.token) {
            const token = userInfoData.token
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})