import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as profileActions from '../../store/profileReducer/profileActions';
import { Btn } from '../UI/Btn/Btn';

import logo from './profileDefault.png';
import classes from './HeaderProfile.module.scss';

const HeaderProfile = ({ user, logout, profileClearPwd }) => {
  return (
    <div className={classes.profile}>
      <Btn createArticleBtn={true}>Create article</Btn>
      <Link to="/profile" onClick={profileClearPwd}>
        <div className={classes.profile__main}>
          <span className={classes.profile__name}>{user.username}</span>
          <img className={classes.profile__img} src={!user.image ? logo : user.image} alt="profile" />
        </div>
      </Link>
      <Btn logoutBtn onClick={logout}>
        Log Out
      </Btn>
    </div>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    user: profileReducer.user,
  };
}

export default connect(mapStateToProps, profileActions)(HeaderProfile);
