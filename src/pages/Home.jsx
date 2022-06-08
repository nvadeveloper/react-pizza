import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Sort from '../components/Sort';

const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
    const placeholder = [...new Array(6)].map((_, i) => <Placeholder key={i} />);

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    };

    useEffect(() => {
        const queryStr = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });

        console.log(queryStr);
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(
                `https://629128b827f4ba1c65c8cf57.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        value={categoryId}
                        onChangeCategory={(id) => dispatch(setCategoryId(id))}
                    />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? placeholder : pizzas}</div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    );
};

export default Home;
