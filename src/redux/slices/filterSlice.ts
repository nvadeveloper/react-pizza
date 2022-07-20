import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
    RAITING_DESC = 'raiting',
    RAITING_ASC = '-raiting',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string;
    sortProperty: 'raiting' | 'price' | 'title' | '-raiting' | '-price' | '-title';
};

export interface FilterSliceState {
    searchValue: string;
    currentPage: number;
    categoryId: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: SortPropertyEnum.RAITING_DESC,
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
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.sort = {
                    name: 'популярности (DESC)',
                    sortProperty: SortPropertyEnum.RAITING_DESC,
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
