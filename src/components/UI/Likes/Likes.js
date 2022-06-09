import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import BlogService from '../../../service/service-blog';

import img from './like.png';
import img_active from './like_active.png';
import classes from './Likes.module.scss';

const service = new BlogService();

const Likes = ({ slug, favoritesCount, favorited, token }) => {
  let [count, setCount] = useState(favoritesCount);
  let [isFavorite, setIsFavorite] = useState(favorited);
  useEffect(() => {
    if (!token) {
      setIsFavorite(false);
    }
  }, [token]);
  function setFavorite(slug) {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .setFavorite(slug, token)
      .then(() => {
        setCount((count += 1));
        setIsFavorite(true);
      })
      .catch((e) => {
        console.log(e, 'Не думаю, чтол при уставновке лайка система должна отображать ошибку, лучше проигнорировать');
      });
  }
  function removeFavorite(slug) {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    service
      .removeFavorite(slug, token)
      .then(() => {
        setCount((count -= 1));
        setIsFavorite(false);
      })
      .catch((e) => {
        console.log(e, 'Не думаю, чтол при уставновке лайка система должна отображать ошибку, лучше проигнорировать');
      });
  }

  const action = isFavorite ? () => removeFavorite(slug) : () => setFavorite(slug);
  return (
    <span className={classes.likes} onClick={token ? action : () => {}}>
      <img src={isFavorite ? img_active : img} alt="like" />
      <span className={classes.likes__counter}>{count}</span>
    </span>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.user.token,
  };
}

export default connect(mapStateToProps, articlesActions)(Likes);
