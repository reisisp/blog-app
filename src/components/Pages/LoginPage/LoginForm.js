import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as profileActions from '../../../store/profileReducer/profileActions';
import { NewInputWithValidation } from '../../UI/Inputs/NewInput/NewInput';
import { Btn } from '../../UI/Btn/Btn';

import classes from './LoginForm.module.scss';

const LoginForm = ({ token, user, validationErrors, authSetUser, authUser, authPreparePage }) => {
  const history = useHistory();
  useEffect(() => {
    if (token) history.push('/');
  }, [token]);
  useEffect(() => {
    authPreparePage();
  }, []);
  const validInputs = [
    {
      err: validationErrors.email,
      val: user.email,
      id: 'email',
      type: 'email',
      placeholder: 'Email address',
      name: 'Email address',
    },
    {
      err: validationErrors.password,
      val: user.password,
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      name: 'Password',
    },
  ];
  return (
    <section className={classes.login}>
      <div className={classes.login__heading}>Sign In</div>
      <div className={classes.login__inputs}>
        {validInputs.map((el) => (
          <NewInputWithValidation
            key={el.id}
            value={el.val}
            onChange={authSetUser}
            err={el.err}
            id={el.id}
            type={el.type}
            placeholder={el.placeholder}
            name={el.name}
          />
        ))}
      </div>
      <div className={classes.login__btns}>
        <Btn confirmBtn onClick={() => authUser(user)}>
          Login
        </Btn>
        <p className={classes.signup}>
          <span className={classes.singup__heading}>Don`t have an account?</span>&nbsp;
          <Link to="/sign-up">
            <span className={classes.signup__btn}>Sign&nbsp;Up.</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.token,
    user: profileReducer.authUser,
    validationErrors: profileReducer.validationErrors,
  };
}

export default connect(mapStateToProps, profileActions)(LoginForm);
