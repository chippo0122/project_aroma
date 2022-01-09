import { createSlice } from "@reduxjs/toolkit"

const INIT = {
    displayName: '',
    email: '',
    uid: ''
};

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: INIT,
    reducers: {
        setUser: (state, action) => {
            const {displayName, email, uid} = action.payload;
            return {...state, displayName, email, uid}
        },

        clearUser: (state, action) => {
            return INIT
        }
    }
})

export const {setUser, clearUser} = currentUserSlice.actions;

export default currentUserSlice.reducer