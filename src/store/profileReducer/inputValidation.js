import { AUTH_SET_VALIDATION_ERR, PROFILE_EDIT_SET_VALIDATION_ERR, REGISTER_SET_VALIDATION_ERR } from '../reduxTypes';

export function checkProfileEditData(user) {
  return (dispatch) => {
    const check =
      !user.email ||
      !user.password ||
      !user.username ||
      !user.image ||
      !checkEmail(user.email) ||
      !checkPwd(user.password) ||
      !checkUsername(user.username) ||
      !checkImg(user.image);
    if (check) {
      validateUserName(user.username, dispatch, PROFILE_EDIT_SET_VALIDATION_ERR);
      validateEmail(user.email, dispatch, PROFILE_EDIT_SET_VALIDATION_ERR);
      validatePwd(user.password, dispatch, PROFILE_EDIT_SET_VALIDATION_ERR);
      validateImg(user.image, dispatch, PROFILE_EDIT_SET_VALIDATION_ERR);
    } else {
      dispatch({
        type: PROFILE_EDIT_SET_VALIDATION_ERR,
        payload: { username: '', email: '', password: '', image: '' },
      });
    }
  };
}

export function checkRegisterData(user) {
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
      validateUserName(user.username, dispatch, REGISTER_SET_VALIDATION_ERR);
      validateEmail(user.email, dispatch, REGISTER_SET_VALIDATION_ERR);
      validatePwd(user.password, dispatch, REGISTER_SET_VALIDATION_ERR);
      validateRepeatPwd(user.repeatPwd, dispatch, REGISTER_SET_VALIDATION_ERR);
      validateCheckBox(user.agreementCheckbox, dispatch, REGISTER_SET_VALIDATION_ERR);
      if (user.password !== user.repeatPwd) {
        dispatch({ type: REGISTER_SET_VALIDATION_ERR, payload: { password: 'Passwords must match' } });
        dispatch({ type: REGISTER_SET_VALIDATION_ERR, payload: { repeatPwd: 'Passwords must match' } });
      }
    } else {
      dispatch({
        type: REGISTER_SET_VALIDATION_ERR,
        payload: { username: '', email: '', password: '', repeatPwd: '', agreementCheckbox: '' },
      });
    }
  };
}
export function checkAuthData(user) {
  return (dispatch) => {
    const check = !user.email || !checkEmail(user.email) || !user.password || !checkPwd(user.password);
    if (check) {
      validateEmail(user.email, dispatch, AUTH_SET_VALIDATION_ERR);
      validatePwd(user.password, dispatch, AUTH_SET_VALIDATION_ERR);
    } else {
      dispatch({
        type: AUTH_SET_VALIDATION_ERR,
        payload: { email: '', password: '' },
      });
    }
  };
}

export function checkEmail(email) {
  const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return re.test(String(email));
}

export function checkPwd(pwd) {
  const re = /^[а-яёa-zA-Z0-9%~_-]{6,40}$/;
  return re.test(String(pwd));
}

export function checkUsername(username) {
  const re = /^[а-яёa-zA-Z0-9]{3,20}$/;
  return re.test(username);
}

export function checkImg(img) {
  const re = /^.{20,300}.(jpg|png|jpeg)$/;
  return re.test(img);
}

function validateUserName(username, dispatch, validationType) {
  if (!checkUsername(username)) dispatch({ type: validationType, payload: { username: 'Username must be correct' } });
  if (!username) dispatch({ type: validationType, payload: { username: 'Username cannot be empty' } });
  if (username && checkUsername(username)) dispatch({ type: validationType, payload: { username: '' } });
}
function validateEmail(email, dispatch, validationType) {
  if (!checkEmail(email)) dispatch({ type: validationType, payload: { email: 'Email must be correct' } });
  if (!email) dispatch({ type: validationType, payload: { email: 'Email cannot be empty' } });
  if (email && checkEmail(email)) dispatch({ type: validationType, payload: { email: '' } });
}
function validatePwd(password, dispatch, validationType) {
  if (!checkPwd(password)) dispatch({ type: validationType, payload: { password: 'Password must be correct' } });
  if (!password) dispatch({ type: validationType, payload: { password: 'Password cannot be empty' } });
  if (password && checkPwd(password)) dispatch({ type: validationType, payload: { password: '' } });
}
function validateRepeatPwd(repeatPwd, dispatch, validationType) {
  if (!checkPwd(repeatPwd)) dispatch({ type: validationType, payload: { repeatPwd: 'Password must be correct' } });
  if (!repeatPwd) dispatch({ type: validationType, payload: { repeatPwd: 'Password cannot be empty' } });
  if (repeatPwd && checkPwd(repeatPwd)) dispatch({ type: validationType, payload: { password: '' } });
}
function validateCheckBox(agreementCheckbox, dispatch, validationType) {
  if (!agreementCheckbox) dispatch({ type: validationType, payload: { agreementCheckbox: 'click' } });
  if (agreementCheckbox) dispatch({ type: validationType, payload: { agreementCheckbox: '' } });
}
function validateImg(image, dispatch, validationType) {
  if (!checkImg(image)) dispatch({ type: validationType, payload: { image: 'Image must be correct' } });
  if (!image) dispatch({ type: validationType, payload: { image: 'Image cannot be empty' } });
  if (image && checkImg(image)) dispatch({ type: validationType, payload: { image: '' } });
}
