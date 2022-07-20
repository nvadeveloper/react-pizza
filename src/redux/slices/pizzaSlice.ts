import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type FetchPizzaArgs = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params: FetchPizzaArgs) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<CartItem[]>(
            `https://629128b827f4ba1c65c8cf57.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );

        return data as CartItem[];
    },
);

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: {
        [fetchPizza.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizza.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
