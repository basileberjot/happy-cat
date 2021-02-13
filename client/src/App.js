import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
 
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import MyCat from './containers/MyCat/MyCat';
import Home from './containers/Home/Home';
import * as actions from './store/actions';

const userId = localStorage.getItem('userId');

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();

    if(userId) {
      this.props.onTryGetCats();
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>    
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/my-cat" component={MyCat} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch> 
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    catId: state.myCat.catId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onTryGetCats: () => dispatch(actions.getCats(userId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));