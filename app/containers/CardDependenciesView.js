import React, { PropTypes } from 'react';
import joint from 'jointjs';
import styles from './CardDependenciesView.css';

export default class CardDependenciesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    this.renderView();
  }
  renderView = () => {
    console.log('renderView');
    const CardDependenciesViewDOM = document.getElementById('cardDependenciesView');

    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: CardDependenciesViewDOM,
      width: null,
      height: null,
      model: graph,
      gridSize: 1,
      perpendicularLinks: true,
      // restrictTranslate: true,
    });
    console.log('paper =', paper);

    const CustomShape = joint.shapes.basic.Generic.extend({
      markup:
      '<g class="scalable">' +
        '<rect/>' +
        // '<switch>' +
          '<foreignObject>' +
            '<div xmlns="http://www.w3.org/1999/xhtml">test</div>' +
          '</foreignObject>' +
        // '</switch>' +
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
    console.log(rect);
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
      <div id={'cardDependenciesView'} className={styles.cardDependenciesView} />
    );
    // <div>
    //   <svg>
    //     <foreignObject>
    //       <div>test</div>
    //     </foreignObject>
    //   </svg>
    // </div>
  }
}

CardDependenciesView.propTypes = {
};
