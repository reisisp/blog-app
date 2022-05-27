import React from 'react';

import classes from './TagItem.module.scss';

export const TagItem = ({ tag }) => {
  if (!tag.length) return null;
  return (
    <span className={classes.tag__body}>
      <span className={classes.tag__text}>{tag}</span>
    </span>
  );
};
