import React, { PropTypes } from 'react';
import styles from './TrelloStyleList.css';

export default class TrelloStyleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListId: this.props.lists[0].id,
    };
  }
  onSelectHandler = (event) => {
    this.setState({ selectedListId: event.target.value });
  };
  render() {
    const listOption = this.props.lists.map((list, index) => (
      <option key={index} value={list.id}>{list.name}</option>
    ));
    const cards = this.props.cards
      .filter((card) => card.idList === this.state.selectedListId)
      .map((card, index) => (
        <div key={index} className="list-cards u-fancy-scrollbar u-clearfix js-list-cards">
          <div className="list-card">
            <div className="list-card-details">
              <a className="list-card-title js-card-name" dir="auto" href={card.url}>
                {card.name}
              </a>
            </div>
          </div>
        </div>
      ));
    return (
      <div className="js-list list-wrapper">
        <div className="list js-list-content">
          <div
            className={`${styles.listHeader} list-header js-list-header u-clearfix is-menu-shown`}
          >
            <select
              className={styles.listTitle}
              onChange={this.onSelectHandler}
            >
              {listOption}
            </select>
            <div className={`${styles.selectIcon} list-header-extras`}>
              <span className="icon-sm"></span>
            </div>
          </div>
          {cards}
        </div>
      </div>
    );
  }
}

TrelloStyleList.propTypes = {
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
};
