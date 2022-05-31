import React, { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';

import './scss/app.scss';

const App = () => {
    const [searchValue, setSearchValue] = useState('');
    const SearchContext = useContext('');

    console.log(searchValue);

    return (
        <div className="App">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <div className="wrapper">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home searchValue={searchValue} />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
