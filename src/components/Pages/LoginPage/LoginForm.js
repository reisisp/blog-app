import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as profileActions from '../../../store/profileReducer/profileActions';
import { NewInputWithValidation } from '../../UI/Inputs/NewInput/NewInput';
import { Btn } from '../../UI/Btn/Btn';

import classes from './LoginForm.module.scss';

const LoginForm = ({ validationErrors, authUser, preparePage }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const editUser = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const login = () => {
    authUser(user);
    setUser({ ...user, password: '' });
  };

  useEffect(() => {
    preparePage();
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
            onChange={editUser}
            err={el.err}
            id={el.id}
            type={el.type}
            placeholder={el.placeholder}
            name={el.name}
          />
        ))}
      </div>
      <div className={classes.login__btns}>
        <Btn confirmBtn onClick={login}>
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
    validationErrors: profileReducer.validationErrors,
  };
}

export default connect(mapStateToProps, profileActions)(LoginForm);
