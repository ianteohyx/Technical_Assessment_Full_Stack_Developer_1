import {configureStore} from "@reduxjs/toolkit"
import itemReducer from "./item/ItemSlice"

export const store = configureStore({
    reducer: {itemReducer}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;