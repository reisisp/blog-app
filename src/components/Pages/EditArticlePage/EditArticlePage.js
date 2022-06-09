import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import { CreateEditArticlePageForm } from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';
import BlogService from '../../../service/service-blog';
import { checkData } from '../../../store/articlesReducer/inputValidation';

const service = new BlogService();

const EditArticlePage = withContainer(
  withLoadingAndErrors(
    ({ showConnectionError, showLoader }) => {
      const [article, setArticle] = useState({});

      const history = useHistory();
      const location = useLocation();
      const locationArr = location.pathname.split('/');
      const currentSlug = locationArr[locationArr.length - 2];

      function getArticle(slug) {
        showLoader();
        const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
        service
          .getArticleBySlug(slug, token)
          .then((res) => {
            setArticle(res.article);
            showLoader(false);
          })
          .catch(() => {
            showConnectionError();
            showLoader(false);
          });
      }
      function updateArticle(article, setError) {
        if (!article.title || !article.description || !article.body) {
          checkData(article, setError);
        } else {
          checkData(article, setError);
          showLoader();
          const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
          service
            .updateArticle(currentSlug, article, token)
            .then(() => {
              history.push(`/articles/${currentSlug}`);
              showLoader(false);
            })
            .catch(() => {
              showConnectionError();
              showLoader(false);
            });
        }
      }
      useEffect(() => {
        getArticle(currentSlug);
      }, []);

      return <CreateEditArticlePageForm formAction={updateArticle} currentArticle={article} />;
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

export default connect(mapStateToProps, articlesActions)(EditArticlePage);
