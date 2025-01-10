import { Item } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";

interface ItemState {
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

const initialState: ItemState ={
    name: "",
    description: "",
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date()
}

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
      
    }
});

export default itemSlice.reducer;