import React from 'react';
import { connect } from 'react-redux';

import { withContainer } from '../../../hoc/withContainer/withContainer';
import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';

import LoginForm from './LoginForm';

const LoginPage = withContainer(
  withLoadingAndErrors(() => <LoginForm />),
  'small'
);

function mapStateToProps({ profileReducer }) {
  return {
    loading: profileReducer.loader,
    err: profileReducer.connectionError,
  };
}

export default connect(mapStateToProps)(LoginPage);
