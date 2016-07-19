import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CardDepViewToggler from './CardDepViewToggler';

export default class InjectCardDepViewToggler extends React.Component {
  componentWillMount() {
    this.injectComponent();
  }
  injectComponent = () => {
    const boardHeaderDOM = document.getElementsByClassName('board-header')[0];
    const injectCardDepViewTogglerDOM = document.createElement('div');
    injectCardDepViewTogglerDOM.className = 'board-header-btn';
    const injectOpenCardDepViewDOM = injectCardDepViewTogglerDOM.cloneNode();
    boardHeaderDOM.appendChild(injectCardDepViewTogglerDOM);
    boardHeaderDOM.appendChild(injectOpenCardDepViewDOM);
    ReactDOM.render(
      <CardDepViewToggler store={this.context.store} mode={'inject'} />,
      injectCardDepViewTogglerDOM
    );
    ReactDOM.render(
      <CardDepViewToggler store={this.context.store} mode={'popup'} />,
      injectOpenCardDepViewDOM
    );
  }
  render() {
    return null;
  }
}

InjectCardDepViewToggler.propTypes = {
};

InjectCardDepViewToggler.contextTypes = {
  store: PropTypes.object,
};
