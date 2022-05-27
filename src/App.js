import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Card from './pages/Card';

import './scss/app.scss';

const App = () => {
    return (
        <div className="App">
            <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/card" element={<Card />} />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
