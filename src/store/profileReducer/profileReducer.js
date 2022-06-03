import {
  LOGOUT,
  SAVE_TOKEN,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
  PROFILE_SET_VALIDATION_ERR,
  PROFILE_PREPARE_PAGE,
  SAVE_USER,
  PROFILE_EDIT_SUCCESS,
} from '../reduxTypes';

const initialState = {
  loader: false,
  connectionError: false,
  user: {},
  token: '',
  validationErrors: {},
  profileEditSuccess: false,
};

export const profileReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case PROFILE_PREPARE_PAGE:
      return { ...state, validationErrors: {} };
    case PROFILE_EDIT_SUCCESS:
      return { ...state, profileEditSuccess: action.payload };
    case PROFILE_SET_VALIDATION_ERR:
      return {
        ...state,
        validationErrors: { ...state.validationErrors, ...action.payload },
      };
    case SAVE_TOKEN:
      return { ...state, token: action.payload };
    case SAVE_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, token: '', user: {} };
    case SHOW_LOADER:
      return { ...state, loader: action.payload };
    case SHOW_CONNECTION_ERROR:
      return { ...state, connectionError: true };
    default:
      return state;
  }
};
