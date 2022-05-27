import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import { ArticleCard } from '../../ArticleCard/ArticleCard';
import Pagination from '../../UI/Pagination/Pagination';

import classes from './ArticlesPageForm.module.scss';

const ArticlesPageForm = ({ token, articles, getArticles, currentPage }) => {
  useEffect(() => {
    getArticles(currentPage, token);
  }, [currentPage]);
  return (
    <section className={classes.cardList}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <Pagination />
    </section>
  );
};

function mapStateToProps({ profileReducer, articlesReducer, pagesReducer }) {
  return {
    token: profileReducer.token,
    articles: articlesReducer.articles,
    currentPage: pagesReducer.currentPage,
  };
}

export default connect(mapStateToProps, articlesActions)(ArticlesPageForm);
