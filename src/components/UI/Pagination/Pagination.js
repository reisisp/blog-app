import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import * as pagesActions from '../../../store/pagesReducer/pagesActions';

import classes from './Pagination.module.scss';

const Pagination = ({
  currentPage,
  pagesArr,
  totalPages,
  getPagesArr,
  setCurrentPage,
  showNextPages,
  showPrevPages,
}) => {
  useEffect(() => {
    getPagesArr(totalPages, currentPage);
  }, [totalPages, currentPage]);
  const prev = Math.floor(currentPage / 5) * 5 - 5;
  const next = Math.floor(currentPage / 5) * 5 + 5;
  return (
    <ul className={classes.pagination}>
      <li onClick={prev >= 0 ? () => showPrevPages() : () => {}} className={classes.pagination__arr}>
        <i className={cn(classes.arrow, classes.left)}></i>
      </li>
      {pagesArr.map((num, index) => (
        <li
          className={num === currentPage ? cn(classes.pagination__elem, classes.active) : classes.pagination__elem}
          onClick={() => setCurrentPage(num)}
          key={index}
        >
          {num + 1}
        </li>
      ))}
      <li onClick={next <= totalPages ? () => showNextPages() : () => {}} className={classes.pagination__arr}>
        <i className={cn(classes.arrow, classes.right)}></i>
      </li>
    </ul>
  );
};

function mapStateToProps({ articlesReducer, pagesReducer }) {
  return {
    totalPages: articlesReducer.totalPages,
    currentPage: pagesReducer.currentPage,
    pagesArr: pagesReducer.pagesArr,
  };
}

export default connect(mapStateToProps, pagesActions)(Pagination);
