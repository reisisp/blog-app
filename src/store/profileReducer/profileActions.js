import BlogService from '../../service/service-blog';
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

import {
  checkEmail,
  checkUsername,
  checkPwd,
  checkImg,
  checkAuthData,
  checkProfileEditData,
  checkRegisterData,
} from './inputValidation.js';

const service = new BlogService();

export const authSetUser = (e) => {
  return { type: AUTH_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const registerSetUser = (e) => {
  return { type: REGISTER_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const profileEditSetUser = (e) => {
  return { type: PROFILE_EDIT_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const registerSetAgreementCheckbox = (e) => {
  return { type: REGISTER_SET_CHECKBOX, payload: e.target.checked };
};

export function registerNewUser(user) {
  return (dispatch) => {
    const check =
      !user.username ||
      !checkUsername(user.username) ||
      !user.email ||
      !checkEmail(user.email) ||
      !user.password ||
      !checkPwd(user.password) ||
      !user.repeatPwd ||
      !checkPwd(user.repeatPwd) ||
      !user.agreementCheckbox ||
      user.password !== user.repeatPwd;
    if (check) {
      dispatch(checkRegisterData(user));
      dispatch({ type: REGISTER_CLEAR_PWD });
    } else {
      dispatch(checkRegisterData(user));
      dispatch(showLoader());
      service
        .registerUser(user)
        .then((res) => {
          if (res.errors) {
            if (res.errors.username)
              dispatch({ type: REGISTER_SET_VALIDATION_ERR, payload: { username: res.errors.username } });
            if (res.errors.email) dispatch({ type: REGISTER_SET_VALIDATION_ERR, payload: { email: res.errors.email } });
            dispatch({ type: REGISTER_CLEAR_PWD });
          } else {
            dispatch({ type: REGISTER_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
            dispatch(registerClearForm());
          }
          dispatch(showLoader(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(registerClearForm());
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function authUser(user) {
  return (dispatch) => {
    if (!user.email || !user.password || !checkEmail(user.email) || !checkPwd(user.password)) {
      dispatch(checkAuthData(user));
      dispatch({ type: AUTH_CLEAR_PWD });
    } else {
      dispatch(checkAuthData(user));
      dispatch(showLoader());
      service
        .login(user)
        .then((res) => {
          if (res.errors) {
            dispatch({ type: AUTH_SET_VALIDATION_ERR, payload: { email: 'Email or password is invalid' } });
            dispatch({ type: AUTH_SET_VALIDATION_ERR, payload: { password: 'Email or password is invalid' } });
            dispatch({ type: AUTH_CLEAR_PWD });
          } else {
            dispatch({ type: AUTH_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
            dispatch(authClearForm());
          }
          dispatch(showLoader(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(authClearForm());
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function saveEditedUser(token, user) {
  return (dispatch) => {
    if (
      !user.email ||
      !user.password ||
      !user.username ||
      !user.image ||
      !checkEmail(user.email) ||
      !checkPwd(user.password) ||
      !checkUsername(user.username) ||
      !checkImg(user.image)
    ) {
      dispatch(checkProfileEditData(user));
      dispatch(profileClearPwd());
    } else {
      dispatch(checkProfileEditData(user));
      dispatch(showLoader());
      service
        .updateUser(token, user)
        .then((res) => {
          if (res.errors) {
            dispatch({
              type: PROFILE_EDIT_SET_VALIDATION_ERR,
              payload: { email: 'Email or username is already taken', username: 'Email or username is already taken' },
            });
            dispatch(profileClearPwd());
          } else {
            dispatch(profileGetUserByToken(token));
          }
          dispatch(profileClearPwd());
          dispatch(showLoader(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(showLoader(false));
          dispatch(showConnectionError());
          dispatch(profileClearPwd());
        });
    }
  };
}

export function profileGetUserByToken(token) {
  return (dispatch) => {
    dispatch(showLoader());
    service
      .getCurrentUser(token)
      .then((res) => {
        if (res.errors) {
          dispatch(showConnectionError());
        } else {
          dispatch(profileSaveUser(res.user));
          dispatch({ type: SAVE_TOKEN, payload: res.user.token });
        }
        dispatch(showLoader(false));
      })
      .catch((e) => {
        console.log(e);
        dispatch(showConnectionError());
        dispatch(showLoader(false));
      });
  };
}

export const registerClearForm = () => {
  return { type: REGISTER_CLEAR_FORM };
};

export const authClearForm = () => {
  return { type: AUTH_CLEAR_FORM };
};

export const profileClearPwd = () => {
  return { type: PROFILE_EDIT_CLEAR_PWD };
};

export const logout = () => {
  localStorage.clear();
  return { type: LOGOUT };
};

function profileSaveUser(user) {
  return { type: PROFILE_SAVE_USER, payload: user };
}

function showLoader(visible = true) {
  return { type: SHOW_LOADER, payload: visible };
}

function showConnectionError() {
  return { type: SHOW_CONNECTION_ERROR };
}
