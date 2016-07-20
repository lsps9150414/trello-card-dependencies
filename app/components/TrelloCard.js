// import ReactDOM from 'react-dom';

import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import styles from './TrelloCard.css';
import { ItemTypes } from '../constants';

const draggableCardClassName = 'draggableCardClassName';

// [react-DnD] The drag source spec.
const cardSource = {
  beginDrag: (props) => {
    console.log('TrelloCard dragged!', props);
    return {
      test: 'test'
    };
  },
};

// [react-DnD] Map & merge DnD state to props.
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class TrelloCard extends React.Component {
  componentDidMount() {
    // TO cancel the dragstart event from Trello.
    // const selfDOM = ReactDOM.findDOMNode(this);
    // selfDOM.addEventListener('dragstart', (e) => {
    //   e.stopPropagation();
    //   // e.stopImmediatePropagation();
    // }, false);
  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        className={`${draggableCardClassName} list-card`}
        style={{
          backgroundColor: isDragging ? 'gray' : 'white',
        }}
      >
        <div className={`${styles.listCardDetails} list-card-details`}>
          <a
            className={`${styles.listCardTitle} list-card-title js-card-name`}
            dir="auto"
            href={this.props.cardUrl}
            draggable={'false'}
          >
            {this.props.cardName}
          </a>
        </div>
      </div>
    );
  }
}

TrelloCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardUrl: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(TrelloCard);
