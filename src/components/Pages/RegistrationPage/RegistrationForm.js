import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as profileActions from '../../../store/profileReducer/profileActions';
import { CustomCheckBox } from '../../UI/Inputs/CustomCheckBox/CustomCheckBox';
import { NewInputWithValidation } from '../../UI/Inputs/NewInput/NewInput';
import { Btn } from '../../UI/Btn/Btn';

import classes from './RegistrationForm.module.scss';

const RegistrationForm = ({
  token,
  user,
  validationErrors,
  registerPreparePage,
  registerSetUser,
  registerSetAgreementCheckbox,
  registerNewUser,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (token) history.push('/');
  }, [token]);
  useEffect(() => {
    registerPreparePage();
  }, []);
  const inputs = [
    {
      err: validationErrors.username,
      val: user.username,
      id: 'username',
      type: 'text',
      placeholder: 'Username',
      name: 'Username',
    },
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
    {
      err: validationErrors.repeatPwd,
      val: user.repeatPwd,
      id: 'repeatPwd',
      type: 'password',
      placeholder: 'Password',
      name: 'Repeat Password',
    },
  ];
  return (
    <section className={classes.register}>
      <div className={classes.register__heading}>Create&nbsp;new&nbsp;account</div>
      <div className={classes.register__inputs}>
        {inputs.map((el) => (
          <NewInputWithValidation
            key={el.id}
            err={el.err}
            value={el.val}
            onChange={registerSetUser}
            id={el.id}
            type={el.type}
            placeholder={el.placeholder}
            name={el.name}
          />
        ))}
      </div>
      <CustomCheckBox
        checked={user.agreementCheckbox}
        onChange={registerSetAgreementCheckbox}
        err={validationErrors.agreementCheckbox}
        name="agreementCheckbox"
        id="agreementCheckbox"
      >
        I agree to the processing of my personal information
      </CustomCheckBox>
      <div className={classes.register__btns}>
        <Btn confirmBtn onClick={() => registerNewUser(user)}>
          Create
        </Btn>
        <p className={classes.signin}>
          <span className={classes.signin__heading}>Already have an account?</span>&nbsp;
          <Link to="/sign-in">
            <span className={classes.signin__btn}>Sign&nbsp;In.</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.token,
    user: profileReducer.newUser,
    validationErrors: profileReducer.validationErrors,
  };
}

export default connect(mapStateToProps, profileActions)(RegistrationForm);
