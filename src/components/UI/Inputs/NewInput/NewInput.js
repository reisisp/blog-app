import React from 'react';
import cn from 'classnames';

import { withValidation } from '../../../../hoc/withValidation/withValidation';

import classes from './NewInput.module.scss';

const NewInput = ({ err, ...props }) => {
  return (
    <div className={classes.elem}>
      <label className={classes.elem__label} htmlFor={props.id}>
        {props.name}
      </label>
      <input {...props} className={err ? cn(classes.elem__input, classes.input_err) : classes.elem__input} />
    </div>
  );
};

export const NewInputWithValidation = withValidation(NewInput);
