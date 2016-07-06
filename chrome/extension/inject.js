import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dock from 'react-dock';

console.log('inject.js');

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div className={''} onClick={this.buttonOnClick}>
        <span className={'board-header-btn-icon icon-sm'} >
        </span>
        <span className={'board-header-btn-text'}>
          View Card Dependencies
        </span>
      </div>
    );
    // <Dock
    //   position="right"
    //   dimMode="transparent"
    //   defaultSize={0.4}
    //   isVisible={this.state.isVisible}
    // >
    //   <h1>Injected!</h1>
    //   <iframe
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //     }}
    //     frameBorder={0}
    //     allowTransparency="true"
    //     src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
    //   />
    // </Dock>
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'board-header-btn';

  console.log('inserted');
  console.log(document.getElementsByClassName('board-header'));
  document.getElementsByClassName('board-header')[0].appendChild(injectDOM);
  ReactDOM.render(<InjectApp />, injectDOM);
});
