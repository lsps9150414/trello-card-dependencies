import joint from 'jointjs';
import svgPanZoom from 'svg-pan-zoom';
import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import styles from './CardDepCanvas.css';
import { DepCard } from '../components/DepCard';

export default class cardDepCanvas extends React.Component {
  componentDidMount() {
    this.renderJoinJsView();
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

    const rect = new DepCard({
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
    return (
      <div
        ref={(node) => { this.cardDepView = node; }}
        className={styles.cardDepCanvas}
      />
    );
  }
}

cardDepCanvas.propTypes = {
};
