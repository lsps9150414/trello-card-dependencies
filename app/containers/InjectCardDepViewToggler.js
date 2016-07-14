import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CardDepViewToggler from './CardDepViewToggler';

export default class InjectCardDepViewToggler extends React.Component {
  componentWillMount() {
    this.injectComponent();
  }
  injectComponent = () => {
    const injectCardDepViewTogglerDOM = document.createElement('div');
    injectCardDepViewTogglerDOM.className = 'board-header-btn';
    document.getElementsByClassName('board-header')[0].appendChild(injectCardDepViewTogglerDOM);
    ReactDOM.render(
      <CardDepViewToggler store={this.context.store} />,
      injectCardDepViewTogglerDOM
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
