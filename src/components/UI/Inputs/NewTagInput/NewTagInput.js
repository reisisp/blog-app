import React from 'react';

import classes from './NewTagInput.module.scss';

export const NewTagInput = ({ ...props }) => {
  return <input {...props} className={classes.tagInput} />;
};
