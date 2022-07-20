import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzaArgs = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export type SearchPizzaParams = {
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
        const { data } = await axios.get<Pizza[]>(
            `https://629128b827f4ba1c65c8cf57.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );

        return data as Pizza[];
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

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizza.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
    // extraReducers: {
    //     [fetchPizza.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizza.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizza.rejected]: (state) => {
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
