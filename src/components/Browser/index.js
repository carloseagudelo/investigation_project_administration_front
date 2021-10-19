import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Main from '../../containers/Layouts/Main';
import Authentication from '../../containers/Layouts/Authentication';

import Login from '../Login';
import SignUp from '../SignUp';

import Projects from '../Project/List';
import ProjectNew from '../Project/New';
import ProjectShow from '../Project/Show';

import Contributions from '../Contribution/List';
import ContributionNew from '../Contribution/New';

import { checkSession } from '../../actions/userActions';

class Browser extends Component {

  constructor(){
    super();
  }

  async componentWillMount () {
    if( !this.props.login ) {
      this.props.checkSession();
    }
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>

          <Main exact path="/" {...this.props} component={Projects} />
          <Main exact path="/project/new" {...this.props} component={ProjectNew} />
          <Main exact path="/projects/:id" {...this.props} component={ProjectShow} />

          <Authentication exact path="/login" {...this.props} component={Login} />
          <Authentication exact path="/signup" {...this.props} component={SignUp} />
          
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.userReducer;
}

const mapDispatchToProps = {
  checkSession
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
