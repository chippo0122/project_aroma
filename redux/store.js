import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewSice";
import currentUserSlice from "./currentUserSlice";

export const store = configureStore({
    reducer: {
        view: viewReducer,
        currentUser: currentUserSlice
    }
})