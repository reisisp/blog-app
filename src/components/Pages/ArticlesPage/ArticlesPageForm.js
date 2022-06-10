import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import BlogService from '../../../service/service-blog';
import * as articlesActions from '../../../store/articlesReducer/articlesActions';
import { ArticleCard } from '../../ArticleCard/ArticleCard';
import Pagination from '../../UI/Pagination/Pagination';

import classes from './ArticlesPageForm.module.scss';

const service = new BlogService();

const ArticlesPageForm = ({ token, currentPage, showLoader, showConnectionError, saveTotalPages }) => {
  const [articles, setArticles] = useState([]);
  function getArticles(page) {
    showLoader();
    service
      .getArticlesByPage(page)
      .then((res) => {
        saveTotalPages(Math.floor(res.articlesCount / 10));
        setArticles(() => [...res.articles]);
        showLoader(false);
      })
      .catch(() => {
        showConnectionError();
        showLoader(false);
      });
  }
  useEffect(() => {
    getArticles(currentPage);
  }, [currentPage, token]);
  return (
    <section className={classes.cardList}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <Pagination />
    </section>
  );
};

function mapStateToProps({ profileReducer, pagesReducer }) {
  return {
    token: profileReducer.token,
    currentPage: pagesReducer.currentPage,
  };
}

export default connect(mapStateToProps, articlesActions)(ArticlesPageForm);
