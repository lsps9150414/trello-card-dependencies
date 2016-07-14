import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CardDependenciesViewToggler from '../components/CardDepViewToggler';
import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trello';

class CardDepViewToggler extends React.Component {
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

  authenticationSuccess = () => {
    console.log('authenticationSuccess');
  }
  authenticationFailure = () => {
    console.log('authenticationFailure');
  }
  toggleCardDependenciesView = () => {
    if (this.props.trelloToken === null) {
      this.loginTrello();
    } else {
      this.setState({ showDepView: !this.state.showDepView });
      const listCanvasDOM = document.getElementsByClassName('board-canvas')[0];
      const dependenciesCanvasDOM = document.getElementsByClassName('board-canvas')[1];
      listCanvasDOM.style.display = listCanvasDOM.style.display !== 'none' ? 'none' : 'flex';
      dependenciesCanvasDOM.style.display =
      dependenciesCanvasDOM.style.display !== 'none' ? 'none' : 'flex';
    }
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

CardDepViewToggler.propTypes = {
  loginTrello: PropTypes.func.isRequired,
  logoutTrello: PropTypes.func.isRequired,
  tryAuthTrello: PropTypes.func.isRequired,
  trelloToken: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};
CardDepViewToggler.contextTypes = {
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
const CardDepViewTogglerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDepViewToggler);

export default CardDepViewTogglerContainer;
