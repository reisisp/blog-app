import BlogService from '../../service/service-blog';
import {
  LOGOUT,
  SAVE_TOKEN,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
  AUTH_CLEAR_PWD,
  AUTH_SET_USER,
  PROFILE_EDIT_CLEAR_PWD,
  PROFILE_EDIT_SET_USER,
  PROFILE_SET_VALIDATION_ERR,
  REGISTER_CLEAR_PWD,
  REGISTER_PREPARE_PAGE,
  REGISTER_SET_CHECKBOX,
  REGISTER_SET_USER,
  AUTH_PREPARE_PAGE,
  SAVE_USER,
  PROFILE_PREPARE_EDIT_PAGE,
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
            if (res.errors.username) dispatch(addValidationErr({ username: res.errors.username }));
            if (res.errors.email) dispatch(addValidationErr({ email: res.errors.email }));
            dispatch({ type: REGISTER_CLEAR_PWD });
          } else {
            dispatch({ type: SAVE_USER, payload: { ...res.user } });
            dispatch({ type: SAVE_TOKEN, payload: res.user.token });
          }
          dispatch(showLoader(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(registerPreparePage());
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
            dispatch(
              addValidationErr({ email: 'Email or password is invalid', password: 'Email or password is invalid' })
            );
            dispatch({ type: AUTH_CLEAR_PWD });
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
            dispatch(
              addValidationErr({
                email: 'Email or username is already taken',
                password: 'Email or username is already taken',
              })
            );
            dispatch(profileClearPwd());
          } else {
            dispatch(profileGetUserByToken(token));
          }
          dispatch(profileClearPwd());
          dispatch(showLoader(false));
        })
        .catch(() => {
          dispatch(showLoader(false));
          dispatch(showConnectionError());
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

export const profilePrepareEditPage = () => {
  return { type: PROFILE_PREPARE_EDIT_PAGE };
};

export const profileEditSetUser = (e) => {
  return { type: PROFILE_EDIT_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const profileClearPwd = () => {
  return { type: PROFILE_EDIT_CLEAR_PWD };
};

export const authPreparePage = () => {
  return { type: AUTH_PREPARE_PAGE };
};

export const authSetUser = (e) => {
  return { type: AUTH_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const registerPreparePage = () => {
  return { type: REGISTER_PREPARE_PAGE };
};

export const registerSetUser = (e) => {
  return { type: REGISTER_SET_USER, payload: { [e.target.id]: e.target.value } };
};

export const registerSetAgreementCheckbox = (e) => {
  return { type: REGISTER_SET_CHECKBOX, payload: e.target.checked };
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
