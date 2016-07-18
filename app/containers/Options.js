import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  // getBoardShortLink,
  getListsTrello,
  setTodoList,
  setDoneList,
} from '../actions/trello';
import { loginTrello, logoutTrello, tryAuthTrello } from '../actions/trelloCredentials';

// TODO: Get boards, set options for each board.
class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trelloToken: null,
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
    this.props.loginTrello(this.authenticationSuccess, this.authenticationFailure, 'redirect');
  }
  logoutTrello = () => {
    this.props.logoutTrello();
    this.setState({ trelloToken: null });
  }

  authenticationSuccess = () => {
    console.log('authenticationSuccess');
    // this.props.getListsTrello(getBoardShortLink());
  }
  authenticationFailure = () => {
    console.log('authenticationFailure');
  }

  render() {
    const content = this.props.trelloToken ? (
      <button onClick={this.logoutTrello}>Logout Trello</button>
    ) : (
      <button onClick={this.loginTrello}>Login Trello</button>
    );
    const listOption = this.props.lists.map((list, index) => (
      <option key={index} value={list.id}>{list.name}</option>
    ));

    return (
      <div>
        <h1>Settings</h1>
        {content}
        <div>
          <span>List for 'Doing': </span>
          <select
            value={this.props.todoListId}
            onChange={(event) => { this.props.setTodoList(event.target.value); }}
          >
            {listOption}
          </select>
        </div>
        <div>
          <span>List for 'Done': </span>
          <select
            value={this.props.doneListId}
            onChange={(event) => { this.props.setDoneList(event.target.value); }}
          >
            {listOption}
          </select>
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  loginTrello: PropTypes.func.isRequired,
  logoutTrello: PropTypes.func.isRequired,
  tryAuthTrello: PropTypes.func.isRequired,
  trelloToken: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  lists: PropTypes.array.isRequired,
  setTodoList: PropTypes.func.isRequired,
  setDoneList: PropTypes.func.isRequired,
  todoListId: PropTypes.string.isRequired,
  doneListId: PropTypes.string.isRequired,
};
Options.defaultProps = {
  lists: [],
};

const mapStateToProps = (state) => ({
  trelloToken: state.trelloCredentials.token,
  lists: state.trello.lists,
  todoListId: state.trello.todoListId,
  doneListId: state.trello.doneListId,
});
const mapDispatchToProps = (dispatch) => ({
  tryAuthTrello: (successCallback, errCallback) => {
    dispatch(tryAuthTrello(successCallback, errCallback));
  },
  loginTrello: (successCallback, errCallback, type) => {
    dispatch(loginTrello(successCallback, errCallback, type));
  },
  logoutTrello: () => { dispatch(logoutTrello()); },
  setTodoList: (listId) => { dispatch(setTodoList(listId)); },
  setDoneList: (listId) => { dispatch(setDoneList(listId)); },
  getListsTrello: (boardShortLink, successCallback, errCallback) => {
    dispatch(getListsTrello(boardShortLink, successCallback, errCallback));
  },
});
const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);

export default OptionsContainer;
