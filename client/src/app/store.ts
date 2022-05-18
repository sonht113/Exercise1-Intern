import {configureStore} from "@reduxjs/toolkit";
import {studentSlice} from "../slice/studentSlice";

export const store = configureStore({
    reducer: {
        students: studentSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;