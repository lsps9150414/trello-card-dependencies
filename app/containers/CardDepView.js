import joint from 'jointjs';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import svgPanZoom from 'svg-pan-zoom';

import styles from './CardDepView.css';
import TrelloList from '../components/TrelloList';
import {
  getBoardShortLink,
  getListsTrello,
  getCardsOfBoardTrello,
} from '../actions/trello';
import { TrelloDepCard } from '../components/TrelloDepCard';

class CardDepView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    console.log('componentWillMount');
    if (this.props.loggedIn) {
      const boardShortLink = getBoardShortLink();
      this.props.getListsTrello(boardShortLink, this.props.getCardsOfBoard(boardShortLink));
    }
  }
  componentDidMount() {
    this.renderJoinJsView();
  }
  componentWillUpdate(nextProps) {
    // FIXME: Should toggle dep view after lists & cards are updated.
    // Current get lists/cards callback is not real callback.
    if (nextProps.showCardDepView !== this.props.showCardDepView) {
      if (nextProps.showCardDepView) {
        const boardShortLink = getBoardShortLink();
        this.props.getListsTrello(
          boardShortLink,
          this.props.getCardsOfBoard(
            boardShortLink,
            this.toggleCardDepView(nextProps.showCardDepView)
          )
        );
      } else {
        this.toggleCardDepView(nextProps.showCardDepView);
      }
    }
  }
  toggleCardDepView = (showCardDepView) => {
    const listCanvasDOM = document.getElementsByClassName('board-canvas')[0];
    const cardDepCanvasDOM = document.getElementsByClassName('board-canvas')[1];
    if (showCardDepView) {
      cardDepCanvasDOM.style.display = 'flex';
      listCanvasDOM.style.display = 'none';
    } else {
      listCanvasDOM.style.display = 'flex';
      cardDepCanvasDOM.style.display = 'none';
    }
  }
  renderJoinJsView = () => {
    const cardDepViewDOM = ReactDOM.findDOMNode(this.cardDepView);

    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: cardDepViewDOM,
      width: 800,
      height: 600,
      model: graph,
      gridSize: 1,
      perpendicularLinks: true,
      // restrictTranslate: true,
    });
    const panAndZoom = svgPanZoom(cardDepViewDOM.childNodes[0],
      {
        viewportSelector: cardDepViewDOM.childNodes[0].childNodes[0],
        fit: false,
        zoomScaleSensitivity: 0.15,
        panEnabled: false
      }
    );
    paper.on('blank:pointerdown', (evt, x, y) => {
      panAndZoom.enablePan();
    });
    paper.on('cell:pointerup blank:pointerup', (cellView, event) => {
      panAndZoom.disablePan();
    });

    const rect = new TrelloDepCard({
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      attrs: {
        rect: { width: 100, height: 100, 'stroke-width': 1 },
        foreignObject: { width: 100, height: 100 },
        text: { text: 'my box', fill: 'white' }
      }
    });

    const rect2 = rect.clone();
    rect2.translate(300, 300);
    //
    // const link = new joint.dia.Link({
    //   source: { id: rect.id },
    //   target: { id: rect2.id }
    // });

    graph.addCells([rect, rect2]);
    // graph.addCells([link]);
  }
  render() {
    let content = null;
    if (!this.props.ready) {
      content = (<h1>Loading...</h1>);
    } else if (this.props.lists.length === 0 || this.props.cards.length === 0) {
      content = (<h1>No list or cards exist.</h1>);
    } else {
      content = (<TrelloList lists={this.props.lists} cards={this.props.cards} />);
    }
    return (
      <div className={styles.cardDepViewContainer}>
        {content}
        <div
          ref={(node) => { this.cardDepView = node; }}
          className={styles.cardDepView}
        />
      </div>
    );
  }
}

CardDepView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  getListsTrello: PropTypes.func.isRequired,
  getCardsOfBoard: PropTypes.func.isRequired,
  showCardDepView: PropTypes.bool.isRequired,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]).isRequired,
  cards: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]).isRequired,
  ready: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.trelloCredentials.loggedIn,
  showCardDepView: state.system.showCardDepView,
  lists: state.trello.lists,
  cards: state.trello.cards,
  ready: state.trello.ready,
});
const mapDispatchToProps = (dispatch) => ({
  getListsTrello: (boardShortLink, successCallback, errCallback) => {
    dispatch(getListsTrello(boardShortLink, successCallback, errCallback));
  },
  getCardsOfBoard: (boardShortLink, successCallback, errCallback) => {
    dispatch(getCardsOfBoardTrello(boardShortLink, successCallback, errCallback));
  },
});
const CardDepViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDepView);

// export default CardDepViewContainer;

export default DragDropContext(HTML5Backend)(CardDepViewContainer);
