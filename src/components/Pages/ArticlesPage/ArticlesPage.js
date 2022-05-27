import React from 'react';
import { connect } from 'react-redux';

import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';
import { withContainer } from '../../../hoc/withContainer/withContainer';

import ArticlesPageForm from './ArticlesPageForm';

const ArticlesPage = withContainer(
  withLoadingAndErrors(() => <ArticlesPageForm />),
  'normal'
);

function mapStateToProps({ articlesReducer }) {
  return {
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps)(ArticlesPage);
