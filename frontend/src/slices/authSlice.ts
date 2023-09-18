import { createSlice } from '@reduxjs/toolkit'
const userInfoString = localStorage.getItem('userInfo');
console.log(typeof (userInfoString));
typeof (userInfoString)
console.log(userInfoString);

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
            console.log('action', action);
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logOut: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer;