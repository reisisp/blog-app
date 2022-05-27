import React from 'react';

import { withShadowBox } from '../../hoc/withShadowBox/withShadowBox';

import { ArticleCardForm } from './ArticleCardForm';

export const ArticleCard = withShadowBox(({ ...props }) => <ArticleCardForm {...props} />);
