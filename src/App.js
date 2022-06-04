import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';

export const SearchContext = createContext('');

const App = () => {
    const [searchValue, setSearchValue] = useState('');

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                Increment
            </button>
            <span>{count}</span>
            <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                Decrement
            </button>

            {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <div className="wrapper">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider> */}
        </div>
    );
};

export default App;
