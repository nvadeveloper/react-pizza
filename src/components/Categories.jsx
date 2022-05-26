import { useState } from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState('active');

    const pizzaCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((item, i) => (
                    <li
                        onClick={() => setActiveIndex(i)}
                        className={activeIndex === i ? 'active' : ''}
                        key={i}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
