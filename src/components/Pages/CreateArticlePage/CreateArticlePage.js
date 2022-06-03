import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import CreateEditArticlePageForm from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';

const CreateArticlePage = withContainer(
  withLoadingAndErrors(
    ({ token, slug, newArticlePreparePage, createArticle }) => {
      const history = useHistory();
      useEffect(() => {
        if (localStorage.getItem('token') === null) history.push('/');
      }, [token]);
      useEffect(() => {
        if (slug) history.push(`/articles/${slug}`);
        newArticlePreparePage();
      }, [slug]);
      return <CreateEditArticlePageForm formAction={createArticle} edit={false} />;
    },
    'normal',
    'normal'
  ),
  'normal'
);

function mapStateToProps({ articlesReducer, profileReducer }) {
  return {
    token: profileReducer.token,
    slug: articlesReducer.newArticleSlug,
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateArticlePage);
