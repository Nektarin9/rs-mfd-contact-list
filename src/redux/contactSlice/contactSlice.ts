import {createSlice} from "@reduxjs/toolkit";

export interface AppReducerType {
}

// Начальное состояние
const initialState: AppReducerType = {

};

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {},
})

