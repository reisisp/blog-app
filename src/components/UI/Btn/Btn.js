import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Btn.module.scss';

export const Btn = ({
  deleteBtn = false,
  confirmModalBtn = false,
  editArticlebtn = false,
  deleteArticlebtn = false,
  confirmBtn = false,
  createArticleBtn = false,
  logoutBtn = false,
  signInBtn = false,
  signUpBtn = false,
  children,
  ...props
}) => {
  let btnClass = 'btn';
  if (deleteBtn) btnClass = 'deleteBtn';
  if (confirmBtn) btnClass = 'confirmBtn';
  if (logoutBtn) btnClass = 'logoutBtn';
  if (confirmModalBtn) btnClass = 'confirmModalBtn';
  if (deleteArticlebtn) btnClass = 'deleteArticlebtn';
  if (editArticlebtn) {
    btnClass = 'editArticlebtn';
    return (
      <Link {...props} className={classes[btnClass]}>
        <span>{children}</span>
      </Link>
    );
  }

  if (signUpBtn) {
    btnClass = 'signUpBtn';
    return (
      <Link {...props} className={classes[btnClass]}>
        <span>{children}</span>
      </Link>
    );
  }

  if (signInBtn) {
    btnClass = 'signInBtn';
    return (
      <Link {...props} className={classes[btnClass]}>
        <span>{children}</span>
      </Link>
    );
  }

  if (createArticleBtn) {
    btnClass = 'createArticleBtn';
    return (
      <Link to="/new-article" {...props} className={classes[btnClass]}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button {...props} className={classes[btnClass]}>
      <span>{children}</span>
    </button>
  );
};
