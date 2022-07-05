import React from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
    const pizzaCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((categoryName, i) => (
                    <li
                        onClick={() => onChangeCategory(i)}
                        className={value === i ? 'active' : ''}
                        key={i}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
