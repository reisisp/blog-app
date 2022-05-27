import React from 'react';

import Spinner from '../Spinner';

import classes from './SmallSpinner.module.scss';

export const SmallSpinner = () => {
  return (
    <div className={classes.small}>
      <Spinner />
    </div>
  );
};
