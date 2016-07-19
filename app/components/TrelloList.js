import React, { PropTypes } from 'react';
import styles from './TrelloList.css';
import TrelloCard from './TrelloCard';

export default class TrelloList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListId: this.props.lists[0].id,
    };
  }
  componentDidMount() {
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
        <TrelloCard className={'test'} key={index} cardName={card.name} cardUrl={card.url} />
      ));
    return (
      <div className="js-list list-wrapper">
        <div className="list js-list-content">
          <div
            className={`${styles.listHeader} list-header js-list-header u-clearfix is-menu-shown`}
          >
            <select className={styles.listTitle} onChange={this.onSelectHandler}>
              {listOption}
            </select>
            <div className={`${styles.selectIcon} list-header-extras`}>
              <span className="icon-sm"></span>
            </div>
          </div>
          <div className="list-cards u-fancy-scrollbar u-clearfix js-list-cards">
            {cards}
          </div>
        </div>
      </div>
    );
  }
  dragHandler = () => {
    console.log('dragged');
  }
}

TrelloList.propTypes = {
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
};
