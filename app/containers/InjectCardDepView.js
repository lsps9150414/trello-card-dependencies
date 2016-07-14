import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CardDepView from './CardDepView';

export default class InjectCardDepView extends React.Component {
  componentWillMount() {
    this.injectComponent();
  }
  injectComponent = () => {
    const injectCardDepViewDOM = document.createElement('div');
    injectCardDepViewDOM.className = 'board-canvas';
    injectCardDepViewDOM.style.display = 'none';
    document.getElementsByClassName('board-main-content')[0].appendChild(injectCardDepViewDOM);
    ReactDOM.render(
      <CardDepView store={this.context.store} />,
      injectCardDepViewDOM
    );
  }
  render() {
    return null;
  }
}

InjectCardDepView.propTypes = {
};

InjectCardDepView.contextTypes = {
  store: PropTypes.object,
};
