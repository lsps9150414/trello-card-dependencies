// import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

const draggableCardClassName = 'draggableCardClassName';


const cardSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class TrelloStlyeCard extends React.Component {
  componentDidMount() {
    // const selfDOM = ReactDOM.findDOMNode(this);
    // selfDOM.addEventListener('dragstart', this.dragHandler);
    // selfDOM.onmousedown = this.makeDraggable;
  }
  // makeDraggable = (eDown) => {
  //   const viewportOffset = ReactDOM.findDOMNode(this).getBoundingClientRect();
  //
  //   const draggableDOM = ReactDOM.findDOMNode(this).cloneNode(true);
  //   draggableDOM.style.width = '254px';
  //   draggableDOM.style.zIndex = '999';
  //   draggableDOM.style.position = 'absolute';
  //   draggableDOM.style.top = `${viewportOffset.top}px`;
  //   draggableDOM.style.left = `${viewportOffset.left}px`;
  //   document.getElementsByTagName('body')[0].appendChild(draggableDOM);
  //   const left = parseInt(draggableDOM.style.left, 10);
  //   const top = parseInt(draggableDOM.style.top, 10);
  //
  //   document.onmousemove = (eMove) => {
  //     draggableDOM.style.left = `${left + eMove.clientX - eDown.clientX}px`;
  //     draggableDOM.style.top = `${top + eMove.clientY - eDown.clientY}px`;
  //   };
  //   document.onmouseup = () => {
  //     document.onmousemove = null;
  //     document.body.removeChild(draggableDOM);
  //
  //     if (draggableDOM.releaseCapture) { draggableDOM.releaseCapture(); }
  //     document.onmouseup = null;
  //   };
  //   if (draggableDOM.setCapture) { draggableDOM.setCapture(); }
  // };
  // dragHandler = (e) => {
  //   console.log('drag started');
  // }
  // draggable="true"
  // onDragStart={this.dragHandler}
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        className={`${draggableCardClassName} list-card`}
        style={{
          backgroundColor: isDragging ? 'red' : 'green',
          cursor: 'move'
        }}
      >
        <div className="list-card-details">
          <a className="list-card-title js-card-name" dir="auto" href={this.props.cardUrl}>
            {this.props.cardName}
          </a>
        </div>
      </div>
    );
  }
}

TrelloStlyeCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardUrl: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(TrelloStlyeCard);
