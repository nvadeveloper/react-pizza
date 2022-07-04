import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
    const [pizza, setPizza] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizzaItem() {
            try {
                const { data } = await axios.get(
                    'https://629128b827f4ba1c65c8cf57.mockapi.io/items/' + id,
                );

                console.log(data);
                setPizza(data);
            } catch (error) {
                console.log('Ошибка при получении пиццы! ');
                navigate('/');
            }
        }
        fetchPizzaItem();
    }, []);

    if (!pizza) {
        return (
            <>
                <div className="container">Загрузка...</div>
            </>
        );
    }

    return (
        <>
            <div className="container">
                <img src={pizza.imageUrl} />
                <h2>{pizza.title}</h2>
                <p>{pizza.price} р</p>
            </div>
        </>
    );
};

export default FullPizza;
