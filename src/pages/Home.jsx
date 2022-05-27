import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Sort from '../components/Sort';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://629128b827f4ba1c65c8cf57.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Placeholder key={i} />)
                    : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
            </div>
        </>
    );
};

export default Home;
