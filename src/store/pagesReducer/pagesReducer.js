import {
  PAGES_GET_PAGE_ARR,
  PAGES_SET_CURRENT_PAGE,
  PAGES_SHOW_NEXT_PAGES,
  PAGES_SHOW_PREV_PAGES,
} from '../reduxTypes';

const initialState = {
  pagesArr: [],
  currentPage: 0,
};

export const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGES_GET_PAGE_ARR:
      return { ...state, pagesArr: action.payload };
    case PAGES_SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case PAGES_SHOW_NEXT_PAGES:
      return { ...state, currentPage: Math.floor(state.currentPage / 5) * 5 + 5 };
    case PAGES_SHOW_PREV_PAGES:
      return { ...state, currentPage: Math.floor(state.currentPage / 5) * 5 - 5 };
    default:
      return state;
  }
};
