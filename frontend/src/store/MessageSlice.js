import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: [],
}

const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        Allmessage(state, { payload }) {
            state.message = payload
        },
        addOne: (state, { payload }) => {
            state.message.push(payload)
        }
    },
})

export const { Allmessage, addOne } = MessageSlice.actions
export default MessageSlice.reducer
