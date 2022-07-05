import React from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div className={style.description}>
            <h1>Ничего не найдено</h1>
            <p>К сожалению, данная страница отсутствует в интернет-магазине</p>
        </div>
    );
};

export default NotFoundBlock;
