import React, { PropTypes } from 'react';

export default class InsertedCardDepViewToggler extends React.Component {
  render() {
    const text = !this.props.showCardDepView ? 'View' : 'Close';
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

InsertedCardDepViewToggler.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  showCardDepView: PropTypes.bool.isRequired,
};
