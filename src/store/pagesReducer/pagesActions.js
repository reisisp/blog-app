import {
  PAGES_GET_PAGE_ARR,
  PAGES_SET_CURRENT_PAGE,
  PAGES_SHOW_NEXT_PAGES,
  PAGES_SHOW_PREV_PAGES,
} from '../reduxTypes';

export function getPagesArr(total, current) {
  const pagesArr = [];
  if (total > 5) {
    for (let i = Math.floor(current / 5) * 5; i <= Math.floor(current / 5) * 5 + 4 && i < total; i += 1) {
      pagesArr.push(i);
    }
  } else {
    for (let i = 1; i < total; i += 1) {
      pagesArr.push(i);
    }
  }
  return { type: PAGES_GET_PAGE_ARR, payload: pagesArr };
}

export function setCurrentPage(page) {
  return { type: PAGES_SET_CURRENT_PAGE, payload: page };
}

export function showNextPages() {
  return { type: PAGES_SHOW_NEXT_PAGES };
}

export function showPrevPages() {
  return { type: PAGES_SHOW_PREV_PAGES };
}
