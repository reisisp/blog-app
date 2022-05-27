import React from 'react';
import { connect } from 'react-redux';

import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withShadowBox } from '../../../hoc/withShadowBox/withShadowBox';

import ArticlePageForm from './ArticlePageForm';

const ArtcilePage = withContainer(
  withShadowBox(
    withLoadingAndErrors(() => <ArticlePageForm />, 'normal', 'normal'),
    'normal'
  )
);

function mapStateToProps({ articlesReducer }) {
  return {
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps)(ArtcilePage);
