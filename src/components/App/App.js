import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import * as profileAction from '../../store/profileReducer/profileActions';
import Header from '../Header/Header';
import ArticlePage from '../Pages/ArticlePage/ArticlePage';
import ArticlesPage from '../Pages/ArticlesPage/ArticlesPage';
import CreateArticlePage from '../Pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from '../Pages/EditArticlePage/EditArticlePage';
import EditProfilePage from '../Pages/EditProfilePage/EditProfilePage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';

const App = ({ token, profileGetUserByToken }) => {
  const [savedToken, setSavedToken] = useState(
    localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
  );
  useEffect(() => {
    setSavedToken(localStorage.getItem('token') === null ? '' : localStorage.getItem('token'));
  }, [token]);
  useEffect(() => {
    if (savedToken.length) {
      profileGetUserByToken();
    }
  }, [savedToken]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={ArticlesPage} />
          <Route path="/sign-up" exact>
            {!savedToken ? <RegistrationPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/sign-in" exact>
            {!savedToken ? <LoginPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/profile" exact>
            {savedToken ? <EditProfilePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/articles" exact component={ArticlesPage} />
          <Route path="/articles/:slug" exact component={ArticlePage} />
          <Route path="/new-article" exact>
            {savedToken ? <CreateArticlePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/articles/:slug/edit" exact>
            {savedToken ? <EditArticlePage /> : <Redirect to="/" />}
          </Route>
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </Router>
  );
};

function mapStateToProps({ profileReducer }) {
  return {
    token: profileReducer.token,
  };
}

export default connect(mapStateToProps, profileAction)(App);
