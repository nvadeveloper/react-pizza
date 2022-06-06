import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Sort from '../components/Sort';

const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);

    const setCategoryId = () => console.log(1);
    console.log(categoryId);
    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности (DESC)',
        sortProperty: 'raiting',
    });
    const [currentPage, setCurrentPage] = useState(1);

    const pizzas = items
        // .filter((obj) => {
        //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //         return true;
        //     }

        //     return false;
        // })
        .map((obj) => <PizzaBlock {...obj} key={obj.id} />);
    const placeholder = [...new Array(6)].map((_, i) => <Placeholder key={i} />);

    useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
            `https://629128b827f4ba1c65c8cf57.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
            // ${searchValue ? `&search=${searchValue}` : ''}`,
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                    <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? placeholder : pizzas}</div>
                <Pagination onChangePage={(num) => setCurrentPage(num)} />
            </div>
        </>
    );
};

export default Home;
