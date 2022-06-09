import React, { useEffect, useState } from 'react';

import { Btn } from '../UI/Btn/Btn';
import { NewTagInput } from '../UI/Inputs/NewTagInput/NewTagInput';
import { NewInputWithValidation } from '../UI/Inputs/NewInput/NewInput';
import { NewArticleTextareaValidation } from '../UI/Inputs/NewArticleTextarea/NewArticleTextarea';

import classes from './CreateEditArticlePageForm.module.scss';

export const CreateEditArticlePageForm = ({ formAction, currentArticle }) => {
  const [article, setArticle] = useState({ title: '', body: '', description: '', tagList: [] });
  const [validationErr, setValidationErr] = useState({});
  const [tag, setTag] = useState('');
  const isEdit = Object.keys(currentArticle).length;
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
  const setError = (err) => {
    setValidationErr((validationErr) => ({ ...validationErr, ...err }));
  };
  useEffect(() => {
    setArticle({ ...article, ...currentArticle });
  }, [isEdit]);
  return (
    <section className={classes.newArticle}>
      <h2 className={classes.newArticle__heading}>{isEdit ? 'Edit article' : 'Create new article'}</h2>
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
          <Btn confirmBtn onClick={() => formAction(article, setError)}>
            Send
          </Btn>
        </div>
      </div>
    </section>
  );
};
