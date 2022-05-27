import {
  AUTH_CLEAR_FORM,
  AUTH_CLEAR_PWD,
  AUTH_SET_USER,
  AUTH_SET_VALIDATION_ERR,
  AUTH_USER,
  LOGOUT,
  PROFILE_EDIT_CLEAR_PWD,
  PROFILE_EDIT_SET_USER,
  PROFILE_EDIT_SET_VALIDATION_ERR,
  PROFILE_SAVE_USER,
  REGISTER_CLEAR_FORM,
  REGISTER_CLEAR_PWD,
  REGISTER_SET_CHECKBOX,
  REGISTER_SET_USER,
  REGISTER_SET_VALIDATION_ERR,
  REGISTER_USER,
  SAVE_TOKEN,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
} from '../reduxTypes';

const initialState = {
  loader: false,
  connectionError: false,
  user: {},
  token: '',
  newUser: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: false },
  newUserValidationErrors: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: '' },
  authUser: { email: '', password: '' },
  authUserValidationErrors: { email: '', password: '' },
  editProfileUser: { email: '', password: '', username: '', image: '' },
  editProfileValidationErrors: { email: '', password: '', username: '', image: '' },
};

export const profileReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case REGISTER_CLEAR_FORM:
      return {
        ...state,
        newUser: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: false },
        newUserValidationErrors: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: '' },
      };
    case AUTH_CLEAR_FORM:
      return {
        ...state,
        authUser: { email: '', password: '' },
        authUserValidationErrors: { email: '', password: '' },
      };
    case REGISTER_USER:
      return { ...state, user: action.payload };
    case REGISTER_SET_CHECKBOX:
      return { ...state, newUser: { ...state.newUser, agreementCheckbox: action.payload } };
    case AUTH_USER:
      return { ...state, user: action.payload };
    case PROFILE_SAVE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        editProfileUser: { ...state.editProfileUser, ...action.payload },
      };
    case REGISTER_SET_USER:
      return { ...state, newUser: { ...state.newUser, ...action.payload } };
    case AUTH_SET_USER:
      return { ...state, authUser: { ...state.authUser, ...action.payload } };
    case PROFILE_EDIT_SET_USER:
      return { ...state, editProfileUser: { ...state.editProfileUser, ...action.payload } };
    case REGISTER_CLEAR_PWD:
      return { ...state, newUser: { ...state.newUser, password: '', repeatPwd: '' } };
    case AUTH_CLEAR_PWD:
      return { ...state, authUser: { ...state.newUser, password: '', email: '' } };
    case PROFILE_EDIT_CLEAR_PWD:
      return { ...state, editProfileUser: { ...state.editProfileUser, password: '' } };
    case REGISTER_SET_VALIDATION_ERR:
      return { ...state, newUserValidationErrors: { ...state.newUserValidationErrors, ...action.payload } };
    case AUTH_SET_VALIDATION_ERR:
      return { ...state, authUserValidationErrors: { ...state.authUserValidationErrors, ...action.payload } };
    case PROFILE_EDIT_SET_VALIDATION_ERR:
      return { ...state, editProfileValidationErrors: { ...state.editProfileValidationErrors, ...action.payload } };
    case SAVE_TOKEN:
      return { ...state, token: action.payload };
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
