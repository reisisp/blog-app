import React from 'react';
import { connect } from 'react-redux';

import { withLoadingAndErrors } from '../../../hoc/withLoadingAndErrors/withLoadingAndErrors';
import { withContainer } from '../../../hoc/withContainer/withContainer';

import RegistrationForm from './RegistrationForm';

const RegistrationPage = withContainer(
  withLoadingAndErrors(() => <RegistrationForm />),
  'small'
);

function mapStateToProps({ profileReducer }) {
  return {
    loading: profileReducer.loader,
    err: profileReducer.connectionError,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
