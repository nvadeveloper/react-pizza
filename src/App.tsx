// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="pizza/:id" element={<FullPizza />} />
                    <Route path="not-found" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
