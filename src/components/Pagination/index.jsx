import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
    return (
        <>
            <ReactPaginate
                className={style.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(even) => onChangePage(even.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;
