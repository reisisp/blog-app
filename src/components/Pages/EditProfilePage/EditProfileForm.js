import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as profileActions from '../../../store/profileReducer/profileActions';
import { NewInputWithValidation } from '../../UI/Inputs/NewInput/NewInput';
import { Btn } from '../../UI/Btn/Btn';

import classes from './EditProfileForm.module.scss';

const EditProfileForm = ({
  user,
  validationErrors,
  profileEditSetUser,
  saveEditedUser,
  token,
  profilePrepareEditPage,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (!token) history.push('/');
    if (token) profilePrepareEditPage();
  }, [token]);

  const validInputs = [
    {
      val: user.username,
      err: validationErrors.username,
      id: 'username',
      type: 'text',
      placeholder: 'Username',
      name: 'Username',
    },
    {
      val: user.email,
      err: validationErrors.email,
      id: 'email',
      type: 'email',
      placeholder: 'Email address',
      name: 'Email address',
    },
    {
      val: user.password,
      err: validationErrors.password,
      id: 'password',
      type: 'password',
      placeholder: 'New password',
      name: 'New password',
    },
    {
      val: user.image,
      err: validationErrors.image,
      id: 'image',
      type: 'text',
      placeholder: 'Avatar image',
      name: 'Avatar image (url)',
    },
  ];

  return (
    <section className={classes.profile}>
      <div className={classes.profile__heading}>Edit&nbsp;Profile</div>
      <div className={classes.profile__inputs}>
        {validInputs.map((el) => (
          <NewInputWithValidation
            key={el.id}
            err={el.err}
            value={el.val}
            onChange={profileEditSetUser}
            id={el.id}
            type={el.type}
            placeholder={el.placeholder}
            name={el.name}
          />
        ))}
      </div>
      <div className={classes.profile__btns}>
        <Btn confirmBtn onClick={() => saveEditedUser(token, user)}>
          Save
        </Btn>
      </div>
    </section>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.token,
    user: profileReducer.editProfileUser,
    validationErrors: profileReducer.validationErrors,
  };
}

export default connect(mapStateToProps, profileActions)(EditProfileForm);
