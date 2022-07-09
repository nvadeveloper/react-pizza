import { createSlice } from '@reduxjs/toolkit';
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
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
