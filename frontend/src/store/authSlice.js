import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart(state) {
            state.loading = true
            state.error = null
        },
        loginSuccess(state, { payload }) {
            state.loading = false
            state.user = payload
        },
        logout(state) {
            state.user = null
        },
        registerStart(state) {
            state.loading = true
            state.error = null
        },
        registerSuccess(state, action) {
            state.loading = false
            state.user = action.payload
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    logout,
    registerStart,
    registerSuccess,
} = authSlice.actions

export default authSlice.reducer
