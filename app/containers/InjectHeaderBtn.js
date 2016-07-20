import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import HeaderBtnContainer from './HeaderBtnContainer';

export default class InjectHeaderBtn extends React.Component {
  componentWillMount() {
    this.injectComponent();
  }
  injectComponent = () => {
    const boardHeaderDOM = document.getElementsByClassName('board-header')[0];
    const injectToggleCardDepViewDOM = document.createElement('div');
    injectToggleCardDepViewDOM.className = 'board-header-btn';
    const injectOpenCardDepViewDOM = injectToggleCardDepViewDOM.cloneNode();
    boardHeaderDOM.appendChild(injectToggleCardDepViewDOM);
    boardHeaderDOM.appendChild(injectOpenCardDepViewDOM);
    ReactDOM.render(
      <HeaderBtnContainer store={this.context.store} mode={'inject'} />,
      injectToggleCardDepViewDOM
    );
    ReactDOM.render(
      <HeaderBtnContainer store={this.context.store} mode={'popup'} />,
      injectOpenCardDepViewDOM
    );
  }
  render() {
    return null;
  }
}

InjectHeaderBtn.propTypes = {
};

InjectHeaderBtn.contextTypes = {
  store: PropTypes.object,
};
