import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header/Header';
import ArticlePage from '../Pages/ArticlePage/ArticlePage';
import ArticlesPage from '../Pages/ArticlesPage/ArticlesPage';
import CreateArticlePage from '../Pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from '../Pages/EditArticlePage/EditArticlePage';
import EditProfilePage from '../Pages/EditProfilePage/EditProfilePage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={ArticlesPage} />
          <Route path="/sign-up" exact component={RegistrationPage} />
          <Route path="/sign-in" exact component={LoginPage} />
          <Route path="/profile" exact component={EditProfilePage} />
          <Route path="/articles" exact component={ArticlesPage} />
          <Route path="/articles/:slug" exact component={ArticlePage} />
          <Route path="/new-article" exact component={CreateArticlePage} />
          <Route path="/articles/:slug/edit" exact component={EditArticlePage} />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
