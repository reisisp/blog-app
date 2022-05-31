import { ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR } from '../reduxTypes';

export function checkData(article) {
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
