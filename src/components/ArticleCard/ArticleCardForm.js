import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

import Likes from '../UI/Likes/Likes';
import TagItem from '../UI/TagItem';

import classes from './ArticleCardForm.module.scss';

export const ArticleCardForm = ({ article }) => {
  const date = format(new Date(article.createdAt), 'MMMM d, yyyy');
  const tags = article.tagList ? article.tagList.map((tag, index) => <TagItem key={index} tag={tag} />) : null;
  return (
    <div className={classes.card}>
      <div className={classes.card__body}>
        <div className={classes.card__head}>
          <Link to={`/articles/${article.slug}`} className={classes.card__heading}>
            {article.title}
          </Link>
          <Likes slug={article.slug} favoritesCount={article.favoritesCount} favorited={article.favorited} />
        </div>
        <div className={classes.card__tags}>{tags}</div>
        <p className={classes.card__desc}>{article.description}</p>
      </div>
      <div className={classes.card__user}>
        <div className={classes.user__info}>
          <span className={classes.user__name}>{article.author.username}</span>
          <span className={classes.user__date}>{date}</span>
        </div>
        <img className={classes.user__img} src={article.author.image} alt="user" />
      </div>
    </div>
  );
};
