import React from 'react';
import cn from 'classnames';

import { withValidation } from '../../../../hoc/withValidation/withValidation';

import classes from './NewArticleTextarea.module.scss';

const NewArticleTextarea = ({ err, ...props }) => {
  return (
    <div className={classes.elem}>
      <label className={classes.elem__label} htmlFor={props.id}>
        {props.name}
      </label>
      <textarea {...props} className={err ? cn(classes.elem__textarea, classes.input_err) : classes.elem__textarea} />
    </div>
  );
};

export const NewArticleTextareaValidation = withValidation(NewArticleTextarea);
