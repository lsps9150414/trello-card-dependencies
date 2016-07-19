import joint from 'jointjs';
import HTML5Backend from 'react-dnd-html5-backend';
import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

import styles from './CardDepView.css';
import TrelloList from '../components/TrelloList';
import {
  getBoardShortLink,
  getListsTrello,
  getCardsOfBoardTrello,
} from '../actions/trello';

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
    const cardDepViewDOM = document.getElementById('cardDepView');

    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: cardDepViewDOM,
      width: null,
      height: null,
      model: graph,
      gridSize: 1,
      perpendicularLinks: true,
      // restrictTranslate: true,
    });

    const CustomShape = joint.shapes.basic.Generic.extend({
      markup:
      '<g class="scalable">' +
        '<rect/>' +
          '<foreignObject>' +
            '<div xmlns="http://www.w3.org/1999/xhtml">test</div>' +
          '</foreignObject>' +
      '</g>',

      defaults: joint.util.deepSupplement({
        type: 'basic.Rect',
        attrs: {
          rect: { fill: 'white', stroke: 'black', 'follow-scale': true, width: 80, height: 40 },
          foreignObject: { width: 80, height: 40 }
        }
      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    const rect = new CustomShape({
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      attrs: {
        rect: { width: 100, height: 100, 'stroke-width': 1 },
        foreignObject: { width: 100, height: 100 },
        // text: { text: 'my box', fill: 'white' }
      }
    });
    // const rect = new joint.shapes.basic.Rect({
    //   position: { x: 0, y: 0 },
    //   size: { width: 1, height: 1 },
    //   attrs: {
    //     rect: { fill: 'gray', 'stroke-width': 1, width: 100, height: 100 },
    //     // text: { text: 'my box', fill: 'white' }
    //   }
    // });

    const rect2 = rect.clone();
    rect2.translate(300, 300);
    //
    // const link = new joint.dia.Link({
    //   source: { id: rect.id },
    //   target: { id: rect2.id }
    // });

    graph.addCells([rect]);
    graph.addCells([rect2]);
    // graph.addCells([rect2, link]);
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
        <div id={'cardDepView'} className={styles.cardDepView} />
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
