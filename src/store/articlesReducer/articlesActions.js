import BlogService from '../../service/service-blog';
import {
  ARTICLES_ARTICLE_DELETE_ARTICLE,
  ARTICLES_ARTICLE_FAVORITE_ACTION,
  ARTICLES_ARTICLE_PREPARE_EDIT_FORM,
  ARTICLES_ARTICLE_UPDATE_ARTICLE,
  ARTICLES_CLEAR_ARTICLES,
  ARTICLES_NEW_ARTICLE_ADD_TAG,
  ARTICLES_NEW_ARTICLE_CLEAR_FORM,
  ARTICLES_NEW_ARTICLE_DELETE_TAG,
  ARTICLES_NEW_ARTICLE_EDIT_TAG,
  ARTICLES_NEW_ARTICLE_SET_ARTICLE,
  ARTICLES_NEW_ARTICLE_SET_NEW_TAG,
  ARTICLES_NEW_ARTICLE_SET_SLUG,
  ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR,
  ARTICLES_SAVE_ARTICLE,
  ARTICLES_SAVE_ARTICLES,
  ARTICLES_SAVE_TOTAL_PAGES,
  SHOW_CONNECTION_ERROR,
  SHOW_LOADER,
} from '../reduxTypes';

const service = new BlogService();

function saveArticles(articles) {
  return { type: ARTICLES_SAVE_ARTICLES, payload: articles };
}

function saveArticle(article) {
  return { type: ARTICLES_SAVE_ARTICLE, payload: article };
}

export function getArticles(page, token) {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: ARTICLES_CLEAR_ARTICLES });
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

export function getArticleBySlug(slug, token) {
  return (dispatch) => {
    dispatch(showLoader());
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

export function createArticle(token, article) {
  return (dispatch) => {
    if (!article.title || !article.description || !article.body) {
      dispatch(checkData(article));
    } else {
      dispatch(checkData(article));
      dispatch(showLoader());
      service
        .createArticle(article, token)
        .then((res) => {
          dispatch({ type: ARTICLES_NEW_ARTICLE_SET_SLUG, payload: res.article.slug });
          dispatch(showLoader(false));
        })
        .catch((e) => {
          console.log(e);
          dispatch(showConnectionError());
          dispatch(showLoader(false));
        });
    }
  };
}

export function deleteArticle(token, slug) {
  return (dispatch) => {
    dispatch(showLoader());
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

export function updateArticle(slug, article, token) {
  return (dispatch) => {
    dispatch(showLoader());
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
  };
}

export function setFavorite(slug, token) {
  return (dispatch) => {
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

export function removeFavorite(slug, token) {
  return (dispatch) => {
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

function favoriteAction(favorited, favoritesCount, slug) {
  return { type: ARTICLES_ARTICLE_FAVORITE_ACTION, payload: { favorited, favoritesCount, slug } };
}

export const setNewArticle = (e) => {
  return { type: ARTICLES_NEW_ARTICLE_SET_ARTICLE, payload: { [e.target.id]: e.target.value } };
};

export const setNewArticleTag = (e) => {
  return { type: ARTICLES_NEW_ARTICLE_SET_NEW_TAG, payload: e.target.value };
};

export const newArticleAddTag = () => {
  return { type: ARTICLES_NEW_ARTICLE_ADD_TAG };
};

export function newArticleDeleteTag(id) {
  return { type: ARTICLES_NEW_ARTICLE_DELETE_TAG, payload: id };
}

export const newArticleEditTag = (e) => {
  return { type: ARTICLES_NEW_ARTICLE_EDIT_TAG, payload: { id: e.target.id, val: e.target.value } };
};

function checkData(article) {
  return (dispatch) => {
    if (!article.title || !article.description || !article.body) {
      if (!article.title)
        dispatch({ type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR, payload: { title: 'Title cannot be empty' } });
      if (article.title) dispatch({ type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR, payload: { title: '' } });

      if (!article.body)
        dispatch({ type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR, payload: { body: 'Body cannot be empty' } });
      if (article.body) dispatch({ type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR, payload: { body: '' } });

      if (!article.description)
        dispatch({
          type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR,
          payload: { description: 'Description cannot be empty' },
        });
      if (article.description)
        dispatch({ type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR, payload: { description: '' } });
    } else {
      dispatch({
        type: ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR,
        payload: { body: '', title: '', description: '' },
      });
    }
  };
}

export function newArticleClearForm() {
  return { type: ARTICLES_NEW_ARTICLE_CLEAR_FORM };
}

export function deleteConfirmation(confirm) {
  return {
    type: ARTICLES_ARTICLE_DELETE_ARTICLE,
    payload: confirm,
  };
}

export function newArticlePrepareForm() {
  return { type: ARTICLES_ARTICLE_PREPARE_EDIT_FORM };
}

export function editConfirmation(confirm) {
  return {
    type: ARTICLES_ARTICLE_UPDATE_ARTICLE,
    payload: confirm,
  };
}

function showLoader(visible = true) {
  return { type: SHOW_LOADER, payload: visible };
}

function showConnectionError() {
  return { type: SHOW_CONNECTION_ERROR };
}
