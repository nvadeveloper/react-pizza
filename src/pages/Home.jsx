import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Sort from '../components/Sort';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности (DESC)',
        sortProperty: 'raiting',
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://629128b827f4ba1c65c8cf57.mockapi.io/items?${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
                sortType.sortProperty.includes('-') ? 'asc' : 'desc'
            }`,
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                    <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(6)].map((_, i) => <Placeholder key={i} />)
                        : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
                </div>
            </div>
        </>
    );
};

export default Home;
