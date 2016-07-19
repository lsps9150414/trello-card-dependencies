import React, { PropTypes } from 'react';

export default class TrelloBoardHeaderBtn extends React.Component {
  render() {
    return (
      <div
        className={''}
        onClick={this.props.onClickHandler}
      >
        <span className={'board-header-btn-icon icon-sm'} >
        </span>
        <span className={'board-header-btn-text'}>
          {this.props.text}
        </span>
      </div>
    );
  }
}

TrelloBoardHeaderBtn.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
