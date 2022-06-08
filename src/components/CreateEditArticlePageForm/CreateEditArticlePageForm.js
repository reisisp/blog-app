import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '../../store/articlesReducer/articlesActions';
import { Btn } from '../UI/Btn/Btn';
import { NewTagInput } from '../UI/Inputs/NewTagInput/NewTagInput';
import { NewInputWithValidation } from '../UI/Inputs/NewInput/NewInput';
import { NewArticleTextareaValidation } from '../UI/Inputs/NewArticleTextarea/NewArticleTextarea';

import classes from './CreateEditArticlePageForm.module.scss';

const CreateEditArticlePageForm = ({ edit, formAction, currentSlug, storeArticle, validationErr }) => {
  const [article, setArticle] = useState({ title: '', body: '', description: '', tagList: [] });
  const [tag, setTag] = useState('');
  const editArticle = (e) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };
  const addTag = () => {
    setArticle({ ...article, tagList: [...article.tagList, tag] });
    setTag('');
  };
  const editTag = (e) => {
    setArticle({
      ...article,
      tagList: article.tagList.map((tag, index) => (index === +e.target.id ? e.target.value : tag)),
    });
  };
  function deleteTag(index) {
    setArticle({
      ...article,
      tagList: [...article.tagList.slice(0, +index), ...article.tagList.slice(+index + 1, article.tagList.length)],
    });
  }
  useEffect(() => {
    if (edit) setArticle({ ...article, ...storeArticle });
  }, [storeArticle]);
  return (
    <section className={classes.newArticle}>
      <h2 className={classes.newArticle__heading}>{edit ? 'Edit article' : 'Create new article'}</h2>
      <div className={classes.newArticle__form}>
        <div className={classes.form__inputs}>
          <NewInputWithValidation
            err={validationErr.title}
            value={article.title}
            key="title"
            onChange={editArticle}
            id="title"
            type="text"
            placeholder="Title"
            name="Title"
          />
          <NewInputWithValidation
            err={validationErr.description}
            value={article.description}
            key="description"
            onChange={editArticle}
            id="description"
            type="text"
            placeholder="Description"
            name="Short description"
          />
          <NewArticleTextareaValidation
            err={validationErr.body}
            value={article.body}
            key="body"
            onChange={editArticle}
            id="body"
            placeholder="Text"
            name="Text"
          />
        </div>
        <div className={classes.form__tags}>
          <p className={classes.form__heading}>Tags</p>
          {article.tagList.map((tag, index) => (
            <div key={index} className={classes.form__action}>
              <NewTagInput
                key={index}
                onChange={editTag}
                value={tag}
                id={index}
                type="text"
                placeholder="Tag"
                name="Tag"
              />
              <Btn deleteBtn onClick={() => deleteTag(index)}>
                Delete tag
              </Btn>
              <br />
            </div>
          ))}
          <div className={classes.form__action}>
            <NewTagInput onChange={(e) => setTag(e.target.value)} value={tag} type="text" placeholder="Tag" />
            <Btn onClick={addTag}>Add tag</Btn>
          </div>
        </div>
        <div>
          <Btn confirmBtn onClick={() => (!edit ? formAction(article) : formAction(currentSlug, article))}>
            Send
          </Btn>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps({ articlesReducer }) {
  return {
    storeArticle: articlesReducer.currentArtcile,
    validationErr: articlesReducer.newArticleValidationErrors,
    newTag: articlesReducer.newArticleTag,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateEditArticlePageForm);
