import BlogService from '../../service/service-blog';
import {
  LOGOUT,
  SAVE_TOKEN,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
  PROFILE_SET_VALIDATION_ERR,
  SAVE_USER,
  PROFILE_PREPARE_PAGE,
  PROFILE_EDIT_SUCCESS,
} from '../reduxTypes';

import {
  checkEmail,
  checkUsername,
  checkPwd,
  checkAuthData,
  checkProfileEditData,
  checkRegisterData,
} from './inputValidation.js';

const service = new BlogService();

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
    } else {
      dispatch(checkRegisterData(user));
      dispatch(showLoader());
      service
        .registerUser(user)
        .then((res) => {
          if (res.errors) {
            if (res.errors.username) dispatch(addValidationErr({ username: res.errors.username }));
            if (res.errors.email) dispatch(addValidationErr({ email: res.errors.email }));
          } else {
            dispatch({ type: SAVE_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
            localStorage.setItem('token', res.user.token);
          }
          dispatch(showLoader(false));
        })
        .catch(() => {
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
    } else {
      dispatch(checkAuthData(user));
      dispatch(showLoader());
      service
        .login(user)
        .then((res) => {
          if (res.errors) {
            dispatch(
              addValidationErr({ email: 'Email or password is invalid', password: 'Email or password is invalid' })
            );
          } else {
            dispatch({ type: SAVE_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
            localStorage.setItem('token', res.user.token);
          }
          dispatch(showLoader(false));
        })
        .catch(() => {
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function saveEditedUser(user) {
  return (dispatch) => {
    if (!user.email || !user.username || !checkEmail(user.email) || !checkUsername(user.username)) {
      dispatch(checkProfileEditData(user));
    } else {
      dispatch(checkProfileEditData(user));
      dispatch(showLoader());
      const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
      service
        .updateUser(token, user)
        .then((res) => {
          if (res.errors) {
            dispatch(
              addValidationErr({
                email: 'Email or username is already taken',
                username: 'Email or username is already taken',
              })
            );
          } else {
            dispatch({ type: SAVE_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
            dispatch(profileEditSuccess());
          }
          dispatch(showLoader(false));
        })
        .catch(() => {
          dispatch(showLoader(false));
          dispatch(showConnectionError());
        });
    }
  };
}

export function profileGetUserByToken() {
  return (dispatch) => {
    dispatch(showLoader());
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .getCurrentUser(token)
      .then((res) => {
        if (res.errors) {
          dispatch(showConnectionError());
        } else {
          dispatch({ type: SAVE_USER, payload: { ...res.user } });
          dispatch({ type: SAVE_TOKEN, payload: res.user.token });
        }
        dispatch(showLoader(false));
      })
      .catch(() => {
        dispatch(showConnectionError());
        dispatch(showLoader(false));
      });
  };
}

const profileEditSuccess = (success = true) => {
  return { type: PROFILE_EDIT_SUCCESS, payload: success };
};

export const profilePrepareEditPage = () => {
  return (dispatch) => {
    dispatch(profileEditSuccess(false));
    dispatch(preparePage());
  };
};

export const preparePage = () => {
  return { type: PROFILE_PREPARE_PAGE };
};

export const logout = () => {
  localStorage.clear();
  return { type: LOGOUT };
};

function showLoader(visible = true) {
  return { type: SHOW_LOADER, payload: visible };
}

function showConnectionError() {
  return { type: SHOW_CONNECTION_ERROR };
}

function addValidationErr(err) {
  return { type: PROFILE_SET_VALIDATION_ERR, payload: err };
}
