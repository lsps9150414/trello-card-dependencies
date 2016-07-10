import React, { PropTypes } from 'react';

export default class CardDependenciesViewToggler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }
  componentWillMount() {
  }

  render() {
    const text = !this.state.toggled ? 'View' : 'Close';
    return (
      <div
        className={''}
        onClick={() => {
          const loggedIn = this.props.onClickHandler();
          if (loggedIn) {
            this.setState({ toggled: !this.state.toggled });
          }
        }}
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
};
