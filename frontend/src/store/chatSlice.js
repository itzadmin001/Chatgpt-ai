import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    chats: [],
    activeChatId: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChatTitle(state, { payload }) {
            state.chats.unshift(payload);
        },
        AllChatsTitle(state, { payload }) {
            state.chats = payload
        },
        setActiveChat(state, { payload }) {
            state.activeChatId = payload;

        }
    },

})

export const { AllChatsTitle, addChatTitle, setActiveChat } = chatSlice.actions
export default chatSlice.reducer
