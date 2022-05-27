import React from 'react';

import { Btn } from '../UI/Btn/Btn';

import classes from './ApplyModal.module.scss';

export const ApplyModal = ({ actionConfirm, actionClose }) => {
  return (
    <div className={classes.modal}>
      <p className={classes.modal__text}>Are you sure to delete this article?</p>
      <div className={classes.modal__btns}>
        <Btn confirmModalBtn onClick={actionClose}>
          No
        </Btn>
        <Btn confirmModalBtn onClick={actionConfirm}>
          Yes
        </Btn>
      </div>
    </div>
  );
};
