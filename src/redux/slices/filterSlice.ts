import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
    name: string;
    sortProperty: 'raiting' | 'price' | 'title' | '-raiting' | '-price' | '-title';
};

interface FilteSliceState {
    searchValue: string;
    currentPage: number;
    categoryId: number;
    sort: Sort;
}

const initialState: FilteSliceState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: 'raiting',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilteSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.sort = {
                    name: 'популярности (DESC)',
                    sortProperty: 'raiting', 
                };
                state.categoryId = 0;
                state.currentPage = 1;
            }
        },
    },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
