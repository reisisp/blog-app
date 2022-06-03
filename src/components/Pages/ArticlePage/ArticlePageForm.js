import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { bindActionCreators } from 'redux';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import * as modalWindowActions from '../../../store/modalWindowReducer/modalWindowActions';
import { MarkdownBody } from '../../MarkdownBody/MarkdownBody';
import { Btn } from '../../UI/Btn/Btn';
import { ApplyModal } from '../../ApplyModal/ApplyModal';
import { ArticleCardForm } from '../../ArticleCard/ArticleCardForm';

import classes from './ArticlePageForm.module.scss';

const ArticlePageForm = ({
  currentArticle,
  token,
  modalVisible,
  currentUser,
  deleteSuccess,
  deleteArticle,
  getArticleBySlug,
  deleteConfirmation,
  setModalVisible,
}) => {
  const history = useHistory();
  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const currentSlug = locationArr[locationArr.length - 1];
  useEffect(() => {
    if (deleteSuccess) {
      history.push('/');
      deleteConfirmation(false);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    getArticleBySlug(currentSlug, token);
    setModalVisible(false);
  }, [token]);
  return (
    <article className={classes.article}>
      {currentArticle.author ? (
        <>
          <ArticleCardForm article={currentArticle} />
          {currentUser === currentArticle.author.username && (
            <>
              <div className={classes.article__btns}>
                <Btn deleteArticlebtn onClick={() => setModalVisible(true)}>
                  Delete
                </Btn>
                <Btn editArticlebtn to={`/articles/${currentSlug}/edit`}>
                  Edit
                </Btn>
                {modalVisible && (
                  <ApplyModal
                    actionConfirm={() => deleteArticle(token, currentSlug)}
                    actionClose={() => setModalVisible(false)}
                  />
                )}
              </div>
            </>
          )}
          <MarkdownBody text={currentArticle.body} />
        </>
      ) : null}
    </article>
  );
};

function mapStateToProps({ articlesReducer, profileReducer, modalWindowReducer }) {
  return {
    currentArticle: articlesReducer.currentArtcile,
    currentUser: profileReducer.user.username,
    token: profileReducer.token,
    modalVisible: modalWindowReducer.modalVisible,
    deleteSuccess: articlesReducer.deleteSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  const { setModalVisible } = bindActionCreators(modalWindowActions, dispatch);
  const { deleteArticle, getArticleBySlug, deleteConfirmation } = bindActionCreators(articlesActions, dispatch);
  return { setModalVisible, deleteArticle, getArticleBySlug, deleteConfirmation };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePageForm);
