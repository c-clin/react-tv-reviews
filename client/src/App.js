import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Navigation from './components/Navigation/Navigation';
import Home from './containers/Home/Home';
import Search from './containers/Search/Search';
import Discover from './containers/Discover/Discover';
import MovieList from './containers/MovieList/MovieList';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/discover" component={Discover} />
          <Route path="/api/my-list" component={MovieList} />
          <Route path="/" exact component={Home} />
          <Redirect to={'/'} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(App)
);
