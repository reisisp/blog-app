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

const initialState = {
  loader: false,
  connectionError: false,
  articles: [],
  currentArtcile: {
    author: { username: '', image: '' },
    body: '',
    createdAt: null,
    description: '',
    slug: '',
    tagList: [],
    title: '',
  },
  newArticle: {
    title: '',
    body: '',
    description: '',
    tagList: [],
  },
  newArticleValidationErrors: {},
  newArticleTag: '',
  newArticleSlug: '',
  totalPages: 0,
  deleteSuccess: false,
  editSuccess: false,
};

export const articlesReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case ARTICLES_CLEAR_ARTICLES:
      return { ...state, articles: [] };
    case ARTICLES_ARTICLE_UPDATE_ARTICLE:
      return { ...state, editSuccess: action.payload };
    case ARTICLES_ARTICLE_PREPARE_EDIT_FORM:
      return { ...state, newArticle: { ...state.currentArtcile } };
    case ARTICLES_SAVE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case ARTICLES_SAVE_ARTICLES:
      return { ...state, articles: [...action.payload] };
    case ARTICLES_SAVE_ARTICLE:
      return { ...state, currentArtcile: action.payload };
    case ARTICLES_ARTICLE_DELETE_ARTICLE:
      return { ...state, deleteSuccess: action.payload };
    case ARTICLES_ARTICLE_FAVORITE_ACTION:
      return {
        ...state,
        currentArtcile: {
          ...state.currentArtcile,
          favorited: action.payload.favorited,
          favoritesCount: action.payload.favoritesCount,
        },
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug
            ? { ...article, favorited: action.payload.favorited, favoritesCount: action.payload.favoritesCount }
            : article
        ),
      };
    case ARTICLES_NEW_ARTICLE_SET_ARTICLE:
      return { ...state, newArticle: { ...state.newArticle, ...action.payload } };
    case ARTICLES_NEW_ARTICLE_SET_NEW_TAG:
      return { ...state, newArticleTag: action.payload };
    case ARTICLES_NEW_ARTICLE_ADD_TAG:
      return {
        ...state,
        newArticleTag: '',
        newArticle: { ...state.newArticle, tagList: [...state.newArticle.tagList, state.newArticleTag] },
      };
    case ARTICLES_NEW_ARTICLE_DELETE_TAG:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          tagList: [
            ...state.newArticle.tagList.slice(0, +action.payload),
            ...state.newArticle.tagList.slice(+action.payload + 1, state.newArticle.tagList.length),
          ],
        },
      };
    case ARTICLES_NEW_ARTICLE_EDIT_TAG:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          tagList: state.newArticle.tagList.map((tag, index) =>
            index === +action.payload.id ? action.payload.val : tag
          ),
        },
      };
    case ARTICLES_NEW_ARTICLE_SET_SLUG:
      return { ...state, newArticleSlug: action.payload };
    case ARTICLES_NEW_ARTICLE_SET_VALIDATION_ERR:
      return { ...state, newArticleValidationErrors: { ...state.newArticleValidationErrors, ...action.payload } };
    case ARTICLES_NEW_ARTICLE_CLEAR_FORM:
      return JSON.parse(JSON.stringify(initialState));
    case SHOW_LOADER:
      return { ...state, loader: action.payload };
    case SHOW_CONNECTION_ERROR:
      return { ...state, connectionError: true };
    default:
      return state;
  }
};
