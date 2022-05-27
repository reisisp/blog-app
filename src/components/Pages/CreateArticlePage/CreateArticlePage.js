import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import CreateEditArticlePageForm from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';

const CreateArticlePage = withContainer(
  withLoadingAndErrors(
    ({ createArticle, token, article, newArticleClearForm, slug }) => {
      const history = useHistory();
      useEffect(() => {
        newArticleClearForm();
      }, []);
      useEffect(() => {
        if (!token) history.push('/');
      }, [token]);
      useEffect(() => {
        if (slug) history.push(`/articles/${slug}`);
        newArticleClearForm();
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
    slug: articlesReducer.newArticleSlug,
    article: articlesReducer.newArticle,
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateArticlePage);
