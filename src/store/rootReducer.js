import { combineReducers } from 'redux';

import { profileReducer } from './profileReducer/profileReducer';
import { articlesReducer } from './articlesReducer/articlesReducer';
import { pagesReducer } from './pagesReducer/pagesReducer';

export const rootReducer = combineReducers({ profileReducer, articlesReducer, pagesReducer });
