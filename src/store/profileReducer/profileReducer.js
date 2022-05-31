import {
  LOGOUT,
  SAVE_TOKEN,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
  AUTH_CLEAR_PWD,
  AUTH_SET_USER,
  AUTH_PREPARE_PAGE,
  PROFILE_EDIT_CLEAR_PWD,
  PROFILE_EDIT_SET_USER,
  PROFILE_SET_VALIDATION_ERR,
  REGISTER_CLEAR_PWD,
  REGISTER_PREPARE_PAGE,
  REGISTER_SET_CHECKBOX,
  REGISTER_SET_USER,
  PROFILE_PREPARE_EDIT_PAGE,
  SAVE_USER,
} from '../reduxTypes';

const initialState = {
  loader: false,
  connectionError: false,
  user: {},
  token: '',
  newUser: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: false },
  authUser: { email: '', password: '' },
  editProfileUser: { email: '', password: '', username: '', image: '' },
  validationErrors: {},
};

export const profileReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case REGISTER_PREPARE_PAGE:
      return {
        ...state,
        validationErrors: {},
        newUser: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: false },
      };
    case REGISTER_CLEAR_PWD:
      return { ...state, newUser: { ...state.newUser, password: '', repeatPwd: '' } };
    case REGISTER_SET_CHECKBOX:
      return { ...state, newUser: { ...state.newUser, agreementCheckbox: action.payload } };
    case REGISTER_SET_USER:
      return { ...state, newUser: { ...state.newUser, ...action.payload } };
    case AUTH_PREPARE_PAGE:
      return { ...state, authUser: { email: '', password: '' }, validationErrors: {} };
    case AUTH_SET_USER:
      return { ...state, authUser: { ...state.authUser, ...action.payload } };
    case AUTH_CLEAR_PWD:
      return { ...state, authUser: { ...state.newUser, password: '', email: '' } };
    case PROFILE_PREPARE_EDIT_PAGE:
      return {
        ...state,
        editProfileUser: { ...state.editProfileUser, ...state.user },
        validationErrors: {},
      };
    case PROFILE_EDIT_SET_USER:
      return { ...state, editProfileUser: { ...state.editProfileUser, ...action.payload } };
    case PROFILE_EDIT_CLEAR_PWD:
      return { ...state, editProfileUser: { ...state.editProfileUser, password: '' } };
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
