import React, { PropTypes } from 'react';

export default class CardDependenciesViewToggler extends React.Component {
  render() {
    const text = !this.props.showDepView ? 'View' : 'Close';
    return (
      <div
        className={''}
        onClick={this.props.onClickHandler}
      >
        <span className={'board-header-btn-icon icon-sm'} >
        </span>
        <span className={'board-header-btn-text'}>
          {text} Card Dependencies
        </span>
      </div>
    );
  }
}

CardDependenciesViewToggler.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  showDepView: PropTypes.bool.isRequired,
};
