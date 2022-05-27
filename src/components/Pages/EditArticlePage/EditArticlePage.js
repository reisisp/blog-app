import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import CreateEditArticlePageForm from '../../CreateEditArticlePageForm/CreateEditArticlePageForm';
import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';

const EditArticlePage = withContainer(
  withLoadingAndErrors(
    ({ updateArticle, token, article, newArticlePrepareForm, editSuccess, editConfirmation }) => {
      const history = useHistory();
      const location = useLocation();
      const locationArr = location.pathname.split('/');
      const currentSlug = locationArr[locationArr.length - 2];
      useEffect(() => {
        if (!token) history.push('/');
      }, [token]);
      useEffect(() => {
        newArticlePrepareForm();
        editConfirmation(false);
      }, []);
      useEffect(() => {
        if (editSuccess) history.push(`/articles/${currentSlug}`);
      }, [editSuccess]);

      return <CreateEditArticlePageForm formAction={() => updateArticle(currentSlug, article, token)} edit={true} />;
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
    editSuccess: articlesReducer.editSuccess,
    loading: articlesReducer.loader,
    err: articlesReducer.connectionError,
  };
}

export default connect(mapStateToProps, articlesActions)(EditArticlePage);
