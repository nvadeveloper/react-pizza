import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';

const App = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="App">
            {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/pizza/:id" element={<FullPizza />} />
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
            {/* </SearchContext.Provider> */}
        </div>
    );
};

export default App;
