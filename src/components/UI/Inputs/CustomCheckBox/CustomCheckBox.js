import React from 'react';
import cn from 'classnames';

import classes from './CustomCheckBox.module.scss';

export const CustomCheckBox = ({ err, children, ...props }) => {
  return (
    <div className={classes.elem}>
      <input {...props} type="checkbox" className={classes.elem__checkbox} />
      <label htmlFor={props.id} className={err ? cn(classes.elem__label, classes.elem__err) : classes.elem__label}>
        <span>{children}</span>
      </label>
    </div>
  );
};
