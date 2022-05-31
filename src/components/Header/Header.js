import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as profileActions from '../../store/profileReducer/profileActions';
import { Btn } from '../UI/Btn/Btn';
import HeaderProfile from '../HeaderProfile/HeaderProfile';

import classes from './Header.module.scss';

const Header = ({ token, profileGetUserByToken }) => {
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    if (!token) {
      const savedToken = localStorage.getItem('token');
      if (typeof savedToken === 'string') profileGetUserByToken(savedToken);
    }
  }, [token]);

  console.log('Token:', token);
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__logo}>
        Realworld Blog
      </Link>
      <div className={classes.header__btns}>
        {!token ? (
          <>
            <Btn to="/sign-in" signInBtn>
              Sign&nbsp;In
            </Btn>
            <Btn to="/sign-up" signUpBtn>
              Sign&nbsp;Up
            </Btn>
          </>
        ) : (
          <HeaderProfile />
        )}
      </div>
    </header>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.token,
  };
}

export default connect(mapStateToProps, profileActions)(Header);
