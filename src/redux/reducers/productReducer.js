import {createSlice} from "@reduxjs/toolkit";
import {add, edit, getAll, getById, remove} from "../services/productService";

const initialState = {
    list: [],
    productEdit : {

    }
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAll.fulfilled, (state, {payload}) => {
            state.list = payload;
            console.log(4)
        })
        builder.addCase(add.fulfilled, (state, {payload}) => {
            state.list.push(payload);
        })
        builder.addCase(remove.fulfilled, (state, {payload}) => {
            state.list.splice(state.list.indexOf(payload),)
        })
        builder.addCase(getById.fulfilled,(state, {payload}) => {
            state.productEdit = payload
        })
        builder.addCase(edit.fulfilled,(state,{payload}) => {
            for (let i = 0; i < state.list.length; i++) {
                if(state.list[i].id === payload.id) {
                    state.list[i] = payload
                }
            }
        })
    }
});
export default productSlice.reducer;