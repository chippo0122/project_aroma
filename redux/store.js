import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewSice";
import currentUserSlice from "./currentUserSlice";
import messageSlice from "./message";

export const store = configureStore({
    reducer: {
        view: viewReducer,
        currentUser: currentUserSlice,
        messages: messageSlice
    }
})