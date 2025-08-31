import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import MessageReducer from "./MessageSlice"

const store = configureStore({
    reducer: {
        user: authReducer,
        chat: chatReducer,
        message: MessageReducer
    },
})

export default store
