import React from 'react';
import ReactMarkdown from 'react-markdown';

import classes from './MarkdownBody.module.scss';

export const MarkdownBody = ({ text }) => {
  return <ReactMarkdown className={classes.markBody}>{text}</ReactMarkdown>;
};
