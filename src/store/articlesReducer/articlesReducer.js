import { ARTICLES_SAVE_TOTAL_PAGES, SHOW_CONNECTION_ERROR, SHOW_LOADER } from '../reduxTypes';

const initialState = {
  loader: false,
  connectionError: false,
  totalPages: 0,
};

export const articlesReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case ARTICLES_SAVE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case SHOW_LOADER:
      return { ...state, loader: action.payload };
    case SHOW_CONNECTION_ERROR:
      return { ...state, connectionError: true };
    default:
      return state;
  }
};
