import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated : false,
    error: null,
}

export const loginSlices = createSlice({
    name: 'login',
    initialState,
    reducers: {
        LoginPage : (state, action)=>{
            const { username, password } = action.payload;
            if(username === 'hasnain' && password === '123'){
                state.user = username;
                state.isAuthenticated = true;
                state.error = `Welcome to the Dashboard ${username}!`
            }else{
                state.error = 'Invalid Username or Password!'
            }
        },
        LogoutPage : (state, action) => {
            state.error = null;
            state.isAuthenticated = false;
        },
    }
})

export const { LoginPage, LogoutPage } = loginSlices.actions;
export default loginSlices.reducer