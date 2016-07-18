import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

const draggableCardClassName = 'draggableCardClassName';
export default class TrelloStlyeCard extends React.Component {
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
  dragHandler = (e) => {
    console.log('drag started');
    // const img = document.createElement('img');
    // img.src = 'https://kryogenix.org/images/hackergotchi-simpler.png';
    // e.dataTransfer.setDragImage(img, 50, 50);
  }
  render() {
    return (
      <div
        className={`${draggableCardClassName} list-card`}
        draggable="true"
        onDragStart={this.dragHandler}
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
};
