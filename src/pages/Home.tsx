import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Sort, { list } from '../components/Sort';
import { fetchPizza, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { items, status } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

    const pizzas = items.map((obj: any) => (
        // <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
        // </Link>
    ));
    const placeholder = [...new Array(6)].map((_, i) => <Placeholder key={i} />);

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
    };

    const getPizza = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        // @ts-ignore
        dispatch(fetchPizza({ sortBy, order, category, search, currentPage } as SearchPizzaParams));
        window.scrollTo(0, 0);
    };

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(
    //             window.location.search.substring(1),
    //         ) as unknown as SearchPizzaParams;
    //         const sort = list.find((obj) => obj.sortProperty === params.sortBy);

    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || list[0],
    //             }),
    //         );
    //     }
    //     isSearch.current = true;
    // }, []);

    useEffect(() => {
        getPizza();

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryStr = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         });
    //         try {
    //             navigate(`?${queryStr}`);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     isMounted.current = true;
    // }, [categoryId, sort.sortProperty, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(index: number) => dispatch(setCategoryId(index))}
                />
                <Sort />
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>?????????????????? ???????????? ????</h2>
                    <p>?? ??????????????????, ???? ?????????????? ???????????????? ??????????</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? placeholder : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
