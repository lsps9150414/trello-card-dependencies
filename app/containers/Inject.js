import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';

import CardDependenciesView from './CardDependenciesView';
import CardDependenciesViewToggler from '../components/CardDependenciesViewToggler';
import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trello';

class Inject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDepView: false,
    };
  }
  componentWillMount() {
    console.log('componentWillMount');

    if (this.props.trelloToken !== null) {
      localStorage.setItem('trello_token', this.props.trelloToken);
    } else {
      localStorage.removeItem('trello_token');
    }
    this.props.tryAuthTrello(this.authenticationSuccess, this.authenticationFailure);
  }

  loginTrello = () => {
    this.props.loginTrello(this.authenticationSuccess, this.authenticationFailure, 'popup');
  }
  logoutTrello = () => {
    this.props.logoutTrello();
  }

  injectCardDependenciesView = () => {
    const injectDependenciesViewDOM = document.createElement('div');
    injectDependenciesViewDOM.className = 'board-canvas';
    injectDependenciesViewDOM.style.display = 'none';
    document.getElementsByClassName('board-main-content')[0].appendChild(injectDependenciesViewDOM);
    ReactDOM.render(
      (<Provider store={this.context.store}>
        <CardDependenciesView showDepView={this.state.showDepView} />
      </Provider>),
      injectDependenciesViewDOM
    );
  }
  authenticationSuccess = () => {
    console.log('authenticationSuccess');
    this.injectCardDependenciesView();
  }
  authenticationFailure = () => {
    console.log('authenticationFailure');
  }
  toggleCardDependenciesView = () => {
    if (this.props.trelloToken === null) {
      this.loginTrello();
    }
    this.setState({ showDepView: !this.state.showDepView });
    const listCanvasDOM = document.getElementsByClassName('board-canvas')[0];
    const dependenciesCanvasDOM = document.getElementsByClassName('board-canvas')[1];
    listCanvasDOM.style.display = listCanvasDOM.style.display !== 'none' ? 'none' : 'flex';
    dependenciesCanvasDOM.style.display =
      dependenciesCanvasDOM.style.display !== 'none' ? 'none' : 'flex';
  }
  render() {
    return (
      <CardDependenciesViewToggler
        onClickHandler={this.toggleCardDependenciesView}
        showDepView={this.state.showDepView}
      />
    );
  }
}

Inject.propTypes = {
  loginTrello: PropTypes.func.isRequired,
  logoutTrello: PropTypes.func.isRequired,
  tryAuthTrello: PropTypes.func.isRequired,
  trelloToken: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};
Inject.contextTypes = {
  store: PropTypes.object,
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
