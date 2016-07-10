import React, { PropTypes } from 'react';

import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trello';
import { connect } from 'react-redux';
import ToggleCardDependenciesView from '../../app/containers/ToggleCardDependenciesView';


class Inject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trelloToken: null,
    };
  }
  componentWillMount() {
    // console.log('componentWillMount');
    //
    // if (this.props.trelloToken !== null) {
    //   localStorage.setItem('trello_token', this.props.trelloToken);
    // } else {
    //   localStorage.removeItem('trello_token');
    // }
    // this.props.tryAuthTrello(this.authenticationSuccess, this.authenticationFailure);
  }

  // loginTrello = () => {
  //   this.props.loginTrello(this.authenticationSuccess, this.authenticationFailure, 'redirect');
  // }
  // logoutTrello = () => {
  //   this.props.logoutTrello();
  //   this.setState({ trelloToken: null });
  // }
  //
  // authenticationSuccess = () => {
  //   console.log('authenticationSuccess');
  // }
  // authenticationFailure = () => {
  //   console.log('authenticationFailure');
  // }

  render() {
    // const content = this.props.trelloToken ? (
    //   <button onClick={this.logoutTrello}>Logout Trello</button>
    // ) : (
    //   <button onClick={this.loginTrello}>Login Trello</button>
    // );
    return (
      <ToggleCardDependenciesView />
    );
  }
}

Inject.propTypes = {
};

const mapStateToProps = (state) => ({
  trelloToken: state.trello.token,
});
const mapDispatchToProps = (dispatch) => ({
  tryAuthTrello: (successCallback, errCallback) => {
    dispatch(tryAuthTrello(successCallback, errCallback));
  },
  loginTrello: (successCallback, errCallback, type) => {
    dispatch(loginTrello(successCallback, errCallback, type));
  },
  logoutTrello: () => { dispatch(logoutTrello()); },
});
const InjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Inject);

export default InjectContainer;
