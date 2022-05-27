import React from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';

import img from './like.png';
import img_active from './like_active.png';
import classes from './Likes.module.scss';

const Likes = ({ slug, favoritesCount, favorited, token, setFavorite, removeFavorite }) => {
  const action = favorited ? () => removeFavorite(slug, token) : () => setFavorite(slug, token);
  return (
    <span className={classes.likes} onClick={token ? action : () => {}}>
      <img src={favorited ? img_active : img} alt="like" />
      <span className={classes.likes__counter}>{favoritesCount}</span>
    </span>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.user.token,
  };
}

export default connect(mapStateToProps, articlesActions)(Likes);
