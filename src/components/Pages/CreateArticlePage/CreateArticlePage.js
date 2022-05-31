import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import CreateEditArticlePageForm from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';

const CreateArticlePage = withContainer(
  withLoadingAndErrors(
    ({ token, article, slug, newArticlePreparePage, createArticle }) => {
      const history = useHistory();
      useEffect(() => {
        newArticlePreparePage();
      }, []);
      useEffect(() => {
        if (!token) history.push('/');
      }, [token]);
      useEffect(() => {
        if (slug) history.push(`/articles/${slug}`);
        newArticlePreparePage();
      }, [slug]);
      return <CreateEditArticlePageForm formAction={() => createArticle(token, article)} edit={false} />;
    },
    'normal',
    'normal'
  ),
  'normal'
);

function mapStateToProps({ articlesReducer, profileReducer }) {
  return {
    token: profileReducer.token,
    article: articlesReducer.newArticle,
    slug: articlesReducer.newArticleSlug,
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateArticlePage);
