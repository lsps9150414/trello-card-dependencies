import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import TrelloBoardHeaderBtn from '../components/TrelloBoardHeaderBtn';
import { toggleCardDepView } from '../actions/system';
import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trelloCredentials';

class CardDepViewToggler extends React.Component {
  componentWillMount() {
    console.log('componentWillMount');

    if (this.props.trelloToken !== null) {
      localStorage.setItem('trello_token', this.props.trelloToken);
    } else {
      localStorage.removeItem('trello_token');
    }
    this.props.tryAuthTrello(this.authenticationSuccess, this.authenticationFailure);
  }
  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate:', nextProps);
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
  toggleCardDepView = () => {
    if (this.props.trelloToken === null) {
      this.loginTrello();
    } else {
      this.props.toggleCardDepView(!this.props.showCardDepView);
    }
  }
  openCardViewPopup = () => {
    const options = {
      type: 'popup',
      left: 100, top: 100,
      width: 800, height: 475,
      url: 'window.html'
    };
    chrome.runtime.sendMessage({ action: 'CREATE_WINDOW', options }, (response) => {
      console.log('response:', response);
    });
  }
  render() {
    if (this.props.mode === 'inject') {
      return (
        <TrelloBoardHeaderBtn
          onClickHandler={this.toggleCardDepView}
          text={this.props.showCardDepView ? 'Close Dep View' : 'Open Dep View'}
        />
      );
    } else if (this.props.mode === 'popup') {
      return (
        <TrelloBoardHeaderBtn
          onClickHandler={this.openCardViewPopup}
          text={'Open Dep View in window'}
        />
      );
    }
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
  showCardDepView: PropTypes.bool.isRequired,
  toggleCardDepView: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  trelloToken: state.trelloCredentials.token,
  showCardDepView: state.system.showCardDepView,
  lists: state.trello.lists,
});
const mapDispatchToProps = (dispatch) => ({
  tryAuthTrello: (successCallback, errCallback) => {
    dispatch(tryAuthTrello(successCallback, errCallback));
  },
  loginTrello: (successCallback, errCallback, type) => {
    dispatch(loginTrello(successCallback, errCallback, type));
  },
  logoutTrello: () => { dispatch(logoutTrello()); },
  toggleCardDepView: (showCardDepView) => { dispatch(toggleCardDepView(showCardDepView)); },
});
const CardDepViewTogglerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDepViewToggler);

export default CardDepViewTogglerContainer;
