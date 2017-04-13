import joint from 'jointjs';
import svgPanZoom from 'svg-pan-zoom';
import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import styles from './CardDepCanvas.css';
import { DepCard } from '../components/DepCard';
import { ItemTypes } from '../constants';

const canvasTarget = {
  drop: (props, monitor) => {
    console.log(props, monitor.getItem());
    // TODO: [Add Dep Card] 1. dispatch(updateCardDepData()), updateCardDepData() will add card metadata to Trello
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class cardDepCanvas extends React.Component {
  componentDidMount() {
    const graph = this.initCanvas();
    const itemData = [{ text: 'card 1' }, { text: 'card 2' }];
    this.renderCanvasItem(graph, itemData);
  }
  // componentWillUpdate(nextProps) {
  //   this.renderCanvasItem(graph, itemData);
  // }
  initCanvas = () => {
    // TODO: [Add Dep Card] 3. render accourding to props
    const cardDepViewDOM = ReactDOM.findDOMNode(this.cardDepView);
    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: cardDepViewDOM, model: graph,
      width: 800, height: 600, gridSize: 1,
      perpendicularLinks: true,
      // restrictTranslate: true,
    });
    const panAndZoom = svgPanZoom(cardDepViewDOM.childNodes[0],
      {
        viewportSelector: cardDepViewDOM.childNodes[0].childNodes[0],
        fit: false, zoomScaleSensitivity: 0.15, panEnabled: false
      }
    );
    paper.on('blank:pointerdown', () => { panAndZoom.enablePan(); });
    paper.on('cell:pointerup blank:pointerup', () => { panAndZoom.disablePan(); });
    return graph;
  }
  renderCanvasItem = (graph, itemData) => {
    const items = [];
    for (let i = 0; i < itemData.length; i++) {
      console.log(itemData[i].text);
      items.push(
        new DepCard({
          position: { x: 0, y: 0 },
          size: { width: 1, height: 1 },
          attrs: {
            rect: { width: 100, height: 100, 'stroke-width': 1 },
            foreignObject: { width: 100, height: 100 },
          }
        })
      );
    }
    console.log(items);
    graph.addCells(items);

    // const link = new joint.dia.Link({
    //   source: { id: rect.id },
    //   target: { id: rect2.id }
    // });
    // graph.addCells([link]);
  }
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div
        ref={(node) => { this.cardDepView = node; }}
        className={styles.cardDepCanvas}
      />
    );
  }
}

cardDepCanvas.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.CARD, canvasTarget, collect)(cardDepCanvas);
