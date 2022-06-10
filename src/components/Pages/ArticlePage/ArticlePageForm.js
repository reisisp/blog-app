import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import { MarkdownBody } from '../../MarkdownBody/MarkdownBody';
import { Btn } from '../../UI/Btn/Btn';
import { ApplyModal } from '../../ApplyModal/ApplyModal';
import { ArticleCardForm } from '../../ArticleCard/ArticleCardForm';
import BlogService from '../../../service/service-blog';

import classes from './ArticlePageForm.module.scss';

const service = new BlogService();

const ArticlePageForm = ({ token, currentUser, showConnectionError, showLoader }) => {
  const [article, setArticle] = useState({});
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const currentSlug = locationArr[locationArr.length - 1];

  function getArticle(slug) {
    showLoader();
    service
      .getArticleBySlug(slug)
      .then((res) => {
        setArticle(res.article);
        showLoader(false);
      })
      .catch(() => {
        showConnectionError();
        showLoader(false);
      });
  }

  function deleteArticle(slug) {
    showLoader();
    service
      .deleteArticle(slug)
      .then(() => {
        history.push('/');
        showLoader(false);
      })
      .catch(() => {
        showConnectionError();
        showLoader(false);
      });
  }

  useEffect(() => {
    getArticle(currentSlug);
  }, [token]);
  return (
    <article className={classes.article}>
      {article.author ? (
        <>
          <ArticleCardForm article={article} />
          {currentUser === article.author.username && (
            <>
              <div className={classes.article__btns}>
                <Btn deleteArticlebtn onClick={() => setModal(true)}>
                  Delete
                </Btn>
                <Btn editArticlebtn to={`/articles/${currentSlug}/edit`}>
                  Edit
                </Btn>
                {modal && (
                  <ApplyModal actionConfirm={() => deleteArticle(currentSlug)} actionClose={() => setModal(false)} />
                )}
              </div>
            </>
          )}
          <MarkdownBody text={article.body} />
        </>
      ) : null}
    </article>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    currentUser: profileReducer.user.username,
    token: profileReducer.token,
  };
}

export default connect(mapStateToProps, articlesActions)(ArticlePageForm);
