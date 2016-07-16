import joint from 'jointjs';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './CardDepView.css';
import TrelloStyleList from '../components/TrelloStyleList';
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
      this.props.getListsTrello(getBoardShortLink());
      this.props.getCardsOfBoard(getBoardShortLink());
    }
  }
  componentDidMount() {
    this.renderJoinJsView();
  }
  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate:', nextProps);
    if (nextProps.showCardDepView !== this.props.showCardDepView) {
      if (nextProps.showCardDepView) {
        this.props.getListsTrello(getBoardShortLink());
      }
      this.toggleCardDepView(nextProps.showCardDepView);
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
    const CardDepViewDOM = document.getElementById('CardDepView');

    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: CardDepViewDOM,
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
    return (
      <div className={styles.cardDepViewContainer}>
        <TrelloStyleList lists={this.props.lists} />
        <div id={'CardDepView'} className={styles.cardDepView} />
      </div>
    );
  }
}

CardDepView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  getListsTrello: PropTypes.func.isRequired,
  getCardsOfBoard: PropTypes.func.isRequired,
  showCardDepView: PropTypes.bool.isRequired,
  lists: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.trelloCredentials.loggedIn,
  showCardDepView: state.system.showCardDepView,
  lists: state.trello.lists,
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

export default CardDepViewContainer;