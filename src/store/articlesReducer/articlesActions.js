import BlogService from '../../service/service-blog';
import {
  ARTICLES_ARTICLE_DELETE_ARTICLE,
  ARTICLES_ARTICLE_FAVORITE_ACTION,
  ARTICLES_ARTICLE_UPDATE_ARTICLE,
  ARTICLES_CLEAR_ARTICLES,
  ARTICLES_NEW_ARTICLE_PREPARE_PAGE,
  ARTICLES_NEW_ARTICLE_SET_SLUG,
  ARTICLES_SAVE_ARTICLE,
  ARTICLES_SAVE_ARTICLES,
  ARTICLES_SAVE_TOTAL_PAGES,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
} from '../reduxTypes';

import { checkData } from './inputValidation';

const service = new BlogService();

export function updateArticle(slug, article) {
  return (dispatch) => {
    if (!article.title || !article.description || !article.body) {
      dispatch(checkData(article));
    } else {
      dispatch(checkData(article));
      dispatch(showLoader());
      const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
      service
        .updateArticle(slug, article, token)
        .then(() => {
          dispatch(editConfirmation(true));
          dispatch(showLoader(false));
        })
        .catch(() => {
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function createArticle(article) {
  return (dispatch) => {
    if (!article.title || !article.description || !article.body) {
      dispatch(checkData(article));
    } else {
      dispatch(checkData(article));
      dispatch(showLoader());
      const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
      service
        .createArticle(article, token)
        .then((res) => {
          dispatch({ type: ARTICLES_NEW_ARTICLE_SET_SLUG, payload: res.article.slug });
          dispatch(showLoader(false));
        })
        .catch(() => {
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function deleteArticle(slug) {
  return (dispatch) => {
    dispatch(showLoader());
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .deleteArticle(slug, token)
      .then(() => {
        dispatch(deleteConfirmation(true));
        dispatch(showLoader(false));
      })
      .catch(() => {
        dispatch(showConnectionError());
        dispatch(showLoader(false));
      });
  };
}

export function getArticleBySlug(slug) {
  return (dispatch) => {
    dispatch(showLoader());
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .getArticleBySlug(slug, token)
      .then((res) => {
        dispatch(saveArticle(res.article));
        dispatch(showLoader(false));
      })
      .catch(() => {
        dispatch(showConnectionError());
        dispatch(showLoader(false));
      });
  };
}

export function getArticles(page) {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: ARTICLES_CLEAR_ARTICLES });
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .getArticlesByPage(page, token)
      .then((res) => {
        dispatch({ type: ARTICLES_SAVE_TOTAL_PAGES, payload: res.articlesCount });
        dispatch(saveArticles(res.articles));
        dispatch(showLoader(false));
      })
      .catch(() => {
        dispatch(showConnectionError());
        dispatch(showLoader(false));
      });
  };
}

export function setFavorite(slug) {
  return (dispatch) => {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .setFavorite(slug, token)
      .then((res) => {
        dispatch(favoriteAction(res.article.favorited, res.article.favoritesCount, res.article.slug));
      })
      .catch((e) => {
        console.log(e, 'Не думаю, чтол при уставновке лайка система должна отображать ошибку, лучше проигнорировать');
      });
  };
}

export function removeFavorite(slug) {
  return (dispatch) => {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .removeFavorite(slug, token)
      .then((res) => {
        dispatch(favoriteAction(res.article.favorited, res.article.favoritesCount, res.article.slug));
      })
      .catch((e) => {
        console.log(e, 'Не думаю, чтол при уставновке лайка система должна отображать ошибку, лучше проигнорировать');
      });
  };
}

export function newArticlePreparePage() {
  return { type: ARTICLES_NEW_ARTICLE_PREPARE_PAGE };
}

export function editConfirmation(confirm) {
  return {
    type: ARTICLES_ARTICLE_UPDATE_ARTICLE,
    payload: confirm,
  };
}

export function deleteConfirmation(confirm) {
  return {
    type: ARTICLES_ARTICLE_DELETE_ARTICLE,
    payload: confirm,
  };
}

function saveArticles(articles) {
  return { type: ARTICLES_SAVE_ARTICLES, payload: articles };
}

function saveArticle(article) {
  return { type: ARTICLES_SAVE_ARTICLE, payload: article };
}

function favoriteAction(favorited, favoritesCount, slug) {
  return { type: ARTICLES_ARTICLE_FAVORITE_ACTION, payload: { favorited, favoritesCount, slug } };
}

function showLoader(visible = true) {
  return { type: SHOW_LOADER, payload: visible };
}

function showConnectionError() {
  return { type: SHOW_CONNECTION_ERROR };
}
