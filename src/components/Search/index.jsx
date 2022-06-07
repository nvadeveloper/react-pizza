import React, { useCallback, useContext, useRef, useState } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import style from './Search.module.scss';

export const Search = () => {
    const [value, setValue] = useState('');
    const { setSearchValue } = useContext(SearchContext);

    const inputRef = useRef();

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 1000),
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div>
            <input
                ref={inputRef}
                value={value}
                className={style.input}
                placeholder="Поиск пиццы"
                onChange={onChangeInput}
            />
            {value && (
                <svg
                    onClick={() => {
                        setValue('');
                        setSearchValue('');
                        inputRef.current.focus();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={style.iconClose}
                    viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            )}
        </div>
    );
};
