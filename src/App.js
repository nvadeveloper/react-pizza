import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import pizzaArray from './pizza.json';
import './scss/app.scss';

const App = () => {
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
                            {pizzaArray.map((obj) => (
                                <PizzaBlock {...obj} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
