import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import { CreateEditArticlePageForm } from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';
import BlogService from '../../../service/service-blog';
import { checkData } from '../../../store/articlesReducer/inputValidation';

const service = new BlogService();

const CreateArticlePage = withContainer(
  withLoadingAndErrors(
    ({ showLoader, showConnectionError }) => {
      const history = useHistory();
      function createArticle(article, setError) {
        if (!article.title || !article.description || !article.body) {
          checkData(article, setError);
        } else {
          checkData(article, setError);
          showLoader();
          service
            .createArticle(article)
            .then((res) => {
              history.push(`/articles/${res.article.slug}`);
              showLoader(false);
            })
            .catch(() => {
              showConnectionError();
              showLoader(false);
            });
        }
      }
      return <CreateEditArticlePageForm formAction={createArticle} currentArticle={{}} />;
    },
    'normal',
    'normal'
  ),
  'normal'
);

function mapStateToProps({ articlesReducer }) {
  return {
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateArticlePage);
