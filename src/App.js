import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

const App = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('https://629128b827f4ba1c65c8cf57.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => setItems(arr));
    }, []);

    console.log(2);

    return (
        <div className="App">
            <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories />
                            <Sort />
                        </div>
                        <h2 className="content__title">Все пиццы</h2>
                        <div className="content__items">
                            {items.map((obj) => (
                                <PizzaBlock {...obj} key={obj.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
