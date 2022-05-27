import React from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '../../store/articlesReducer/articlesActions';
import { Btn } from '../UI/Btn/Btn';
import { NewTagInput } from '../UI/Inputs/NewTagInput/NewTagInput';
import { NewInputWithValidation } from '../UI/Inputs/NewInput/NewInput';
import { NewArticleTextareaValidation } from '../UI/Inputs/NewArticleTextarea/NewArticleTextarea';

import classes from './CreateEditArticlePageForm.module.scss';

const CreateEditArticlePageForm = ({
  edit,
  formAction,
  article,
  validationErr,
  newTag,
  setNewArticle,
  setNewArticleTag,
  newArticleAddTag,
  newArticleDeleteTag,
  newArticleEditTag,
}) => {
  return (
    <section className={classes.newArticle}>
      <h2 className={classes.newArticle__heading}>{edit ? 'Edit article' : 'Create new article'}</h2>
      <div className={classes.newArticle__form}>
        <div className={classes.form__inputs}>
          <NewInputWithValidation
            err={validationErr.title}
            value={article.title}
            key="title"
            onChange={setNewArticle}
            id="title"
            type="text"
            placeholder="Title"
            name="Title"
          />
          <NewInputWithValidation
            err={validationErr.description}
            value={article.description}
            key="description"
            onChange={setNewArticle}
            id="description"
            type="text"
            placeholder="Description"
            name="Short description"
          />
          <NewArticleTextareaValidation
            err={validationErr.body}
            value={article.body}
            key="body"
            onChange={setNewArticle}
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
                onChange={newArticleEditTag}
                value={tag}
                id={index}
                type="text"
                placeholder="Tag"
                name="Tag"
              />
              <Btn deleteBtn onClick={() => newArticleDeleteTag(index)}>
                Delete tag
              </Btn>
              <br />
            </div>
          ))}
          <div className={classes.form__action}>
            <NewTagInput onChange={setNewArticleTag} value={newTag} type="text" placeholder="Tag" />
            <Btn onClick={newArticleAddTag}>Add tag</Btn>
          </div>
        </div>
        <div>
          <Btn confirmBtn onClick={formAction}>
            Send
          </Btn>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps({ articlesReducer }) {
  return {
    article: articlesReducer.newArticle,
    validationErr: articlesReducer.newArticleValidationErrors,
    newTag: articlesReducer.newArticleTag,
  };
}

export default connect(mapStateToProps, articlesActions)(CreateEditArticlePageForm);
