import React, { PropTypes } from 'react';
import styles from './TrelloStyleList.css';

export default class TrelloStyleList extends React.Component {
  render() {
    return (
      <div className="js-list list-wrapper">
        <div className="list js-list-content">
          <div className="list-header js-list-header u-clearfix is-menu-shown">
            <div className="list-header-target js-editing-target"></div>
            <textarea
              className={`${styles.listTitle} list-header-name mod-list-name js-list-name-input`}
            >
              Doing
            </textarea>
            <div className="list-header-extras">
              <a className="list-header-extras-menu dark-hover js-open-list-menu" href="#">
                <span className="icon-sm icon-overflow-menu-horizontal"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrelloStyleList.propTypes = {
};
