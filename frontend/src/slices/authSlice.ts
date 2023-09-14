import { createSlice } from '@reduxjs/toolkit'

const userInfoString = localStorage.getItem('userInfo');
const initialState = {
    userInfo: userInfoString ?
        JSON.parse(userInfoString) :
        null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.parse(action.payload))
        },
        logOut: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer;