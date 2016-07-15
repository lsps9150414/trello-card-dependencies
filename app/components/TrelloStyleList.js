import React, { PropTypes } from 'react';
import styles from './TrelloStyleList.css';

export default class TrelloStyleList extends React.Component {
  render() {
    const listOption = this.props.lists.map((list, index) => (
      <option key={index} value={list.id}>{list.name}</option>
    ));
    return (
      <div className="js-list list-wrapper">
        <div className="list js-list-content">
          <div
            className={`${styles.listHeader} list-header js-list-header u-clearfix is-menu-shown`}
          >
            <select
              className={styles.listTitle}
              onChange={() => {}}
            >
              {listOption}
            </select>
            <div className={`${styles.selectIcon} list-header-extras`}>
              <span className="icon-sm"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrelloStyleList.propTypes = {
  lists: PropTypes.array.isRequired,
  cardDataSource: PropTypes.array.isRequired,
};
