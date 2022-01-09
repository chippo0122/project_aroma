import { createSlice } from "@reduxjs/toolkit"

const INIT = []

export const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: INIT,
    reducers: {
        pushMsg: (state, actions) => {
            //message
            const {payload} = actions;
            return [...state, payload]
        },

        deleteMsg: (state, actions) => {
            //index target
            const {payload} = actions;
            let arr = [];
            state.forEach((el, index) => {
                if(index !== payload) {
                    arr.push(el);
                }
            })
            return [...arr];
        }
    }
})

export const {pushMsg, deleteMsg} = messageSlice.actions;

export default messageSlice.reducer